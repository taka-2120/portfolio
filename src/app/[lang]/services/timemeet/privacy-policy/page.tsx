"use server";

import { getDictionary } from "@/app/[lang]/dictionaries";
import JA from "./ja.mdx";
import EN from "./en.mdx";
import Wrapper from "@/components/custom/wrapper";

const TMPrivacyPolicy = async ({ params }: { params: { lang: string } }) => {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return <Wrapper>{lang === "ja" ? <JA /> : <EN />}</Wrapper>;
};

export default TMPrivacyPolicy;
