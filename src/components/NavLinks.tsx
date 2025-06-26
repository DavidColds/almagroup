'use client';
import React, { useState, useRef, useEffect } from 'react';

const navLinks = [
  { href: '/cleaning', label: 'Hemstädning', group: 'Städ' },
  { href: '/stor-stadning', label: 'Stor Städning', group: 'Städ' },
  { href: '/flyttstadning', label: 'Flyttstädning', group: 'Städ' },
  { href: '/windowCleaning', label: 'Fönster Puts' },
  { href: '/kontorsstadning', label: 'Kontorsstädning' },
  { href: '/bygg', label: 'Bygg' },
];

export default function NavLinks({
  className = '',
  gapClass = 'gap-8',
  isFooter = false, // New prop to identify if component is used in footer
}: {
  className?: string;
  gapClass?: string;
  isFooter?: boolean;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Städ group links
  const stadLinks = navLinks.filter((link) => link.group === 'Städ');
  // Other links
  const otherLinks = navLinks.filter((link) => !link.group);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  return (
    <nav
      className={`flex flex-col items-center ${gapClass} md:gap-6 lg:flex-row sm:gap-8`}
    >
      {/* Städ Dropdown - only on desktop AND not in footer */}
      {!isFooter && (
        <div className='relative hidden lg:block' ref={dropdownRef}>
          <button
            className={`text-[1.6rem] md:text-lg text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition ${className} px-2`}
            type='button'
            onClick={() => setDropdownOpen((open) => !open)}
            aria-haspopup='true'
            aria-expanded={dropdownOpen}
          >
            Städ
          </button>
          {dropdownOpen && (
            <div className='absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-20'>
              {stadLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className='block px-4 py-4 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:underline transition rounded-lg'
                  onClick={() => setDropdownOpen(false)}
                >
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Städ links always shown in footer OR on mobile */}
      {(isFooter || true) && (
        <div
          className={`flex ${
            isFooter ? 'flex-row' : 'flex-col lg:hidden' // Change flex-col to flex-row for footer
          } items-center gap-8`}
        >
          {stadLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`${
                isFooter ? '' : 'text-[1.6rem] md:text-lg'
              } text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white hover:underline transition ${className}`}
            >
              {label}
            </a>
          ))}
        </div>
      )}

      {/* Other links */}
      {otherLinks.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          className={`${
            isFooter ? '' : 'text-[1.6rem] md:text-lg'
          } text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white hover:underline transition ${className}`}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
