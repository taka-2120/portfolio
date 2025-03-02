import { Heading, VStack } from "@chakra-ui/react";

interface Props {
	title: string;
	children: React.ReactNode;
}

const TopSection = ({ title, children }: Props) => (
	<VStack gap={5} w={"100%"} mb={"160px"}>
		<Heading size={"4xl"}>{title}</Heading>
		{children}
	</VStack>
);

export default TopSection;
