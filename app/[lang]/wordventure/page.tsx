'use client';

import { Button, Stack, Title, createStyles } from '@mantine/core';
import Link from 'next/link';

const styles = createStyles(() => ({
  stack: {
    margin: '0 auto',
    width: '100%',
    maxWidth: 1000,
    padding: 20
  }
}));

const WordVenture = () => {
  const { classes } = styles();

  return (
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
};

export default WordVenture;
