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
import EcoNotifyIcon from "@/images/eco-notify.png";
import AppStoreBadge from "@/images/app-store.png";
import PortraitIcon from "@/images/portrait.png";
import { skillImages } from "@/constants/image-urls";
import { footer } from "@/components/footer";
import { useRouter } from "next/navigation";

export const Home = () => {
	const router = useRouter();
	const getAge = (): number => {
		const birthday = new Date("2003-06-05");
		const today = new Date();
		const timeDiff = today.getTime() - birthday.getTime();
		return Math.floor(timeDiff / 1000 / 60 / 60 / 24 / 365);
	};

	const FeaturedAppSection = () => (
		<VStack>
			<HStack justifyContent={'space-between'}>
				<Heading fontSize={32}>Featured App</Heading>
				<Link href="/services" textDecoration={'solid'}>More services...</Link>
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
						src={EcoNotifyIcon.src}
						w={200}
						aspectRatio={1}
						borderRadius={40}
					/>
					<VStack alignItems={"center"}>
						<Heading fontSize={42}>Eco Notify</Heading>
						<Text fontSize={18}>Now Available!</Text>
						<Link href="#">
							<Image
								src={AppStoreBadge.src}
								height={60}
								objectFit={"contain"}
								w={"fit-content"}
							/>
						</Link>
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
					<ListItem>President of IT Students Group Tech.Uni</ListItem>
				</DiscList>
			</HStack>
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

	const ExperiencesSection = () => { };

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
