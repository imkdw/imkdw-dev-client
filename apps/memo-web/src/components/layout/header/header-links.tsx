import { Link } from '@imkdw-dev-client/i18n';
import { FaInstagram } from 'react-icons/fa6';
import { ImGithub } from 'react-icons/im';

export function HeaderLinks() {
  return (
    <div className='flex items-center gap-4 px-2'>
      <Link
        href='https://github.com/imkdw/imkdw-dev-client'
        target='_blank'
        className='text-gray-300 hover:text-white transition-colors'
        aria-label='GitHub'
      >
        <ImGithub size={20} />
      </Link>
      <Link
        href='https://www.instagram.com/imkdw_/'
        target='_blank'
        className='text-gray-300 hover:text-white transition-colors'
        aria-label='Instagram'
      >
        <FaInstagram size={20} />
      </Link>
    </div>
  );
}
