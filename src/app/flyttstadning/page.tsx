'use client';
import MoveCleaning from '@/components/calculator/MoveCleaning';
import Image from 'next/image';
import Accordion from '@/components/Accordion';

import React, { useState } from 'react';

export default function Home() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <main className='lg:pt-48'>
      {/* Heading section */}
      <div className='w-full px-4 sm:px-8 lg:px-28 pt-48 p-4 sm:p-6 lg:p-8 '>
        <h2 className='text-3xl font-bold mb-4 text-center'>
          Boka flyttstädning enkelt online
        </h2>
        <p className='text-lg text-center text-gray-700 dark:text-gray-300 max-w-2xl mx-auto'>
          Fyll i formuläret för att få en offert och boka din flyttstädning . Vi
          erbjuder grundlig och professionell flyttstädning anpassad efter dina
          behov.
        </p>
      </div>

      {/* Cleaning info as accordions */}
      <div className='w-full container mx-auto dark:bg-[#282828f0] bg-[#eeeeee79] rounded-lg shadow my-12 p-10'>
        <h3 className='pb-4'>Det här ingår i flyttstädning </h3>
        <div className='space-y-2'>
          <Accordion
            title='Alla rum'
            isOpen={open === 0}
            onClick={() => setOpen(open === 0 ? null : 0)}
          >
            <ul className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 pl-4'>
              <li className='list-disc text-sm'>Putsning av fönster.</li>
              <li className='list-disc text-sm'>
                Dammsugning och avtorkning av snickerier, lister, dörrar,
                dörrkarmar, fönsterbrädor, fria ytor, garderobsdörrar och
                skåpdörrar.
              </li>
              <li className='list-disc text-sm'>
                In- och utvändig avtorkning av garderober, skåp och bokhyllor.
              </li>
              <li className='list-disc text-sm'>
                Avtorkning i golv skenor på skjutdörrar.
              </li>
              <li className='list-disc text-sm'>
                Dammsugning och avtorkning av element.
              </li>
              <li className='list-disc text-sm'>Dammtorkning av väggar.</li>
              <li className='list-disc text-sm'>Dammtorkning av eluttag.</li>
              <li className='list-disc text-sm'>Dammtorkning av lampor.</li>
              <li className='list-disc text-sm'>Putsning av speglar.</li>
              <li className='list-disc text-sm'>
                Borttagning av aska från kakelugn och öppen spis.
              </li>
              <li className='list-disc text-sm'>Avtorkning av ytterdörrar.</li>
              <li className='list-disc text-sm'>
                Dammsugning och våttorkning av golv.
              </li>
            </ul>
          </Accordion>
          <Accordion
            title='Kök'
            isOpen={open === 2}
            onClick={() => setOpen(open === 2 ? null : 2)}
          >
            <ul className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 pl-4'>
              <li className='list-disc text-sm'>
                Ut- och invändig rengöring av kyl och frys.
              </li>
              <li className='list-disc text-sm'>
                Ut- och invändig rengöring av spis och ugn, även plåtar och
                galler.
              </li>
              <li className='list-disc text-sm'>
                Rengöring av fläkt och fläkt filter (ej kolfilter).
              </li>
              <li className='list-disc text-sm'>
                Ut- och invändig rengöring av skåp, hyllor och lådor.
              </li>
              <li className='list-disc text-sm'>
                Rengöring kakel/stänkskydd ovanför diskbänk.
              </li>
              <li className='list-disc text-sm'>
                Rengöring under skåp och torkar av socklar.
              </li>
              <li className='list-disc text-sm'>
                Ut- och invändig rengöring av mikrovågsugn.
              </li>
              <li className='list-disc text-sm'>
                Ut- och invändig avtorkning av diskmaskin.
              </li>
              <li className='list-disc text-sm'>
                Tömning och avtorkning av sopkorg.
              </li>
              <li className='list-disc text-sm'>
                Putsning av diskho, blandare, propp och sil.
              </li>
            </ul>
          </Accordion>
          <Accordion
            title='Badrum'
            isOpen={open === 3}
            onClick={() => setOpen(open === 3 ? null : 3)}
          >
            <ul className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 pl-4'>
              <li className='list-disc text-sm'>
                Rengöring av väggar och golv.
              </li>
              <li className='list-disc text-sm'>
                Putsning av blandare, synliga rör och duschmunstycke.
              </li>
              <li className='list-disc text-sm'>
                Avfettning och avkalkning av väggar och fogar där det är
                möjligt.
              </li>
              <li className='list-disc text-sm'>Rengöring av golvbrunn.</li>
              <li className='list-disc text-sm'>
                Rengöring av dusch eller badkar*
              </li>
              <li className='list-disc text-sm'>
                In- och utvändig avtorkning av badrumsskåp.
              </li>
              <li className='list-disc text-sm'>
                Rengöring av kran och handfat.
              </li>
              <li className='list-disc text-sm'>Rengöring av toalettstolen.</li>
              <li className='list-disc text-sm'>
                Utvändig rengöring av vitvaror samt i tvättmedels behållaren på
                tvättmaskinen.
              </li>
              <li className='list-disc text-sm'>
                Rengöring av filtret i torktumlaren.
              </li>
              <li className='list-disc text-sm'>
                *Du som kund ansvarar för demontering av badkars front.
              </li>
            </ul>
          </Accordion>
        </div>
        <p className='text-sm text-gray-700 dark:text-gray-300 p-4'>
          <strong>Obs:</strong> Vi flyttar inte på stora möbler under städningen
          och städarna rengör så högt de förmår. Om ni kan förse oss med en
          fotpall hjälper det oss att nå högre, städarna får dock inte
          självständigt använda stege för att nå högre. Har vi missat något?
          Ring oss så åtgärdar vi så snabbt vi kan!
        </p>
      </div>

      {/* Form and image side by side */}
      <div className='w-full container mx-auto flex flex-col md:flex-row gap-8 items-stretch pb-10 px-2'>
        <div className='flex-1 rounded-lg shadow  flex items-center'>
          <MoveCleaning />
        </div>
        <div className='flex-1 relative min-h-[300px] md:min-h-[400px] lg:min-h-[500px]'>
          <Image
            src='/images/clean6.jpg'
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
