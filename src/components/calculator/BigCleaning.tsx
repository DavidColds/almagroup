import { useRouter } from 'next/navigation';
import { useEffect, useRef,useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import Address from '@/components/Addres';
import TermsAndConditions from '@/components/TermsAndConditions';

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
const WEEKEND_FEE = 500;

export default function FixedPriceCalculator() {
  const [kvm, setKvm] = useState('');
  const [includeOven, setIncludeOven] = useState(false);
  const [includeFridge, setIncludeFridge] = useState(false);
  const [price, setPrice] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null); // Ensure date is a Date object
  const [accepted, setAccepted] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [extraInfo, setExtraInfo] = useState('');

  const [addressFields, setAddressFields] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
  });
  const [addressError, setAddressError] = useState<
    Partial<typeof addressFields>
  >({});
  const termsRef = useRef<HTMLInputElement>(null); // Use useRef for ref
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    calculatePrice();
  }, [kvm, includeOven, includeFridge, date]);

  const isWeekend = (date: Date | null) => {
    if (!date) return false;
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const calculatePrice = () => {
    const numericKvm = parseInt(kvm.replace(/\D/g, ''), 10);
    if (isNaN(numericKvm) || numericKvm <= 0) {
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
    if (isWeekend(date)) total += WEEKEND_FEE;

    setPrice(`${total} SEK`);
  };

  // Validation helper
  function validateAddressFields(fields: typeof addressFields) {
    const errors: Partial<typeof addressFields> = {};
    if (!fields.name) errors.name = 'Namn krävs';
    if (!fields.email) errors.email = 'E-post krävs';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      errors.email = 'Ogiltig e-post';
    if (!fields.phone) errors.phone = 'Telefon krävs';
    if (!fields.address) errors.address = 'Adress krävs';
    if (!fields.postalCode) errors.postalCode = 'Postnummer krävs';
    else if (!/^\d{5}$/.test(fields.postalCode))
      errors.postalCode = 'Postnummer måste vara 5 siffror';
    if (!fields.city) errors.city = 'Stad krävs';
    return errors;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const numericKvm = parseInt(kvm.replace(/\D/g, ''), 10);
    const addressValidation = validateAddressFields(addressFields);
    if (
      isNaN(numericKvm) ||
      numericKvm <= 0 ||
      !date ||
      Object.keys(addressValidation).length > 0 ||
      !accepted
    ) {
      setAddressError(addressValidation);
      setLoading(false);
      setTermsError(!accepted);
      if (!accepted) termsRef.current?.focus();
      return;
    }
    setAddressError({});

    const payload = {
      kvm: numericKvm,
      includeOven,
      includeFridge,
      price: price || 'Ej tillgängligt',
      ...addressFields,
      date: date.toISOString().split('T')[0], // Format date as yyyy-MM-dd
    };

    try {
      const res = await fetch('/api/big-cleaning-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.status === 'success') {
        setTimeout(() => {
          setLoading(false);
          router.push('/thank-you');
        });
      } else {
        setLoading(false);
        alert('Något gick fel. Försök igen.');
      }
    } catch (err) {
      setLoading(false);
      alert('Serverfel. Kunde inte skicka formuläret.');
    }
  };

  return (
    <div className='w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 rounded-lg shadow-md dark:bg-[#282828f0] bg-[#d8d8d879] '>
      <h2 className='text-3xl font-bold mb-6'>Stor Städning</h2>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='w-full'>
          <label className='block text-base font-semibold text-gray-800 dark:text-gray-200 mb-1'>
            Bostadens storlek (kvm) <span className='text-red-500'>*</span>
          </label>
          <span className='block text-xs text-gray-500 mb-2'>
            (obligatorisk)
          </span>
          <input
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            value={kvm}
            onChange={(e) => setKvm(e.target.value)}
            placeholder='Ex. 75'
            required
            className='w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-2 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500'
          />
        </div>

        <div className='flex flex-col md:flex-row gap-6'>
          <label className='flex flex-1 items-center justify-between rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-base text-gray-900 dark:text-white'>
            <span>Ugnsrengöring (+279 SEK)</span>
            <input
              type='checkbox'
              checked={includeOven}
              onChange={() => setIncludeOven(!includeOven)}
              className='h-5 w-5 text-gray-600'
            />
          </label>
          <label className='flex flex-1 items-center justify-between rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-base text-gray-900 dark:text-white'>
            <span>Kyl/Frys rengöring (+279 SEK)</span>
            <input
              type='checkbox'
              checked={includeFridge}
              onChange={() => setIncludeFridge(!includeFridge)}
              className='h-5 w-5 text-gray-600'
            />
          </label>
        </div>

        <Address
          value={addressFields}
          onChange={setAddressFields}
          required
          error={addressError}
        />

        <label className='block text-base font-semibold text-gray-800 dark:text-gray-200 mb-1 mt-8'>
          Välj önskat datum <span className='text-red-500'>*</span>
        </label>
        <DatePicker
          placeholderText='Välj datum'
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat='yyyy-MM-dd'
          className='w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-black shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#1f1f1f]'
          calendarClassName='!w-full'
          wrapperClassName='w-full'
          required
        />
        {isWeekend(date) && (
          <p className='text-base text-red-600 mt-2'>
            OBS! Städning på helg tillkommer en avgift på 500 SEK.
          </p>
        )}
        {/* Övrig info */}
        <div className='col-span-1 sm:col-span-2'>
          <label className='block text-base font-semibold text-gray-800 dark:text-gray-200 mb-1'>
            Behöver vi någon övrig information?
          </label>
          <textarea
            className='w-full p-3 border rounded-lg text-base text-black dark:text-white bg-white dark:bg-[#1f1f1f] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500'
            placeholder='Ange eventuella särskilda önskemål eller detaljer om ditt hem'
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
          ></textarea>
        </div>
        <div className='mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 text-center'>
          {price ? (
            <>
              <div className='text-left text-base text-gray-700 dark:text-gray-200 space-y-3  mx-auto'>
                <div>
                  <span className='font-semibold'>Bostadens storlek:</span>{' '}
                  {kvm} kvm
                </div>
                <div>
                  <span className='font-semibold'>Ugnsrengöring:</span>{' '}
                  {includeOven ? 'Ja (+279 SEK)' : 'Nej'}
                </div>
                <div>
                  <span className='font-semibold'>Kyl/Frys rengöring:</span>{' '}
                  {includeFridge ? 'Ja (+279 SEK)' : 'Nej'}
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
              <div className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
                <h3 className='text-lg font-semibold'>Totalt pris</h3>
                {price}
              </div>
            </>
          ) : null}
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
      </form>
    </div>
  );
}
