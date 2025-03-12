"use server";

import Wrapper from "@/components/custom/wrapper";
import EN from "./en.mdx";
import JA from "./ja.mdx";

const ENPrivacyPolicy = async ({ params }: AsyncLangParam) => {
	const { lang } = await params;

	return <Wrapper>{lang === "ja" ? <JA /> : <EN />}</Wrapper>;
};

export default ENPrivacyPolicy;
