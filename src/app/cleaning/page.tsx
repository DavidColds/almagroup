'use client';
import HomeCleaningForm from '@/components/calculator/HomeCleaningForm';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='flex justify-between items-stretch px-8 lg:px-28 mx-auto w-full max-w-screen-2xl h-full min-h-screen max-h-[1700px] gap-24 pt-48 pb-32'>
      {/* Left side */}
      <div className='w-full lg:w-1/2 flex items-center'>
        <div className='w-full'>
          <HomeCleaningForm />
        </div>
      </div>

      {/* Right side */}
      <div className='relative w-full lg:w-1/2'>
        <Image
          src='/images/clean4.jpg'
          alt='Cleaning Service'
          fill
          className='object-cover rounded-lg shadow-md'
        />
      </div>
    </main>
  );
}
