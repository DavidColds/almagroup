'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect,useState } from 'react';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <Image
        src='data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=='
        width={24}
        height={24}
        sizes='24x24'
        alt='Loading Light/Dark Toggle'
        priority={false}
        title='Loading Light/Dark Toggle'
      />
    );

  if (resolvedTheme === 'dark') {
    return (
      <button
        onClick={() => setTheme('light')}
        title='Switch to Light Mode'
        aria-label='Switch to Light Mode'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          viewBox='0 0 24 25'
        >
          <circle cx='12' cy='12' r='5' />
          <path d='M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42' />
        </svg>
      </button>
    );
  }

  if (resolvedTheme === 'light') {
    return (
      <button
        onClick={() => setTheme('dark')}
        title='Switch to Dark Mode'
        aria-label='Switch to Dark Mode'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          viewBox='0 0 24 25'
        >
          <path d='M21 12.79A9 9 0 0111.21 3 7 7 0 1012 21a9 9 0 009-8.21z' />
        </svg>
      </button>
    );
  }

  return null;
}
