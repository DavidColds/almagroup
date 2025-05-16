import React, { useState } from 'react';

type CleaningType =
  | 'Utan spröjs, 2 sidor'
  | 'Utan spröjs, 4 sidor'
  | 'Med spröjs, 2 sidor'
  | 'Med spröjs, 4 sidor';

const cleaningTypes: Record<CleaningType, { start: number; price: number }> = {
  'Utan spröjs, 2 sidor': { start: 690, price: 38 },
  'Utan spröjs, 4 sidor': { start: 690, price: 48 },
  'Med spröjs, 2 sidor': { start: 740, price: 55 },
  'Med spröjs, 4 sidor': { start: 740, price: 68 },
};

const WindowCleaningCalculator = () => {
  const [type, setType] = useState<CleaningType>('Utan spröjs, 2 sidor');
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [bleck, setBleck] = useState<number | undefined>(undefined);
  const [karm, setKarm] = useState<number | undefined>(undefined);
  const [stege, setStege] = useState<boolean>(false);

  const { start, price } = cleaningTypes[type];

  const total =
    start +
    (amount ?? 0) * price +
    (bleck ?? 0) * 10 +
    (karm ?? 0) * 15 +
    (stege ? 240 : 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (amount === undefined) {
      alert('Fyll i alla obligatoriska fält innan du skickar formuläret.');
      return;
    }

    // Prepare email content
    const emailContent = `
      Typ av fönster: ${type}
      Antal fönster: ${amount}
      Fönsterbleck: ${bleck ?? 0}
      Karmtvätt: ${karm ?? 0}
      Behöver stege: ${stege ? 'Ja' : 'Nej'}
      Totalt pris: ${total} kr
    `;

    console.log('Email Content:', emailContent);

    // Show alert with details
    alert(`Formuläret har skickats!\n\n${emailContent}`);
  };

  return (
    <div className='w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 rounded-lg shadow-md dark:bg-[#282828f0] bg-[#d8d8d879]'>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <h2 className='text-3xl font-bold mb-6'>Fönsterputs</h2>

        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 tracking-wide'>
          Typ av fönster:
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as CleaningType)}
          className='w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-3 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#1f1f1f]'
        >
          {Object.keys(cleaningTypes).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 tracking-wide'>
              Antal fönster:
            </label>
            <input
              type='number'
              placeholder='t.ex. 5'
              value={amount ?? ''}
              onChange={(e) =>
                setAmount(e.target.value ? Number(e.target.value) : undefined)
              }
              className='w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-3 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#1f1f1f]'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 tracking-wide'>
              Fönsterbleck (st):
            </label>
            <input
              type='number'
              placeholder='t.ex. 3'
              value={bleck ?? ''}
              onChange={(e) =>
                setBleck(e.target.value ? Number(e.target.value) : undefined)
              }
              className='w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-3 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#1f1f1f]'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 tracking-wide'>
              Karmtvätt (st):
            </label>
            <input
              type='number'
              placeholder='t.ex. 2'
              value={karm ?? ''}
              onChange={(e) =>
                setKarm(e.target.value ? Number(e.target.value) : undefined)
              }
              className='w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-3 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#1f1f1f]'
            />
          </div>

          <div className='flex items-center space-x-2 mt-6 col-span-2'>
            <input
              type='checkbox'
              checked={stege}
              onChange={() => setStege(!stege)}
              id='stege'
              className='h-5 w-5'
            />
            <label htmlFor='stege' className='font-semibold'>
              Behöver stege? (+240 kr)
            </label>
          </div>
        </div>

        <div className='text-xl font-bold text-right'>
          Totalt pris:{' '}
          <span className='text-green-600'>
            {amount !== undefined ? `${total} kr` : '—'}
          </span>
        </div>

        <button
          type='submit'
          className='w-full py-3 rounded-xl bg-gray-800 text-white font-semibold hover:bg-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300'
        >
          Skicka
        </button>
      </form>
    </div>
  );
};

export default WindowCleaningCalculator;
