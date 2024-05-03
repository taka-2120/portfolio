import { Stack, Title } from '@mantine/core';
import { FC, ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

const Section: FC<Props> = ({ title, children }) => (
  <Stack mx={10}>
    <Title order={2} my={5}>{title}</Title>
    {children}
  </Stack>
);

export default Section;
