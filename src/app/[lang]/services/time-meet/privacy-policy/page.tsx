"use server";

import { getDictionary } from "@/app/[lang]/dictionaries";
import Wrapper from "@/components/custom/wrapper";
import type { AsyncLangParam } from "@/types/lang-param";
import EN from "./en.mdx";
import JA from "./ja.mdx";

const TMPrivacyPolicy = async ({ params }: AsyncLangParam) => {
	const { lang } = await params;
	const _dict = await getDictionary(lang);

	return <Wrapper>{lang === "ja" ? <JA /> : <EN />}</Wrapper>;
};

export default TMPrivacyPolicy;
