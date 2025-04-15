'use client';

import { useState, useEffect } from 'react';
import { HiBars3 as HiMenu, HiXMark as HiX } from 'react-icons/hi2';
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
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
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
        {/* Logo */}
        <Link href='/' className='text-xl font-semibold'>
          Logo
        </Link>

        {/* Desktop Navigation Links */}
        <div className='hidden md:flex space-x-8'>
          <NavLinks />
        </div>

        {/* ThemeSwitcher Component */}
        <div className='hidden md:block'>
          <ThemeSwitcher />
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className='md:hidden flex items-center'>
          {/*  <button onClick={toggleMenu} className='focus:outline-none text-2xl'>
            {isOpen ? <HiX /> : <HiMenu />}
          </button> */}
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
