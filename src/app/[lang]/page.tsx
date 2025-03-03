"use server";

import { getDictionary } from "@/app/[lang]/dictionaries";
import { Provider } from "@/components/chakra/provider";
import "@/components/styles/gradient.css";
import HomeContent from "./content";

const Home = async ({ params }: { params: Promise<{ lang: "en" | "ja" }> }) => {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return (
		<Provider>
			<HomeContent lang={lang} dict={dict} />
		</Provider>
	);
};

export default Home;
