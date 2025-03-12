"use server";

import { getDictionary } from "@/app/[lang]/dictionaries";
import { Provider } from "@/components/chakra/provider";
import "@/components/styles/gradient.css";
import type { Metadata } from "next";
import HomeContent from "./content";

export async function generateMetadata({
	params,
}: AsyncLangParam): Promise<Metadata> {
	const { lang } = await params;
	return {
		title:
			lang === "ja"
				? "Yu Takahashi のポートフォリオ"
				: "Yu Takahashi's Portfolio",
	};
}

const Home = async ({ params }: AsyncLangParam) => {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return (
		<Provider>
			<HomeContent lang={lang} dict={dict} />
		</Provider>
	);
};

export default Home;
