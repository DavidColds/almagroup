'use client';

import { useState, useEffect } from 'react';
import NavLinks from '@/components/NavLinks';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Link from 'next/link';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`p-10 z-50 w-full backdrop-blur-xl border-b fixed transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className='container mx-auto flex items-center justify-between'>
        {/* Almagrupp Logo */}
        <Link href='/'>
          <div className='text-[2.5rem] font-semibold tracking-tight leading-none uppercase'>
            <span className='text-black dark:text-white'>Alma</span>
            <span className='text-neutral-600 dark:text-neutral-400 font-light'>
              grupp
            </span>
          </div>
        </Link>

        {/* Right-Aligned Navigation Links and ThemeSwitcher */}
        <div className='hidden md:flex items-center space-x-8 justify-end'>
          <NavLinks />
          <ThemeSwitcher />
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className='md:hidden flex items-center'>
          <button onClick={toggleMenu} className='focus:outline-none w-8 h-8'>
            {isOpen ? (
              // X icon
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-8 h-8'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            ) : (
              // Hamburger menu icon
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-8 h-8'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5'
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'h-auto opacity-100' : 'h-0 opacity-0'
        }`}
      >
        <div className='container mx-auto flex flex-col items-center space-y-4 pt-4'>
          <NavLinks />
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
