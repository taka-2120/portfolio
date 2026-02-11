"use server";

import type { Metadata } from "next";
import Wrapper from "@/components/custom/wrapper";
import type { AsyncLangParam } from "@/types/lang-param";
import EN from "./en.mdx";
import JA from "./ja.mdx";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Eco Cycle",
	};
}

const EcoNotify = async ({ params }: AsyncLangParam) => {
	const { lang } = await params;

	return <Wrapper>{lang === "ja" ? <JA /> : <EN />}</Wrapper>;
};

export default EcoNotify;
