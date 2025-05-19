'use client';

import TermsAndConditions from '@/components/TermsAndConditions';
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

const frequencyLabels: Record<string, string> = {
  weekly: 'Varje vecka',
  biweekly: 'Varannan vecka',
  fourth_week: 'Var fjärde vecka',
  once: 'Engångsstäd',
};

export default function HomeCleaningForm() {
  const [step, setStep] = useState(1);

  // Form state
  const [accessOption, setAccessOption] = useState('');
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
  const [accepted, setAccepted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    calculateCleaningCost();
    // eslint-disable-next-line
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

    if (!details || !accessOption || !name || !email || !phone) {
      alert('Fyll i alla obligatoriska fält innan du skickar formuläret.');
      return;
    }

    // Prepare email content
    const emailContent = `
      Namn: ${name}
      E-post: ${email}
      Telefon: ${phone}
      Bostadsarea: ${details.kvm} kvm
      Frekvens: ${frequencyLabels[details.frequency] || details.frequency}
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

    alert(`Formuläret har skickats!\n\n${emailContent}`);
  };

  // Step validation
  const canGoNextStep1 =
    kvm &&
    parseInt(kvm, 10) >= 10 &&
    parseInt(kvm, 10) < 240 &&
    frequency &&
    accessOption;
  const canGoNextStep2 = name && email && phone;

  return (
    <div className='w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 rounded-lg shadow-md dark:bg-[#282828f0] bg-[#eeeeee79]'>
      <h2 className='text-3xl font-bold mb-6'>Städning</h2>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-5xl rounded-lg overflow-hidden'
      >
        <div className='flex flex-col gap-8 p-2'>
          {/* Step 1: Home Info */}
          {step === 1 && (
            <div className='space-y-6'>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>
                  Bostadsarea (kvm)*
                  <br />
                  <span className='text-xs text-gray-500'>(obligatorisk)</span>
                </label>

                <input
                  type='number'
                  inputMode='numeric'
                  min={10}
                  max={239}
                  value={kvm}
                  onChange={(e) => setKvm(e.target.value)}
                  className='mx-1 w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-3 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#1f1f1f]'
                  placeholder='Ange kvm'
                  required
                />
              </div>

              <div className='space-y-2'>
                <div className='flex items-center'>
                  <label className='text-sm font-medium'>
                    Har du några husdjur?
                    <br />
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
                    <br />
                    <span className='text-xs text-gray-500'>
                      (obligatorisk)
                    </span>
                  </label>
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='flex items-center justify-between rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-white'>
                    Varje vecka
                    <input
                      className=' h-5 w-5 text-gray-600'
                      type='radio'
                      name='frequency'
                      value='weekly'
                      checked={frequency === 'weekly'}
                      onChange={(e) => setFrequency(e.target.value)}
                    />
                  </label>

                  <label className='flex items-center justify-between rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-white'>
                    Varannan vecka
                    <input
                      className=' h-5 w-5 text-gray-600'
                      type='radio'
                      name='frequency'
                      value='biweekly'
                      checked={frequency === 'biweekly'}
                      onChange={(e) => setFrequency(e.target.value)}
                    />
                  </label>
                  <label className='flex items-center justify-between rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-white'>
                    Var fjärde vecka
                    <input
                      className=' h-5 w-5 text-gray-600'
                      type='radio'
                      name='frequency'
                      value='fourth_week'
                      checked={frequency === 'fourth_week'}
                      onChange={(e) => setFrequency(e.target.value)}
                    />
                  </label>
                  <label className='flex items-center justify-between rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-white'>
                    Engångsstäd
                    <input
                      className=' h-5 w-5 text-gray-600'
                      type='radio'
                      name='frequency'
                      value='once'
                      checked={frequency === 'once'}
                      onChange={(e) => setFrequency(e.target.value)}
                    />
                  </label>
                </div>
              </div>

              <div className='pt-6 mt-6'>
                <h2 className='text-lg font-medium mb-4'>Om ditt hem</h2>

                <div className='space-y-2 mb-6'>
                  <div className='flex items-center'>
                    <label className='text-sm font-medium'>
                      Finns det något du vill informera oss om angående ditt
                      hem?
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
                    <br />
                    <span className='text-xs text-gray-500'>
                      (obligatorisk)
                    </span>
                  </label>
                  <div className='flex flex-col gap-2'>
                    <label className='flex items-center justify-between rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-white'>
                      Jag kommer att vara hemma
                      <input
                        className=' h-5 w-5 text-gray-600'
                        type='radio'
                        name='access'
                        value='home'
                        checked={accessOption === 'home'}
                        onChange={(e) => setAccessOption(e.target.value)}
                      />
                    </label>
                    <label className='flex items-center justify-between rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-white'>
                      Jag lämnar nyckeln på ert kontor senast kl. 12 två
                      arbetsdagar innan
                      <input
                        className=' h-5 w-5 text-gray-600'
                        type='radio'
                        name='access'
                        value='leave-key'
                        checked={accessOption === 'leave-key'}
                        onChange={(e) => setAccessOption(e.target.value)}
                      />
                    </label>
                    <label className='flex items-center justify-between rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-white'>
                      Ni får mina nycklar
                      <input
                        className=' h-5 w-5 text-gray-600'
                        type='radio'
                        name='access'
                        value='have-keys'
                        checked={accessOption === 'have-keys'}
                        onChange={(e) => setAccessOption(e.target.value)}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className='flex justify-end gap-2 pt-6'>
                <button
                  type='button'
                  className='px-6 py-2 rounded-xl bg-blue-600 text-white font-bold shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition disabled:opacity-50'
                  onClick={() => setStep(2)}
                  disabled={!canGoNextStep1}
                >
                  Nästa
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Customer Info */}
          {step === 2 && (
            <div className='space-y-6'>
              <div>
                <label
                  className='text-sm font-medium block mb-1'
                  htmlFor='name'
                >
                  Namn*
                  <br />
                  <span className='text-xs text-gray-500'>(obligatorisk)</span>
                </label>
                <input
                  id='name'
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-3 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#1f1f1f]'
                  placeholder='Ditt namn'
                  required
                />
              </div>
              <div>
                <label
                  className='text-sm font-medium block mb-1'
                  htmlFor='email'
                >
                  E-post*
                  <br />
                  <span className='text-xs text-gray-500'>(obligatorisk)</span>
                </label>
                <input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-3 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#1f1f1f]'
                  placeholder='din@email.se'
                  required
                />
              </div>
              <div>
                <label
                  className='text-sm font-medium block mb-1'
                  htmlFor='phone'
                >
                  Telefon*
                  <br />
                  <span className='text-xs text-gray-500'>(obligatorisk)</span>
                </label>
                <input
                  id='phone'
                  type='tel'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className='w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-3 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#1f1f1f]'
                  placeholder='070-123 45 67'
                  required
                />
              </div>
              <div className='flex justify-between gap-2 pt-6'>
                <button
                  type='button'
                  className='px-6 py-2 rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300'
                  onClick={() => setStep(1)}
                >
                  Tillbaka
                </button>
                <button
                  type='button'
                  className='px-6 py-2 rounded-xl bg-blue-600 text-white font-bold shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition disabled:opacity-50'
                  onClick={() => setStep(3)}
                  disabled={!canGoNextStep2}
                >
                  Nästa
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Summary & Submit */}
          {step === 3 && (
            <div className='space-y-6'>
              <h3 className='text-lg font-medium mb-4'>Sammanfattning</h3>
              {details ? (
                <div className='space-y-4'>
                  <div className='flex justify-between'>
                    <strong className='font-medium'>Namn:</strong> {name}
                  </div>
                  <div className='flex justify-between'>
                    <strong className='font-medium'>E-post:</strong> {email}
                  </div>
                  <div className='flex justify-between'>
                    <strong className='font-medium'>Telefon:</strong> {phone}
                  </div>
                  <div className='flex justify-between'>
                    <strong className='font-medium'>Storlek:</strong>{' '}
                    {details.kvm} kvm
                  </div>
                  <div className='flex justify-between'>
                    <strong className='font-medium'>Frekvens:</strong>{' '}
                    {frequencyLabels[details.frequency] || details.frequency}
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
                <p className='text-gray-500'>
                  Fyll i formuläret för att se pris
                </p>
              )}
              <TermsAndConditions checked={accepted} onChange={setAccepted} />
              <div className='flex justify-between gap-2 pt-6'>
                <button
                  type='button'
                  className='px-6 py-2 rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300'
                  onClick={() => setStep(2)}
                >
                  Tillbaka
                </button>
                <button
                  type='submit'
                  className='px-6 py-2 rounded-xl bg-gray-800 text-white font-semibold hover:bg-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300'
                  disabled={!accepted}
                >
                  Skicka
                </button>
              </div>
              <p className='text-xs text-center pt-4'>
                *Alla fält måste fyllas i för att fortsätta
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
