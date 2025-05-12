const navLinks = [
  { href: '/', label: 'Hem' },
  { href: '/bygg', label: 'Bygg' },
  { href: '/services', label: 'Städning' },
  { href: '/bigCleaning', label: 'Stor Städning' },
  { href: '/windowCleaning', label: 'Fönster Puts' },
];

export default function NavLinks() {
  return (
    <nav className='flex flex-col items-center gap-4 sm:flex-row sm:gap-8'>
      {navLinks.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          className='text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition'
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
