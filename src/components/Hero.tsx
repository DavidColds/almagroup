'use client';

import NextImage from '@/components/NextImage';

export default function Hero(): JSX.Element {
  return (
    <div className='relative flex h-[58vh] min-h-[700px] flex-col justify-center text-center text-white mt-28'>
      {/* Background Image */}
      <NextImage
        className='absolute inset-0 w-full h-full' // Ensures it covers the section
        classNames={{ image: 'object-cover' }} // Ensures image maintains aspect ratio
        src='/images/hero-image.jpg'
        width={1380} // Adjust this based on your design
        height={780} // Adjust this based on your design
        alt='Hero-Image'
      />
      {/* Dark Overlay */}
      <div className='absolute inset-0 bg-black/50'></div>

      {/* Content */}
      <div className='relative z-10 space-y-6 px-4 sm:space-y-8'>
        <h1 className='text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl'>
          Höj Standarden i Ditt Hem
        </h1>
        <p className='mx-auto max-w-2xl text-lg font-light opacity-90 sm:text-xl'>
          Professionella städtjänster anpassade efter dina behov. Boka idag och
          upplev ett skinande rent hem som aldrig förr.
        </p>
      </div>
    </div>
  );
}
