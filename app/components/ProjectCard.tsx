import { Center, Stack, Title, Card, Image, Text, Grid } from '@mantine/core';
import { StaticImageData } from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  image: StaticImageData;
}

export const ProjectCard = ({ title, description, image }: ProjectCardProps) => (
  <Grid.Col span={6} my={8}>
    <Center w="100%">
      <Card w="98%" bg="transparent" withBorder shadow="sm" radius="lg">
        <Stack align="center" justify="center" w="100%" spacing={5}>
          <Image src={image.src} width={80} mr={15} radius={20} />
          <Title order={5} weight="bold">
            {title}
          </Title>
          <Text color="gray" size="sm" lh="rem(0.6)">
            {description}
          </Text>
        </Stack>
      </Card>
    </Center>
  </Grid.Col>
);
