"use server";

import Wrapper from "@/components/custom/wrapper";
import type { Metadata } from "next";
import EN from "./en.mdx";
import JA from "./ja.mdx";

export async function generateMetadata({
	params,
}: AsyncLangParam): Promise<Metadata> {
	const { lang } = await params;
	return {
		title: lang === "ja" ? "経験" : "Experiences",
	};
}

const Experiences = async ({ params }: AsyncLangParam) => {
	const { lang } = await params;

	return <Wrapper>{lang === "ja" ? <JA /> : <EN />}</Wrapper>;
};

export default Experiences;
