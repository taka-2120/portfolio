export const PersonJsonLd = ({ lang }: { lang: string }) => {
	const isJa = lang === "ja";
	const data = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Yu Takahashi",
		url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yu-dev.vercel.app",
		jobTitle: isJa ? "ソフトウェアエンジニア" : "Software Engineer",
		description: isJa
			? "iOS・Web を中心に開発するソフトウェアエンジニア。関西学院大学 工学部 情報学課程 4年。"
			: "Software engineer focused on iOS and Web development. 4th year at Kwansei Gakuin University.",
		knowsAbout: ["iOS", "Swift", "SwiftUI", "TypeScript", "React", "Next.js"],
		alumniOf: {
			"@type": "CollegeOrUniversity",
			name: isJa ? "関西学院大学" : "Kwansei Gakuin University",
		},
		sameAs: [
			"https://github.com/taka-2120",
			"https://apps.apple.com/developer/yu-takahashi",
		],
	};

	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD, no user input
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	);
};

type ArticleJsonLdProps = {
	title: string;
	description: string;
	date: string;
	url: string;
	tags: string[];
};

export const ArticleJsonLd = ({
	title,
	description,
	date,
	url,
	tags,
}: ArticleJsonLdProps) => {
	const data = {
		"@context": "https://schema.org",
		"@type": "TechArticle",
		headline: title,
		description,
		datePublished: date,
		url,
		keywords: tags.join(", "),
		author: {
			"@type": "Person",
			name: "Yu Takahashi",
			url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yu-dev.vercel.app",
		},
		publisher: {
			"@type": "Person",
			name: "Yu Takahashi",
		},
	};

	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD, no user input
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	);
};
