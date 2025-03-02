"use client";

import { Provider } from "@/components/chakra/provider";
import TopSection from "@/components/custom/top-section";
import { services } from "@/constants/services";
import AppStoreBadge from "@/images/app-store.png";
import {
	Card,
	HStack,
	Heading,
	Image,
	Link,
	Text,
	VStack,
	useBreakpointValue,
} from "@chakra-ui/react";
import "@/components/styles/gradient.css";
import Wrapper from "@/components/custom/wrapper";
import type Service from "@/entities/service";
import { useRouter } from "next/navigation";

const ProjectsContent = ({ lang, dict }: { lang: string; dict: Dict }) => {
	const router = useRouter();
	const isMobile = useBreakpointValue({ base: true, md: false });

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
						{!isMobile && (
							<Text fontWeight={"bold"} fontSize={"lg"}>
								{dict.release.availableNow}
							</Text>
						)}
						<Link href={service.storeURL}>
							<Image
								src={AppStoreBadge.src}
								height={isMobile? "50px": "60px"}
								objectFit={"contain"}
								w={"fit-content"}
								m={"10px"}
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
				<Wrapper wide>
					<TopSection title={dict.projects.title}>
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
									<HStack gap={5} align={"start"}>
										<Image
											src={service.iconSrc}
											width={"25%"}
											maxW={140}
											style={{
												height: "auto",
												objectFit: "contain",
												borderRadius: "20%",
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
		</>
	);
};

export default ProjectsContent;
