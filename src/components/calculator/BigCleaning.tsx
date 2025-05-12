import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import { sv } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

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

export default function FixedPriceCalculator() {
  const [kvm, setKvm] = useState('');
  const [includeOven, setIncludeOven] = useState(false);
  const [includeFridge, setIncludeFridge] = useState(false);
  const [price, setPrice] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState<Date | null>(null); // Ensure date is a Date object
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    calculatePrice();
  }, [kvm, includeOven, includeFridge]);

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

    setPrice(`${total} SEK`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const numericKvm = parseInt(kvm.replace(/\D/g, ''), 10);
    if (isNaN(numericKvm) || numericKvm <= 0) {
      alert('Fyll i en giltig bostadsstorlek innan du skickar formuläret.');
      return;
    }

    if (!name || !email || !phone || !date) {
      alert('Fyll i alla obligatoriska fält.');
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
      const res = await fetch('/api/send-cleaning-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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

  return (
    <div className='w-full max-w-4xl mx-auto p-6 rounded-lg shadow-md'>
      <h2 className='text-3xl font-bold mb-6'>Stor Städning</h2>
      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* KVM Input */}
        <div>
          <label className='block font-medium'>Bostadens storlek (kvm)</label>
          <input
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            value={kvm}
            onChange={(e) => setKvm(e.target.value)}
            className='w-full mt-2 p-5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
            placeholder='Ex. 75'
            required
          />
        </div>

        {/* Add-ons */}
        <div className='space-y-4'>
          <label className='flex items-center justify-between border rounded-md p-5'>
            <span>Ugnsrengöring (+279 SEK)</span>
            <input
              type='checkbox'
              checked={includeOven}
              onChange={() => setIncludeOven(!includeOven)}
            />
          </label>
          <label className='flex items-center justify-between border rounded-md p-5'>
            <span>Kyl/Frys rengöring (+279 SEK)</span>
            <input
              type='checkbox'
              checked={includeFridge}
              onChange={() => setIncludeFridge(!includeFridge)}
            />
          </label>
        </div>

        {/* Contact Information */}
        <div className='space-y-4'>
          <h3 className='text-xl font-bold'>Kontaktuppgifter</h3>
          <div>
            <label className='block font-medium'>Namn</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full mt-2 p-5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
              placeholder='Ditt namn'
              required
            />
          </div>
          <div>
            <label className='block font-medium'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full mt-2 p-5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
              placeholder='Din email'
              required
            />
          </div>
          <div>
            <label className='block font-medium'>Telefonnummer</label>
            <input
              type='tel'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className='w-full mt-2 p-5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
              placeholder='Ditt telefonnummer'
              required
            />
          </div>
        </div>

        {/* Date Picker */}
        <div className='w-full'>
          <label className='block text-sm font-medium mb-1'>Välj datum</label>
          <div className='relative w-full'>
            <DatePicker
              placeholderText='Välj datum'
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat='yyyy-MM-dd'
              className='w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full py-3 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition'
        >
          Skicka
        </button>
      </form>

      {/* Total Price */}
      <div className='mt-6 text-center'>
        <h3 className='text-lg font-semibold'>Totalt pris</h3>
        {price ? (
          <div className='text-3xl font-bold text-blue-600'>{price}</div>
        ) : (
          <div className='text-gray-500'>Fyll i bostadens storlek</div>
        )}
      </div>
    </div>
  );
}
