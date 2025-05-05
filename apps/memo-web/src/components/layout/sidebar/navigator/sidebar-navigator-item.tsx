import { cn } from '@imkdw-dev-client/utils';
import { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  id: number;
  isActive?: boolean;
  onClick?: () => void;
}

export function SidebarNavigatorItem({ icon, isActive = false, onClick }: Props) {
  return (
    <li className='w-full relative group'>
      <button
        type='button'
        className={cn('flex justify-center items-center w-full cursor-pointer p-4', 'hover:bg-[#4A4A4C]')}
        onClick={onClick}
      >
        {isActive && <div className='absolute left-0 top-0 h-full w-0.5 bg-gray-300' />}
        <div className='text-gray-400 group-hover:text-white'>{icon}</div>
      </button>
    </li>
  );
}
