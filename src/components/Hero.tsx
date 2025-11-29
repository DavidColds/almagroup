'use client';

import { useState } from 'react';
import NextImage from '@/components/NextImage';

export default function Hero(): JSX.Element {
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <div className='relative flex items-center text-white mt-28'>
      {/* Background Image */}
      <NextImage
        className='absolute inset-0 w-full h-full'
        classNames={{
          image: 'object-cover brightness-75',
        }}
        src='/images/hero-image.jpg'
        width={1600}
        height={900}
        alt='Hero-Image'
      />

      {/* Decorative gradient + vignette */}
      <div className='absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none' />

      <div className='relative z-10 w-full max-w-[1600px] mx-auto px-4 py-24'>
        <div className='grid gap-8 items-center lg:grid-cols-2'>
          {/* Left: Main promo (flashy) */}
          <div className='space-y-6'>
            {/* Trust indicators */}

            {/* Value badge */}

            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight'>
              Gratis storstädning värd från 2 499 kr när du tecknar abonnemang
            </h1>

            {/* What's included */}
            <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20'>
              <h3 className='font-semibold mb-3 flex items-center gap-2'>
                <svg
                  className='w-5 h-5 text-green-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
                Din storstädning (värde från 2 499 kr) inkluderar:
              </h3>

              <ul className='grid sm:grid-cols-2 gap-2 text-sm text-white/90'>
                <li className='flex items-start gap-2'>
                  <span className='text-green-400 mt-0.5'>✓</span>
                  <span>Dammsugning och våttorkning alla rum</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-green-400 mt-0.5'>✓</span>
                  <span>Dammtorkning väggar och spindelväv</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-green-400 mt-0.5'>✓</span>
                  <span>Putsa speglar och eluttag</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-green-400 mt-0.5'>✓</span>
                  <span>Rengör kök: fläkt, skåp, ugn</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-green-400 mt-0.5'>✓</span>
                  <span>Rengör kyl & frys utvändigt</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-green-400 mt-0.5'>✓</span>
                  <span>Badrum: dusch, toalett, handfat</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-green-400 mt-0.5'>✓</span>
                  <span>Avkalka kakel och fogar</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-green-400 mt-0.5'>✓</span>
                  <span>Miljövänliga produkter</span>
                </li>
              </ul>
            </div>

            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
              <div className='flex flex-col gap-2'>
                <a
                  href='/cleaning'
                  className='relative inline-flex items-center justify-center rounded-lg bg-orange-500 text-white font-semibold px-8 py-4 shadow-lg hover:bg-orange-600 hover:shadow-xl transition-all duration-200 text-lg'
                  aria-label='Boka nu - få gratis storstädning'
                >
                  <svg
                    className='w-5 h-5 mr-2'
                    viewBox='0 0 24 24'
                    fill='none'
                    aria-hidden
                  >
                    <path
                      d='M12 2v6'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M5 12h14'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M7 20h10'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  Boka nu — Gratis storstädning
                </a>
              </div>

              <div className='flex items-center gap-3 mt-1 sm:mt-0'>
                <button
                  onClick={() => setTermsOpen(true)}
                  className='text-sm text-white/90 underline-offset-2 hover:underline'
                  aria-haspopup='dialog'
                >
                  Läs villkor
                </button>
              </div>
            </div>

            <div className='space-y-2 mt-3'>
              <div className='flex items-center gap-3'>
                <div className='text-xs text-white/80'>
                  Erbjudandet gäller nya kunder inom vårt ordinarie
                  upptagningsområde.
                </div>
              </div>
            </div>
          </div>

          {/* Right: Vilkor card (side column) */}
          <aside className='w-full space-y-4'>
            {/* Customer testimonial */}
            <p className='max-w-2xl text-lg sm:text-xl text-white/95'>
              Boka regelbunden hemstädning (vecka eller varannan vecka). Vi tar
              hand om allt, tryggt, med fasta tider och erfarna medarbetare.
            </p>
            <div className='rounded-lg bg-white/8 backdrop-blur-sm border border-white/10 p-5 shadow-lg'>
              <div className='flex gap-1 mb-2'>
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className='w-4 h-4 text-yellow-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                ))}
              </div>
              <p className='text-sm text-white/90 italic mb-2'>
                "Bästa beslutet vi tagit! Storstädningen var fantastisk och nu
                njuter vi av en ren lägenhet varje vecka."
              </p>
              <p className='text-xs text-white/70'>— Anna L., Stockholm</p>
            </div>

            <div className='rounded-lg bg-white/8 backdrop-blur-sm border border-white/10 p-6 shadow-lg'>
              <div className='flex items-start justify-between'>
                <div>
                  <h3 className='text-xl font-semibold'>Villkor erbjudande</h3>
                  <p className='text-sm text-white/80 mt-1'>
                    Snabbt & enkelt — klicka för fullständiga villkor.
                  </p>
                </div>
                <div className='ml-4'>
                  <span className='inline-block bg-red-600 text-white text-xs font-medium px-3 py-1 rounded'>
                    Viktig
                  </span>
                </div>
              </div>

              <ul className='mt-4 text-sm text-white/95 list-disc pl-5 space-y-2'>
                <li>Gäller endast nya kunder.</li>
                <li>Kräver abonnemang: vecka eller varannan vecka.</li>
                <li>Storstädning (värde från 2 499 kr) ingår vid start.</li>
                <li>Minsta bindningstid: 3 månader.</li>
              </ul>

              <div className='mt-6 flex items-center justify-between'>
                <button
                  onClick={() => setTermsOpen(true)}
                  className='text-sm underline text-white/95'
                >
                  Visa fullständiga villkor
                </button>

                <a
                  href='/cleaning'
                  className='text-sm inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded font-medium shadow-sm hover:bg-orange-600'
                >
                  Boka nu
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Terms Modal - larger and more readable */}
      {termsOpen && (
        <div
          role='dialog'
          aria-modal='true'
          aria-label='Erbjudandevillkor'
          className='fixed inset-0 z-50 flex items-center justify-center px-4'
        >
          <div
            className='absolute inset-0 bg-black/75'
            onClick={() => setTermsOpen(false)}
            aria-hidden='true'
          />

          <div className='relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-white dark:bg-[#070707] rounded-2xl shadow-2xl ring-1 ring-black/10'>
            <div className='p-8 sm:p-10'>
              <div className='flex items-start justify-between'>
                <div className='max-w-[85%]'>
                  <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white'>
                    Allmänna Villkor Kampanjen "Gratis Storstädning vid
                    abonnemang"
                  </h2>
                  <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
                    Läs villkoren noggrant innan du tecknar abonnemang.
                  </p>
                </div>
                <button
                  onClick={() => setTermsOpen(false)}
                  className='ml-4 text-gray-500 hover:text-gray-700 dark:text-gray-400'
                  aria-label='Stäng'
                >
                  ✕
                </button>
              </div>

              <div className='mt-6 text-sm text-gray-800 dark:text-gray-200 leading-relaxed space-y-5'>
                <ol className='list-decimal pl-5 space-y-3'>
                  <li>
                    <strong>Parter:</strong> Dessa villkor gäller mellan ALMA
                    Grupp AB och kund som tecknar ett nytt abonnemang för
                    hemstädning.
                  </li>

                  <li>
                    <strong>Kampanjens Giltighet:</strong> Erbjudandet om en
                    kostnadsfri storstädning gäller endast under perioden som
                    anges i kampanjens marknadsföring eller så länge kampanjen
                    annonseras aktivt på vår webbplats.
                  </li>

                  <li>
                    <strong>Behörighet:</strong> Erbjudandet är exklusivt för
                    nya kunder som aldrig tidigare haft ett städabonnemang hos
                    Tjänsteleverantören. Kunden måste vara en privatperson.
                    Erbjudandet kan inte kombineras med andra rabatter eller
                    kampanjer.
                  </li>

                  <li>
                    <strong>Villkor för Abonnemanget:</strong> För att vara
                    berättigad måste kunden:
                    <ul className='list-disc pl-5 mt-2'>
                      <li>
                        Teckna ett regelbundet städabonnemang (t.ex.
                        veckostädning eller varannan vecka).
                      </li>
                      <li>
                        Avtalet måste ha en minsta bindningstid om 3 månader.
                      </li>
                      <li>
                        Storstädningen utförs vanligtvis vid det första inbokade
                        städtillfället.
                      </li>
                    </ul>
                  </li>

                  <li>
                    <strong>Avbokning och Uppsägning:</strong> Vid avbokning
                    eller uppsägning innan bindningstiden kan kunden debiteras
                    för den utförda storstädningen enligt prislista.
                  </li>

                  <li>
                    <strong>Ändringar av Villkor:</strong> Tjänsteleverantören
                    förbehåller sig rätten att ändra kampanjvillkoren. De
                    villkor som gällde vid tecknandet gäller för den specifika
                    kunden.
                  </li>

                  <li>
                    <strong>Övrigt:</strong> Erbjudandet gäller inom vårt
                    ordinarie upptagningsområde. Eventuella tillval debiteras
                    separat.
                  </li>
                </ol>

                <p className='text-xs text-gray-500 dark:text-gray-400'>
                  För frågor eller fullständiga villkor, kontakta{' '}
                  <a href='mailto:info@alma-grupp.se' className='underline'>
                    info@alma-grupp.se
                  </a>{' '}
                  eller ring{' '}
                  <a href='tel:+46704452110' className='underline'>
                    +46 70-445 21 10
                  </a>
                  .
                </p>
              </div>

              <div className='mt-6 flex justify-end gap-3'>
                <a
                  href='/kontakt'
                  onClick={() => setTermsOpen(false)}
                  className='px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200'
                >
                  Kontakta oss
                </a>
                <button
                  onClick={() => setTermsOpen(false)}
                  className='px-4 py-2 bg-orange-500 text-white rounded-md font-medium hover:bg-orange-600'
                >
                  Stäng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
