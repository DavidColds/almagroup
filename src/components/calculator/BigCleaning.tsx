import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import { sv } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState<Date | null>(null); // Ensure date is a Date object
  const [accepted, setAccepted] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const numericKvm = parseInt(kvm.replace(/\D/g, ''), 10);
    if (isNaN(numericKvm) || numericKvm <= 0) {
      alert('Fyll i en giltig bostadsstorlek innan du skickar formuläret.');
      setLoading(false);
      return;
    }

    if (!name || !email || !phone || !date) {
      alert('Fyll i alla obligatoriska fält.');
      setLoading(false);
      return;
    }

    const payload = {
      kvm: numericKvm,
      includeOven,
      includeFridge,
      price: price || 'Ej tillgängligt',
      name,
      email,
      phone,
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
          <label className='block text-m  font-medium text-gray-700 dark:text-gray-300 mb-1 tracking-wide'>
            Bostadens storlek (kvm)
          </label>
          <span className='text-s text-gray-500 pb-2 block mb-2'>
            (obligatorisk)
          </span>{' '}
          <input
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            value={kvm}
            onChange={(e) => setKvm(e.target.value)}
            placeholder='Ex. 75'
            required
            className='w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-3 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#1f1f1f]'
          />
        </div>

        <div className='space-y-4'>
          <label className='flex items-center justify-between rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-white'>
            <span>Ugnsrengöring (+279 SEK)</span>
            <input
              type='checkbox'
              checked={includeOven}
              onChange={() => setIncludeOven(!includeOven)}
              className=' h-5 w-5 text-gray-600'
            />
          </label>
          <label className='flex items-center justify-between rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-white'>
            <span>Kyl/Frys rengöring (+279 SEK)</span>
            <input
              type='checkbox'
              checked={includeFridge}
              onChange={() => setIncludeFridge(!includeFridge)}
              className=' h-5 w-5 text-gray-600'
            />
          </label>
        </div>

        <div className='space-y-4'>
          <h3 className='text-xl font-bold'>Kontaktuppgifter</h3>
          <div>
            <label className='block text-m  font-medium text-gray-700 dark:text-gray-300 mb-1 tracking-wide'>
              Namn
            </label>
            <span className='text-s text-gray-500 pb-2 block mb-2'>
              (obligatorisk)
            </span>{' '}
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-3 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#1f1f1f]'
              placeholder='Ditt namn'
              required
            />
          </div>
          <div>
            <label className='block text-m  font-medium text-gray-700 dark:text-gray-300 mb-1 tracking-wide'>
              Email
            </label>
            <span className='text-s text-gray-500 pb-2 block mb-2'>
              (obligatorisk)
            </span>{' '}
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-3 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#1f1f1f]'
              placeholder='Din email'
              required
            />
          </div>
          <div>
            <label className='block text-m  font-medium text-gray-700 dark:text-gray-300 mb-1 tracking-wide'>
              Telefonnummer
            </label>
            <span className='text-s text-gray-500 pb-2 block mb-2'>
              (obligatorisk)
            </span>{' '}
            <input
              type='tel'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className='w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-3 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#1f1f1f]'
              placeholder='Ditt telefonnummer'
              required
            />
          </div>
        </div>

        <div className='w-full'>
          <label className='block text-m  font-medium mb-1 tracking-wide text-gray-700 dark:text-gray-300'>
            Välj önskat datum
          </label>
          <span className='text-s text-gray-500 pb-2 block mb-2'>
            (obligatorisk)
          </span>{' '}
          <div className='relative w-full react-datepicker__input-container datepicker-input-width '>
            <DatePicker
              required
              placeholderText='Välj önskat datum'
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat='yyyy-MM-dd'
              className='w-full rounded-md border border-gray-300 px-4 py-3 text-m  text-black shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#1f1f1f]'
            />
          </div>
          {isWeekend(date) && (
            <div className='text-xs text-red-600 mt-1'>
              OBS! Städning på helg tillkommer en avgift på 500 SEK.
            </div>
          )}
        </div>

        <div className='mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 text-center'>
          <h3 className='text-lg font-semibold'>Totalt pris</h3>
          {price ? (
            <>
              <div className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
                {price}
              </div>
              <div className='text-left text-base text-gray-700 dark:text-gray-200 space-y-3 max-w-md mx-auto'>
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
                  <span className='font-semibold'>Namn:</span> {name}
                </div>
                <div>
                  <span className='font-semibold'>E-post:</span> {email}
                </div>
                <div>
                  <span className='font-semibold'>Telefon:</span> {phone}
                </div>
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
      </form>
    </div>
  );
}
