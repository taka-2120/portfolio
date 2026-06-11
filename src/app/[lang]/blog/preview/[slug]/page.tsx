import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import CodeCopyButton from "@/components/custom/code-copy-button";
import Wrapper from "@/components/custom/wrapper";
import {
	collapsibleTransformer,
	rehypeCollapsibleCode,
} from "@/lib/rehype-collapsible-code";
import type { AsyncLangParam } from "@/types/lang-param";
import { getPost } from "@/utils/blog";
import { getDictionary } from "../../../dictionaries";
import "../../prose.css";

type Params = AsyncLangParam & {
	params: Promise<{ lang: "en" | "ja"; slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata() {
	return { robots: { index: false, follow: false } };
}

const BlogPreview = async ({ params }: Params) => {
	const { lang, slug } = await params;
	const post = await getPost(slug, lang);
	if (!post) notFound();

	const dict = await getDictionary(lang);

	return (
		<Wrapper>
			{!post.published && (
				<div
					style={{
						background: "rgba(255, 200, 0, 0.1)",
						border: "1px solid rgba(255, 200, 0, 0.35)",
						borderRadius: "8px",
						padding: "8px 16px",
						marginBottom: "24px",
						fontSize: "0.8rem",
						color: "#b8960a",
						fontFamily: "var(--font-geist-mono)",
					}}
				>
					DRAFT — not published
				</div>
			)}

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

export default BlogPreview;
