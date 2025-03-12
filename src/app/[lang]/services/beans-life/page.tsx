"use server";

import Wrapper from "@/components/custom/wrapper";
import type { Metadata } from "next";
import EN from "./en.mdx";
import JA from "./ja.mdx";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Beans Life",
	};
}

const BeansLife = async ({ params }: AsyncLangParam) => {
	const { lang } = await params;

	return <Wrapper>{lang === "ja" ? <JA /> : <EN />}</Wrapper>;
};

export default BeansLife;
