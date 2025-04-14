import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';

export default function SocialLinks() {
  return (
    <div className='flex gap-4'>
      <a
        href='#'
        className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition'
        aria-label='Facebook'
      >
        <FaFacebookF size={20} />
      </a>
      <a
        href='#'
        className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition'
        aria-label='Instagram'
      >
        <FaInstagram size={20} />
      </a>
      <a
        href='#'
        className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition'
        aria-label='TikTok'
      >
        <FaTiktok size={20} />
      </a>
    </div>
  );
}
