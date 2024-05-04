'use client';

import { Button, Stack, Title } from '@mantine/core';
import Link from 'next/link';
import classes from './style.module.css';

const WordVenture = () => (
  <Stack className={classes.stack} w="100%" justify="flex-start">
    <Title>WordVenture</Title>
    <Button w="fit-content" component={Link} href="https://testflight.apple.com/join/jKw7avQn" target="_blank">
        Download in TestFlight
    </Button>
    <Button variant="white" w="fit-content" component={Link} href="/wordventure/privacy_policy">
        Privacy Policy
    </Button>
    <Button variant="white" w="fit-content" component={Link} href="/wordventure/terms_and_conditions">
        Terms and Conditions
    </Button>
  </Stack>
);

export default WordVenture;
