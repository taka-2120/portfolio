import { Button, Stack, Title, createStyles } from '@mantine/core';
import { Link } from 'react-router-dom';

const styles = createStyles(() => ({
  stack: {
    fontFamily: 'Noto Sans JP',
    margin: '0 auto',
    width: '100%',
    maxWidth: 1000,
    padding: 20
  }
}));

export const WordVenture = () => {
  const { classes } = styles();

  return (
    <Stack className={classes.stack} w="100%" justify="flex-start">
      <Title>WordVenture</Title>
      <Button variant="white" w="fit-content" component={Link} to="https://testflight.apple.com/join/jKw7avQn" target='_blank'>
        Download in TestFlight
      </Button>
      <Button variant="white" w="fit-content" component={Link} to="privacy_policy">
        Privacy Policy
      </Button>
      <Button variant="white" w="fit-content" component={Link} to="terms_and_conditions">
        Terms and Conditions
      </Button>
    </Stack>
  );
};
