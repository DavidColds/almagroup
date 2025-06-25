import clsx from 'clsx';
import Link from 'next/link';
import { useMemo } from 'react';

import NextImage from '@/components/NextImage';

export default function Section({
  id,
  className,
  maxWidthClass = 'xl:max-w-(--breakpoint-xl)',
}: {
  id?: string;
  className?: string;
  maxWidthClass?: string;
}): JSX.Element {
  const content = useMemo(
    () => [
      {
        title: 'Storstädning',
        text: 'Upplev en grundlig storstädning som lämnar varje hörn skinande rent. Vår tjänst är perfekt för dig som vill ha ett riktigt fräscht hem inför en säsong, flytt eller bara som en extra uppfräschning.',
        list: [
          'Miljövänliga produkter',
          'Erfarna städproffs',
          '100% nöjdhetsgaranti',
          'Noggrann rengöring av svåråtkomliga ytor',
          'Fönsterputs och dammtorkning ingår',
        ],
        image: '/images/clean1.jpg',
        reverse: false,
        ctaLink: '/stor-stadning',
        ctaText: 'Boka Storstädning',
      },
      {
        title: 'Bygg',
        text: 'Vi erbjuder professionella byggtjänster som täcker allt från renoveringar till nybyggnation. Oavsett om du planerar att bygga om ditt hem eller skapa något helt nytt, är vi här för att hjälpa dig genom hela processen. Vi sätter kundens behov i fokus och levererar alltid med kvalitet och trygghet.',
        list: [
          'Skräddarsydda lösningar för dina byggprojekt',
          'Erfarna hantverkare och projektledare',
          'Högkvalitativa material och hållbara metoder',
          'Totalentreprenad – vi hanterar hela projektet',
          'Tydlig offert och inga dolda kostnader',
        ],
        image: '/images/bygg1.jpg',
        reverse: true,
        ctaLink: '/bygg',
        ctaText: 'Kontakta Oss för Bygg',
      },
      {
        title: 'Hemstädning',
        text: 'Njut av ett skinande rent hem med våra skräddarsydda städplaner. Vi anpassar städningen efter dina behov och ser till att du alltid kommer hem till en fräsch miljö. Perfekt för både småbarnsfamiljer och husdjursägare.',
        list: [
          'Veckoplaner och månadsplaner',
          'Husdjurvänlig städning',
          'Prisvärda alternativ',
          'Alltid samma städare för kontinuitet',
          'Flexibla tider och enkel bokning',
        ],
        image: '/images/clean2.jpg',
        reverse: false,
        ctaLink: '/cleaning',
        ctaText: 'Boka Hemstädning',
      },
    ],
    [],
  );

  return (
    <section
      id={id || ''}
      className={clsx(
        className,
        maxWidthClass,
        'container mx-auto space-y-24 py-6 sm:py-12',
      )}
    >
      {content.map(
        ({ title, text, list, image, reverse, ctaLink, ctaText }, index) => (
          <div
            key={index}
            className={clsx('flex flex-col items-center gap-20 sm:flex-row', {
              'sm:flex-row-reverse': reverse,
            })}
          >
            {/* Image */}
            <div className='w-full sm:w-1/2'>
              <NextImage
                src={image}
                alt={title}
                width={640}
                height={480}
                useSkeleton
                className='aspect-[4/3] w-full h-auto rounded-lg object-cover shadow-md'
              />
            </div>

            {/* Text Content */}
            <div className='w-full space-y-4 p-6 sm:w-1/2'>
              <h3 className='text-3xl text-gray-900 dark:text-white'>
                {title}
              </h3>
              <p className='text-lg text-gray-700 dark:text-gray-300'>{text}</p>
              <ul className='list-disc pl-5 text-lg text-gray-600 dark:text-gray-400'>
                {list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              {/* CTA Button */}
              <Link
                href={ctaLink}
                className='px-12 py-3 bg-gray-800 text-white font-semibold hover:bg-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300 inline-block text-center group relative '
              >
                {ctaText}
                <span className='absolute right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300'>
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        ),
      )}
    </section>
  );
}
