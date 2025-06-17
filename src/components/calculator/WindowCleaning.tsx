import Address from '@/components/Addres';
import TermsAndConditions from '@/components/TermsAndConditions';
import DatePicker from 'react-datepicker';
import React, { useState, useRef } from 'react';

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

function isWeekend(date: Date | null) {
  if (!date) return false;
  const day = date.getDay();
  return day === 0 || day === 6;
}

const WindowCleaningCalculator = () => {
  const [type, setType] = useState<CleaningType>('Utan spröjs, 2 sidor');
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [bleck, setBleck] = useState<number | undefined>(undefined);
  const [karm, setKarm] = useState<number | undefined>(undefined);
  const [stege, setStege] = useState<boolean>(false);
  const [extraInfo, setExtraInfo] = useState('');
  const [date, setDate] = useState<Date | null>(null);

  // Address/contact info
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

  const [accepted, setAccepted] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const termsRef = useRef<HTMLInputElement>(null);

  const { start, price } = cleaningTypes[type];

  const total =
    start +
    (amount ?? 0) * price +
    (bleck ?? 0) * 10 +
    (karm ?? 0) * 15 +
    (stege ? 240 : 0) +
    (date && isWeekend(date) ? 500 : 0);

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

    const addressValidation = validateAddressFields(addressFields);

    if (
      amount === undefined ||
      Object.keys(addressValidation).length > 0 ||
      !accepted
    ) {
      setAddressError(addressValidation);
      setTermsError(!accepted);
      if (!accepted) termsRef.current?.focus();
      alert('Fyll i alla obligatoriska fält innan du skickar formuläret.');
      return;
    }

    setAddressError({});
    setLoading(true);

    const formattedDate = date ? date.toLocaleDateString('sv-SE') : '';

    const emailContent = `
      Namn: ${addressFields.name}
      E-post: ${addressFields.email}
      Telefon: ${addressFields.phone}
      Adress: ${addressFields.address}
      Postnummer: ${addressFields.postalCode}
      Stad: ${addressFields.city}
      Typ av fönster: ${type}
      Antal fönster: ${amount}
      Fönsterbleck: ${bleck ?? 0}
      Karmtvätt: ${karm ?? 0}
      Behöver stege: ${stege ? 'Ja' : 'Nej'}
      Datum: ${formattedDate}
      Extra info: ${extraInfo}
      Totalt pris: ${total} kr
    `;

    try {
      const res = await fetch('/api/window-cleaning-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...addressFields,
          type,
          amount,
          bleck: bleck ?? 0,
          karm: karm ?? 0,
          stege,
          date: formattedDate,
          extraInfo: extraInfo,
          total,
          emailContent,
        }),
      });
      const result = await res.json();
      setLoading(false);
      if (result.status === 'success') {
        alert('Formuläret har skickats!');
        // Optionally reset form here
      } else {
        alert('Något gick fel. Försök igen.');
      }
    } catch (err) {
      setLoading(false);
      alert('Serverfel. Kunde inte skicka formuläret.');
    }
  };

  return (
    <div className='w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 rounded-lg shadow-md dark:bg-[#282828f0] bg-[#d8d8d879]'>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <h2 className='text-3xl font-bold mb-6'>Fönsterputs</h2>

        <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 tracking-wide'>
              Typ av fönster: <span className='text-red-500'>*</span>
            </label>
            <span className='block text-xs text-gray-500 mb-2'>
              (obligatorisk)
            </span>
            <select
              required
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
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 tracking-wide'>
              Antal fönster: <span className='text-red-500'>*</span>
            </label>
            <span className='block text-xs text-gray-500 mb-2'>
              (obligatorisk)
            </span>
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

          <div className='col-span-1 sm:col-span-2 mt-2'>
            <div className='flex items-center space-x-2'>
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
          {/* Övrig info */}
          <div className='col-span-1 sm:col-span-2'>
            <label className='block text-base font-semibold text-gray-800 dark:text-gray-200 mb-1'>
              Välj önskat datum <span className='text-red-500'>*</span>
            </label>
            <DatePicker
              placeholderText='Välj datum'
              selected={date}
              onChange={setDate}
              dateFormat='yyyy-MM-dd'
              className='w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-black shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#1f1f1f]'
              calendarClassName='!w-full'
              wrapperClassName='w-full'
              required
            />
            {date && isWeekend(date) && (
              <p className='text-base text-red-600 mt-2'>
                OBS! Städning på helg tillkommer en avgift på 500 SEK.
              </p>
            )}
          </div>
          <div className='col-span-1 sm:col-span-2'>
            <label className='block text-base font-semibold text-gray-800 dark:text-gray-200 mb-1'>
              Finns det något du vill informera oss om angående dina fönstrar?
            </label>
            <textarea
              className='w-full p-3 border rounded-lg text-base text-black dark:text-white bg-white dark:bg-[#1f1f1f] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500'
              placeholder='Ange eventuella särskilda önskemål eller detaljer om ditt hem'
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
              rows={3}
            ></textarea>
          </div>
        </div>
        <Address
          value={addressFields}
          onChange={setAddressFields}
          required
          error={addressError}
        />

        {/* Summary */}
        <div className='mt-8 p-4 rounded-lg bg-gray-100 dark:bg-[#232323] border border-gray-200 dark:border-gray-700'>
          <h4 className='font-bold mb-2 text-gray-800 dark:text-gray-100'>
            Sammanfattning
          </h4>
          <ul className='text-base text-gray-700 dark:text-gray-200 space-y-1'>
            <li>
              <span className='font-semibold'>Typ av fönster:</span> {type}
            </li>
            <li>
              <span className='font-semibold'>Antal fönster:</span>{' '}
              {amount ?? 0}
            </li>
            <li>
              <span className='font-semibold'>Fönsterbleck:</span> {bleck ?? 0}
            </li>
            <li>
              <span className='font-semibold'>Karmtvätt:</span> {karm ?? 0}
            </li>
            <li>
              <span className='font-semibold'>Behöver stege:</span>{' '}
              {stege ? 'Ja' : 'Nej'}
            </li>
            <li>
              <span className='font-semibold'>Namn:</span> {addressFields.name}
            </li>
            <li>
              <span className='font-semibold'>E-post:</span>{' '}
              {addressFields.email}
            </li>
            <li>
              <span className='font-semibold'>Telefon:</span>{' '}
              {addressFields.phone}
            </li>
            <li>
              <span className='font-semibold'>Adress:</span>{' '}
              {addressFields.address}
            </li>
            <li>
              <span className='font-semibold'>Postnummer:</span>{' '}
              {addressFields.postalCode}
            </li>
            <li>
              <span className='font-semibold'>Stad:</span> {addressFields.city}
            </li>
            <li>
              <span className='font-semibold'>Datum:</span>{' '}
              {date instanceof Date && !isNaN(date.getTime())
                ? date.toLocaleDateString('sv-SE')
                : ''}
              {date && isWeekend(date) && (
                <span className='text-red-600'> (Helgtillägg +500 SEK)</span>
              )}
            </li>
            <li>
              <span className='font-semibold'>Övrig info:</span> {extraInfo}
            </li>
            <li>
              <span className='font-semibold text-xl '>Totalt pris:</span>{' '}
              {amount !== undefined ? `${total} kr` : '—'}
            </li>
          </ul>
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
};

export default WindowCleaningCalculator;
