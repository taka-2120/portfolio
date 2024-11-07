import {
	Button,
	Center,
	DiscList,
	Grid,
	GridItem,
	Heading,
	HStack,
	Image,
	Link,
	List,
	ListItem,
	Text,
	VStack,
} from "@yamada-ui/react";
import AppStoreBadge from "@/images/app-store.png";
import PortraitIcon from "@/images/portrait.png";
import { skillImages } from "@/constants/image-urls";
import { footer } from "@/components/footer";
import { useRouter } from "next/navigation";
import { services } from "@/constants/services";
import type Service from "@/entities/service";

export const Home = () => {
	const router = useRouter();
	const getAge = (): number => {
		const birthday = new Date("2003-06-05");
		const today = new Date();
		const timeDiff = today.getTime() - birthday.getTime();
		return Math.floor(timeDiff / 1000 / 60 / 60 / 24 / 365);
	};

	const makeButton = (service: Service) => {
		if (service.releaseDate) {
			return (
				<Text fontWeight={"bold"}>
					Wait until {service.releaseDate.toLocaleDateString()}!
				</Text>
			);
		}
		if (service.storeURL) {
			return (
				<Link href={service.storeURL}>
					<Image
						src={AppStoreBadge.src}
						height={60}
						objectFit={"contain"}
						w={"fit-content"}
					/>
				</Link>
			);
		}
		return <Text fontWeight={"bold"}>Coming Soon...</Text>;
	};

	const FeaturedAppSection = () => (
		<VStack>
			<HStack justifyContent={"space-between"}>
				<Heading fontSize={32}>Featured App</Heading>
				<Link href="/services" textDecoration={"solid"}>
					{"More services >>"}
				</Link>
			</HStack>
			<Button
				variant={"unstyled"}
				borderRadius={50}
				backgroundColor={"transparent"}
				onClick={() => router.push("/services")}
			>
				<HStack
					w={"100%"}
					p={15}
					backgroundColor={"rgba(230, 230, 230, 0.2)"}
					borderRadius={50}
					borderWidth={2}
				>
					<Image
						src={services[0].iconSrc}
						w={200}
						aspectRatio={1}
						borderRadius={40}
					/>
					<VStack alignItems={"center"}>
						<Heading fontSize={42}>{services[0].appName}</Heading>
						<Text fontSize={18}>{services[0].hero}</Text>
						{makeButton(services[0])}
					</VStack>
				</HStack>
			</Button>
		</VStack>
	);

	const AboutMeSection = () => (
		<VStack>
			<Heading fontSize={32}>About Me</Heading>
			<HStack>
				<Image src={PortraitIcon.src} height={180} aspectRatio={1} />
				<VStack>
					<Heading fontSize={42}>Yu Takahashi</Heading>
					<Text>{getAge()} years old・he/him</Text>
				</VStack>
			</HStack>
			<HStack>
				<DiscList>
					<ListItem fontWeight={"bold"}>
						Kwansei Gakuin University (Japan)
					</ListItem>
					<List pl={15}>
						<ListItem>School of Engineering</ListItem>
						<ListItem>Department of Information Engineering</ListItem>
						<ListItem color={"gray"}>3rd year</ListItem>
					</List>
					<ListItem>Former President of IT Students Group Tech.Uni</ListItem>
				</DiscList>
			</HStack>

			<Link
				href="/experiences"
				textAlign={"end"}
				color={"blue.500"}
				textDecoration={"solid"}
			>
				{"See my experiences >>"}
			</Link>
		</VStack>
	);

	const SkillsSection = () => (
		<VStack>
			<Heading fontSize={32}>Skills</Heading>
			<Grid mb={50} templateColumns="repeat(4, 1fr)">
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
									borderRadius: 20,
									margin: 10,
								}}
							/>
						</Center>
					</GridItem>
				))}
			</Grid>
		</VStack>
	);

	return (
		<>
			<div className={"blurryGradient"} />

			<VStack padding={15} maxW={1000} margin={"0 auto"} gapY={80}>
				{FeaturedAppSection()}
				{AboutMeSection()}
				{SkillsSection()}
			</VStack>

			{footer}
		</>
	);
};

export default Home;
