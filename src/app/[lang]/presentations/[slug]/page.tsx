import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import CodeCopyButton from "@/components/custom/code-copy-button";
import { ArticleJsonLd } from "@/components/custom/json-ld";
import SpeakerDeckEmbed from "@/components/custom/speaker-deck-embed";
import Wrapper from "@/components/custom/wrapper";
import {
	collapsibleTransformer,
	rehypeCollapsibleCode,
} from "@/lib/rehype-collapsible-code";
import type { AsyncLangParam } from "@/types/lang-param";
import { getAllPresentations, getPresentation } from "@/utils/presentations";
import { getSpeakerDeckEmbed } from "@/utils/speakerdeck";
import { getDictionary } from "../../dictionaries";
import "../../prose.css";

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
			const presentations = await getAllPresentations(lang);
			return presentations.map((presentation) => ({
				lang,
				slug: presentation.slug,
			}));
		}),
	);
	return results.flat();
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const { lang, slug } = await params;
	const presentation = await getPresentation(slug, lang);
	if (!presentation?.published) return {};
	return {
		title: presentation.title,
		description: presentation.description,
		openGraph: {
			title: presentation.title,
			description: presentation.description,
			type: "article",
			publishedTime: presentation.date,
			url: `/${lang}/presentations/${slug}`,
			tags: presentation.tags,
		},
		twitter: {
			card: "summary_large_image",
			title: presentation.title,
			description: presentation.description,
		},
	};
}

const PresentationDetail = async ({ params }: Params) => {
	const { lang, slug } = await params;
	const presentation = await getPresentation(slug, lang);
	if (!presentation || !presentation.published) notFound();

	const dict = await getDictionary(lang);
	const embed = await getSpeakerDeckEmbed(presentation.speakerDeckUrl);

	return (
		<Wrapper>
			<ArticleJsonLd
				title={presentation.title}
				description={presentation.description}
				date={presentation.date}
				url={`${BASE_URL}/${lang}/presentations/${slug}`}
				tags={presentation.tags}
			/>
			<Link
				href={`/${lang}/presentations`}
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
				{dict.presentations.backToList}
			</Link>

			<header style={{ marginBottom: "24px" }}>
				<p
					style={{
						fontSize: "0.8rem",
						opacity: 0.4,
						marginBottom: "10px",
						fontFamily: "var(--font-geist-mono)",
					}}
				>
					{presentation.conferenceName}
					{presentation.date ? ` · ${presentation.date}` : ""}
					{presentation.venue ? ` · ${presentation.venue}` : ""}
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
					{presentation.title}
				</h1>
				{presentation.conferenceUrl && (
					<a
						href={presentation.conferenceUrl}
						target="_blank"
						rel="noopener noreferrer"
						style={{ fontSize: "0.875rem", opacity: 0.6, color: "inherit" }}
					>
						{presentation.conferenceName} ↗
					</a>
				)}
				{presentation.tags.length > 0 && (
					<div
						style={{
							display: "flex",
							gap: "6px",
							flexWrap: "wrap",
							marginTop: "14px",
						}}
					>
						{presentation.tags.map((tag) => (
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

			{embed?.html && <SpeakerDeckEmbed html={embed.html} />}

			<a
				href={presentation.speakerDeckUrl}
				target="_blank"
				rel="noopener noreferrer"
				style={{
					fontSize: "0.875rem",
					opacity: 0.6,
					color: "inherit",
					display: "inline-block",
					marginBottom: "36px",
				}}
			>
				{dict.presentations.watchOnSpeakerDeck} ↗
			</a>

			<div className="mdx-prose">
				<MDXRemote
					source={presentation.content}
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

export default PresentationDetail;
