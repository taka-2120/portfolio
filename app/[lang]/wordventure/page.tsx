'use client';

import { Button, Divider, List, Space, Stack, Text, Title, Transition } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import NavigationWrapper from '@/components/NavigationWrapper';

const WordVenture = () => {
  const [startCenterAnimation, setCenterAnimationState] = useState(false);
  const [startSideAnimation, setSideAnimationState] = useState(false);

  useEffect(() => {
    setCenterAnimationState(true);
  }, []);

  const leftImageAnimation = {
    in: { opacity: 1, filter: 'drop-shadow(2px 2px 15px #464646)', transform: 'rotateZ(-15deg) translateX(-150px)' },
    out: { opacity: 0, filter: '', transform: 'rotateZ(0) translateX(0px)' },
    common: { transformOrigin: 'bottom' },
    transitionProperty: 'transform, filter, opacity',
  };
  const centerImageAnimation = {
    in: { opacity: 1, filter: 'drop-shadow(2px 2px 15px #464646)', transform: 'scale(1)' },
    out: { opacity: 0, filter: '', transform: 'scale(0)' },
    common: { transformOrigin: 'center' },
    transitionProperty: 'transform,, filter opacity',
  };
  const rightImageAnimation = {
    in: { opacity: 1, filter: 'drop-shadow(2px 2px 15px #464646)', transform: 'rotateZ(15deg) translateX(150px)' },
    out: { opacity: 0, filter: '', transform: 'rotateZ(0) translateX(-0px)' },
    common: { transformOrigin: 'bottom' },
    transitionProperty: 'transform, filter, opacity',
  };

  return (
    <NavigationWrapper title="Word Venture" destination="/" destinationName="Home">
      <Stack style={{ height: 1000, width: '100%' }} justify="center" align="center">
        <Transition mounted={startSideAnimation} transition={leftImageAnimation} duration={2000} timingFunction="ease">
          {(transitionStyle) => (
            <Image
              src="/screenshots/wv_02.png"
              alt="Word Venture List"
              width={0}
              height={700}
              style={{
                objectFit: 'contain',
                width: 'auto',
                position: 'absolute',
                marginBottom: '70px',
                ...transitionStyle,
              }}
              unoptimized
            />
          )}
        </Transition>
        <Transition mounted={startSideAnimation} transition={rightImageAnimation} duration={2000} timingFunction="ease">
          {(transitionStyle) => (
            <Image
              src="/screenshots/wv_03.png"
              alt="Word Venture Card"
              width={0}
              height={700}
              style={{
                objectFit: 'contain',
                width: 'auto',
                position: 'absolute',
                marginBottom: '70px',
                ...transitionStyle,
              }}
              unoptimized
            />
          )}
        </Transition>
        <Transition
          mounted={startCenterAnimation}
          transition={centerImageAnimation}
          duration={2000}
          timingFunction="ease"
          onEntered={() => setSideAnimationState(true)}
        >
          {(transitionStyle) => (
            <Image
              src="/screenshots/wv_01.png"
              alt="Word Venture Top"
              width={0}
              height={800}
              style={{
                objectFit: 'contain',
                width: 'auto',
                position: 'absolute',
                ...transitionStyle,
              }}
              unoptimized
            />
          )}
        </Transition>
      </Stack>

      <Stack w="100%" justify="flex-start" align="center" p={15}>
        <Title order={2} ta="center" style={{ marginTop: '20px' }}>
          Expand your vocabulary, ignite your mind!
        </Title>

        <Button
          w="fit-content"
          size="lg"
          mt="lg"
          radius="md"
          component={Link}
          href="https://testflight.apple.com/join/jKw7avQn"
          target="_blank"
        >
          Available on TestFlight
        </Button>
        <Text>This app is still in beta. Some features are disabled, or may contain some bugs.</Text>

        <Divider my="md" maw="1000px" w="100%" />

        <Title order={2}>Information</Title>
        <Stack w="100%" maw="500px" align="start">
          <Title order={4}>Supported platform</Title>
          <List listStyleType="disc">
            <List.Item ta="start">iOS 16.0 or later</List.Item>
            <List.Item ta="start">iPadOS 16.0 or later</List.Item>
            <List.Item ta="start">macOS 13.0 or later</List.Item>
            <List.Item ta="start">visionOS 1.0 or later</List.Item>
          </List>

          <Title order={4}>Languages</Title>
          <List listStyleType="disc">
            <List.Item ta="start">English</List.Item>
            <List.Item ta="start">Japanese</List.Item>
          </List>
        </Stack>

        <Divider my="md" maw="1000px" w="100%" />

        <Space h={20} />
        <Button variant="white" w="fit-content" component={Link} href="/wordventure/privacy_policy">
          Privacy Policy
        </Button>
        <Button variant="white" w="fit-content" component={Link} href="/wordventure/terms_and_conditions">
          Terms and Conditions
        </Button>
      </Stack>
    </NavigationWrapper>
  );
};

export default WordVenture;
