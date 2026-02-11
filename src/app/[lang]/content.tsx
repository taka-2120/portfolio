"use client";

import {
	Box,
	Flex,
	HStack,
	Image,
	Link,
	Text,
	VStack,
	Wrap,
} from "@chakra-ui/react";
import { Fragment } from "react";
import TopSection from "@/components/custom/top-section";
import Wrapper from "@/components/custom/wrapper";
import { experiences } from "@/constants/experiences";
import { links } from "@/constants/links";
import { services } from "@/constants/services";
import AppStoreBadge from "@/images/app-store.png";
import type { Dict } from "@/types/dict";

const skills = [
	"Swift",
	"SwiftUI",
	"UIKit",
	"Flutter",
	"HTML/CSS",
	"Next.js",
	"React",
	"TypeScript",
	"JavaScript",
	"WordPress",
	"Python",
	"Ruby",
	"C",
	"C#",
	"Google Cloud Platform",
	"Firebase",
	"Supabase",
];

const HomeContent = ({ lang, dict }: { lang: string; dict: Dict }) => {
	const featuredApp = services[0];

	const monthsEn = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const formatDate = (date: Date) => {
		const y = date.getFullYear();
		const m = date.getMonth();
		return lang === "ja" ? `${y}年${m + 1}月` : `${monthsEn[m]} ${y}`;
	};

	const recentExperiences = [...experiences].reverse().slice(0, 3);

	const bioItems = [
		{
			label: lang === "ja" ? "学歴" : "Education",
			value: dict.hero.education,
			detail: dict.hero.educationDetail,
		},
		{ label: lang === "ja" ? "関心" : "Focus", value: dict.hero.focus },
	];

	const HeroSection = () => (
		<VStack alignItems={"start"} gap={3} mb={"100px"} pt={"48px"}>
			<Text
				fontSize={"2.5rem"}
				fontWeight={"700"}
				letterSpacing={"-0.02em"}
				lineHeight={"1.2"}
			>
				Yu Takahashi
			</Text>
			<Text fontSize={"1em"} color={"gray.500"} fontWeight={"500"}>
				{dict.hero.subtitle}
			</Text>
			<Box
				display={"grid"}
				gridTemplateColumns={"auto 1fr"}
				columnGap={5}
				rowGap={3}
				mt={4}
				alignItems={"baseline"}
			>
				{bioItems.map((item) => (
					<Fragment key={item.label}>
						<Text
							fontSize={"0.75em"}
							fontWeight={"600"}
							textTransform={"uppercase"}
							letterSpacing={"0.05em"}
							color={"gray.400"}
							whiteSpace={"nowrap"}
						>
							{item.label}
						</Text>
						<VStack alignItems={"start"} gap={0}>
							<Text fontSize={"1em"} fontWeight={"500"}>
								{item.value}
							</Text>
							{item.detail && (
								<Text fontSize={"0.85em"} color={"gray.500"}>
									{item.detail}
								</Text>
							)}
						</VStack>
					</Fragment>
				))}
			</Box>
			<HStack gap={4} mt={4}>
				{links.map((link) => (
					<Link
						key={link.name}
						href={link.url}
						opacity={0.45}
						_hover={{ opacity: 1 }}
						transition={"opacity 0.2s"}
						aria-label={link.name}
						color={"inherit"}
					>
						{link.icon}
					</Link>
				))}
			</HStack>
		</VStack>
	);

	const FeaturedAppSection = () => (
		<TopSection title={dict.home.featuredApp}>
			<Flex
				direction={{ base: "column", sm: "row" }}
				gap={5}
				w={"100%"}
				alignItems={"start"}
			>
				<Image
					src={featuredApp.iconSrc}
					w={"72px"}
					aspectRatio={1}
					borderRadius={"18%"}
					flexShrink={0}
				/>
				<VStack alignItems={"start"} gap={2} flex={1}>
					<Text fontSize={"1.25em"} fontWeight={"600"}>
						{featuredApp.appName}
					</Text>
					<Text
						fontSize={"1em"}
						color={"gray.500"}
						_dark={{ color: "gray.400" }}
						lineHeight={"1.88"}
					>
						{lang === "ja"
							? featuredApp.descriptionJa
							: featuredApp.descriptionEn}
					</Text>
					{featuredApp.techStack && (
						<HStack gap={1.5} flexWrap={"wrap"}>
							{featuredApp.techStack.map((tech, i) => (
								<Text key={tech} fontSize={"0.85em"} color={"gray.400"}>
									{tech}
									{i < (featuredApp.techStack?.length ?? 0) - 1 && " ·"}
								</Text>
							))}
						</HStack>
					)}
					{featuredApp.storeURL && (
						<Link href={featuredApp.storeURL} mt={1}>
							<Image
								src={AppStoreBadge.src}
								height={"36px"}
								objectFit={"contain"}
							/>
						</Link>
					)}
				</VStack>
			</Flex>
			<Link
				href={`/${lang}/services`}
				fontSize={"1em"}
				color={"gray.500"}
				_hover={{ color: "gray.300" }}
				mt={3}
			>
				{dict.home.viewAllProjects} →
			</Link>
		</TopSection>
	);

	const ExperienceSection = () => (
		<TopSection title={dict.home.experience}>
			<VStack alignItems={"start"} gap={5} w={"100%"}>
				{recentExperiences.map((exp) => (
					<Box
						key={`${lang === "ja" ? exp.nameJa : exp.nameEn}-${exp.start.getTime()}`}
						w={"100%"}
					>
						<Flex
							justify={"space-between"}
							align={"baseline"}
							w={"100%"}
							mb={0.5}
							gap={3}
						>
							<Text fontWeight={"600"} fontSize={"1em"}>
								{lang === "ja" ? exp.nameJa : exp.nameEn}
							</Text>
							<Text
								fontSize={"0.85em"}
								color={"gray.500"}
								flexShrink={0}
								whiteSpace={"nowrap"}
							>
								{formatDate(exp.start)} –{" "}
								{exp.end ? formatDate(exp.end) : dict.home.present}
							</Text>
						</Flex>
						<Text fontSize={"0.85em"} color={"gray.500"}>
							{lang === "ja" ? exp.roleJa : exp.roleEn}
						</Text>
					</Box>
				))}
			</VStack>
			<Link
				href={`/${lang}/experiences`}
				fontSize={"1em"}
				color={"gray.500"}
				_hover={{ color: "gray.300" }}
				mt={3}
			>
				{dict.home.viewAllExperiences} →
			</Link>
		</TopSection>
	);

	const SkillsSection = () => (
		<TopSection title={dict.home.skills}>
			<Wrap gap={2}>
				{skills.map((skill) => (
					<Box
						key={skill}
						px={"10px"}
						py={"4px"}
						borderRadius={"full"}
						border={"1px solid"}
						borderColor={"gray.200"}
						_dark={{ borderColor: "gray.700", color: "gray.400" }}
						fontSize={"0.85em"}
						color={"gray.500"}
					>
						{skill}
					</Box>
				))}
			</Wrap>
		</TopSection>
	);

	return (
		<Wrapper>
			<HeroSection />
			<FeaturedAppSection />
			<ExperienceSection />
			<SkillsSection />
		</Wrapper>
	);
};

export default HomeContent;
