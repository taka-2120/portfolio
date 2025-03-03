"use server";

import { getDictionary } from "@/app/[lang]/dictionaries";
import { Provider } from "@/components/chakra/provider";
import ProjectsContent from "./content";

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
