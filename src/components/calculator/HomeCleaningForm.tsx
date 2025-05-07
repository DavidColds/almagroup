'use client';

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

export default function HomeCleaningForm() {
  const [accessOption, setAccessOption] = useState(''); // Default to empty string
  const [kvm, setKvm] = useState('');
  const [frequency, setFrequency] = useState('biweekly');
  const [hasPets, setHasPets] = useState(false);
  const [price, setPrice] = useState<string | null>(null);
  const [details, setDetails] = useState<{
    kvm: string;
    frequency: string;
    hasPets: boolean;
    accessOption: string;
    totalPrice: number;
  } | null>(null);

  useEffect(() => {
    calculateCleaningCost();
  }, [kvm, frequency, hasPets, accessOption]);

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
    setDetails({ kvm, frequency, hasPets, accessOption, totalPrice });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!details || !accessOption) {
      alert('Fyll i alla obligatoriska fält innan du skickar formuläret.');
      return;
    }

    // Prepare email content
    const emailContent = `
      Bostadsarea: ${details.kvm} kvm
      Frekvens: ${details.frequency}
      Husdjur: ${details.hasPets ? 'Ja' : 'Nej'}
      Tillgång till hemmet: ${
        details.accessOption === 'home'
          ? 'Jag kommer att vara hemma'
          : details.accessOption === 'leave-key'
            ? 'Jag lämnar nyckeln på ert kontor'
            : 'Ni får mina nycklar'
      }
      Totalpris: ${details.totalPrice} SEK
    `;

    console.log('Email Content:', emailContent);

    // Show alert with details
    alert(`Formuläret har skickats!\n\n${emailContent}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full max-w-5xl rounded-lg overflow-hidden'
    >
      <div className='flex flex-col md:flex-row gap-8'>
        {/* Main Form Section */}
        <div className='flex-1 p-6 shadow-lg'>
          <h1 className='text-2xl font-medium mb-4'>Hemstädning</h1>
          <div className='w-16 h-0.5 mx-auto mb-6'></div>

          <p className='text-sm mb-4'>
            Låt oss börja med att förstå dina preferenser. Vill du ha mer
            information?{' '}
            <a href='#' className='font-medium'>
              Läs mer
            </a>{' '}
            för att jämföra våra abonnemang, se uppgiftslistor och hitta svar på
            vanliga frågor.
          </p>

          <div className='space-y-6'>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Bostadsarea (kvm)*</label>
              <input
                type='number'
                inputMode='numeric'
                min={10}
                max={239}
                value={kvm}
                onChange={(e) => setKvm(e.target.value)}
                className='w-full p-4 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900'
                placeholder='Ange kvm'
                required
              />
            </div>

            <div className='space-y-2'>
              <div className='flex items-center'>
                <label className='text-sm font-medium'>
                  Har du några husdjur?*
                </label>
              </div>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  checked={hasPets}
                  onChange={() => setHasPets(!hasPets)}
                  className='mr-2'
                />
                <span>Ja</span>
              </label>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center'>
                <label className='text-sm font-medium'>
                  Hur ofta vill du ha hemstädning?*
                </label>
              </div>
              <div className='flex flex-col gap-2'>
                <label className='flex items-center justify-between border rounded-md p-3'>
                  Varje vecka
                  <input
                    type='radio'
                    name='frequency'
                    value='weekly'
                    checked={frequency === 'weekly'}
                    onChange={(e) => setFrequency(e.target.value)}
                  />
                </label>

                <label className='flex items-center justify-between border rounded-md p-3'>
                  Varannan vecka
                  <input
                    type='radio'
                    name='frequency'
                    value='biweekly'
                    checked={frequency === 'biweekly'}
                    onChange={(e) => setFrequency(e.target.value)}
                  />
                </label>
                <label className='flex items-center justify-between border rounded-md p-3'>
                  Var fjärde vecka
                  <input
                    type='radio'
                    name='frequency'
                    value='fourth_week'
                    checked={frequency === 'fourth_week'}
                    onChange={(e) => setFrequency(e.target.value)}
                  />
                </label>
              </div>
            </div>

            <div className='text-sm'>
              <span>Vill du boka endast en engångsstädning? </span>
              <a href='#' className='font-medium'>
                Klicka här
              </a>
            </div>

            <div className='pt-6 mt-6'>
              <h2 className='text-lg font-medium mb-4'>Om ditt hem</h2>

              <div className='space-y-2 mb-6'>
                <div className='flex items-center'>
                  <label className='text-sm font-medium'>
                    Finns det något du vill informera oss om angående ditt hem?
                  </label>
                </div>
                <textarea
                  className='w-full p-3 border rounded'
                  placeholder='Ange eventuella särskilda önskemål eller detaljer om ditt hem'
                ></textarea>
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium'>
                  Tillgång till ditt hem*
                </label>
                <div className='flex flex-col gap-2'>
                  <label className='flex items-center justify-between border rounded-md p-3'>
                    Jag kommer att vara hemma
                    <input
                      type='radio'
                      name='access'
                      value='home'
                      checked={accessOption === 'home'}
                      onChange={(e) => setAccessOption(e.target.value)}
                      required // Enforces selection
                    />
                  </label>
                  <label className='flex items-center justify-between border rounded-md p-3'>
                    Jag lämnar nyckeln på ert kontor senast kl. 12 två
                    arbetsdagar innan
                    <input
                      type='radio'
                      name='access'
                      value='leave-key'
                      checked={accessOption === 'leave-key'}
                      onChange={(e) => setAccessOption(e.target.value)}
                      required // Enforces selection
                    />
                  </label>
                  <label className='flex items-center justify-between border rounded-md p-3'>
                    Ni får mina nycklar
                    <input
                      type='radio'
                      name='access'
                      value='have-keys'
                      checked={accessOption === 'have-keys'}
                      onChange={(e) => setAccessOption(e.target.value)}
                      required // Enforces selection
                    />
                  </label>
                </div>
              </div>
            </div>

            <button
              type='submit'
              className='w-full py-3 rounded bg-blue-500 text-white'
            >
              Skicka
            </button>
            <p className='text-xs text-center'>
              *Alla fält måste fyllas i för att fortsätta
            </p>
          </div>
        </div>

        {/* Sticky Aside Section */}
        <aside className='w-full md:w-80 p-6 sticky top-4 shadow-lg'>
          <h3 className='font-medium mb-4'>Sammanfattning</h3>
          {details ? (
            <div className='space-y-4'>
              <div className='flex justify-between'>
                <strong className='font-medium'>Storlek:</strong> {details.kvm}{' '}
                kvm
              </div>
              <div className='flex justify-between'>
                <strong className='font-medium'>Frekvens:</strong>{' '}
                {details.frequency}
              </div>
              <div className='flex justify-between'>
                <strong className='font-medium'>Husdjur:</strong>{' '}
                {details.hasPets ? 'Ja' : 'Nej'}
              </div>
              <div className='flex justify-between'>
                <strong className='font-medium'>Tillgång:</strong>{' '}
                {details.accessOption === 'home'
                  ? 'Jag kommer att vara hemma'
                  : details.accessOption === 'leave-key'
                    ? 'Jag lämnar nyckeln på ert kontor'
                    : 'Ni får mina nycklar'}
              </div>
              <div className='flex justify-between'>
                <strong className='font-medium'>Pris:</strong> {price}
              </div>
            </div>
          ) : (
            <p className='text-gray-500'>Fyll i formuläret för att se pris</p>
          )}
        </aside>
      </div>
    </form>
  );
}
