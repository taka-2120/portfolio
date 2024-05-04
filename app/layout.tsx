import './layout.css';
import '@mantine/core/styles.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { FC, ReactNode } from 'react';
import ProviderRoot from './providerRoot';
import { getCopyrightYear } from '@/utils/getCopyrightYear';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Yu Takahashi',
  description: 'Portfolio of Yu Takahashi',
};

interface Props {
  children: ReactNode;
}

const RootLayout: FC<Props> = async ({ children }) => (
  <html lang="en">
    <body className={inter.className}>
      <ProviderRoot>
        <center className="wrapper">{children}</center>
        <center className="footer">
          <p>Copyright © {getCopyrightYear()} Yu Takahashi</p>
        </center>
      </ProviderRoot>
    </body>
  </html>
);

export default RootLayout;
