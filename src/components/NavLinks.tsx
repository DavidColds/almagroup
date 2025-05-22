import React from 'react';

const navLinks = [
  { href: '/', label: 'Hem' },
  { href: '/cleaning', label: 'Hemstädning' },
  { href: '/stor-stadning', label: 'Stor Städning' },
  { href: '/flyttstadning', label: 'Flyttstädning' },
  { href: '/windowCleaning', label: 'Fönster Puts' },
  { href: '/kontorsstadning', label: 'Kontorsstädning' },
  { href: '/bygg', label: 'Bygg' },
];

export default function NavLinks({
  className = '',
  gapClass = 'gap-8',
}: {
  className?: string;
  gapClass?: string;
}) {
  return (
    <nav
      className={`flex flex-col items-center ${gapClass} md:gap-6 lg:flex-row sm:gap-8`}
    >
      {navLinks.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          className={`text-[1.6rem] md:text-lg text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition ${className}`}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
