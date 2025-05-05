import { ResponseGetMemo } from '@imkdw-dev-client/api-client';
import { ChevronRight } from 'lucide-react';

interface Props {
  memo: ResponseGetMemo;
}

export function MemoBreadcrumb({ memo }: Props) {
  const arrayPath = memo.path.split('/').filter((path) => path.length > 0);

  return (
    <div className='flex items-center flex-nowrap overflow-x-auto p-2 text-sm bg-[#2d2d2d] text-gray-400 vscode-scrollbar'>
      {arrayPath.map((segment, index) => (
        <div key={`${segment}`} className='flex items-center flex-shrink-0'>
          {index > 0 && <ChevronRight size={14} className='mx-1' />}
          <span className='hover:text-white cursor-pointer'>{segment}</span>
        </div>
      ))}
    </div>
  );
}
