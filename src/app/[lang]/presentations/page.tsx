import { Card, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Provider } from "@/components/chakra/provider";
import Wrapper from "@/components/custom/wrapper";
import type { AsyncLangParam } from "@/types/lang-param";
import { getAllPresentations } from "@/utils/presentations";
import { getSpeakerDeckEmbed } from "@/utils/speakerdeck";
import { getDictionary } from "../dictionaries";

export const revalidate = 3600;

export async function generateMetadata({
	params,
}: AsyncLangParam): Promise<Metadata> {
	const { lang } = await params;
	const dict = await getDictionary(lang);
	const isJa = lang === "ja";
	const description = isJa
		? "これまでに登壇したカンファレンス・勉強会の発表資料と感想をまとめています。"
		: "Slides and reflections from the conferences and meetups I've spoken at.";
	return {
		title: dict.presentations.title,
		description,
		openGraph: {
			title: dict.presentations.title,
			description,
			url: `/${lang}/presentations`,
		},
	};
}

const PresentationsList = async ({ params }: AsyncLangParam) => {
	const { lang } = await params;
	const dict = await getDictionary(lang);
	const presentations = await getAllPresentations(lang);

	const cards = await Promise.all(
		presentations.map(async (presentation) => ({
			presentation,
			embed: await getSpeakerDeckEmbed(presentation.speakerDeckUrl),
		})),
	);

	return (
		<Provider>
			<Wrapper wide>
				<Text
					fontSize={"2rem"}
					fontWeight={700}
					letterSpacing={"-0.02em"}
					mb={10}
				>
					{dict.presentations.title}
				</Text>

				{cards.length === 0 ? (
					<Text opacity={0.5}>{dict.presentations.noPosts}</Text>
				) : (
					<SimpleGrid columns={{ base: 1, sm: 2 }} gap={5}>
						{cards.map(({ presentation, embed }) => (
							<Link
								key={presentation.slug}
								href={`/${lang}/presentations/${presentation.slug}`}
								style={{ textDecoration: "none", color: "inherit" }}
							>
								<Card.Root
									height="100%"
									rounded={"xl"}
									variant={"outline"}
									borderColor={"gray.200"}
									_dark={{ borderColor: "gray.800" }}
									overflow={"hidden"}
									cursor={"pointer"}
									_hover={{
										borderColor: "gray.400",
										_dark: { borderColor: "gray.600" },
									}}
									transition={"border-color 0.2s"}
								>
									<div
										style={{
											position: "relative",
											width: "100%",
											aspectRatio: "16/9",
											background: "rgba(128,128,128,0.08)",
										}}
									>
										{embed?.thumbnailUrl && (
											<Image
												src={embed.thumbnailUrl}
												alt={presentation.title}
												fill
												style={{ objectFit: "cover" }}
											/>
										)}
									</div>
									<Card.Body p={4}>
										<VStack gap={1.5} alignItems={"start"}>
											<Text
												fontSize={"0.8em"}
												color={"gray.500"}
												_dark={{ color: "gray.400" }}
											>
												{presentation.conferenceName}
												{presentation.date ? ` · ${presentation.date}` : ""}
											</Text>
											<Text fontSize={"1.1em"} fontWeight={"600"}>
												{presentation.title}
											</Text>
											{presentation.description && (
												<Text
													fontSize={"0.9em"}
													color={"gray.500"}
													_dark={{ color: "gray.400" }}
												>
													{presentation.description}
												</Text>
											)}
										</VStack>
									</Card.Body>
								</Card.Root>
							</Link>
						))}
					</SimpleGrid>
				)}
			</Wrapper>
		</Provider>
	);
};

export default PresentationsList;
