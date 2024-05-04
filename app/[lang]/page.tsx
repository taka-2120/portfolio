'use client';

import Image from 'next/image';
import { Flex, Stack, Text, Divider, Title, Card, Button, List } from '@mantine/core';
import { IconArrowUpRight, IconBrandGithub, IconBrandX } from '@tabler/icons-react';
import Timeline from 'antd/es/timeline';
import Link from 'next/link';
import { getSchoolYear } from '@/utils/getSchoolYear';
import Section from '@/components/Section';
import classes from './style.module.css';

const TopContent = () => (
  <Stack mt={15} mx={15} maw={1000} w="100%">
    <div className={classes.blurryGradient} />

    <Section title="Projects">
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
            // eslint-disable-next-line react/jsx-curly-brace-presence
            src={"/vercel.svg"}
            alt="Word Venture"
            // objectFit='fill'
            width={200}
            height={200}
            style={{ borderRadius: 40, margin: 10 }}
          />

          <Stack w="100%" align="end" justify="space-between">
            <Text w="100%" ta="center">
              Word Venture is AI integrated word book app!
            </Text>
            <Button component={Link} href="/wordventure" variant="transparent" size="sm">
              <IconArrowUpRight color="gray" />
            </Button>
          </Stack>
        </Flex>
      </Card>
    </Section>

    <Divider />

    <Section title="Profile">
      <Flex align="center">
        {/* <Image
          src={ImageUrl.portrait}
          alt="Portrait"
          width={200}
          height={200}
          style={{ borderRadius: 40, margin: 15 }}
        /> */}
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

    {/* <Section title="Skills">
      <Grid mb={50} gutter={{ base: 5, xs: 4, md: 2, lg: 2, xl: 2 }}>
        {skills.map((skill, index) => (
          <Grid.Col key={skill + index} span={4} my={8}>
            <Center>
              <Image
                src={skill}
                alt={getEnumKey(ImageUrl, skill)}
                width={100}
                height={100}
                style={{ borderRadius: 20, marginRight: 15 }}
              />
            </Center>
          </Grid.Col>
        ))}
      </Grid>
    </Section> */}

    <Divider />

    <Section title="Affiliations">
      <List listStyleType="disc">
        <List.Item style={{ textAlign: 'start' }}>Tech.Uni (Representative)</List.Item>
        <List.Item style={{ textAlign: 'start' }}>Re-era, inc. (Software Engineer)</List.Item>
      </List>
    </Section>

    <Divider />

    <Section title="History">
      <Timeline
        style={{ fontFamily: 'monospace', width: 'fit-content' }}
        mode="left"
        items={[
          {
            label: '2022/09/01 ~ 2022/10/30',
            children: 'Development of flutter apps for Android TV and mobile devices at Crosshare.inc',
          },
          {
            label: '2022/10/01 ~ 2023/08/31',
            children: 'Became the deputy representative at Tech.Uni\nDevelopment of the discord bot for Tech.Uni',
          },
          {
            label: '2022/11/01 ~ 2023/05/31',
            children: 'Development of SwiftUI app at a start-up team',
          },
          {
            label: '2023/08/01 ~ ',
            children: 'Joined Re-era.inc as an engineer',
          },
          {
            label: '2023/09/01 ~ ',
            children: 'Became the representative at Tech.Uni',
          },
        ]}
      />
    </Section>
  </Stack>
);

export default TopContent;
