"use client";

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
	Circle,
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
import { links } from "@/constants/links";

const HomeContent = ({ lang, dict }: { lang: string; dict: Dict }) => {
	const isMobile = useBreakpointValue({ base: true, sm: false });

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
				return isMobile ? (
					<VStack
						gap={isMobile ? "20px" : "50px"}
						backgroundColor={"bg.panel"}
						p={8}
						borderRadius={25}
						style={{
							boxShadow: `0 0 30px ${services[0].color}`,
						}}
					>
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
					</VStack>
				) : (
					<HStack
						gapX={50}
						backgroundColor={"bg.panel"}
						p={8}
						borderRadius={25}
						style={{
							boxShadow: `0 0 30px ${services[0].color}`,
						}}
					>
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

	const FeaturedAppSection = () => (
		<TopSection title={dict.home.featuredApp}>
			<Image
				src={services[0].iconSrc}
				w={300}
				aspectRatio={1}
				borderRadius={60}
				m={10}
				style={{
					boxShadow: `0 5px 60px ${services[0].color}`,
				}}
			/>

			<VStack alignItems={"center"}>
				<Heading size={"3xl"}>{services[0].appName}</Heading>
				<Heading>
					{lang === "ja" ? services[0].heroJa : services[0].heroEn}
				</Heading>
				<Spacer minH={15} />
				{makeButton(services[0])}
			</VStack>

			<VStack w={"100%"} mt={10}>
				<Heading>
					{services.length - 1} {dict.home.moreProjects}
				</Heading>
				<Button asChild>
					<Link href={`${lang}/services`}>{dict.home.seeMore}</Link>
				</Button>
			</VStack>
		</TopSection>
	);

	const AboutMeSection = () => (
		<TopSection title={dict.home.aboutMe}>
			<HStack w={"100%"} gap={10}>
				<Image src={PortraitIcon.src} height={180} aspectRatio={1} />
				<VStack alignItems={"start"}>
					<Heading size={"3xl"}>Yu Takahashi</Heading>
					<Text>
						{age()} {dict.home.age}・{dict.home.gender}
					</Text>
				</VStack>
			</HStack>

			<Card.Root width="100%" size={"lg"} rounded={"3xl"} variant={"outline"}>
				<Card.Body>
					<Card.Title mb={4} fontSize={"2xl"}>
						{dict.home.affiliation}
					</Card.Title>

					<List.Root>
						<List.Item fontWeight={"bold"}>{dict.home.university}</List.Item>
						<List.Root pl={15}>
							<List.Item>{dict.home.school}</List.Item>
							<List.Item>{dict.home.department}</List.Item>
							<List.Item color={"gray"}>{dict.home.grade}</List.Item>
						</List.Root>
						<List.Item>
							{dict.home.techuniPosition}{" "}
							<Link
								href="https://techuni.org/"
								variant={"underline"}
								color={"blue.500"}
							>
								Tech.Uni
							</Link>
						</List.Item>
					</List.Root>
				</Card.Body>

				<Card.Footer justifyContent="flex-end">
					<Button asChild>
						<Link href={`${lang}/experiences`}>{dict.home.myExperiences}</Link>
					</Button>
				</Card.Footer>
			</Card.Root>
		</TopSection>
	);

	const SkillsSection = () => (
		<TopSection title={dict.home.skills}>
			<Grid
				templateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]}
				gap={4}
			>
				{skillImages.map((skill) => (
					<GridItem key={skill} gap={4} my={8}>
						<Center>
							<Image
								src={skill}
								width={100}
								height={100}
								style={{
									height: "auto",
									objectFit: "contain",
									borderRadius: skill.includes("nextjs") ? 100 : 20,
									margin: 10,
									backgroundColor: skill.includes("nextjs")
										? "white"
										: "transparent",
								}}
							/>
						</Center>
					</GridItem>
				))}
			</Grid>
		</TopSection>
	);

	const LinkSection = () => (
		<TopSection title={dict.home.links}>
			<VStack align={"start"} gap={4}>
				{links.map((link) => (
					<Link key={link.name} href={link.url}>
						<HStack key={link.name} gap={4}>
							<Circle
								background={"WindowText"}
								width={"64px"}
								height={"64px"}
								padding={"10px"}
								color={link.color ?? "Background"}
							>
								{link.icon}
							</Circle>
							<Text>{link.name}</Text>
						</HStack>
					</Link>
				))}
			</VStack>
		</TopSection>
	);

	return (
		<>
			<div className={"blurryGradient"} />
			<Wrapper>
				{FeaturedAppSection()}
				{AboutMeSection()}
				{LinkSection()}
				{SkillsSection()}
			</Wrapper>
		</>
	);
};

export default HomeContent;
