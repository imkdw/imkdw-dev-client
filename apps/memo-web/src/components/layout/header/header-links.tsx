import { Moon } from 'lucide-react';
import { ReactNode } from 'react';
import GithubIcon from '@/public/images/github.svg';
import Image from 'next/image';

function HeaderLink({ children }: { children: ReactNode }) {
  return <button className='flex items-center p-2 rounded-lg bg-gray-100'>{children}</button>;
}

export function HeaderLinks() {
  return (
    <div className='flex items-center gap-2 rounded-lg bg-white p-4 shadow-primary'>
      <HeaderLink>
        <Image src={GithubIcon} alt='Github' width={24} height={24} />
      </HeaderLink>
      <HeaderLink>
        <Moon className='text-gray-600' />
      </HeaderLink>
    </div>
  );
}
