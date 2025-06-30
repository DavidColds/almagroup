'use client';

import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';

import Hero from '@/components/Hero';
import Section from '@/components/Section';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';

export default function HomePage() {
  return (
    <main className='min-h-screen w-full'>
      <Head>
        <title>Städning & Bygg i Stockholm | Alma Grupp</title>
      </Head>
      <Hero />
      <Services />
      <Section />
      <Testimonials />
    </main>
  );
}
