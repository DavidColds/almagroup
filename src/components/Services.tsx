'use client';
import Link from 'next/link';

interface Service {
  title: string;
  description: string;
  link: string;
}

export default function CleaningConstructionServices(): JSX.Element {
  const services: Service[] = [
    {
      title: 'Hemstädning',
      description:
        'Noggrann städning av hemmet för att säkerställa en ren och fräsch boendemiljö.',
      link: '/cleaning', // Link to Städning
    },
    {
      title: 'Storstädning',
      description:
        'En grundlig städning från topp till tå för hem och företag.',
      link: '/stor-stadning', // Link to Stor Städning
    },
    {
      title: 'Flyttstädning',
      description:
        'Omfattande städtjänster för att säkerställa att ditt gamla hem är fläckfritt innan flytten.',
      link: '/flyttstadning', // Link to Flyttstädning
    },
    {
      title: 'Fönsterputsning',
      description: 'Professionell fönsterputsning för en fläckfri glans.',
      link: '/windowCleaning', // Link to Fönster Puts
    },
    {
      title: 'Kontorsstädning',
      description:
        'Professionell städning för kontor och kommersiella utrymmen för att upprätthålla hygien.',
      link: '/kontorsstadning', // Link to Kontorsstädning
    },
    {
      title: 'Bygg',
      description:
        'Borttagning av byggdamm och skräp efter byggnation för att göra platsen inflyttningsklar.',
      link: '/bygg', // Link to Bygg
    },
  ];

  return (
    <section className='mx-auto px-4 py-24 bg-[#d1d1d14f]'>
      <h2 className='mb-6 md:text-center text-3xl'>
        Våra Städ- och Byggtjänster
      </h2>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'>
          {services.map(({ title, description, link }, index) => (
            <Link
              key={index}
              href={link}
              className='relative flex flex-col rounded-lg p-6 shadow-md transition-all duration-300 ease-in-out hover:bg-gray-200 hover:shadow-lg dark:hover:bg-gray-800 dark:bg-[#2929294f] group'
            >
              <h3 className='relative text-left text-xl text-gray-900 dark:text-white'>
                {title}
              </h3>
              <p className='relative mt-2 text-gray-700 dark:text-gray-300'>
                {description}
              </p>
              {/* Arrow Icon */}
              <span className='text-gray-900 dark:text-white text-lg font-semibold flex items-center group-hover:translate-x-2 transition-all duration-300'>
                Läs mer
                <span className='ml-2 text-2xl'>&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
