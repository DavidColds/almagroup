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
    <form
      onSubmit={handleSubmit}
      className='max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl space-y-6 text-gray-900'
    >
      <h2 className='text-2xl font-bold'>Fönsterputs Kalkylator</h2>

      <div className='space-y-4'>
        <label className='block font-semibold'>Typ av fönster:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as CleaningType)}
          className='w-full p-2 border rounded'
        >
          {Object.keys(cleaningTypes).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block font-semibold'>Antal fönster:</label>
            <input
              type='number'
              placeholder='t.ex. 5'
              value={amount ?? ''}
              onChange={(e) =>
                setAmount(e.target.value ? Number(e.target.value) : undefined)
              }
              className='w-full p-2 border rounded'
              required
            />
          </div>

          <div>
            <label className='block font-semibold'>Fönsterbleck (st):</label>
            <input
              type='number'
              placeholder='t.ex. 3'
              value={bleck ?? ''}
              onChange={(e) =>
                setBleck(e.target.value ? Number(e.target.value) : undefined)
              }
              className='w-full p-2 border rounded'
            />
          </div>

          <div>
            <label className='block font-semibold'>Karmtvätt (st):</label>
            <input
              type='number'
              placeholder='t.ex. 2'
              value={karm ?? ''}
              onChange={(e) =>
                setKarm(e.target.value ? Number(e.target.value) : undefined)
              }
              className='w-full p-2 border rounded'
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
      </div>

      <div className='text-xl font-bold text-right'>
        Totalt pris:{' '}
        <span className='text-green-600'>
          {amount !== undefined ? `${total} kr` : '—'}
        </span>
      </div>

      <button
        type='submit'
        className='w-full py-3 rounded bg-blue-500 text-white'
      >
        Skicka
      </button>
    </form>
  );
};

export default WindowCleaningCalculator;
