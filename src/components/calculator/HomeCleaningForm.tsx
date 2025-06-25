'use client';

import { useRouter } from 'next/navigation';
import { useEffect,useRef, useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import Address from '@/components/Addres';
import TermsAndConditions from '@/components/TermsAndConditions';

const cleaningPrices = [
  {
    minKvm: 10,
    maxKvm: 70,
    prices: { fourth_week: 1050, biweekly: 1750, weekly: 3300, once: 5400 },
    petFee: 200,
  },
  {
    minKvm: 71,
    maxKvm: 99,
    prices: { fourth_week: 1200, biweekly: 2100, weekly: 3840, once: 5400 },
    petFee: 200,
  },
  {
    minKvm: 100,
    maxKvm: 115,
    prices: { fourth_week: 1350, biweekly: 2200, weekly: 4100, once: 5400 },
    petFee: 200,
  },
  {
    minKvm: 116,
    maxKvm: 129,
    prices: { fourth_week: 1450, biweekly: 2450, weekly: 4600, once: 5400 },
    petFee: 200,
  },
  {
    minKvm: 130,
    maxKvm: 159,
    prices: { fourth_week: 1600, biweekly: 2720, weekly: 5100, once: 5400 },
    petFee: 300,
  },
  {
    minKvm: 160,
    maxKvm: 179,
    prices: { fourth_week: 1750, biweekly: 3000, weekly: 5600, once: 5400 },
    petFee: 300,
  },
  {
    minKvm: 180,
    maxKvm: 199,
    prices: { fourth_week: 1950, biweekly: 3300, weekly: 6100, once: 5400 },
    petFee: 300,
  },
  {
    minKvm: 200,
    maxKvm: 219,
    prices: { fourth_week: 2100, biweekly: 3700, weekly: 6600, once: 5400 },
    petFee: 300,
  },
  {
    minKvm: 220,
    maxKvm: 239,
    prices: { fourth_week: 2290, biweekly: 4100, weekly: 7100, once: 5400 },
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
  const [kvm, setKvm] = useState('');
  const [frequency, setFrequency] = useState('biweekly');
  const [hasPets, setHasPets] = useState(false);
  const [accessOption, setAccessOption] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [addressFields, setAddressFields] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
  });
  const [extraInfo, setExtraInfo] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<
    Partial<typeof addressFields>
  >({});

  const termsRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Calculate price
  useEffect(() => {
    const numericKvm = parseInt(kvm, 10);
    if (!numericKvm || numericKvm < 10) {
      setPrice(null);
      return;
    }
    if (numericKvm >= 240) {
      setPrice('Kontakta oss för pris');
      return;
    }
    const tier = cleaningPrices.find(
      (tier) => numericKvm >= tier.minKvm && numericKvm <= tier.maxKvm,
    );
    if (!tier) {
      setPrice('Kontakta oss för pris');
      return;
    }
    const basePrice = tier.prices[frequency as keyof typeof tier.prices];
    const petFee = hasPets ? tier.petFee : 0;
    const weekendFee = isWeekend(date) ? 500 : 0;
    const totalPrice = basePrice + petFee + weekendFee;
    setPrice(`${totalPrice} SEK`);
  }, [kvm, frequency, hasPets, date]);

  function isWeekend(date: Date | null) {
    if (!date) return false;
    const day = date.getDay();
    return day === 0 || day === 6;
  }

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Validation helper
  function validateAddressFields(fields: typeof addressFields) {
    const errors: Partial<typeof addressFields> = {};
    if (!fields.name) errors.name = 'Namn krävs';
    if (!fields.email) errors.email = 'E-post krävs';
    else if (!validateEmail(fields.email)) errors.email = 'Ogiltig e-post';
    if (!fields.phone) errors.phone = 'Telefon krävs';
    if (!fields.address) errors.address = 'Adress krävs';
    if (!fields.postalCode) errors.postalCode = 'Postnummer krävs';
    if (!fields.city) errors.city = 'Stad krävs';
    return errors;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const addressValidation = validateAddressFields(addressFields);
    if (
      !kvm ||
      parseInt(kvm, 10) < 10 ||
      parseInt(kvm, 10) > 239 ||
      !frequency ||
      !date ||
      !accessOption ||
      Object.keys(addressValidation).length > 0 ||
      !accepted
    ) {
      setAddressError(addressValidation);
      setTermsError(!accepted);
      if (!accepted) termsRef.current?.focus();
      return;
    }
    setAddressError({});

    setLoading(true);

    const numericKvm = parseInt(kvm, 10);
    const tier = cleaningPrices.find(
      (tier) => numericKvm >= tier.minKvm && numericKvm <= tier.maxKvm,
    );
    const basePrice = tier?.prices[frequency as keyof typeof tier.prices] || 0;
    const petFee = hasPets ? tier?.petFee || 0 : 0;
    const weekendFee = isWeekend(date) ? 500 : 0;
    const totalPrice = basePrice + petFee + weekendFee;

    const emailContent = `
      Namn: ${addressFields.name}
      E-post: ${addressFields.email}
      Telefon: ${addressFields.phone}
      Adress: ${addressFields.address}
      Postnummer: ${addressFields.postalCode}
      Stad: ${addressFields.city}
      Bostadsarea: ${kvm} kvm
      Frekvens: ${frequencyLabels[frequency] || frequency}
      Husdjur: ${hasPets ? 'Ja' : 'Nej'}
      Tillgång till hemmet: ${
        accessOption === 'home'
          ? 'Jag kommer att vara hemma'
          : accessOption === 'leave-key'
            ? 'Jag lämnar nyckeln på ert kontor'
            : 'Ni får mina nycklar'
      }
      Datum: ${date ? date.toLocaleDateString('sv-SE') : ''}
      Extra info: ${extraInfo}
      Totalpris: ${totalPrice} SEK
    `;

    try {
      const res = await fetch('/api/cleaning-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...addressFields,
          kvm,
          frequency: frequencyLabels[frequency] || frequency,
          hasPets: hasPets ? 'Ja' : 'Nej',
          accessOption:
            accessOption === 'home'
              ? 'Jag kommer att vara hemma'
              : accessOption === 'leave-key'
                ? 'Jag lämnar nyckeln på ert kontor'
                : 'Ni får mina nycklar',
          date: date ? date.toLocaleDateString('sv-SE') : '',
          extraInfo,
          totalPrice: `${totalPrice} SEK`,
          emailContent,
        }),
      });
      const result = await res.json();
      setLoading(false);
      if (result.status === 'success') {
        router.push('/thank-you');
      } else {
        alert('Något gick fel. Försök igen.');
      }
    } catch (err) {
      setLoading(false);
      alert('Serverfel. Kunde inte skicka formuläret.');
    }
  };

  return (
    <div className='w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 rounded-lg shadow-md dark:bg-[#282828f0] bg-[#eeeeee79]'>
      <h2 className='text-3xl font-bold mb-6'>Städning</h2>
      <form
        onSubmit={handleSubmit}
        className='w-full container rounded-lg overflow-hidden'
      >
        <div className='flex flex-col gap-8 p-2'>
          {/* Bostadsinfo & Husdjur i rad */}
          <div className='flex flex-col md:flex-row gap-6'>
            {/* Bostadsinfo */}
            <div className='flex-1'>
              <label className='block text-base font-semibold text-gray-800 dark:text-gray-200 mb-1'>
                Bostadsarea (kvm) <span className='text-red-500'>*</span>
              </label>
              <span className='block text-xs text-gray-500 mb-2'>
                (obligatorisk)
              </span>
              <input
                type='number'
                inputMode='numeric'
                min={10}
                max={239}
                value={kvm}
                onChange={(e) => setKvm(e.target.value)}
                className='w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-2 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500'
                placeholder='Ange kvm'
                required
              />
            </div>
            {/* Husdjur */}
            <div className='flex-1 flex flex-col justify-end'>
              <label className='block text-base font-semibold text-gray-800 dark:text-gray-200 mb-1'>
                Har du några husdjur?
              </label>
              <label className='inline-flex items-center mt-1 text-base'>
                <input
                  type='checkbox'
                  checked={hasPets}
                  onChange={() => setHasPets(!hasPets)}
                  className='mr-2 h-5 w-5 accent-black'
                />
                Ja
              </label>
            </div>
          </div>

          {/* Frequency select */}
          <div>
            <label className='block text-base font-semibold text-gray-800 dark:text-gray-200 mb-1'>
              Hur ofta vill du ha hemstädning?{' '}
              <span className='text-red-500'>*</span>
            </label>
            <span className='block text-xs text-gray-500 mb-2'>
              (obligatorisk)
            </span>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className='w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-2 text-base text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500'
              required
            >
              <option value='weekly'>Varje vecka</option>
              <option value='biweekly'>Varannan vecka</option>
              <option value='fourth_week'>Var fjärde vecka</option>
              <option value='once'>Engångsstäd</option>
            </select>
          </div>

          {/* Access option select */}
          <div>
            <label className='block text-base font-semibold text-gray-800 dark:text-gray-200 mb-1'>
              Tillgång till ditt hem <span className='text-red-500'>*</span>
            </label>
            <span className='block text-xs text-gray-500 mb-2'>
              (obligatorisk)
            </span>
            <select
              value={accessOption}
              onChange={(e) => setAccessOption(e.target.value)}
              className='w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-2 text-base text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500'
              required
            >
              <option value='' disabled>
                Välj ett alternativ
              </option>
              <option value='home'>Jag kommer att vara hemma</option>
              <option value='leave-key'>
                Jag lämnar nyckeln på ert kontor senast kl. 12 två arbetsdagar
                innan
              </option>
              <option value='have-keys'>Ni får mina nycklar</option>
            </select>
          </div>

          <Address
            value={addressFields}
            onChange={setAddressFields}
            required
            error={addressError}
          />

          <label className='block text-base font-semibold text-gray-800 dark:text-gray-200 mb-1'>
            Välj önskat datum <span className='text-red-500'>*</span>
          </label>
          <DatePicker
            placeholderText='Välj datum'
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat='yyyy-MM-dd'
            className='w-1/2 rounded-lg border border-gray-300 px-4 py-2 text-base text-black shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#1f1f1f]'
            calendarClassName='!w-full'
            wrapperClassName='w-full'
            required
          />
          {isWeekend(date) && (
            <p className='text-base text-red-600 mt-2'>
              OBS! Städning på helg tillkommer en avgift på 500 SEK.
            </p>
          )}

          {/* Extra info */}
          <div>
            <label className='block text-base font-semibold text-gray-800 dark:text-gray-200 mb-1'>
              Finns det något du vill informera oss om angående ditt hem?
            </label>
            <textarea
              className='w-full p-3 border rounded-lg text-base text-black dark:text-white bg-white dark:bg-[#1f1f1f] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500'
              placeholder='Ange eventuella särskilda önskemål eller detaljer om ditt hem'
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            ></textarea>
          </div>

          {/* Pris & Terms */}
          <div className='pt mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 text-center'>
            {price ? (
              <>
                <div className='text-left text-base text-gray-700 dark:text-gray-200 space-y-3'>
                  <div>
                    <span className='font-semibold'>Bostadens storlek:</span>{' '}
                    {kvm} kvm
                  </div>
                  <div>
                    <span className='font-semibold'>Önskat datum:</span>{' '}
                    {date ? date.toLocaleDateString('sv-SE') : ''}
                    {isWeekend(date) && (
                      <span className='text-red-600'>
                        {' '}
                        (Helgtillägg +500 SEK)
                      </span>
                    )}
                  </div>
                  <div>
                    <span className='font-semibold'>Namn:</span>{' '}
                    {addressFields.name}
                  </div>
                  <div>
                    <span className='font-semibold'>E-post:</span>{' '}
                    {addressFields.email}
                  </div>
                  <div>
                    <span className='font-semibold'>Telefon:</span>{' '}
                    {addressFields.phone}
                  </div>
                  <div>
                    <span className='font-semibold'>Adress:</span>{' '}
                    {addressFields.address}
                  </div>
                  <div>
                    <span className='font-semibold'>Postnummer:</span>{' '}
                    {addressFields.postalCode}
                  </div>
                  <div>
                    <span className='font-semibold'>Stad:</span>{' '}
                    {addressFields.city}
                  </div>
                </div>
                <h3 className='text-lg font-semibold'>Totalt pris</h3>

                <div className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
                  {price}
                </div>
              </>
            ) : (
              <div className='text-gray-500'>Fyll i bostadens storlek</div>
            )}
          </div>

          <TermsAndConditions
            checked={accepted}
            onChange={(val) => {
              setAccepted(val);
              setTermsError(false);
            }}
            ref={termsRef}
            error={termsError}
          />
          <button
            type='submit'
            className='w-full py-3 rounded-xl bg-gray-800 text-white font-semibold hover:bg-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300 flex items-center justify-center'
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className='animate-spin h-5 w-5 mr-2 text-gray-700'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                    fill='none'
                  />
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z'
                  />
                </svg>
                Skickar...
              </>
            ) : (
              'Skicka'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
