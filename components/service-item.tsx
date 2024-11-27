import { Heading, HStack, Image, Link, Text, VStack } from "@yamada-ui/react";
import AppStoreBadge from "@/images/app-store.png";
import type Service from "@/entities/service";

interface Props {
	service: Service;
}

export const ServiceItem = ({ service }: Props) => {
	const appId = service.appName.toLowerCase().replaceAll(" ", "-");

	const makeButton = () => {
		if (service.releaseDate) {
			if (service.releaseDate > new Date()) {
				return (
					<Text fontWeight={"bold"}>
						Wait until {service.releaseDate.toLocaleDateString()}!
					</Text>
				);
			}
			if (service.storeURL) {
				return (
					<HStack gapX={50}>
						<Text fontWeight={"bold"}>Available Now!</Text>
						<Link href={service.storeURL}>
							<Image
								src={AppStoreBadge.src}
								height={60}
								objectFit={"contain"}
								w={"fit-content"}
							/>
						</Link>
					</HStack>
				);
			}
			return <Text fontWeight={"bold"}>Available Now!</Text>;
		}
		return <Text fontWeight={"bold"}>Coming Soon...</Text>;
	};

	return (
		<HStack
			id={appId}
			background={"rgba(230, 230, 230, 0.5)"}
			p={15}
			borderRadius={50}
			borderWidth={2}
		>
			<Image src={service.iconSrc} w={200} aspectRatio={1} borderRadius={40} />

			<VStack
				h={"100%"}
				justifyContent={"space-between"}
				alignItems={"center"}
				my={10}
			>
				<VStack w={"100%"} alignItems={"left"}>
					<HStack w={"100%"} justifyContent={"space-between"}>
						<Heading fontSize={42}>{service.appName}</Heading>

						{service.isPrivacyPolicyNotPrepared !== true && (
							<Link me={40} href={`/${appId}/privacy-policy/ja`}>
								Privacy Policy
							</Link>
						)}
					</HStack>
					<Text fontSize={18}>{service.description}</Text>
				</VStack>
				<VStack w={"100%"} p={10} mt={5} alignItems={"end"}>
					{makeButton()}
				</VStack>
			</VStack>
		</HStack>
	);
};
