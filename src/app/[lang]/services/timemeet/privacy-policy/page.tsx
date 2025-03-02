"use server";

import { getDictionary } from "@/app/[lang]/dictionaries";
import Wrapper from "@/components/custom/wrapper";
import EN from "./en.mdx";
import JA from "./ja.mdx";

const TMPrivacyPolicy = async ({
	params,
}: { params: Promise<{ lang: "en" | "ja" }> }) => {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return <Wrapper>{lang === "ja" ? <JA /> : <EN />}</Wrapper>;
};

export default TMPrivacyPolicy;
