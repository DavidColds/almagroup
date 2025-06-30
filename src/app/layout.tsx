import * as React from 'react';

import '@/styles/globals.css';

import CookieBotClient from '@/components/CookieBotClient';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';

import { Providers } from '@/app/providers';
import { siteConfig } from '@/constant/config';
import Script from 'next/script';

export const metadata = {
  title: 'Städning & Bygg i Stockholm | Alma Grupp',
  description: siteConfig.description,
  keywords: 'städning, fönsterputs, byggstädning, flyttstädning, Stockholm',
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png' }],
    shortcut: ['/favicon/favicon.ico'],
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
    languages: {
      'sv-SE': siteConfig.url,
      'en-US': `${siteConfig.url}/en`,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  } /* 
  verification: {
    google: 'your-google-verification',
  }, */,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='sv'>
      <head>
        {/* Google Tag Manager (GTM) */}
        <Script
          id='gtm'
          strategy='beforeInteractive'
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WVG82CQK');`,
          }}
        />

        {/* Google Analytics (gtag.js) */}
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=G-B1KKX2XE2G'
          strategy='beforeInteractive'
        />
        <Script
          id='ga'
          strategy='beforeInteractive'
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-B1KKX2XE2G');
      `,
          }}
        />
      </head>

      <body className='flex flex-col min-h-screen '>
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-WVG82CQK'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        <Providers>
          <Nav />
          <CookieBotClient />
          <div className='flex-grow'>{children}</div>
          <Footer />
        </Providers>
        <Script
          id='schema-data'
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Alma Grupp',
              description: siteConfig.description,
              url: siteConfig.url,
              telephone: '+46704452110',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Stockenströms väg 9',
                addressLocality: 'Åkers Styckebruk',
                addressRegion: 'Kronobergs län',
                postalCode: '64752',
                addressCountry: 'SE',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '59.3293',
                longitude: '18.0686',
              },
              areaServed: [
                'Stockholm',
                'Eskilstuna',
                'Nyköping',
                'Enköping',
                'Västerås',
                'Södertälje',
                'Strängnäs',
                'Bålsta',
                'Malmköping',
                'Flen',
                'Katrineholm',
                'Trosa',
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
