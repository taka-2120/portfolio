"use client";
import { Card, HStack, Image, Link, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import TopSection from "@/components/custom/top-section";
import Wrapper from "@/components/custom/wrapper";
import { services } from "@/constants/services";
import type Service from "@/entities/service";
import AppStoreBadge from "@/images/app-store.png";
import type { Dict } from "@/types/dict";

const ProjectsContent = ({ lang, dict }: { lang: string; dict: Dict }) => {
	const router = useRouter();

	const makeButton = (service: Service) => {
		if (service.releaseDate) {
			if (service.releaseDate > new Date()) {
				return (
					<Text fontSize={"0.85em"} color={"gray.500"}>
						{dict.release.waitUntil} {service.releaseDate.toLocaleDateString()}
					</Text>
				);
			}
			if (service.storeURL) {
				return (
					<Link href={service.storeURL} w={"fit-content"}>
						<Image
							src={AppStoreBadge.src}
							height={"36px"}
							objectFit={"contain"}
						/>
					</Link>
				);
			}
			return (
				<Text fontSize={"0.85em"} color={"gray.500"}>
					{dict.release.availableNow}
				</Text>
			);
		}
		return (
			<Text fontSize={"0.85em"} color={"gray.500"}>
				{dict.release.comingSoon}
			</Text>
		);
	};

	return (
		<Wrapper>
			<TopSection title={dict.projects.title} gap={5}>
				{services.map((service) => (
					<Card.Root
						key={service.appName}
						width="100%"
						rounded={"xl"}
						variant={"outline"}
						borderColor={"gray.200"}
						_dark={{ borderColor: "gray.800" }}
						onClick={() =>
							router.push(
								`/${lang}/services/${service.appName.replaceAll(" ", "-").toLowerCase()}`,
							)
						}
						cursor={"pointer"}
						_hover={{
							borderColor: "gray.400",
							_dark: { borderColor: "gray.600" },
						}}
						transition={"border-color 0.2s"}
					>
						<Card.Body p={4}>
							<HStack w={"100%"} gap={4} align={"start"}>
								<Image
									src={service.iconSrc}
									aspectRatio={1}
									width={"60px"}
									objectFit={"contain"}
									borderRadius={"18%"}
									flexShrink={0}
								/>
								<VStack w={"100%"} gap={1.5} alignItems={"start"}>
									<Text fontSize={"1.15em"} fontWeight={"600"}>
										{service.appName}
									</Text>
									<Text
										fontSize={"1em"}
										color={"gray.500"}
										_dark={{ color: "gray.400" }}
									>
										{lang === "ja" ? service.heroJa : service.heroEn}
									</Text>
									{service.techStack && (
										<HStack gap={1.5} flexWrap={"wrap"}>
											{service.techStack.map((tech, i) => (
												<Text key={tech} fontSize={"0.85em"} color={"gray.400"}>
													{tech}
													{i < (service.techStack?.length ?? 0) - 1 && " ·"}
												</Text>
											))}
										</HStack>
									)}
									<HStack w={"100%"} justify={"end"} mt={1}>
										{makeButton(service)}
									</HStack>
								</VStack>
							</HStack>
						</Card.Body>
					</Card.Root>
				))}
			</TopSection>
		</Wrapper>
	);
};

export default ProjectsContent;
