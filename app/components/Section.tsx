import { Stack, Title } from '@mantine/core';
import { FC, ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

const Section: FC<Props> = ({ title, children }) => (
  <Stack id={title} px={10} w="100%" align='start'>
    <Title order={2} my={5}>
      {title}
    </Title>
    {children}
  </Stack>
);

export default Section;
