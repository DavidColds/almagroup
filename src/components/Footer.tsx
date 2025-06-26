import NavLinks from './NavLinks';
import SocialLinks from './SocialLinks';

export default function Footer() {
  return (
    <footer className='border-t border-gray-300 dark:border-gray-700'>
      <div className='container mx-auto flex flex-col gap-6 py-8 px-4 md:flex-col md:items-center md:gap-8'>
        {/* Brand Info */}
        <div className='text-center'>
          <div className='text-[2rem] font-semibold tracking-tight leading-none uppercase'>
            <span className='text-black dark:text-white'>Alma</span>
            <span className='text-neutral-600 dark:text-neutral-400 font-light'>
              grupp
            </span>
          </div>
          <br />
          <p className='text-lg text-gray-600 dark:text-gray-400'>
            Kvalite framför allt!
          </p>
        </div>

        {/* Navigation Links and Social Media */}
        <div className='flex flex-col items-center gap-8'>
          <NavLinks className='text-base' gapClass='gap-6' isFooter={true} />
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
