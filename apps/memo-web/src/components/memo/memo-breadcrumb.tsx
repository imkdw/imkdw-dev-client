'use client';

import { ChevronRight } from 'lucide-react';
import { MemoDetail } from '@imkdw-dev-client/api-client';

interface Props {
  memo: MemoDetail;
}

export function MemoBreadcrumb({ memo }: Props) {
  const arrayPath = memo?.path?.split('/').filter((segment: string) => segment.length > 0) || [];

  if (arrayPath.length === 0) {
    return null;
  }

  return (
    <div className='flex items-center flex-nowrap overflow-x-auto p-2 text-sm bg-[#2d2d2d] text-gray-400 vscode-scrollbar'>
      {arrayPath.map((segment, index) => (
        <div
          key={`breadcrumb-${segment}-${arrayPath.slice(0, index + 1).join('/')}`}
          className='flex items-center flex-shrink-0'
        >
          {index > 0 && <ChevronRight size={14} className='mx-1' />}
          <span className='hover:text-white cursor-pointer'>{segment}</span>
        </div>
      ))}
    </div>
  );
}
