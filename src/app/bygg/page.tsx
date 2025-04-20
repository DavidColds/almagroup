'use client';

import React from 'react';
import Image from 'next/image';
import NextImage from '@/components/NextImage';

export default function ComponentPage() {
  return (
    <main className='min-h-screen flex flex-col md:flex-row container mx-auto'>
      {/* Left Side */}
      <section className='w-full md:w-1/2 p-8 pt-40 md:pt-40  space-y-6 overflow-hidden'>
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

        {/* Contact Form */}
        <div className='mt-8'>
          <h2 className='text-2xl font-semibold'>Kontakta oss</h2>
          <form className='space-y-6'>
            <div>
              <label htmlFor='name' className='block text-sm font-medium'>
                Namn
              </label>
              <input
                type='text'
                id='name'
                placeholder='Ditt namn'
                className='w-full p-4 border   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              />
            </div>

            <div>
              <label htmlFor='email' className='block text-sm font-medium'>
                E-post
              </label>
              <input
                type='email'
                id='email'
                placeholder='Din e-post'
                className='w-full p-4 border   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              />
            </div>

            <div>
              <label htmlFor='message' className='block text-sm font-medium'>
                Meddelande
              </label>
              <textarea
                id='message'
                placeholder='Ditt meddelande'
                className='w-full p-4 border   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                rows={4}
              />
            </div>

            <button
              type='submit'
              className='w-full py-3   hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            >
              Skicka
            </button>
          </form>
        </div>
      </section>

      {/* Right Side - Image */}
      <section className='hidden md:block md:w-1/2'>
        <NextImage
          width={560}
          height={1300}
          src='/images/bygg1.jpg'
          alt='Bygg image'
          className='object-cover w-full h-full  '
        />
      </section>
    </main>
  );
}
