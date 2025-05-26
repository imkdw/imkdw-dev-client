'use client';

import { MemoItem } from '@imkdw-dev-client/api-client';
import { Link } from '@imkdw-dev-client/i18n';
import { cn } from '@imkdw-dev-client/utils';
import { File } from 'lucide-react';

interface Props {
  level: number;
  isSelected: boolean;
  memo: MemoItem;
}

export function MemoListItem({ level, memo: { name, slug }, isSelected }: Props) {
  return (
    <Link
      href={`/memo/${slug}`}
      type='button'
      className={cn(
        'flex items-center p-1 w-full cursor-pointer rounded',
        'text-base text-gray-300 hover:text-white',
        isSelected ? 'bg-[#3B3B3C] text-white' : 'hover:bg-[#3B3B3C]',
      )}
      style={{ paddingLeft: `${level * 16 + 8}px` }}
    >
      <span className='text-gray-400 w-4 flex-shrink-0' />
      <File size={16} className={cn('mr-2 flex-shrink-0 text-gray-400')} />
      <span className='truncate min-w-0'>{name}</span>
    </Link>
  );
}
