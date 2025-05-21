'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
  const [emailLog, setEmailLog] = useState<string | null>(null); // <-- Add this line
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
    setStatus('');
    setLoading(true);

    // Validate required fields
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.orgNumber ||
      !formData.message ||
      !formData.phone ||
      !formData.email
    ) {
      setStatus('Alla fält måste fyllas i!');
      setLoading(false);
      return;
    }

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('Ange en giltig e-postadress.');
      setLoading(false);
      return;
    }

    // Prepare payload
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      orgNumber: formData.orgNumber,
      message: formData.message,
      phone: formData.phone,
      email: formData.email,
    };

    try {
      const res = await fetch('/api/office-clean', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.status === 'success') {
        setTimeout(() => {
          setLoading(false);
          setFormData({
            firstName: '',
            lastName: '',
            orgNumber: '',
            message: '',
            phone: '',
            email: '',
          });
          router.push('/thank-you');
        }, 500);
      } else {
        setLoading(false);
        setStatus('Något gick fel. Försök igen.');
      }
    } catch (err) {
      setLoading(false);
      setStatus('Serverfel. Kunde inte skicka formuläret.');
    }
  };

  return (
    <div className='max-w-4xl mx-auto py-3 p-2 md:p-6 shadow-lg rounded-lg dark:bg-[#2a2a2a] '>
      <h2 className='text-2xl font-semibold mb-4 '>Kontakta oss</h2>
      <form onSubmit={handleSubmit}>
        <div className='grid gap-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block font-medium'>
                Namn: <span className='text-red-500'>*</span>
              </label>
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

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block font-medium'>
                Telefonnummer: <span className='text-red-500'>*</span>
              </label>
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
              <label className='block font-medium'>
                Org-nummer: <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='orgNumber'
                value={formData.orgNumber}
                onChange={handleChange}
                className='w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-2 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500'
                required
              />
            </div>
          </div>

          <div>
            <label className='block font-medium'>
              Email: <span className='text-red-500'>*</span>
            </label>
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
            <textarea
              name='message'
              value={formData.message}
              onChange={handleChange}
              className='w-full rounded-lg mb-4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-2 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500'
              required
            ></textarea>
          </div>
        </div>
        <button
          type='submit'
          className='w-full pt-4 py-3 rounded-xl bg-gray-800 text-white font-semibold hover:bg-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300 flex items-center justify-center'
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
