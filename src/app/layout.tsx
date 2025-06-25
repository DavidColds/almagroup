import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';

import CookieBotClient from '@/components/CookieBotClient';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';

import { Providers } from '@/app/providers';
import { siteConfig } from '@/constant/config';

const domainGroupId = '390e454c-d075-4ad2-84cd-04b1509fb29c';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon/favicon.ico',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'sv_SE',
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='sv'>
      <body className='flex flex-col min-h-screen '>
        <Providers>
          <Nav />
          <CookieBotClient domainGroupId={domainGroupId} />
          <div className='flex-grow'>{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
