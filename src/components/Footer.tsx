import SocialLinks from './SocialLinks';
import NavLinks from './NavLinks';

export default function Footer() {
  return (
    <footer className='border-t border-gray-300 dark:border-gray-700 '>
      <div className='container mx-auto flex flex-col items-center gap-6 py-8 sm:flex-row sm:justify-between'>
        {/* Brand Info */}
        <div className='text-center sm:text-left'>
          <p className='text-xl font-semibold text-gray-900 dark:text-white'>
            AlmaGroup
          </p>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Your Trusted Partner in Cleaning & Construction
          </p>
        </div>

        {/* Navigation Links */}
        <NavLinks />

        {/* Social Media */}
        <SocialLinks />
      </div>
    </footer>
  );
}
