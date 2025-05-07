import { useState, useEffect } from 'react';

const fixedCleaningPrices = [
  { minKvm: 0, maxKvm: 30, price: 1599 },
  { minKvm: 31, maxKvm: 40, price: 1899 },
  { minKvm: 41, maxKvm: 50, price: 2099 },
  { minKvm: 51, maxKvm: 60, price: 2399 },
  { minKvm: 61, maxKvm: 70, price: 2799 },
  { minKvm: 71, maxKvm: 80, price: 3099 },
  { minKvm: 81, maxKvm: 90, price: 3549 },
  { minKvm: 91, maxKvm: 100, price: 3699 },
  { minKvm: 101, maxKvm: 110, price: 3899 },
  { minKvm: 111, maxKvm: 120, price: 4399 },
  { minKvm: 121, maxKvm: 140, price: 4749 },
  { minKvm: 141, maxKvm: 150, price: 4949 },
  { minKvm: 151, maxKvm: 160, price: 5459 },
  { minKvm: 161, maxKvm: 170, price: 5849 },
  { minKvm: 171, maxKvm: 190, price: 6249 },
  { minKvm: 191, maxKvm: 220, price: 6449 },
  { minKvm: 221, maxKvm: 240, price: 6649 },
  { minKvm: 241, maxKvm: 260, price: 6949 },
  { minKvm: 261, maxKvm: 290, price: 7349 },
];

const ADD_ON_PRICE = 279;

export default function FixedPriceCalculator() {
  const [kvm, setKvm] = useState('');
  const [includeOven, setIncludeOven] = useState(false);
  const [includeFridge, setIncludeFridge] = useState(false);
  const [price, setPrice] = useState<string | null>(null);

  useEffect(() => {
    calculatePrice();
  }, [kvm, includeOven, includeFridge]);

  const calculatePrice = () => {
    const numericKvm = parseInt(kvm, 10);
    if (!numericKvm || numericKvm < 0) {
      setPrice(null);
      return;
    }

    if (numericKvm > 290) {
      setPrice('Offertförfrågan');
      return;
    }

    const tier = fixedCleaningPrices.find(
      (t) => numericKvm >= t.minKvm && numericKvm <= t.maxKvm,
    );

    if (!tier) {
      setPrice('Offertförfrågan');
      return;
    }

    let total = tier.price;
    if (includeOven) total += ADD_ON_PRICE;
    if (includeFridge) total += ADD_ON_PRICE;

    setPrice(`${total} SEK`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numericKvm = parseInt(kvm, 10);
    if (!numericKvm || numericKvm < 0) {
      alert('Fyll i bostadens storlek innan du skickar formuläret.');
      return;
    }

    // Prepare email content
    const emailContent = `
      Bostadens storlek: ${kvm} kvm
      Ugnsrengöring: ${includeOven ? 'Ja' : 'Nej'}
      Kyl/Frys rengöring: ${includeFridge ? 'Ja' : 'Nej'}
      Totalt pris: ${price}
    `;

    console.log('Email Content:', emailContent);

    // Show alert with details
    alert(`Formuläret har skickats!\n\n${emailContent}`);
  };

  return (
    <div className='w-full max-w-5xl mx-auto p-6'>
      <div className='flex flex-col md:flex-row gap-8'>
        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className='w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg space-y-6'
        >
          <h2 className='text-2xl font-bold mb-4'>Stor Städning</h2>

          <label className='block space-y-2'>
            <span className='font-medium'>Bostadens storlek (kvm)</span>
            <input
              type='text'
              inputMode='numeric'
              value={kvm}
              onChange={(e) => setKvm(e.target.value)}
              className='w-full p-3 border border-gray-300 rounded'
              placeholder='Ex. 75'
              aria-label='Kvadratmeter'
              required
            />
          </label>

          <div className='space-y-4'>
            <label className='flex items-center space-x-3'>
              <input
                type='checkbox'
                checked={includeOven}
                onChange={() => setIncludeOven(!includeOven)}
              />
              <span>Ugnsrengöring (+279 SEK)</span>
            </label>

            <label className='flex items-center space-x-3'>
              <input
                type='checkbox'
                checked={includeFridge}
                onChange={() => setIncludeFridge(!includeFridge)}
              />
              <span>Kyl/Frys rengöring (+279 SEK)</span>
            </label>
          </div>

          <button
            type='submit'
            className='w-full py-3 rounded bg-blue-500 text-white'
          >
            Skicka
          </button>
        </form>

        {/* Aside Section */}
        <aside className='w-full md:w-1/2 bg-gray-50 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center space-y-4'>
          <h3 className='text-lg font-semibold'>Totalt pris</h3>
          {price ? (
            <div className='text-3xl font-bold text-blue-600'>{price}</div>
          ) : (
            <div className='text-gray-500'>Fyll i bostadens storlek</div>
          )}
        </aside>
      </div>
    </div>
  );
}
