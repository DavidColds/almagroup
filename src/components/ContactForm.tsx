import { useState } from 'react';

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

  interface FormData {
    firstName: string;
    lastName: string;
    orgNumber: string;
    message: string;
    phone: string;
    email: string;
  }

  interface ChangeEvent {
    target: {
      name: string;
      value: string;
    };
  }

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevFormData: FormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  interface SubmitEvent {
    preventDefault: () => void;
  }

  interface ApiResponse {
    status: string;
  }

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    // Simple validation
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

    // Validate email format using regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('Please enter a valid email address.');
      return;
    }

    // Format phone number
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
        name: formData.firstName,
        lastName: formData.lastName,
        orgNumber: formData.orgNumber,
        message: formData.message,
        phone: formattedPhone,
        email: formData.email,
      }),
    });

    const result: ApiResponse = await response.json();
    if (result.status === 'success') {
      setStatus('Your message has been sent successfully!');
    } else {
      setStatus('There was an error sending your message.');
    }
  };

  return (
    <div className='max-w-4xl mx-auto py-3 md:p-6  shadow-lg rounded-lg'>
      <h2 className='text-2xl font-semibold mb-4 text-center'>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className='grid gap-4'>
          <div>
            <label htmlFor='firstName' className='block font-medium '>
              Namn:
            </label>
            <input
              type='text'
              id='firstName'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded-md'
              required
            />
          </div>
          <div>
            <label htmlFor='lastName' className='block font-medium '>
              Efternamn:
            </label>
            <input
              type='text'
              id='lastName'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded-md'
              required
            />
          </div>
          <div>
            <label htmlFor='phone' className='block font-medium '>
              Telefonnummer (+46 xxx-xxx-xxx):
            </label>
            <input
              type='tel'
              id='phone'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded-md'
              required
            />
          </div>
          <div>
            <label htmlFor='email' className='block font-medium '>
              Email:
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded-md'
              required
            />
          </div>
          <div>
            <label htmlFor='orgNumber' className='block font-medium '>
              Org-nummer:
            </label>
            <input
              type='text'
              id='orgNumber'
              name='orgNumber'
              value={formData.orgNumber}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded-md'
              required
            />
          </div>
          <div>
            <label htmlFor='message' className='block font-medium '>
              Meddelande:
            </label>
            <textarea
              id='message'
              name='message'
              value={formData.message}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded-md'
              required
            ></textarea>
          </div>
        </div>

        <div className='mt-6 text-center'>
          <button
            type='submit'
            className=' py-2 px-6 rounded-md hover:bg-blue-600'
          >
            Skicka meddelande
          </button>
        </div>
      </form>

      {status && (
        <p className='mt-4 text-center text-sm font-semibold'>{status}</p>
      )}
    </div>
  );
}
