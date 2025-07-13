'use client';

import React from 'react';

import CityList from '@/components/CityList';

export default function ComponentPage() {
  return (
    <>
      <main className='container mx-auto'>
        <div className='md:pt-40 pt-28 pb-12 px-4'>
          <section className='w-full max-w-4xl mx-auto'>
            <h1 className='text-4xl font-semibold mb-6'>Kontakta oss</h1>

            <div className='flex flex-col lg:flex-row gap-8 mb-8'>
              {/* Contact info */}
              <div className='w-full  space-y-6'>
                <p className='text-lg leading-relaxed'>
                  Har du frågor om våra tjänster eller vill du få en offert?
                  Kontakta oss idag! Vårt team av erfarna städare och
                  hantverkare står redo att hjälpa dig med dina behov. Vi
                  erbjuder professionella tjänster inom städning, bygg och
                  fönsterputsning i hela Mälardalen.
                </p>

                <div>
                  <h2 className='text-2xl font-medium mb-2'>
                    Kontaktuppgifter
                  </h2>
                  <ul className='space-y-2'>
                    <li className='flex items-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 mr-2'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                        />
                      </svg>
                      <span>
                        Telefon:{' '}
                        <a href='tel:+46704452110' className='hover:underline'>
                          +46 70-445 21 10
                        </a>
                      </span>
                    </li>
                    <li className='flex items-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 mr-2'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                        />
                      </svg>
                      <span>
                        E-post:{' '}
                        <a
                          href='mailto:infoalmagrupp@gmail.com'
                          className='hover:underline'
                        >
                          infoalmagrupp@gmail.com
                        </a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <CityList />
          </section>
        </div>
      </main>
    </>
  );
}
