import SocialLinks from './SocialLinks';
import NavLinks from './NavLinks';

export default function Footer() {
  return (
    <footer className='border-t border-gray-300 dark:border-gray-700'>
      <div className='container mx-auto flex flex-col gap-6 py-8 px-4 sm:flex-row sm:items-center sm:justify-between'>
        {/* Brand Info */}
        <div className='text-center sm:text-left'>
          <div className='text-[1.5rem] font-semibold tracking-tight leading-none uppercase'>
            <span className='text-black dark:text-white'>Alma</span>
            <span className='text-neutral-600 dark:text-neutral-400 font-light'>
              grupp
            </span>
          </div>
          <br />
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Your Trusted Partner in Cleaning & Construction
          </p>
        </div>

        {/* Navigation Links and Social Media */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-end sm:space-x-8'>
          <NavLinks />
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
