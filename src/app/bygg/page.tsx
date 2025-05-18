'use client';

import ContactForm from '@/components/ContactForm';
import React from 'react';

export default function ComponentPage() {
  return (
    <main className=' flex flex-col md:flex-row md:pt-40  pt-28 pb-32 g:p-28  container mx-auto '>
      {/* Left Side */}

      {/* Right Side - Image */}
      <section className='w-full md:w-1/2 p-8 space-y-6 overflow-hidden '>
        <h1 className='text-4xl font-semibold'>Bygg</h1>
        <p className='text-lg leading-relaxed'>
          Vi är ett ledande byggföretag med över 20 års erfarenhet inom
          byggbranschen. Vårt team erbjuder professionell och pålitlig service
          för alla typer av byggprojekt, från små renoveringar till stora
          nybyggnationer.
        </p>

        <div>
          <h2 className='text-2xl font-semibold my-6'>Våra byggtjänster</h2>
          <ul className='list-disc pl-5 space-y-3'>
            <li>Nybyggnation av bostäder och kommersiella fastigheter</li>
            <li>Renovering och ombyggnation</li>
            <li>Tak- och fasadrenovering</li>
            <li>Grundarbete och markanläggning</li>
            <li>VVS-installationer</li>
            <li>El- och energilösningar</li>
            <li>Projektledning och rådgivning</li>
          </ul>
        </div>
      </section>

      <section className='w-full md:w-1/2 p-4 lg:p-8 '>
        <ContactForm />
      </section>
    </main>
  );
}
