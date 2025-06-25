'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter
import { useRef, useState } from 'react';

import TermsAndConditions from '@/components/TermsAndConditions';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    orgNumber: '',
    message: '',
    phone: '',
    email: '',
  });

  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const termsRef = useRef<HTMLInputElement>(null);
  const router = useRouter(); // Initialize useRouter

  interface ChangeEvent {
    target: {
      name: string;
      value: string;
    };
  }

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.orgNumber ||
      !formData.message ||
      !formData.phone ||
      !formData.email
    ) {
      setStatus('All fields are required!');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setStatus('');

    const formattedPhone = formData.phone.replace(
      /(\d{3})(\d{3})(\d{3})/,
      '+46 $1-$2-$3',
    );

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        orgNumber: formData.orgNumber,
        message: formData.message,
        phone: formattedPhone,
        email: formData.email,
      }),
    });

    const result = await response.json();

    if (result.status === 'success') {
      setFormData({
        firstName: '',
        lastName: '',
        orgNumber: '',
        message: '',
        phone: '',
        email: '',
      });
      setStatus(''); // Clear status
      router.push('/thank-you'); // Redirect to thank-you page
    } else {
      setStatus('Ett fel uppstod. Försök igen.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className='max-w-4xl mx-auto py-3 p-2 md:p-6 shadow-lg rounded-lg dark:bg-[#2a2a2a] '>
      <h2 className='text-2xl font-semibold mb-4 '>Kontakta oss</h2>
      <form onSubmit={handleSubmit}>
        <div className='grid gap-6'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            <div>
              <label className='block font-medium'>
                Namn: <span className='text-red-500'>*</span>
              </label>{' '}
              <span className='block text-xs text-gray-500 mb-2'>
                (obligatorisk)
              </span>
              <input
                type='text'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                className='w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-2 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500'
                required
              />
            </div>
            <div>
              <label className='block font-medium'>
                Efternamn: <span className='text-red-500'>*</span>
              </label>
              <span className='block text-xs text-gray-500 mb-2'>
                (obligatorisk)
              </span>
              <input
                type='text'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                className='w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-2 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500'
                required
              />
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            <div>
              <label className='block font-medium'>
                Telefonnummer: <span className='text-red-500'>*</span>
              </label>
              <span className='block text-xs text-gray-500 mb-2'>
                (obligatorisk)
              </span>
              <input
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                className='w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-2 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500'
                required
              />
            </div>
            <div>
              <label className='block font-medium'>Org-nummer:</label>
              <span className='block text-xs text-gray-500 mb-2'>
                (valfritt)
              </span>
              <input
                type='text'
                name='orgNumber'
                value={formData.orgNumber}
                onChange={handleChange}
                className='w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-2 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500'
              />
            </div>
          </div>

          <div>
            <label className='block font-medium'>
              Email: <span className='text-red-500'>*</span>
            </label>
            <span className='block text-xs text-gray-500 mb-2'>
              (obligatorisk)
            </span>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-2 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500'
              required
            />
          </div>

          <div>
            <label className='block font-medium'>
              Meddelande: <span className='text-red-500'>*</span>
            </label>
            <span className='block text-xs text-gray-500 mb-2'>
              (obligatorisk)
            </span>
            <textarea
              name='message'
              value={formData.message}
              onChange={handleChange}
              className='w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-2 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500'
              required
            ></textarea>
          </div>
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
        >
          <span>
            Jag accepterar{' '}
            <Link
              href='/bygg-conditions'
              target='_blank'
              rel='noopener noreferrer'
              className='underline text-blue-600 hover:text-blue-800'
            >
              villkoren
            </Link>
            .
          </span>
        </TermsAndConditions>
        <button
          type='submit'
          className='w-full py-3 rounded-lg bg-gray-800 text-white font-semibold hover:bg-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300 flex items-center justify-center mt-6 text-base'
          disabled={isSubmitting}
        >
          {isSubmitting ? (
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
        {status && <p className='text-center text-red-600 mt-2'>{status}</p>}
      </form>
    </div>
  );
}
