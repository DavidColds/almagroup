import { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'Tack för ditt meddelande!',
};

export default function ThankYou() {
  return (
    <main>
      <section>
        <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
          <h1 className='mt-8 text-5xl font-bold text-gray-400 md:text-7xl'>
            Tack!
          </h1>
          <p className='mt-4 text-xl md:text-2xl'>
            Ditt meddelande har skickats. Vi återkommer till dig så snart som
            möjligt.
          </p>
          <a
            href='/'
            className='mt-6 inline-block rounded bg-blue-500 px-6 py-3 text-lg font-medium text-white shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2'
          >
            Tillbaka till startsidan
          </a>
        </div>
      </section>
    </main>
  );
}
