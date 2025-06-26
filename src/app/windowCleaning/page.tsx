'use client';
import Image from 'next/image';
import React, { useState } from 'react';

import WindowCleaning from '@/components/calculator/WindowCleaning';
import CityList from '@/components/CityList';

export default function Home() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <main className='lg:pt-48'>
      {/* Heading section */}
      <div className='w-full px-4 sm:px-8 lg:px-28 pt-48 p-4 sm:p-6 lg:p-8 '>
        <h2 className='text-3xl font-bold mb-4 text-center'>
          Fönsterputs & Städning i Mälardalen
        </h2>
        <p className='text-lg lg:text-center text-gray-700 dark:text-gray-300 max-w-2xl mx-auto'>
          Vårt erfarna team ser till att dina fönster blir skinande rena och att
          du får bästa möjliga service – oavsett om det gäller hem, kontor eller
          företag. Kontakta oss gärna för en kostnadsfri offert eller om du har
          frågor om våra tjänster!
        </p>
      </div>
      {/* Form and image side by side */}
      <div className='w-full container mx-auto md:flex-row gap-8 items-stretch pb-10 px-2'>
        <CityList />
      </div>
      <div className='w-full container mx-auto flex flex-col md:flex-row gap-8 items-stretch pb-10 px-2'>
        <div className='flex-1 rounded-lg shadow  flex items-center'>
          <WindowCleaning />
        </div>
        <div className='flex-1 relative min-h-[300px] md:min-h-[400px] lg:min-h-[500px] hide-ipad'>
          <Image
            src='/images/windowclean1.jpg'
            alt='Cleaning Service'
            fill
            className='object-cover rounded-lg shadow-md'
            sizes='100vw'
            priority
          />
        </div>
      </div>
    </main>
  );
}
