"use client";
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
					<>
						{!isMobile && (
							<Text fontWeight={"bold"} fontSize={"lg"}>
								{dict.release.availableNow}
							</Text>
						)}
						<Link href={service.storeURL} w={"fit-content"}>
							<Image
								src={AppStoreBadge.src}
								height={isMobile ? "50px" : "60px"}
								objectFit={"contain"}
								m={"10px"}
							/>
						</Link>
					</>
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
				<TopSection title={dict.projects.title} gap={8}>
					{services.map((service) => (
						<Card.Root
							key={service.appName}
							width="100%"
							height={"fit-content"}
							size={"lg"}
							rounded={"4xl"}
							variant={"outline"}
							style={{
								boxShadow: `0px 0px 20px 0px ${service.color}40`,
							}}
							onClick={() =>
								router.push(
									`/${lang}/services/${service.appName.replaceAll(" ", "").toLowerCase()}`,
								)
							}
							cursor={"pointer"}
						>
							<Card.Body w={"100%"} h={"100%"} p={"15px"}>
								<HStack w={"100%"} gap={5} align={"start"}>
									<Image
										src={service.iconSrc}
										aspectRatio={1}
										width={"25%"}
										height={"auto"}
										maxW={140}
										objectFit={"contain"}
										borderRadius={"20%"}
									/>
									<VStack
										w={"100%"}
										h={"100%"}
										gap={2}
										alignItems={"start"}
										justifyContent={"space-between"}
									>
										<VStack align={"start"}>
											<Heading size={"2xl"} pt={"5px"}>
												{service.appName}
											</Heading>
											<Text fontSize={"lg"}>
												{lang === "ja" ? service.heroJa : service.heroEn}
											</Text>
										</VStack>

										<HStack gapX={30} w={"100%"} justify={"end"}>
											{makeButton(service)}
										</HStack>
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
