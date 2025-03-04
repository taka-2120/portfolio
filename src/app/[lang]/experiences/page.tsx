"use server";

import Wrapper from "@/components/custom/wrapper";
import EN from "./en.mdx";
import JA from "./ja.mdx";

const Experiences = async ({
	params,
}: { params: Promise<{ lang: "en" | "ja" }> }) => {
	const { lang } = await params;

	return <Wrapper>{lang === "ja" ? <JA /> : <EN />}</Wrapper>;
};

export default Experiences;
