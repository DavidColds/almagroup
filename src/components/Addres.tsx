import React from 'react';

interface AddressFields {
  name: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
}

interface AddressProps {
  value: AddressFields;
  onChange: (value: AddressFields) => void;
  required?: boolean;
  error?: Partial<Record<keyof AddressFields, string>>;
  idPrefix?: string;
}

const Address: React.FC<AddressProps> = ({
  value,
  onChange,
  required = false,
  error = {},
  idPrefix = 'address',
}) => {
  return (
    <>
      <h3 className='text-lg font-bold mb-4 text-gray-900 dark:text-white'>
        Kontaktuppgifter
      </h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        <div>
          <label className='block text-base font-semibold text-gray-800 dark:text-gray-200 mb-1'>
            Namn <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            value={value.name}
            onChange={(e) => onChange({ ...value, name: e.target.value })}
            className='w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-2 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500'
            placeholder='Ditt namn'
            required={required}
            autoComplete='name'
          />
          {error.name && (
            <p className='mt-1 text-sm text-red-600' role='alert'>
              {error.name}
            </p>
          )}
        </div>
        <div>
          <label className='block text-base font-semibold text-gray-800 dark:text-gray-200 mb-1'>
            E-post <span className='text-red-500'>*</span>
          </label>
          <input
            type='email'
            value={value.email}
            onChange={(e) => onChange({ ...value, email: e.target.value })}
            className='w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-2 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500'
            placeholder='din@email.se'
            required={required}
            autoComplete='email'
          />
          {error.email && (
            <p className='mt-1 text-sm text-red-600' role='alert'>
              {error.email}
            </p>
          )}
        </div>
        <div>
          <label className='block text-base font-semibold text-gray-800 dark:text-gray-200 mb-1'>
            Telefon <span className='text-red-500'>*</span>
          </label>
          <input
            type='tel'
            value={value.phone}
            onChange={(e) => onChange({ ...value, phone: e.target.value })}
            className='w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-2 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500'
            placeholder='070-123 45 67'
            required={required}
            autoComplete='tel'
          />
          {error.phone && (
            <p className='mt-1 text-sm text-red-600' role='alert'>
              {error.phone}
            </p>
          )}
        </div>
        <div>
          <label className='block text-base font-semibold text-gray-800 dark:text-gray-200 mb-1'>
            Adress <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            value={value.address}
            onChange={(e) => onChange({ ...value, address: e.target.value })}
            className='w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-2 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500'
            placeholder='Ange adress...'
            required={required}
            autoComplete='street-address'
          />
          {error.address && (
            <p className='mt-1 text-sm text-red-600' role='alert'>
              {error.address}
            </p>
          )}
        </div>
        <div>
          <label className='block text-base font-semibold text-gray-800 dark:text-gray-200 mb-1'>
            Postnummer <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            value={value.postalCode}
            onChange={(e) => {
              // Only allow 0-5 digits
              const val = e.target.value.replace(/\D/g, '').slice(0, 5);
              onChange({ ...value, postalCode: val });
            }}
            className='w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-2 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500'
            placeholder='Ange postnummer...'
            required={required}
            autoComplete='postal-code'
            inputMode='numeric'
            pattern='[0-9]{5}'
            maxLength={5}
          />
          {error.postalCode && (
            <p className='mt-1 text-sm text-red-600' role='alert'>
              {error.postalCode}
            </p>
          )}
        </div>
        <div>
          <label className='block text-base font-semibold text-gray-800 dark:text-gray-200 mb-1'>
            Stad <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            value={value.city}
            onChange={(e) => onChange({ ...value, city: e.target.value })}
            className='w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] px-4 py-2 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500'
            placeholder='Ange stad...'
            required={required}
            autoComplete='address-level2'
          />
          {error.city && (
            <p className='mt-1 text-sm text-red-600' role='alert'>
              {error.city}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Address;
