"use server";

import type { Metadata } from "next";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Provider } from "@/components/chakra/provider";
import { PersonJsonLd } from "@/components/custom/json-ld";
import type { AsyncLangParam } from "@/types/lang-param";
import HomeContent from "./content";

export async function generateMetadata({
	params,
}: AsyncLangParam): Promise<Metadata> {
	const { lang } = await params;
	const isJa = lang === "ja";
	return {
		title: isJa ? "Yu Takahashi のポートフォリオ" : "Yu Takahashi's Portfolio",
		description: isJa
			? "iOS・Web を中心に開発するソフトウェアエンジニア。アプリや経歴、技術ブログを公開しています。"
			: "Software engineer focused on iOS and Web development. Showcasing apps, experiences, and technical writing.",
		openGraph: {
			title: isJa
				? "Yu Takahashi のポートフォリオ"
				: "Yu Takahashi's Portfolio",
			description: isJa
				? "iOS・Web を中心に開発するソフトウェアエンジニア。"
				: "Software engineer focused on iOS and Web.",
			url: `/${lang}`,
		},
	};
}

const Home = async ({ params }: AsyncLangParam) => {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return (
		<Provider>
			<PersonJsonLd lang={lang} />
			<HomeContent lang={lang} dict={dict} />
		</Provider>
	);
};

export default Home;
