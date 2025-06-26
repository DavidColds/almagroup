import Image from 'next/image';
import React from 'react';

export default function ThankYouPage() {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center  px-4'>
      <div className='max-w-lg w-full dark:bg-[#282828f0] bg-[#ffffff79] rounded-2xl  p-12 flex flex-col items-center'>
        <Image
          src='/images/thankyou.jpg'
          alt='Tack'
          width={224}
          height={224}
          className='w-56 h-56 object-cover rounded-full mb-8 shadow'
        />
        <h1 className='text-4xl font-bold  mb-6 text-center'>
          Tack för din förfrågan!
        </h1>
        <p className='text-lg text-center mb-3'>
          Vi har tagit emot ditt meddelande och återkommer så snart vi kan.
        </p>
        <p className=' text-center text-base'>
          Ha en fin dag!{' '}
          <span role='img' aria-label='smile'>
            😊
          </span>
        </p>
        <a
          href='/'
          className='w-full py-3 rounded-lg bg-gray-800 text-white font-semibold hover:bg-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300 flex items-center justify-center mt-6 text-base'
        >
          Tillbaka till startsidan
        </a>
      </div>
    </main>
  );
}
