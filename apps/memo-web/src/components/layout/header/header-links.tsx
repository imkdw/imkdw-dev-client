import { Link } from '@imkdw-dev-client/i18n';
import { GithubIcon, InstagramIcon } from 'lucide-react';

export function HeaderLinks() {
  return (
    <div className='flex items-center gap-4 px-2'>
      <Link
        href='https://github.com/imkdw/imkdw-dev-client'
        target='_blank'
        className='text-gray-300 hover:text-white transition-colors'
        aria-label='GitHub'
      >
        <GithubIcon size={20} />
      </Link>
      <Link
        href='https://www.instagram.com/imkdw_/'
        target='_blank'
        className='text-gray-300 hover:text-white transition-colors'
        aria-label='Instagram'
      >
        <InstagramIcon size={20} />
      </Link>
    </div>
  );
}
