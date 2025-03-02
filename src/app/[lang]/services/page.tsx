"use server";

import { getDictionary } from "@/app/[lang]/dictionaries";
import ProjectsContent from "./content";
import { Provider } from "@/components/chakra/provider";

const Projects = async ({
	params,
}: { params: Promise<{ lang: "en" | "ja" }> }) => {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return (
		<Provider>
			<ProjectsContent lang={lang} dict={dict} />
		</Provider>
	);
};

export default Projects;
