import Link from "next/link";
import Wrapper from "@/components/custom/wrapper";
import type { AsyncLangParam } from "@/types/lang-param";
import { getAllPostsIncludingDrafts } from "@/utils/blog";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
	return { robots: { index: false, follow: false } };
}

const BlogPreviewList = async ({ params }: AsyncLangParam) => {
	const { lang } = await params;
	const posts = await getAllPostsIncludingDrafts(lang);

	const published = posts.filter((p) => p.published);
	const drafts = posts.filter((p) => !p.published);

	const sectionStyle = {
		marginBottom: "48px",
	};

	const headingStyle = {
		fontSize: "0.75rem",
		fontWeight: 600,
		letterSpacing: "0.08em",
		textTransform: "uppercase" as const,
		opacity: 0.4,
		marginBottom: "16px",
	};

	const listStyle = {
		display: "flex",
		flexDirection: "column" as const,
		gap: "12px",
	};

	const itemStyle = (isDraft: boolean) => ({
		display: "flex",
		flexDirection: "column" as const,
		gap: "4px",
		padding: "12px 16px",
		borderRadius: "8px",
		background: isDraft ? "rgba(255, 200, 0, 0.06)" : "rgba(128,128,128,0.06)",
		border: isDraft ? "1px solid rgba(255, 200, 0, 0.2)" : "1px solid rgba(128,128,128,0.12)",
		textDecoration: "none",
		color: "inherit",
	});

	const titleStyle = {
		fontSize: "0.95rem",
		fontWeight: 500,
	};

	const metaStyle = {
		fontSize: "0.75rem",
		opacity: 0.4,
		fontFamily: "var(--font-geist-mono)",
	};

	return (
		<Wrapper>
			<h1
				style={{
					fontSize: "1.5rem",
					fontWeight: 700,
					marginBottom: "40px",
					letterSpacing: "-0.02em",
				}}
			>
				Blog Preview
			</h1>

			{drafts.length > 0 && (
				<div style={sectionStyle}>
					<p style={headingStyle}>Drafts ({drafts.length})</p>
					<div style={listStyle}>
						{drafts.map((post) => (
							<Link
								key={post.slug}
								href={`/${lang}/blog/preview/${post.slug}`}
								style={itemStyle(true)}
							>
								<span style={titleStyle}>{post.title}</span>
								<span style={metaStyle}>{post.date || "no date"}</span>
							</Link>
						))}
					</div>
				</div>
			)}

			{published.length > 0 && (
				<div style={sectionStyle}>
					<p style={headingStyle}>Published ({published.length})</p>
					<div style={listStyle}>
						{published.map((post) => (
							<Link
								key={post.slug}
								href={`/${lang}/blog/${post.slug}`}
								style={itemStyle(false)}
							>
								<span style={titleStyle}>{post.title}</span>
								<span style={metaStyle}>{post.date || "no date"}</span>
							</Link>
						))}
					</div>
				</div>
			)}

			{posts.length === 0 && (
				<p style={{ opacity: 0.4, fontSize: "0.9rem" }}>No posts found.</p>
			)}
		</Wrapper>
	);
};

export default BlogPreviewList;
