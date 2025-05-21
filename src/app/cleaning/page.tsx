'use client';
import HomeCleaningForm from '@/components/calculator/HomeCleaningForm';
import Image from 'next/image';
import Accordion from '@/components/Accordion';

import React, { useState } from 'react';

export default function Home() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <main className='lg:pt-48'>
      {/* Heading section */}
      <div className='w-full px-4 sm:px-8 lg:px-28 pt-8 p-4 sm:p-6 lg:p-8'>
        <h2 className='text-3xl font-bold mb-4 text-center'>
          Boka hemstädning enkelt online
        </h2>
        <p className='text-lg text-center text-gray-700 dark:text-gray-300 max-w-2xl mx-auto'>
          Fyll i formuläret för att få en offert och boka din städning. Vi
          erbjuder professionell hemstädning anpassad efter dina behov.
        </p>
      </div>

      {/* Cleaning info as accordions */}
      <div className='w-full container mx-auto dark:bg-[#282828f0] bg-[#eeeeee79] rounded-lg shadow my-12 p-10'>
        <h3 className='pb-4'>Det här ingår i hemstädningen</h3>
        <div className='space-y-2'>
          <Accordion
            title='Kök'
            isOpen={open === 0}
            onClick={() => setOpen(open === 0 ? null : 0)}
          >
            <ul className='list-disc pl-5 space-y-1'>
              <li>Rengöring av spis</li>
              <li>Rengöring av vattenkran och diskho</li>
              <li>Rengöring av disk- och köksbänk</li>
              <li>Rengöring av stänkyta/kakel</li>
              <li>Torkning av köksluckor och lådor utvändigt</li>
              <li>Torkning av vitvaror och fläkt utvändigt</li>
            </ul>
          </Accordion>
          <Accordion
            title='Badrum'
            isOpen={open === 1}
            onClick={() => setOpen(open === 1 ? null : 1)}
          >
            <ul className='list-disc pl-5 space-y-1'>
              <li>Rengöring av toalett</li>
              <li>
                Rengöring av badkar/dusch, blandare, kran, glasdörr, kakel på
                väggar och golv
              </li>
              <li>Rengöring av vattenkran, handfat och närliggande kakel</li>
              <li>Rengöring av spegel och detaljer</li>
              <li>Torkning av badrumsskåp utvändigt</li>
            </ul>
          </Accordion>
          <Accordion
            title='Alla rum'
            isOpen={open === 2}
            onClick={() => setOpen(open === 2 ? null : 2)}
          >
            <ul className='list-disc pl-5 space-y-1'>
              <li>
                Dammsugning och moppning av golv (runt stora möbler, under om
                möjligt)
              </li>
              <li>
                Dammtorkning av lister, tavlor, lampknappar, vägguttag samt
                element
              </li>
              <li>Dammtorkning av möbler, bord, bänkar och fönsterbrädor</li>
              <li>Vi lyfter på enstaka föremål vid behov</li>
              <li>
                Dammtorkning av fria ytor, samt av lampor och andra större
                föremål
              </li>
              <li>Torkning av handtag och synliga fläckar på dörrar</li>
              <li>Putsning av speglar</li>
              <li>Små mattor skakas för att få bort damm/smuts</li>
              <li>Stora mattor dammsugs</li>
              <li>Tömning av papperskorgar</li>
            </ul>
          </Accordion>
          <Accordion
            title='Övrigt'
            isOpen={open === 3}
            onClick={() => setOpen(open === 3 ? null : 3)}
          >
            <ul className='list-disc pl-5 space-y-1'>
              <li>Vi flyttar inte på stora möbler under städningen</li>
              <li>Städarna rengör så högt de förmår</li>
              <li>
                Om ni kan förse oss med en fotpall hjälper det oss att nå högre
              </li>
              <li>
                Städarna får dock inte självständigt använda stege för att nå
                högre
              </li>
              <li>
                Har vi missat något? Ring oss så åtgärdar vi så snabbt vi kan!
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
          <HomeCleaningForm />
        </div>
        <div className='flex-1 relative min-h-[300px] md:min-h-[400px] lg:min-h-[500px]'>
          <Image
            src='/images/clean3.jpg'
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
