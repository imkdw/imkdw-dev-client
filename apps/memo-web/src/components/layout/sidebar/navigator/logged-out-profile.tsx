'use client';

import { cn } from '@imkdw-dev-client/utils';
import { UserRound } from 'lucide-react';

interface Props {
  member: unknown;
  onClick: () => void;
}

export function LoggedOutProfile({ onClick }: Props) {
  return (
    <button
      type='button'
      className={cn('flex justify-center items-center w-full p-4 group', 'hover:bg-[#4A4A4C]')}
      onClick={onClick}
    >
      <div className={cn('flex items-center justify-center rounded-full w-8 h-8')}>
        <UserRound className='text-gray-400 group-hover:text-white' />
      </div>
    </button>
  );
}
