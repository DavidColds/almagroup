'use client';
import clsx from 'clsx';

interface Service {
  title: string;
  description: string;
}

export default function CleaningConstructionServices(): JSX.Element {
  const services: Service[] = [
    {
      title: 'Residential Cleaning',
      description:
        'Thorough home cleaning services, ensuring a spotless and fresh living space.',
    },
    {
      title: 'Commercial Cleaning',
      description:
        'Professional cleaning for offices and commercial spaces to maintain hygiene.',
    },
    {
      title: 'Post-Construction Cleanup',
      description:
        'Removing debris and dust after construction to make the site move-in ready.',
    },
    {
      title: 'Deep Cleaning',
      description:
        'A thorough top-to-bottom cleaning service for homes and businesses.',
    },
    {
      title: 'Floor & Carpet Cleaning',
      description:
        'Expert cleaning and maintenance for carpets, hardwood, and tile flooring.',
    },
    {
      title: 'Construction & Renovation',
      description:
        'High-quality construction and remodeling services tailored to your needs.',
    },
  ];

  return (
    <section className='container mx-auto px-4 py-24'>
      <h2 className='mb-6 md:text-center text-3xl text-gray-900 dark:text-white'>
        Our Cleaning & Construction Services
      </h2>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'>
        {services.map(({ title, description }, index) => (
          <div
            key={index}
            className='relative flex flex-col rounded-lg  p-6  shadow-md transition-all duration-300 ease-in-out hover:bg-gray-200 hover:shadow-lg  dark:hover:bg-gray-700'
          >
            <h3 className='relative text-left text-xl text-gray-900 dark:text-white'>
              {title}
            </h3>
            <p className='relative mt-2 text-gray-700 dark:text-gray-300'>
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
