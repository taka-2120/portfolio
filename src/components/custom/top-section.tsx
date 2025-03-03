import { Heading, VStack } from "@chakra-ui/react";

interface Props {
	title: string;
	gap?: number;
	children: React.ReactNode;
}

const TopSection = ({ title, gap = 5, children }: Props) => (
	<VStack gap={gap} w={"100%"} mb={"160px"}>
		<Heading size={"4xl"}>{title}</Heading>
		{children}
	</VStack>
);

export default TopSection;
