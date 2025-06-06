'use client';

import { ChevronRight } from 'lucide-react';
import { useMemo } from 'react';
import { useMemoStore } from '../../stores/memo-store';

interface Props {
  initialPath?: string;
}

export function MemoBreadcrumb({ initialPath }: Props) {
  const { currentMemo } = useMemoStore();

  const arrayPath = useMemo(() => {
    const path = currentMemo?.path || initialPath || '';
    return path.split('/').filter((segment) => segment.length > 0);
  }, [currentMemo?.path, initialPath]);

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
