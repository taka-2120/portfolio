import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import CodeCopyButton from "@/components/custom/code-copy-button";
import { ArticleJsonLd } from "@/components/custom/json-ld";
import Wrapper from "@/components/custom/wrapper";
import {
	collapsibleTransformer,
	rehypeCollapsibleCode,
} from "@/lib/rehype-collapsible-code";
import type { AsyncLangParam } from "@/types/lang-param";
import { getAllPosts, getPost } from "@/utils/blog";
import { getDictionary } from "../../dictionaries";
import "../prose.css";

const BASE_URL =
	process.env.NEXT_PUBLIC_SITE_URL ?? "https://yu-dev.vercel.app";

type Params = AsyncLangParam & {
	params: Promise<{ lang: "en" | "ja"; slug: string }>;
};

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
	const langs = ["en", "ja"] as const;
	const results = await Promise.all(
		langs.map(async (lang) => {
			const posts = await getAllPosts(lang);
			return posts.map((post) => ({ lang, slug: post.slug }));
		}),
	);
	return results.flat();
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const { lang, slug } = await params;
	const post = await getPost(slug, lang);
	if (!post?.published) return {};
	return {
		title: post.title,
		description: post.description,
		openGraph: {
			title: post.title,
			description: post.description,
			type: "article",
			publishedTime: post.date,
			url: `/${lang}/blog/${slug}`,
			tags: post.tags,
			...(post.image ? { images: [{ url: post.image }] } : {}),
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.description,
		},
	};
}

const BlogPost = async ({ params }: Params) => {
	const { lang, slug } = await params;
	const post = await getPost(slug, lang);
	if (!post || !post.published) notFound();

	const dict = await getDictionary(lang);

	return (
		<Wrapper>
			<ArticleJsonLd
				title={post.title}
				description={post.description}
				date={post.date}
				url={`${BASE_URL}/${lang}/blog/${slug}`}
				tags={post.tags}
			/>
			<Link
				href={`/${lang}/blog`}
				style={{
					fontSize: "0.875rem",
					opacity: 0.5,
					textDecoration: "none",
					color: "inherit",
					display: "inline-block",
					marginBottom: "32px",
					transition: "opacity 0.2s",
				}}
			>
				{dict.blog.backToBlog}
			</Link>

			{post.image && (
				<div
					style={{
						position: "relative",
						width: "100%",
						aspectRatio: "16/9",
						borderRadius: "12px",
						overflow: "hidden",
						marginBottom: "36px",
					}}
				>
					<Image
						src={post.image}
						alt={post.title}
						fill
						style={{ objectFit: "cover" }}
						priority
					/>
				</div>
			)}

			<header style={{ marginBottom: "40px" }}>
				<p
					style={{
						fontSize: "0.8rem",
						opacity: 0.4,
						marginBottom: "10px",
						fontFamily: "var(--font-geist-mono)",
					}}
				>
					{post.date}
				</p>
				<h1
					style={{
						fontSize: "1.9rem",
						fontWeight: 700,
						letterSpacing: "-0.025em",
						lineHeight: 1.25,
						marginBottom: "16px",
					}}
				>
					{post.title}
				</h1>
				{post.tags.length > 0 && (
					<div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
						{post.tags.map((tag) => (
							<span
								key={tag}
								style={{
									fontSize: "0.75rem",
									padding: "2px 8px",
									borderRadius: "99px",
									background: "rgba(128,128,128,0.12)",
									opacity: 0.8,
								}}
							>
								{tag}
							</span>
						))}
					</div>
				)}
			</header>

			<div className="mdx-prose">
				<MDXRemote
					source={post.content}
					options={{
						mdxOptions: {
							rehypePlugins: [
								[
									rehypePrettyCode,
									{
										themes: {
											light: "github-light",
											dark: "github-dark",
										},
										transformers: [collapsibleTransformer],
									},
								],
								rehypeCollapsibleCode,
							],
						},
					}}
				/>
				<CodeCopyButton />
			</div>
		</Wrapper>
	);
};

export default BlogPost;
