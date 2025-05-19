import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';

import bygg1 from '../../public/images/bygg1.jpg';
import bygg2 from '../../public/images/bygg2.jpg';
import bygg3 from '../../public/images/bygg3.jpg';
import bygg4 from '../../public/images/bygg4.jpg';
import bygg5 from '../../public/images/bygg5.jpg';

const defaultImages: (StaticImageData | string)[] = [
  bygg1,
  bygg2,
  bygg3,
  bygg4,
  bygg5,
];

export default function Gallery({
  images = defaultImages,
}: {
  images?: (StaticImageData | string)[];
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenIdx((prev) =>
      prev !== null ? (prev === 0 ? images.length - 1 : prev - 1) : null,
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenIdx((prev) =>
      prev !== null ? (prev === images.length - 1 ? 0 : prev + 1) : null,
    );
  };

  return (
    <section className='my-12 px-4 max-w-7xl mx-auto'>
      <h2 className='text-2xl font-bold text-center mb-6'>Galleri</h2>

      <div className='overflow-x-auto'>
        <div className='flex gap-4 snap-x snap-mandatory overflow-x-scroll pb-4'>
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setOpenIdx(idx)}
              className='min-w-[300px] h-[200px] rounded-lg overflow-hidden snap-center shrink-0 bg-gray-200 focus:outline-none'
              aria-label={`Visa bild ${idx + 1}`}
            >
              <div className='relative w-full h-full'>
                <Image
                  src={typeof img === 'string' ? img : img}
                  alt={`Bygg bild ${idx + 1}`}
                  fill
                  className='object-cover transition-transform duration-300 hover:scale-105'
                  sizes='300px'
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {openIdx !== null && (
        <div
          className='fixed inset-0 z-50 bg-black/80 flex items-center justify-center'
          onClick={() => setOpenIdx(null)}
        >
          <button
            className='absolute top-4 right-4 text-white text-3xl font-bold'
            onClick={(e) => {
              e.stopPropagation();
              setOpenIdx(null);
            }}
            aria-label='Stäng'
          >
            &times;
          </button>
          <button
            className='absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl px-2'
            onClick={handlePrev}
            aria-label='Föregående'
          >
            &#8592;
          </button>
          <div className='relative max-w-3xl w-full flex items-center justify-center px-4'>
            <Image
              src={
                typeof images[openIdx] === 'string'
                  ? images[openIdx]
                  : images[openIdx]
              }
              alt={`Bygg bild ${openIdx + 1}`}
              width={900}
              height={675}
              className='object-contain rounded-lg max-h-[80vh] w-auto h-auto'
              priority
            />
          </div>
          <button
            className='absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl px-2'
            onClick={handleNext}
            aria-label='Nästa'
          >
            &#8594;
          </button>
        </div>
      )}
    </section>
  );
}
