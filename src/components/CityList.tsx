import React from 'react';

const cities = [
  'Stockholm',
  'Eskilstuna',
  'Nyköping',
  'Enköping',
  'Västerås',
  'Södertälje',
  'Strängnäs',
  'Bålsta',
  'Malmköping',
  'Flen',
  'Katrineholm',
  'Trosa',
  'och närliggande områden',
];

export default function CityList({
  isStartPage = false,
}: { isStartPage?: boolean } = {}) {
  return (
    <>
      <p
        className={`mb-4 pt-6 font-semibold ${isStartPage ? 'text-xl' : 'text-lg'}`}
      >
        Vi utför jobb i följande städer och områden:
      </p>
      <div className='w-full flex flex-wrap pt-4 justify-left py-4'>
        {cities.map((city, idx) => (
          <span
            key={city}
            className={`inline-block font-medium ${isStartPage ? 'text-lg' : 'text-base'}`}
          >
            {city}
            {idx < cities.length - 1 && (
              <span className='mx-2 text-gray-400'>|</span>
            )}
          </span>
        ))}
      </div>
    </>
  );
}
