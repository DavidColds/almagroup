'use client';

import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Section from '@/components/Section';
import Testimonials from '@/components/Testimonials';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <main className='min-h-screen'>
      <Head>
        <title>Hi</title>
      </Head>
      <Hero />
      <Services />
      <Section />
      <Testimonials />
    </main>
  );
}
