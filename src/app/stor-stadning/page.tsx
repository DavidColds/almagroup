'use client';
import BigCleaning from '@/components/calculator/BigCleaning';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='flex flex-col lg:flex-row justify-between items-stretch px-4 sm:px-8 lg:px-28 mx-auto w-full max-w-screen-2xl h-full min-h-screen gap-12 lg:gap-24 pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-24 lg:pb-32'>
      {/* Left side */}
      <div className='w-full lg:w-1/2 flex items-center mb-8 lg:mb-0'>
        <div className='w-full'>
          <BigCleaning />
        </div>
      </div>

      <div className='relative w-full lg:w-1/2 min-h-[300px] h-64 sm:h-96 lg:h-auto'>
        <Image
          src='/images/clean3.jpg'
          alt='Cleaning Service'
          fill
          className='object-cover rounded-lg shadow-md'
          sizes='(max-width: 1024px) 100vw, 50vw'
        />
      </div>
    </main>
  );
}
