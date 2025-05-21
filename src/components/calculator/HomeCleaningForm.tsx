'use client';

import TermsAndConditions from '@/components/TermsAndConditions';
import { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';

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
  const [date, setDate] = useState<Date | null>(null);
  const [termsError, setTermsError] = useState(false);

  // Refs for focusing
  const kvmRef = useRef<HTMLInputElement>(null);
  const accessRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const router = useRouter(); // Initialize useRouter

  // Track touched fields for minimal feedback
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    calculateCleaningCost();
    // eslint-disable-next-line
  }, [kvm, frequency, hasPets, accessOption, date]);

  const isWeekend = (date: Date | null) => {
    if (!date) return false;
    const day = date.getDay();
    return day === 0 || day === 6;
  };

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
    const weekendFee = isWeekend(date) ? 500 : 0;
    const totalPrice = basePrice + petFee + weekendFee;

    setPrice(`${totalPrice} SEK`);
    setDetails({ kvm, frequency, hasPets, accessOption, totalPrice });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Step 3 validation
    const termsValidation = validateStep3();
    if (termsValidation) {
      setTermsError(true);
      termsRef.current?.focus();
      return;
    }
    setTermsError(false);

    if (!details || !accessOption || !name || !email || !phone) {
      return;
    }

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
      Datum: ${date ? date.toLocaleDateString() : ''}
      Totalpris: ${details.totalPrice} SEK
    `;

    try {
      const res = await fetch('/api/cleaning-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          kvm: details.kvm,
          frequency: frequencyLabels[details.frequency] || details.frequency,
          hasPets: details.hasPets ? 'Ja' : 'Nej',
          accessOption:
            details.accessOption === 'home'
              ? 'Jag kommer att vara hemma'
              : details.accessOption === 'leave-key'
                ? 'Jag lämnar nyckeln på ert kontor'
                : 'Ni får mina nycklar',
          date: date ? date.toLocaleDateString() : '',
          totalPrice: `${details.totalPrice} SEK`,
          emailContent,
        }),
      });
      const result = await res.json();
      if (result.status === 'success') {
        router.push('/thank-you'); // Redirect to thank-you page
      } else {
        alert('Något gick fel. Försök igen.');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Serverfel. Kunde inte skicka formuläret.');
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const emailIsValid = validateEmail(email);

  // Step validation
  const canGoNextStep1 =
    kvm &&
    parseInt(kvm, 10) >= 10 &&
    parseInt(kvm, 10) < 240 &&
    frequency &&
    accessOption;
  const canGoNextStep2 = name && email && phone && emailIsValid;

  // Step 1 validation
  function validateStep1() {
    if (!kvm || parseInt(kvm, 10) < 10 || parseInt(kvm, 10) > 239) {
      return { field: 'kvm', message: 'Ange giltig bostadsarea (10-239 kvm).' };
    }
    if (!frequency) {
      return {
        field: 'frequency',
        message: 'Välj hur ofta du vill ha städning.',
      };
    }
    if (!date) {
      return { field: 'date', message: 'Välj ett datum.' };
    }
    if (!accessOption) {
      return { field: 'access', message: 'Välj tillgång till hemmet.' };
    }
    return null;
  }

  // Step 2 validation
  function validateStep2({
    name,
    email,
    phone,
  }: {
    name: string;
    email: string;
    phone: string;
  }) {
    if (!name) return { field: 'name', message: 'Namn är obligatoriskt.' };
    if (!email) return { field: 'email', message: 'E-post är obligatoriskt.' };
    if (!validateEmail(email))
      return { field: 'email', message: 'Ange en giltig e-postadress.' };
    if (!phone) return { field: 'phone', message: 'Telefon är obligatoriskt.' };
    return null;
  }

  // Step 3 validation (terms)
  function validateStep3() {
    if (!accepted) {
      return {
        field: 'terms',
        message: 'Du måste godkänna villkoren för att fortsätta.',
      };
    }
    return null;
  }

  return (
    <div className='w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 rounded-lg shadow-md dark:bg-[#282828f0] bg-[#eeeeee79]'>
      <h2 className='text-3xl font-bold mb-6'>Städning</h2>
      <form
        onSubmit={handleSubmit}
        className='w-full container rounded-lg overflow-hidden'
      >
        <div className='flex flex-col gap-8 p-2'>
          {/* Step 1: Home Info */}
          {step === 1 && (
            <div className='space-y-8'>
              <div>
                <label className='block text-base font-semibold text-gray-800 dark:text-gray-200 mb-1'>
                  Bostadsarea (kvm) <span className='text-red-500'>*</span>
                </label>
                <span className='block text-xs text-gray-500 mb-2'>
                  (obligatorisk)
                </span>
                <input
                  ref={kvmRef}
                  type='number'
                  inputMode='numeric'
                  min={10}
                  max={239}
                  value={kvm}
                  onChange={(e) => setKvm(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, kvm: true }))}
                  className='w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-2 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500'
                  placeholder='Ange kvm'
                  required
                />
                {touched.kvm &&
                  (!kvm ||
                    parseInt(kvm, 10) < 10 ||
                    parseInt(kvm, 10) > 239) && (
                    <span className='text-xs text-red-600'>
                      Obligatoriskt fält (10-239 kvm)
                    </span>
                  )}
              </div>

              <div>
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

              <div>
                <label className='block text-base font-semibold text-gray-800 dark:text-gray-200 mb-1'>
                  Hur ofta vill du ha hemstädning?{' '}
                  <span className='text-red-500'>*</span>
                </label>
                <span className='block text-xs text-gray-500 mb-2'>
                  (obligatorisk)
                </span>
                <div className='flex flex-col gap-2'>
                  <label className='flex items-center justify-between rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-base text-gray-900 dark:text-white'>
                    Varje vecka
                    <input
                      className='h-5 w-5 text-gray-600'
                      type='radio'
                      name='frequency'
                      value='weekly'
                      checked={frequency === 'weekly'}
                      onChange={(e) => setFrequency(e.target.value)}
                    />
                  </label>
                  <label className='flex items-center justify-between rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-base text-gray-900 dark:text-white'>
                    Varannan vecka
                    <input
                      className='h-5 w-5 text-gray-600'
                      type='radio'
                      name='frequency'
                      value='biweekly'
                      checked={frequency === 'biweekly'}
                      onChange={(e) => setFrequency(e.target.value)}
                    />
                  </label>
                  <label className='flex items-center justify-between rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-base text-gray-900 dark:text-white'>
                    Var fjärde vecka
                    <input
                      className='h-5 w-5 text-gray-600'
                      type='radio'
                      name='frequency'
                      value='fourth_week'
                      checked={frequency === 'fourth_week'}
                      onChange={(e) => setFrequency(e.target.value)}
                    />
                  </label>
                  <label className='flex items-center justify-between rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-base text-gray-900 dark:text-white'>
                    Engångsstäd
                    <input
                      className='h-5 w-5 text-gray-600'
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
                <h2 className='text-lg font-bold mb-4'>Välj datum</h2>
                <label className='block text-base font-semibold mb-1 text-gray-800 dark:text-gray-200'>
                  Välj datum <span className='text-red-500'>*</span>
                </label>
                <span className='block text-xs text-gray-500 mb-2'>
                  (obligatorisk)
                </span>
                <div className='relative w-full'>
                  <DatePicker
                    placeholderText='Välj datum'
                    selected={date}
                    onChange={(date) => setDate(date)}
                    onBlur={() => setTouched((t) => ({ ...t, date: true }))}
                    dateFormat='yyyy-MM-dd'
                    className='w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-black shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#1f1f1f]'
                    calendarClassName='!w-full'
                    wrapperClassName='w-full'
                  />
                </div>
                {isWeekend(date) && (
                  <p className='text-base text-red-600 mt-2'>
                    OBS! Städning på helg tillkommer en avgift på 500 SEK.
                  </p>
                )}
              </div>

              <div>
                <label className='block text-base font-semibold text-gray-800 dark:text-gray-200 mb-1'>
                  Tillgång till ditt hem <span className='text-red-500'>*</span>
                </label>
                <span className='block text-xs text-gray-500 mb-2'>
                  (obligatorisk)
                </span>
                <div className='flex flex-col gap-2'>
                  <label className='flex items-center justify-between rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-base text-gray-900 dark:text-white'>
                    Jag kommer att vara hemma
                    <input
                      className='h-5 w-5 text-gray-600'
                      type='radio'
                      name='access'
                      value='home'
                      checked={accessOption === 'home'}
                      onChange={(e) => setAccessOption(e.target.value)}
                    />
                  </label>
                  <label className='flex items-center justify-between rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-base text-gray-900 dark:text-white'>
                    Jag lämnar nyckeln på ert kontor senast kl. 12 två
                    arbetsdagar innan
                    <input
                      className='h-5 w-5 text-gray-600'
                      type='radio'
                      name='access'
                      value='leave-key'
                      checked={accessOption === 'leave-key'}
                      onChange={(e) => setAccessOption(e.target.value)}
                    />
                  </label>
                  <label className='flex items-center justify-between rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-base text-gray-900 dark:text-white'>
                    Ni får mina nycklar
                    <input
                      className='h-5 w-5 text-gray-600'
                      type='radio'
                      name='access'
                      value='have-keys'
                      checked={accessOption === 'have-keys'}
                      onChange={(e) => setAccessOption(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className='flex justify-end gap-2 pt-6'>
                <button
                  type='button'
                  className='px-6 py-2 rounded-xl bg-blue-600 text-white font-bold shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition disabled:opacity-50'
                  onClick={() => {
                    const error = validateStep1();
                    if (error) {
                      // Focus the problematic field
                      if (error.field === 'kvm') kvmRef.current?.focus();
                      if (error.field === 'date') dateRef.current?.focus();
                      if (error.field === 'access') accessRef.current?.focus();
                      return;
                    }
                    setStep(2);
                  }}
                >
                  Nästa
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Customer Info */}
          {step === 2 && (
            <div className='space-y-8'>
              <div>
                <label
                  className='block text-base font-semibold text-gray-800 dark:text-gray-200 mb-1'
                  htmlFor='name'
                >
                  Namn <span className='text-red-500'>*</span>
                </label>
                <span className='block text-xs text-gray-500 mb-2'>
                  (obligatorisk)
                </span>
                <input
                  id='name'
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                  className='w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-2 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500'
                  placeholder='Ditt namn'
                  required
                  ref={nameRef}
                />
                {touched.name && !name && (
                  <span className='text-xs text-red-600'>
                    Obligatoriskt fält
                  </span>
                )}
              </div>
              <div>
                <label
                  className='block text-base font-semibold text-gray-800 dark:text-gray-200 mb-1'
                  htmlFor='email'
                >
                  E-post <span className='text-red-500'>*</span>
                </label>
                <span className='block text-xs text-gray-500 mb-2'>
                  (obligatorisk)
                </span>
                <input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  className={`w-full rounded-lg border ${email && !emailIsValid ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-[#1f1f1f] px-4 py-2 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500`}
                  placeholder='din@email.se'
                  required
                  ref={emailRef}
                />
                {touched.email && (!email || !emailIsValid) && (
                  <span className='text-xs text-red-600'>
                    {!email
                      ? 'Obligatoriskt fält'
                      : 'Ange en giltig e-postadress'}
                  </span>
                )}
              </div>
              <div>
                <label
                  className='block text-base font-semibold text-gray-800 dark:text-gray-200 mb-1'
                  htmlFor='phone'
                >
                  Telefon <span className='text-red-500'>*</span>
                </label>
                <span className='block text-xs text-gray-500 mb-2'>
                  (obligatorisk)
                </span>
                <input
                  id='phone'
                  type='tel'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                  className='w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-2 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500'
                  placeholder='070-123 45 67'
                  required
                  ref={phoneRef}
                />
                {touched.phone && !phone && (
                  <span className='text-xs text-red-600'>
                    Obligatoriskt fält
                  </span>
                )}
              </div>

              <h2 className='text-lg font-bold mb-4'>Om ditt hem</h2>
              <div>
                <label className='block text-base font-semibold text-gray-800 dark:text-gray-200 mb-1'>
                  Finns det något du vill informera oss om angående ditt hem?
                </label>
                <textarea
                  className='w-full p-3 border rounded-lg text-base'
                  placeholder='Ange eventuella särskilda önskemål eller detaljer om ditt hem'
                ></textarea>
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
                  onClick={() => {
                    const error = validateStep2({ name, email, phone });
                    if (error) {
                      // Focus the problematic field
                      if (error.field === 'name') nameRef.current?.focus();
                      if (error.field === 'email') emailRef.current?.focus();
                      if (error.field === 'phone') phoneRef.current?.focus();
                      return;
                    }
                    setStep(3);
                  }}
                >
                  Nästa
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Summary & Submit */}
          {step === 3 && (
            <div className='space-y-8'>
              <h3 className='text-xl font-bold mb-4'>Sammanfattning</h3>
              {details ? (
                <div className='space-y-3 text-base'>
                  <div className='flex justify-between'>
                    <strong className='font-semibold'>Namn:</strong> {name}
                  </div>
                  <div className='flex justify-between'>
                    <strong className='font-semibold'>E-post:</strong> {email}
                  </div>
                  <div className='flex justify-between'>
                    <strong className='font-semibold'>Telefon:</strong> {phone}
                  </div>
                  <div className='flex justify-between'>
                    <strong className='font-semibold'>Storlek:</strong>{' '}
                    {details.kvm} kvm
                  </div>
                  <div className='flex justify-between'>
                    <strong className='font-semibold'>Frekvens:</strong>{' '}
                    {frequencyLabels[details.frequency] || details.frequency}
                  </div>
                  <div className='flex justify-between'>
                    <strong className='font-semibold'>Husdjur:</strong>{' '}
                    {details.hasPets ? 'Ja' : 'Nej'}
                  </div>
                  <div className='flex justify-between'>
                    <strong className='font-semibold'>Tillgång:</strong>{' '}
                    {details.accessOption === 'home'
                      ? 'Jag kommer att vara hemma'
                      : details.accessOption === 'leave-key'
                        ? 'Jag lämnar nyckeln på ert kontor'
                        : 'Ni får mina nycklar'}
                  </div>
                  <div className='flex justify-between'>
                    <strong className='font-semibold'>Pris:</strong> {price}
                  </div>
                </div>
              ) : (
                <p className='text-gray-500'>
                  Fyll i formuläret för att se pris
                </p>
              )}
              <TermsAndConditions
                checked={accepted}
                onChange={(val) => {
                  setAccepted(val);
                  setTermsError(false);
                }}
                ref={termsRef}
                error={termsError}
              />
              {termsError && (
                <span className='text-xs text-red-600'>
                  Du måste godkänna villkoren för att fortsätta.
                </span>
              )}
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
                  disabled={!accepted || !validateEmail(email)}
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
