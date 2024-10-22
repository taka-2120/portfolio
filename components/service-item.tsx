import { Heading, HStack, Image, Link, Text, VStack } from "@yamada-ui/react";
import AppStoreBadge from "@/images/app-store.png";

interface Props {
	iconSrc: string;
	appName: string;
	description: string;
	storeURL?: string | undefined;
}

export const ServiceItem = ({
	iconSrc,
	appName,
	description,
	storeURL = undefined,
}: Props) => {
	const appId = appName.toLowerCase().replaceAll(" ", "-");
	return (
		<HStack
			id={appId}
			background={"rgba(230, 230, 230, 0.5)"}
			p={15}
			borderRadius={50}
			borderWidth={2}
		>
			<Image src={iconSrc} w={200} aspectRatio={1} borderRadius={40} />

			<VStack h={"100%"} justifyContent={"space-between"} alignItems={"end"}>
				<VStack w={"100%"} alignItems={"center"}>
					<Heading fontSize={42}>{appName}</Heading>
					<Text fontSize={18}>{description}</Text>
				</VStack> 
				<HStack>
					{storeURL && (
						<Link href={storeURL}>
							<Image
								src={AppStoreBadge.src}
								height={60}
								objectFit={"contain"}
								w={"fit-content"}
							/>
						</Link>
					)}

					<Link href={`/${appId}/privacy-policy/ja`}>Privacy Policy</Link>
				</HStack>
			</VStack>
		</HStack>
	);
};
