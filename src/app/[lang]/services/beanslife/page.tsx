"use server";

import JA from "./ja.mdx";
import EN from "./en.mdx";
import Wrapper from "@/components/custom/wrapper";

const EcoNotify = async ({ params }: { params: Promise<{ lang: 'en' | 'ja' }> }) => {
	const { lang } = await params;

	return <Wrapper>{lang === "ja" ? <JA /> : <EN />}</Wrapper>;
};

export default EcoNotify;
