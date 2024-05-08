import { Button, Stack, Title } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title: string;
  destination: string;
  destinationName: string;
}

const NavigationWrapper: FC<Props> = ({ children, title, destination, destinationName }) => (
  <>
    <Title order={1} pos="absolute" mt={20} ta="center" w="100%">
      {title}
    </Title>
    <Stack w="100%" justify="flex-start" align="start" py={10}>
      <Button component={Link} href={destination} variant="transparent" size="lg">
        <IconChevronLeft />
        {destinationName}
      </Button>
      {children}
    </Stack>
  </>
);

export default NavigationWrapper;
