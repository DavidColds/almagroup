'use client';

import React from 'react';

import OfficeClean from '@/components/OfficeClean';
import CityList from '@/components/CityList';

export default function ComponentPage() {
  return (
    <main className='flex flex-col md:flex-row md:pt-40 pt-28 pb-32 g:p-28 container mx-auto'>
      <section className='w-full md:w-1/2 p-4 md:p-8 space-y-6 overflow-hidden'>
        <h1 className='text-4xl font-semibold'>Kontorsstädning</h1>
        <p className='text-lg leading-relaxed'>
          Vi erbjuder professionell kontorsstädning för företag i alla
          storlekar. Med fokus på kvalitet, noggrannhet och flexibilitet
          säkerställer vi en ren och trivsam arbetsmiljö för dig och dina
          medarbetare.
        </p>
        <CityList />
        <div>
          <h2 className='text-2xl font-semibold my-6'>Vad vi erbjuder</h2>
          <ul className='list-disc pl-5 space-y-3'>
            <li>Daglig eller veckovis städning av kontorslokaler</li>
            <li>Fönsterputsning och golvvård</li>
            <li>Påfyllning av hygienartiklar</li>
            <li>Rengöring av kök och gemensamma utrymmen</li>
            <li>Avfallshantering och återvinning</li>
            <li>Flexibla upplägg anpassade efter era behov</li>
            <li>Miljövänliga rengöringsprodukter</li>
          </ul>
        </div>
      </section>
      <section className='w-full md:w-1/2 p-4 md:p-8 space-y-6 overflow-hidden'>
        <OfficeClean />
      </section>
    </main>
  );
}
