"use server";

import { getDictionary } from "@/app/[lang]/dictionaries";
import { Provider } from "@/components/chakra/provider";
import type { Metadata } from "next";
import ProjectsContent from "./content";

export async function generateMetadata({
	params,
}: AsyncLangParam): Promise<Metadata> {
	const { lang } = await params;
	return {
		title: lang === "ja" ? "プロジェクト" : "Projects",
	};
}

const Projects = async ({ params }: AsyncLangParam) => {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return (
		<Provider>
			<ProjectsContent lang={lang} dict={dict} />
		</Provider>
	);
};

export default Projects;
