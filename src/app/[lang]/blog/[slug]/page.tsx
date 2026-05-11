import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Wrapper from "@/components/custom/wrapper";
import type { AsyncLangParam } from "@/types/lang-param";
import { getAllPostSlugs, getPost } from "@/utils/blog";
import { getDictionary } from "../../dictionaries";

type Params = AsyncLangParam & {
	params: Promise<{ lang: "en" | "ja"; slug: string }>;
};

export async function generateStaticParams() {
	const slugs = getAllPostSlugs();
	const langs = ["en", "ja"] as const;
	return langs.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const { lang, slug } = await params;
	const post = getPost(slug, lang);
	if (!post) return {};
	return {
		title: post.title,
		description: post.description,
	};
}

const BlogPost = async ({ params }: Params) => {
	const { lang, slug } = await params;
	const post = getPost(slug, lang);
	if (!post || !post.published) notFound();

	const dict = await getDictionary(lang);

	return (
		<Wrapper>
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

			<div className="mdx-content">
				<MDXRemote source={post.content} />
			</div>
		</Wrapper>
	);
};

export default BlogPost;
