import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ProviderRoot from './providerRoot';
import { getCopyrightYear } from '@/utils/getCopyrightYear';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Yu Takahashi',
  description: 'Portfolio of Yu Takahashi',
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={inter.className}>
      <div className="wrapper">
        <ProviderRoot>{children}</ProviderRoot>
      </div>
      <center className='footer'>
        <p>Copyright © {getCopyrightYear()} Yu Takahashi</p>
      </center>
    </body>
  </html>
);

export default RootLayout;
