'use client';

import { useState, useEffect } from 'react';
import NavLinks from './NavLinks';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Link from 'next/link';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY <= 0) {
        setIsVisible(true); // Always show nav at the top
      } else if (window.scrollY > lastScrollY) {
        setIsVisible(false); // Scrolling down, hide nav
      } else {
        setIsVisible(true); // Scrolling up, show nav
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    // Clean up in case the component unmounts while menu is open
    return () => document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  return (
    <>
      <nav
        className={`p-10 z-50 w-full backdrop-blur-xl border-b fixed transition-transform duration-300  ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className='container mx-auto flex items-center justify-between'>
          {/* Logo */}
          <Link href='/'>
            <div className='text-[1rem] md:text-[2rem] font-semibold tracking-tight leading-none uppercase'>
              <span className='text-black dark:text-white'>Alma</span>
              <span className='text-neutral-600 dark:text-neutral-400 font-light'>
                grupp
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className='hidden lg:flex items-center space-x-8 justify-end'>
            <NavLinks />
            <ThemeSwitcher />
          </div>

          {/* Hamburger for Mobile */}
          <div className='lg:hidden flex items-center'>
            <button
              onClick={toggleMenu}
              className='focus:outline-none w-8 h-8 text-black dark:text-white'
              aria-label='Toggle menu'
            >
              {isOpen ? (
                // Close icon
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
                // Hamburger icon
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
      </nav>

      {/* Fullscreen Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white dark:bg-[#181818] flex flex-col items-center justify-center transition-all duration-300
        ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        xl:hidden
        `}
      >
        <div className='flex flex-col items-center pb-11 text-2xl font-semibold'>
          <NavLinks />
        </div>
        <div>
          <ThemeSwitcher />
        </div>
      </div>
    </>
  );
}
