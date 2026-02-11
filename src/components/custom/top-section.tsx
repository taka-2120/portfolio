import { Text, VStack } from "@chakra-ui/react";

interface Props {
	title: string;
	gap?: number;
	children: React.ReactNode;
}

const TopSection = ({ title, gap = 5, children }: Props) => (
	<VStack gap={gap} w={"100%"} mb={"120px"} alignItems={"start"}>
		<Text
			fontSize={"1em"}
			fontWeight={"600"}
			textTransform={"uppercase"}
			letterSpacing={"0.1em"}
			color={"gray.500"}
			mb={1}
		>
			{title}
		</Text>
		{children}
	</VStack>
);

export default TopSection;
