/* eslint-disable import/no-extraneous-dependencies */

import {
  createStyles,
  Flex,
  Stack,
  Text,
  Divider,
  Image,
  Title,
  UnstyledButton,
  Center,
  Grid,
  Card,
  Button
} from '@mantine/core';
import { IconArrowUpRight, IconBrandGithub, IconBrandTwitter } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import Timeline from 'antd/es/timeline';
import { useState, useEffect } from 'react';
import { ProjectCard } from './components/ProjectCard';
import portrait from './assets/portrait.png';
import swift from './assets/skills/swift.png';
import flutter from './assets/skills/flutter.png';
import react from './assets/skills/react.png';
import ts from './assets/skills/typescript.png';
import js from './assets/skills/javascript.png';
import node from './assets/skills/node.png';
import python from './assets/skills/python.png';
import clang from './assets/skills/clang.png';
import firebase from './assets/skills/firebase.png';
import supabase from './assets/skills/supabase.png';
import bot from './assets/projects/bot.jpg';
import subsmanager from './assets/projects/subsmanager.jpg';

const useStyles = createStyles((_) => ({
  blurryGradient: {
    position: 'fixed',
    aspectRatio: '0.5',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    width: '50%',
    maxWidth: '500px',
    borderRadius: '50% 22% 40% 80%',
    filter: 'blur(50px)',
    background: 'radial-gradient(circle at 50% 50%,rgba(76, 0, 255, 1), rgba(76, 0, 255, 0))',
    opacity: 0.2,
    marginTop: '-10%'
  }
}));

const Top = () => {
  const { classes } = useStyles();
  // const opacity = useSpringValue(0, { to: 1, delay: 1000, config: { duration: 1000 } });
  const skills = [swift, flutter, react, ts, js, node, python, clang, firebase, supabase];

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 900;

  useEffect(() => {
    /* Inside of a "useEffect" hook add an event listener that updates
       the "width" state variable when the window size changes */
    window.addEventListener('resize', () => setWidth(window.innerWidth));

    /* passing an empty array as the dependencies of the effect will cause this
       effect to only run when the component mounts, and not each time it updates.
       We only want the listener to be added once */
  }, []);

  return (
    <>
      {/* <Flex justify="flex-end" align="start" w="98%" pos="fixed" mt={10} style={{ zIndex: 99 }}>
        <animated.div style={{ opacity }}>
          <Group
            bg="white"
            px={15}
            py={5}
            style={{ fontSize: 12, borderRadius: 100, boxShadow: '0px 2px 15px #D9D9D9' }}
          >
            <Button variant="white" color="blue" bg="transparent" px={5}>
              Projects
            </Button>
            <Button variant="white" color="blue" bg="transparent" px={5}>
              Intro
            </Button>
            <Button variant="white" color="blue" bg="transparent" px={5}>
              Skills
            </Button>
            <Button variant="white" color="blue" bg="transparent" px={5}>
              Belong
            </Button>
            <Button variant="white" color="blue" bg="transparent" px={5}>
              Experiences
            </Button>
          </Group>
        </animated.div>
      </Flex> */}

      <Center>
        <Stack pt={80} mx={10} maw="900px" w="100%">
          <>
            <div className={classes.blurryGradient} />
            {width < breakpoint ? (
              <Stack>
                <Card w="100%" bg="transparent" h={300}>
                  <Stack w="100%" h="100%" justify="space-between">
                    <Title order={2}>Wordbook</Title>
                    <Flex w="100%" align="flex-end">
                      <Button variant="outlined">
                        <IconArrowUpRight color="black" />
                      </Button>
                    </Flex>
                  </Stack>
                </Card>
                <Grid w="100%">
                  <ProjectCard title="Discord Bot" description="A discord bot for Tech.Uni" image={bot} />
                  <ProjectCard title="Subs Manager" description="Manage subscriptions smarter" image={subsmanager} />
                </Grid>
              </Stack>
            ) : (
              <Flex w="100%">
                <Card w="50%" bg="transparent" h={300}>
                  <Stack w="100%" h="100%" justify="space-between">
                    <Title order={2}>Wordbook</Title>
                    <Flex w="100%" justify="flex-end">
                      <Button component={Link} to="/wordventure" variant="outlined" size="sm">
                        <IconArrowUpRight color="gray" />
                      </Button>
                    </Flex>
                  </Stack>
                </Card>
                <Grid w="50%">
                  <ProjectCard title="Discord Bot" description="A discord bot for Tech.Uni" image={bot} />
                  <ProjectCard title="Subs Manager" description="Manage subscriptions smarter" image={subsmanager} />
                </Grid>
              </Flex>
            )}

            <Divider />

            <Stack mx={10}>
              <Flex align="center">
                <Image src={portrait} width={200} mr={15} />
                <Stack spacing={8}>
                  <Title order={1}>Yu Takahashi</Title>
                  <Text color="gray">he/him</Text>
                </Stack>
              </Flex>
              <Text>
                <span style={{ fontWeight: 'bold' }}>Kwansei Gakuin University</span> (Japan)
                <br />
                <span style={{ paddingLeft: '20px' }}>School of Engineering</span>
                <br />
                <span style={{ paddingLeft: '20px', color: 'gray' }}>2nd year</span>
              </Text>
              <Flex justify="flex-end">
                <UnstyledButton style={{ color: 'black' }} mx={10} component={Link} to="https://github.com/taka-2120">
                  <IconBrandGithub />
                </UnstyledButton>
                <UnstyledButton style={{ color: '#00acee' }} mx={10} component={Link} to="https://twitter.com/yutk_941">
                  <IconBrandTwitter />
                </UnstyledButton>
              </Flex>
            </Stack>

            <Divider />

            <Stack mx={10}>
              <Title order={2}>Skills</Title>
              <Grid mb={50}>
                {skills.map((skill) => (
                  <Grid.Col key={skill} xs={4} sm={3} md={2} lg={2} xl={2} span={4} my={8}>
                    <Center>
                      <Image src={skill} width={100} mr={15} radius={20} />
                    </Center>
                  </Grid.Col>
                ))}
              </Grid>
            </Stack>

            <Divider />

            <Stack mx={10} spacing={5}>
              <Title order={2} mb={5}>
                Belong to ...
              </Title>
              <Text>- Tech.Uni (Deputy Representative)</Text>
              <Text>- Crosshare.inc (Engineer)</Text>
              <Text mb={5}>- 23.inc (Engineer)</Text>
            </Stack>

            <Divider />

            <Stack mx={10} mb={80}>
              <Title order={2}>Experiences</Title>
              <Timeline
                style={{ fontFamily: 'monospace', width: 'fit-content' }}
                mode="left"
                items={[
                  {
                    label: '2022/09/01 ~ 2022/10/30',
                    children: 'Development of flutter apps for Android TV and mobile devices at Crosshare.inc'
                  },
                  {
                    label: '2022/10/01 ~ ',
                    children: 'Development of Discord Bot at Tech.Uni'
                  },
                  {
                    label: '2022/11/01 ~ ',
                    children: 'Development of SwiftUI app at a start-up team'
                  }
                ]}
              />
            </Stack>

            <Center py={20}>
              <Text>Copyright © 2023 Yu Takahashi</Text>
            </Center>
          </>
        </Stack>
      </Center>
    </>
  );
};

export default Top;
