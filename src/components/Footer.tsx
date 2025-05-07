import SocialLinks from './SocialLinks';
import NavLinks from './NavLinks';

export default function Footer() {
  return (
    <footer className='border-t border-gray-300 dark:border-gray-700'>
      <div className='container mx-auto flex flex-col gap-6 py-8 px-4 sm:flex-row sm:items-center sm:justify-between'>
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
        <div className='flex justify-center sm:justify-center'>
          <NavLinks />
        </div>

        {/* Social Media */}
        <div className='flex justify-center sm:justify-end'>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
