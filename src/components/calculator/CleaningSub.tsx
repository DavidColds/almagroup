import { useState, useEffect } from 'react';

const cleaningPrices = [
  {
    minKvm: 10,
    maxKvm: 70,
    prices: { fourth_week: 1050, biweekly: 1750, weekly: 3300 },
    petFee: 200,
  },
  {
    minKvm: 71,
    maxKvm: 99,
    prices: { fourth_week: 1200, biweekly: 2100, weekly: 3840 },
    petFee: 200,
  },
  {
    minKvm: 100,
    maxKvm: 115,
    prices: { fourth_week: 1350, biweekly: 2200, weekly: 4100 },
    petFee: 200,
  },
  {
    minKvm: 116,
    maxKvm: 129,
    prices: { fourth_week: 1450, biweekly: 2450, weekly: 4600 },
    petFee: 200,
  },
  {
    minKvm: 130,
    maxKvm: 159,
    prices: { fourth_week: 1600, biweekly: 2720, weekly: 5100 },
    petFee: 300,
  },
  {
    minKvm: 160,
    maxKvm: 179,
    prices: { fourth_week: 1750, biweekly: 3000, weekly: 5600 },
    petFee: 300,
  },
  {
    minKvm: 180,
    maxKvm: 199,
    prices: { fourth_week: 1950, biweekly: 3300, weekly: 6100 },
    petFee: 300,
  },
  {
    minKvm: 200,
    maxKvm: 219,
    prices: { fourth_week: 2100, biweekly: 3700, weekly: 6600 },
    petFee: 300,
  },
  {
    minKvm: 220,
    maxKvm: 239,
    prices: { fourth_week: 2290, biweekly: 4100, weekly: 7100 },
    petFee: 300,
  },
];

export default function CleaningCalculator() {
  const [kvm, setKvm] = useState('');
  const [frequency, setFrequency] = useState('biweekly');
  const [hasPets, setHasPets] = useState(false);
  const [price, setPrice] = useState<string | null>(null);
  const [details, setDetails] = useState<{
    kvm: string;
    frequency: string;
    hasPets: boolean;
    totalPrice: number;
  } | null>(null);

  useEffect(() => {
    calculateCleaningCost();
  }, [kvm, frequency, hasPets]);

  const calculateCleaningCost = () => {
    const numericKvm = parseInt(kvm, 10);
    if (!numericKvm || numericKvm < 10) {
      setPrice(null);
      setDetails(null);
      return;
    }
    if (numericKvm >= 240) {
      setPrice('Kontakta oss för pris');
      setDetails(null);
      return;
    }

    const tier = cleaningPrices.find(
      (tier) => numericKvm >= tier.minKvm && numericKvm <= tier.maxKvm,
    );
    if (!tier) {
      setPrice('Kontakta oss för pris');
      setDetails(null);
      return;
    }

    const basePrice = tier.prices[frequency as keyof typeof tier.prices];
    const petFee = hasPets ? tier.petFee : 0;
    const totalPrice = basePrice + petFee;

    setPrice(`${totalPrice} SEK`);
    setDetails({ kvm, frequency, hasPets, totalPrice });
  };

  return (
    <div className='flex  text-gray-900 flex-col md:flex-row items-start gap-12 max-w-4xl mx-auto p-8'>
      {/* Form section */}
      <form className='w-full bg-white md:w-1/2 p-8 rounded-lg shadow-xl '>
        <h2 className='text-2xl font-semibold mb-6 '>Beräkna ditt städpris</h2>
        <label className='block mb-6'>
          <span className='text-lg font-medium'>
            Hur stor är din bostad? (kvm)
          </span>
          <input
            type='text'
            inputMode='numeric'
            maxLength={10}
            value={kvm}
            onChange={(e) => setKvm(e.target.value)}
            className='w-full p-4 border rounded-lg mt-2 foc  us:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900'
            placeholder='Ange kvm'
            required
            aria-describedby='kvm-info'
          />

          <div id='kvm-info' className='text-sm text-gray-500 mt-2'>
            Ange bostadens storlek i kvadratmeter.
          </div>
        </label>
        <label className='block mb-6'>
          <span className='text-lg font-medium'>Har du husdjur?</span>
          <div className='flex items-center'>
            <input
              type='checkbox'
              checked={hasPets}
              onChange={() => setHasPets(!hasPets)}
              className='mr-2'
              aria-label='Ange om du har husdjur'
            />
            <span>Ja</span>
          </div>
        </label>
        <fieldset className='mb-8'>
          <legend className='text-lg font-medium'>Välj städfrekvens:</legend>
          <div className='flex flex-col gap-4 mt-2'>
            <label>
              <input
                type='radio'
                name='frequency'
                value='weekly'
                checked={frequency === 'weekly'}
                onChange={(e) => setFrequency(e.target.value)}
                className='mr-2'
              />{' '}
              Varje vecka
            </label>
            <label>
              <input
                type='radio'
                name='frequency'
                value='biweekly'
                checked={frequency === 'biweekly'}
                onChange={(e) => setFrequency(e.target.value)}
                className='mr-2'
              />{' '}
              Varannan vecka
            </label>
            <label>
              <input
                type='radio'
                name='frequency'
                value='fourth_week'
                checked={frequency === 'fourth_week'}
                onChange={(e) => setFrequency(e.target.value)}
                className='mr-2'
              />{' '}
              Fjärde vecka
            </label>
          </div>
        </fieldset>
      </form>

      {/* Price section with details */}
      <aside className='w-full bg-white md:w-1/2 p-8 rounded-lg shadow-xl flex flex-col items-center justify-center'>
        <h3 className='text-2xl font-semibold mb-6'>Ditt pris</h3>
        {price ? (
          <div className='text-center'>
            <div className='text-3xl font-bold text-gray-900'>{price}</div>
            {details && (
              <div className='mt-6 text-sm '>
                <div>
                  <strong className='font-medium'>Storlek:</strong>{' '}
                  {details.kvm} kvm
                </div>
                <div>
                  <strong className='font-medium'>Frekvens:</strong>{' '}
                  {details.frequency}
                </div>
                <div>
                  <strong className='font-medium'>Husdjur:</strong>{' '}
                  {details.hasPets ? 'Ja' : 'Nej'}
                </div>
                <div>
                  <strong className='font-medium'>Totalpris:</strong>{' '}
                  {details.totalPrice} SEK
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className='text-gray-500'>Fyll i formuläret för att se pris</div>
        )}
      </aside>
    </div>
  );
}
