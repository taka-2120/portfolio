"use client";

import AppStoreBadge from "@/images/app-store.png";
import { services } from "@/constants/services";
import {
	Card,
	Heading,
	HStack,
	Image,
	Link,
	Text,
	VStack,
} from "@chakra-ui/react";
import { Provider } from "@/components/chakra/provider";
import TopSection from "@/components/custom/top-section";
import "@/components/styles/gradient.css";
import type Service from "@/entities/service";
import { useRouter } from "next/navigation";
import Wrapper from "@/components/custom/wrapper";

const ProjectsContent = ({
	lang,
	dict,
}: { lang: string; dict: Dict }) => {
	const router = useRouter();

	const makeButton = (service: Service) => {
		if (service.releaseDate) {
			if (service.releaseDate > new Date()) {
				return (
					<Text fontWeight={"bold"} fontSize={"lg"}>
						{dict.release.waitUntil} {service.releaseDate.toLocaleDateString()}!
					</Text>
				);
			}
			if (service.storeURL) {
				return (
					<HStack gapX={30}>
						<Text fontWeight={"bold"} fontSize={"lg"}>
							{dict.release.availableNow}
						</Text>
						<Link href={service.storeURL}>
							<Image
								src={AppStoreBadge.src}
								height={"60px"}
								objectFit={"contain"}
								w={"fit-content"}
							/>
						</Link>
					</HStack>
				);
			}
			return (
				<Text fontWeight={"bold"} fontSize={"lg"}>
					{dict.release.availableNow}
				</Text>
			);
		}
		return (
			<Text fontWeight={"bold"} fontSize={"lg"}>
				{dict.release.comingSoon}
			</Text>
		);
	};

	return (
		<>
			<div className={"blurryGradient"} />
			<Provider>
				<Wrapper wide>
					<TopSection title={"Projects"}>
						{services.map((service) => (
							<Card.Root
								key={service.appName}
								width="100%"
								size={"lg"}
								rounded={"4xl"}
								variant={"outline"}
								onClick={() =>
									router.push(
										`/${lang}/services/${service.appName.replaceAll(" ", "").toLowerCase()}`,
									)
								}
								cursor={"pointer"}
							>
								<Card.Body>
									<HStack gap={5}>
										<Image
											src={service.iconSrc}
											width={130}
											style={{
												height: "auto",
												objectFit: "contain",
												borderRadius: 25,
											}}
										/>
										<VStack w={"100%"} alignItems={"start"} gap={2}>
											<Heading size={"3xl"}>{service.appName}</Heading>
											<Text fontSize={"lg"}>
												{lang === "ja" ? service.heroJa : service.heroEn}
											</Text>
											<VStack w={"100%"} alignItems={"end"}>
												{makeButton(service)}
											</VStack>
										</VStack>
									</HStack>
								</Card.Body>
							</Card.Root>
						))}
					</TopSection>
				</Wrapper>
			</Provider>
		</>
	);
};

export default ProjectsContent;
