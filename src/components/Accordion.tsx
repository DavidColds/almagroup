import React from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

export default function Accordion({
  title,
  children,
  isOpen,
  onClick,
}: AccordionProps) {
  return (
    <div className='border-b'>
      <button
        type='button'
        className='w-full flex justify-between items-center py-4 text-lg font-semibold focus:outline-none'
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={title.replace(/\s/g, '') + '-content'}
      >
        {title}
        <span className='ml-2'>{isOpen ? '-' : '+'}</span>
      </button>
      <div
        id={title.replace(/\s/g, '') + '-content'}
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 py-2' : 'max-h-0 py-0'}`}
        aria-hidden={!isOpen}
      >
        {isOpen && (
          <div className='text-base text-gray-700 dark:text-gray-200'>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
