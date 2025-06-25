'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import Address from '@/components/Addres';
import TermsAndConditions from '@/components/TermsAndConditions';

const cleaningPrices = [
  { minKvm: 0, maxKvm: 20, price: 1699 },
  { minKvm: 21, maxKvm: 25, price: 1899 },
  { minKvm: 26, maxKvm: 30, price: 2099 },
  { minKvm: 31, maxKvm: 35, price: 2249 },
  { minKvm: 36, maxKvm: 40, price: 2349 },
  { minKvm: 41, maxKvm: 45, price: 2499 },
  { minKvm: 46, maxKvm: 50, price: 2649 },
  { minKvm: 51, maxKvm: 60, price: 2949 },
  { minKvm: 61, maxKvm: 65, price: 3149 },
  { minKvm: 66, maxKvm: 70, price: 3399 },
  { minKvm: 71, maxKvm: 75, price: 3599 },
  { minKvm: 76, maxKvm: 80, price: 3649 },
  { minKvm: 81, maxKvm: 85, price: 3849 },
  { minKvm: 86, maxKvm: 90, price: 4099 },
  { minKvm: 91, maxKvm: 95, price: 4149 },
  { minKvm: 96, maxKvm: 100, price: 4249 },
  { minKvm: 101, maxKvm: 110, price: 4449 },
  { minKvm: 111, maxKvm: 115, price: 4649 },
  { minKvm: 116, maxKvm: 125, price: 4999 },
  { minKvm: 126, maxKvm: 135, price: 5349 },
  { minKvm: 136, maxKvm: 140, price: 5499 },
  { minKvm: 141, maxKvm: 145, price: 5749 },
  { minKvm: 146, maxKvm: 150, price: 5899 },
  { minKvm: 151, maxKvm: 160, price: 6199 },
  { minKvm: 161, maxKvm: 170, price: 6499 },
  { minKvm: 171, maxKvm: 180, price: 6649 },
  { minKvm: 181, maxKvm: 190, price: 6899 },
  { minKvm: 191, maxKvm: 200, price: 7499 },
  { minKvm: 201, maxKvm: 210, price: 7649 },
  { minKvm: 211, maxKvm: 220, price: 7849 },
  { minKvm: 221, maxKvm: 230, price: 8099 },
  { minKvm: 231, maxKvm: 240, price: 8399 },
  { minKvm: 241, maxKvm: 250, price: 8699 },
  { minKvm: 251, maxKvm: 260, price: 8999 },
  // 261+ is "offertfrågan"
];

function isWeekend(date: Date | null) {
  if (!date) return false;
  const day = date.getDay();
  return day === 0 || day === 6;
}

export default function MoveCleaningForm() {
  const [accessOption, setAccessOption] = useState('');
  const [kvm, setKvm] = useState('');
  const [hasPets, setHasPets] = useState(false);
  const [price, setPrice] = useState<string | null>(null);
  const [details, setDetails] = useState<{
    kvm: string;
    hasPets: boolean;
    accessOption: string;
    totalPrice: number;
  } | null>(null);
  const [addressFields, setAddressFields] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
  });
  const [name] = useState('');
  const [email] = useState('');
  const [phone] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [extraInfo, setExtraInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const termsRef = useRef<HTMLInputElement>(null); // Use useRef for ref
  const router = useRouter(); // Initialize useRouter

  const [addressError] = useState<Partial<typeof addressFields>>({});

  useEffect(() => {
    calculateCleaningCost();
    // eslint-disable-next-line
  }, [kvm, hasPets, accessOption]);

  const calculateCleaningCost = () => {
    const numericKvm = parseInt(kvm, 10);
    if (!numericKvm || numericKvm < 10) {
      setPrice(null);
      setDetails(null);
      return;
    }
    if (numericKvm > 260) {
      setPrice('Kontakta oss för offert');
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

    const totalPrice = tier.price;
    setPrice(`${totalPrice} SEK`);
    setDetails({ kvm, hasPets, accessOption, totalPrice });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTermsError(false);

    if (!accepted) {
      setTermsError(true);
      termsRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (!details || !accessOption || !name || !email || !phone) {
      alert('Fyll i alla obligatoriska fält.');
      return;
    }

    setLoading(true); // <-- Start loading

    const formattedDate = date ? date.toLocaleDateString('sv-SE') : '';

    const emailContent = `
      Namn: ${name}
      E-post: ${email}
      Telefon: ${phone}
      Bostadsarea: ${details.kvm} kvm
      Husdjur: ${details.hasPets ? 'Ja' : 'Nej'}
      Tillgång till hemmet: ${
        details.accessOption === 'home'
          ? 'Jag kommer att vara hemma'
          : details.accessOption === 'leave-key'
            ? 'Jag lämnar nyckeln på ert kontor'
            : 'Ni får mina nycklar'
      }
      Datum: ${formattedDate}
      Totalpris: ${details.totalPrice} SEK
    `;

    try {
      const res = await fetch('/api/move-cleaning-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          kvm: details.kvm,
          hasPets: details.hasPets ? 'Ja' : 'Nej',
          accessOption:
            details.accessOption === 'home'
              ? 'Jag kommer att vara hemma'
              : details.accessOption === 'leave-key'
                ? 'Jag lämnar nyckeln på ert kontor'
                : 'Ni får mina nycklar',
          date: formattedDate,
          totalPrice: `${details.totalPrice} SEK`,
          emailContent,
        }),
      });
      const result = await res.json();
      if (result.status === 'success') {
        setTimeout(() => {
          setLoading(false); // <-- Stop loading after delay
          router.push('/thank-you');
        }, 500); // Optional: short delay for smoothness
      } else {
        setLoading(false); // <-- Stop loading on error
        alert('Något gick fel. Försök igen.');
      }
    } catch (err) {
      setLoading(false); // <-- Stop loading on error
      console.error('Error submitting form:', err);
      alert('Serverfel. Kunde inte skicka formuläret.');
    }
  };

  return (
    <div className='w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 rounded-lg shadow-md dark:bg-[#282828f0] bg-[#d8d8d879]'>
      <h2 className='text-3xl font-bold mb-8 text-center'>Flyttstädning</h2>

      <form
        onSubmit={handleSubmit}
        className='w-full rounded-lg overflow-hidden'
      >
        <div className='flex flex-col gap-8 p-2'>
          {/* KVM */}
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

          <Address
            value={addressFields}
            onChange={setAddressFields}
            required
            error={addressError}
          />
          {/* Datum */}
          <div>
            <label className='block text-base font-semibold mb-1 text-gray-800 dark:text-gray-200'>
              Välj önskat datum <span className='text-red-500'>*</span>
            </label>
            <span className='block text-xs text-gray-500 mb-2'>
              (obligatorisk)
            </span>
            <div className='relative w-full react-datepicker__input-container datepicker-input-width'>
              <DatePicker
                required
                placeholderText='Välj önskat datum'
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat='yyyy-MM-dd'
                className='w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-black shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#1f1f1f]'
              />
            </div>
            {isWeekend(date) && (
              <div className='text-xs text-red-600 mt-1'>
                OBS! Städning på helg tillkommer en avgift på 500 SEK.
              </div>
            )}
          </div>
          {/* Tillgång till hemmet */}
          <div className='col-span-1 sm:col-span-2'>
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
        </div>

        {/* Summary Section */}
        <div className='mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 text-center'>
          <h3 className='text-lg font-bold mb-4'>Totalt pris</h3>
          {price ? (
            <>
              <div className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
                {price}
              </div>
              <div className='text-left text-base text-gray-700 dark:text-gray-200 space-y-3  mx-auto'>
                <div>
                  <span className='font-semibold'>Bostadens storlek:</span>{' '}
                  {kvm} kvm
                </div>
                <div>
                  <span className='font-semibold'>Ugnsrengöring:</span> Ja
                </div>
                <div>
                  <span className='font-semibold'>Kyl/Frys rengöring:</span> Ja
                </div>
                <div>
                  <span className='font-semibold'>Fönsterputsning:</span> Ja
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
                {extraInfo && (
                  <div>
                    <span className='font-semibold'>Övrig info:</span>{' '}
                    {extraInfo}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className='text-gray-500'>Fyll i bostadens storlek</div>
          )}
        </div>

        {/* Terms and submit button */}
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
          className='w-full py-3 rounded-lg bg-gray-800 text-white font-semibold hover:bg-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300 flex items-center justify-center mt-6 text-base'
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
        <p className='text-xs text-center pt-4'>
          *Alla fält måste fyllas i för att fortsätta
        </p>
      </form>
    </div>
  );
}
