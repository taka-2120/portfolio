"use server";

import { getDictionary } from "@/app/[lang]/dictionaries";
import { Provider } from "@/components/chakra/provider";
import TopSection from "@/components/custom/top-section";
import { skillImages } from "@/constants/image-urls";
import { services } from "@/constants/services";
import type Service from "@/entities/service";
import AppStoreBadge from "@/images/app-store.png";
import PortraitIcon from "@/images/portrait.png";
import { age } from "@/utils/age";
import {
	Button,
	Card,
	Center,
	Grid,
	GridItem,
	HStack,
	Heading,
	Image,
	Link,
	List,
	Spacer,
	Text,
	VStack,
	useBreakpointValue,
} from "@chakra-ui/react";
import "@/components/styles/gradient.css";
import Wrapper from "@/components/custom/wrapper";
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
