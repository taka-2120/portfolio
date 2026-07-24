import type { Metadata } from "next";
import Link from "next/link";
import Wrapper from "@/components/custom/wrapper";
import type { AsyncLangParam } from "@/types/lang-param";
import { getAllPosts } from "@/utils/blog";
import { getDictionary } from "../dictionaries";

export const revalidate = 300;

export async function generateMetadata({
	params,
}: AsyncLangParam): Promise<Metadata> {
	const { lang } = await params;
	const dict = await getDictionary(lang);
	const isJa = lang === "ja";
	const description = isJa
		? "iOS・Web 開発に関する技術記事を書いています。"
		: "Technical writing on iOS and Web development.";
	return {
		title: dict.blog.title,
		description,
		openGraph: {
			title: dict.blog.title,
			description,
			url: `/${lang}/blog`,
		},
	};
}

const BlogList = async ({ params }: AsyncLangParam) => {
	const { lang } = await params;
	const dict = await getDictionary(lang);
	const posts = await getAllPosts(lang);

	return (
		<Wrapper>
			<h1
				style={{
					fontSize: "2rem",
					fontWeight: 700,
					marginBottom: "40px",
					letterSpacing: "-0.02em",
				}}
			>
				{dict.blog.title}
			</h1>

			{posts.length === 0 ? (
				<p style={{ opacity: 0.5 }}>{dict.blog.noPosts}</p>
			) : (
				<ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
					{posts.map((post, i) => (
						<li
							key={post.slug}
							style={{
								borderTop:
									i === 0 ? "none" : "1px solid rgba(128,128,128,0.15)",
								padding: "28px 0",
							}}
						>
							<Link
								href={`/${lang}/blog/${post.slug}`}
								style={{ textDecoration: "none", color: "inherit" }}
							>
								<article>
									<p
										style={{
											fontSize: "0.8rem",
											opacity: 0.45,
											marginBottom: "6px",
											fontFamily: "var(--font-geist-mono)",
										}}
									>
										{post.date}
									</p>
									<h2
										style={{
											fontSize: "1.2rem",
											fontWeight: 600,
											marginBottom: "8px",
											letterSpacing: "-0.01em",
										}}
									>
										{post.title}
									</h2>
									<p
										style={{
											opacity: 0.65,
											lineHeight: 1.6,
											fontSize: "0.95rem",
											marginBottom: "10px",
										}}
									>
										{post.description}
									</p>
									{post.tags.length > 0 && (
										<div
											style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}
										>
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
								</article>
							</Link>
						</li>
					))}
				</ul>
			)}
		</Wrapper>
	);
};

export default BlogList;
