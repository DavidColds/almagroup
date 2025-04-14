import clsx from 'clsx';
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
        title: 'Deep Cleaning Services',
        text: 'Experience a meticulous deep cleaning service that ensures every corner is spotless.',
        list: [
          'Eco-friendly products',
          'Trained professionals',
          '100% satisfaction guaranteed',
        ],
        image: '/images/clean1.jpg',
        reverse: false,
      },
      {
        title: 'Office & Commercial Spaces',
        text: 'We create a clean and professional environment tailored for businesses.',
        list: [
          'Flexible scheduling',
          'Disinfection services',
          'Dedicated cleaning staff',
        ],
        image: '/images/bygg1.jpg',
        reverse: true,
      },
      {
        title: 'Home Cleaning Solutions',
        text: 'Enjoy a sparkling clean home with our customized home cleaning plans.',
        list: [
          'Weekly & monthly plans',
          'Pet-friendly cleaning',
          'Affordable pricing',
        ],
        image: '/images/clean2.jpg',
        reverse: false,
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
      {content.map(({ title, text, list, image, reverse }, index) => (
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
              width={640} // Adjust width & height as needed
              height={480}
              useSkeleton
              className='aspect-[4/3] w-full h-auto rounded-lg object-cover shadow-md'
            />
          </div>

          {/* Text Content */}
          <div className='w-full space-y-4 p-6 sm:w-1/2'>
            <h3 className='text-3xl text-gray-900 dark:text-white'>{title}</h3>
            <p className='text-lg text-gray-700 dark:text-gray-300'>{text}</p>
            <ul className='list-disc pl-5 text-lg text-gray-600 dark:text-gray-400'>
              {list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
}
