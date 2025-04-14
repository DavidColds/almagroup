const navLinks = [
  { href: '/', label: 'Hem' },
  { href: '/bygg', label: 'Bygg' },
  { href: '/services', label: 'Services' },
];

export default function NavLinks() {
  return (
    <nav className='flex gap-8'>
      {navLinks.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          className='text-xl font-medium dark:hover:text-white transition'
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
