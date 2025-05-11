'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

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
    <div className='max-w-4xl mx-auto py-3 md:p-6 shadow-lg rounded-lg'>
      <h2 className='text-2xl font-semibold mb-4 text-center'>Kontakta oss</h2>
      <form onSubmit={handleSubmit}>
        <div className='grid gap-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block font-medium'>Namn:</label>
              <input
                type='text'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                className='w-full p-3 border border-gray-300 rounded-md text-black'
                required
              />
            </div>
            <div>
              <label className='block font-medium'>Efternamn:</label>
              <input
                type='text'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                className='w-full p-3 border border-gray-300 rounded-md text-black'
                required
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block font-medium'>Telefonnummer:</label>
              <input
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                className='w-full p-3 border border-gray-300 rounded-md text-black'
                required
              />
            </div>
            <div>
              <label className='block font-medium'>Org-nummer:</label>
              <input
                type='text'
                name='orgNumber'
                value={formData.orgNumber}
                onChange={handleChange}
                className='w-full p-3 border border-gray-300 rounded-md text-black'
                required
              />
            </div>
          </div>

          <div>
            <label className='block font-medium'>Email:</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded-md text-black'
              required
            />
          </div>

          <div>
            <label className='block font-medium'>Meddelande:</label>
            <textarea
              name='message'
              value={formData.message}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded-md text-black'
              required
            ></textarea>
          </div>
        </div>

        <div className='mt-6 text-center'>
          <button
            type='submit'
            disabled={isSubmitting}
            className='bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 disabled:opacity-50'
          >
            {isSubmitting ? 'Skickar...' : 'Skicka meddelande'}
          </button>
        </div>
      </form>

      {status && (
        <p
          className={`mt-4 text-center text-sm font-semibold ${
            status.includes('skickats') ? 'text-green-600' : 'text-red-500'
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
}
