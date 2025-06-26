'use client';
import Image from 'next/image';
import React, { useState } from 'react';

import Accordion from '@/components/Accordion';
import BigCleaning from '@/components/calculator/BigCleaning';
import CityList from '@/components/CityList';

export default function Home() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <main className='lg:pt-48'>
      {/* Heading section */}
      <div className='w-full px-4 sm:px-8 lg:px-28 pt-48 p-4 sm:p-6 lg:p-8 '>
        <h2 className='text-3xl font-bold mb-4 text-center'>
          Boka storstädning enkelt online
        </h2>
        <p className='text-lg lg:text-center text-gray-700 dark:text-gray-300 max-w-2xl mx-auto'>
          Fyll i formuläret för att få en offert och boka din storstädning. Vi
          erbjuder grundlig och professionell storstädning anpassad efter dina
          behov.
        </p>
      </div>

      {/* Cleaning info as accordions */}
      <div className='px-2'>
        <div className='w-full container mx-auto dark:bg-[#282828f0] bg-[#eeeeee79] rounded-lg shadow my-12 p-4 lg:p-10'>
          <h3 className='pb-4'>Det här ingår i hemstädningen</h3>
          <div className='space-y-2'>
            <Accordion
              title='Alla rum'
              isOpen={open === 0}
              onClick={() => setOpen(open === 0 ? null : 0)}
            >
              <ul className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 pl-5'>
                <li className='list-disc'>
                  Dammtorkar väggar och tar bort spindelväv.
                </li>
                <li className='list-disc'>
                  Dammsuger och våt torkar snickerier, element, fria ytor samt
                  ovanpå garderober och skåp.
                </li>
                <li className='list-disc'>
                  Dammtorkar prydnadssaker, hyllor och tavlor.
                </li>
                <li className='list-disc'>Dammtorkar eluttag och kontakter.</li>
                <li className='list-disc'>Dammsuger stoppade möbler.</li>
                <li className='list-disc'>
                  Dammsuger på och under mattor (om möjligt).
                </li>
                <li className='list-disc'>Dammtorkar lampor.</li>
                <li className='list-disc'>
                  Torr dammar elektronik (ej på bildskärm).
                </li>
                <li className='list-disc'>Putsar speglar.</li>
                <li className='list-disc'>Tömmer papperskorgar.</li>
                <li className='list-disc'>Dammsuger och våt torkar golv.</li>
                <li className='list-disc'>
                  I sovrum utför vi de generella momenten och dessutom:
                </li>
                <li className='list-disc'>Bäddar sängar.</li>
                <li className='list-disc'>
                  Bäddar rent om nya lakan ligger framme.
                </li>
                <li className='list-disc'>
                  Dammtorkar eller dammsuger sänggavel/-karm.
                </li>
              </ul>
            </Accordion>
            <Accordion
              title='Kök'
              isOpen={open === 2}
              onClick={() => setOpen(open === 2 ? null : 2)}
            >
              <ul className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 pl-5'>
                <li className='list-disc'>
                  Rengör fläkt och fläkt filter (ej kolfilter).
                </li>
                <li className='list-disc'>Rengör ovanpå skåp och hyllor.</li>
                <li className='list-disc'>
                  Torkar köksluckor ut- och invändigt.
                </li>
                <li className='list-disc'>Rengör kyl och frys utvändigt.</li>
                <li className='list-disc'>
                  Rengör kakel/stänkskydd ovanför diskbänk.
                </li>
                <li className='list-disc'>
                  Rengör under skåp (om möjligt) och torkar av socklar.
                </li>
                <li className='list-disc'>
                  Rengör mikrovågsugn ut- och invändigt.
                </li>
                <li className='list-disc'>
                  Torkar diskmaskin ut- och invändigt.
                </li>
                <li className='list-disc'>
                  Torkar av det som står framme t.ex. kaffe maskin, oljor, salt
                  och peppar.
                </li>
                <li className='list-disc'>
                  Rengör ut- och invändigt i skåp där sopbehållare finns.
                </li>
                <li className='list-disc'>Tömmer sopor och torkar sopkorg.</li>
                <li className='list-disc'>
                  Putsar diskho, blandare, propp och sil.
                </li>
              </ul>
            </Accordion>
            <Accordion
              title='Badrum'
              isOpen={open === 3}
              onClick={() => setOpen(open === 3 ? null : 3)}
            >
              <ul className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 pl-5'>
                <li className='list-disc'>Torkar av synliga rör.</li>
                <li className='list-disc'>Torkar väggar och golv.</li>
                <li className='list-disc'>
                  Putsar blandare, kran och rör i dusch.
                </li>
                <li className='list-disc'>
                  Avfettar och avkalkar väggar och fogar i duschutrymme om det
                  är möjligt.
                </li>
                <li className='list-disc'>
                  Rengör badkar, tar bort front och torkar under.
                </li>
                <li className='list-disc'>Rengör golvbrunn.</li>
                <li className='list-disc'>
                  Torkar av utsida och ovanpå badrumsskåp.
                </li>
                <li className='list-disc'>Rengör kran och handfat.</li>
                <li className='list-disc'>Rengör hela toalettstolen.</li>
                <li className='list-disc'>
                  Rengör utsidan av vitvaror samt i tvättmedels behållaren på
                  tvättmaskinen.
                </li>
                <li className='list-disc'>Rengör filtret i torktumlaren.</li>
                <li className='list-disc'>
                  Torkar av flaskor som står framme.
                </li>
              </ul>
            </Accordion>
          </div>
          <p className='text-sm text-gray-700 dark:text-gray-300 pt-4'>
            <strong>Obs:</strong> Vi flyttar inte på stora möbler under
            städningen och städarna rengör så högt de förmår. Om ni kan förse
            oss med en fotpall hjälper det oss att nå högre, städarna får dock
            inte självständigt använda stege för att nå högre. Har vi missat
            något? Ring oss så åtgärdar vi så snabbt vi kan!
          </p>

          <CityList />
        </div>
      </div>
      {/* Form and image side by side */}
      <div className='w-full container mx-auto flex flex-col md:flex-row gap-8 items-stretch pb-10 px-2'>
        <div className='flex-1 rounded-lg shadow flex items-center'>
          <BigCleaning />
        </div>
        <div className='flex-1 relative min-h-[300px] md:min-h-[400px] lg:min-h-[500px] hide-ipad'>
          <Image
            src='/images/clean4.jpg'
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
