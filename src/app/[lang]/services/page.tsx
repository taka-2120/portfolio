"use server";

import { getDictionary } from "../dictionaries";
import ProjectsContent from "./content";

const Projects = async ({ params }: { params: { lang: string } }) => {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return <ProjectsContent lang={lang} dict={dict} />;
};

export default Projects;
