import { Card, Flex, Stack, Title, Text, Divider, ScrollArea } from '@mantine/core';
import { FC } from 'react';
import { dateFormatter } from '@/utils/dateFormatter';
import { Career } from '@/constants/career';

interface Props {
  career: Career;
  locale: string;
}

const CareerCard: FC<Props> = ({ career, locale }) => (
  <Card
    p={20}
    mb={15}
    w="100%"
    style={{ borderRadius: '40px', backgroundColor: 'rgba(230, 230, 230, 0.2)' }}
    shadow="lg"
  >
    <Flex justify="center" align="start" w="100%" h="max-content">
      <Stack gap={1} w="39%">
        <Title order={2} my={5} c="#1063F5" fw="bold">
          {dateFormatter(career.startDate, locale)} -{' '}
          {career.endDate ? dateFormatter(career.endDate, locale) : 'Present'}
        </Title>
        <Title order={3} m={0}>
          {career.position}
        </Title>
        <Title order={4} c="grey">
          {career.company}
        </Title>
      </Stack>
      <Divider orientation="vertical" variant="dashed" />
      <Stack maw="60%" w="60%" px={20}>
        <Text w="100%" ta="start" mt={15}>
          {career.descriptions}
        </Text>
        <ScrollArea dir="horizontal" w="100%" my={8} style={{ borderRadius: 10 }} type="never">
          <Flex gap={10}>
            {career.stack.map((item, index) => (
              <Text key={index} py={3} px={10} style={{ borderRadius: 10 }} bg="#D1D1D1">
                {item}
              </Text>
            ))}
          </Flex>
        </ScrollArea>
      </Stack>
    </Flex>
  </Card>
);

export default CareerCard;
