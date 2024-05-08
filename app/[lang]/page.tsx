'use client';

import Image from 'next/image';
import { Flex, Stack, Text, Divider, Title, Center, Grid, Card, Button, List } from '@mantine/core';
import { IconArrowUpRight, IconBrandGithub, IconBrandX } from '@tabler/icons-react';
import Link from 'next/link';
import { getSchoolYear } from '@/utils/getSchoolYear';
import Section from '@/components/Section';
import classes from './style.module.css';
import { ImageUrl, skillImages } from '@/constants/imageUrl';
import { getEnumKey } from '@/utils/getEnumKey';
import CareerCard from '@/components/CareerCard';
import { careers } from '@/constants/career';

enum SectionName {
  projects = 'Projects',
  profile = 'Profile',
  skills = 'Skills',
  affiliations = 'Affiliations',
  history = 'History',
}

const TopContent = ({ params }: { params: { lang: string } }) => (
  <>
    <div className={classes.blurryGradient} />

    <Flex w="100%" justify="flex-end" pos="fixed" p={10}>
      {Object.values(SectionName).map((section, index) => (
        <Button
          className={classes.headerItem}
          key={index}
          component={Link}
          href={`#${section}`}
          variant="transparent"
          size="sm"
          c="gray"
        >
          {section}
        </Button>
      ))}
    </Flex>

    <Stack mt={15} px={15} pt={50} maw={1200} w="100%">
      <Section title={SectionName.projects}>
        <Card
          p={20}
          my={15}
          w="100%"
          style={{ borderRadius: '40px', backgroundColor: 'rgba(230, 230, 230, 0.2)' }}
          shadow="lg"
        >
          <Title order={2}>Word Venture</Title>
          <Flex w="100%" justify="space-between">
            <Image
              src={ImageUrl.wordventure}
              alt="Word Venture"
              width={200}
              height={200}
              style={{ borderRadius: 40, margin: 10 }}
            />

            <Stack w="100%" align="end" justify="space-between">
              <Text w="100%" ta="center" p={10}>
                Word Venture is AI integrated word book app!
              </Text>
              <Button component={Link} href="/wordventure" variant="transparent" size="sm" color="gray">
                <Flex align="center">
                  <Text w="100%" ta="center" p={5}>
                    Learn more!
                  </Text>
                  <IconArrowUpRight />
                </Flex>
              </Button>
            </Stack>
          </Flex>
        </Card>
      </Section>

      <Divider />

      <Section title={SectionName.profile}>
        <Flex align="center">
          <Image
            src={ImageUrl.portrait}
            alt="Portrait"
            width={200}
            height={200}
            style={{ borderRadius: 40, margin: 15 }}
          />
          <Stack gap={8}>
            <Title order={1}>Yu Takahashi</Title>
            <Text color="gray">he/him</Text>
          </Stack>
        </Flex>
        <Text ta="start">
          <span style={{ fontWeight: 'bold' }}>Kwansei Gakuin University</span> (Japan)
          <br />
          <span style={{ paddingLeft: '20px' }}>School of Engineering</span>
          <br />
          <span style={{ paddingLeft: '20px' }}>Department of Information Engineering</span>
          <br />
          <span style={{ paddingLeft: '20px', color: 'gray' }}>{getSchoolYear()} year</span>
        </Text>
        <Flex justify="flex-end" w="100%">
          <Button
            component={Link}
            href="https://github.com/taka-2120"
            style={{ color: 'black' }}
            variant="transparent"
            size="sm"
          >
            <IconBrandGithub />
          </Button>
          <Button
            component={Link}
            href="https://twitter.com/yutk_941"
            style={{ color: 'black' }}
            variant="transparent"
            size="sm"
          >
            <IconBrandX />
          </Button>
        </Flex>
      </Section>

      <Divider />

      <Section title={SectionName.skills}>
        <Grid mb={50} gutter={{ base: 5, xs: 4, md: 2, lg: 2, xl: 2 }}>
          {skillImages.map((skill, index) => (
            <Grid.Col key={skill + index} span={4} my={8}>
              <Center>
                <Image
                  src={skill}
                  alt={getEnumKey(ImageUrl, skill)}
                  width={100}
                  height={100}
                  style={{ height: 'auto', objectFit: 'contain', borderRadius: 20, margin: 10 }}
                />
              </Center>
            </Grid.Col>
          ))}
        </Grid>
      </Section>

      <Divider />

      <Section title={SectionName.affiliations}>
        <List listStyleType="disc">
          <List.Item ta="start">Tech.Uni (Representative)</List.Item>
          <List.Item ta="start">Re-era, inc. (Software Engineer - Internship)</List.Item>
        </List>
      </Section>

      <Divider />

      <Section title={SectionName.history}>
        {careers.map((career, index) => (
          <CareerCard key={index} career={career} locale={params.lang} />
        ))}
      </Section>
    </Stack>
  </>
);

export default TopContent;
