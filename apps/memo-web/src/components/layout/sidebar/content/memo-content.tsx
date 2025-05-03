'use client';

import { cn } from '@imkdw-dev-client/utils';
import { Clock, FileText, Search, Star } from 'lucide-react';
import { useState } from 'react';

interface MemoGroup {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export function MemoContent() {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const memoGroups: MemoGroup[] = [
    { id: 'recent', name: '최근 메모', icon: <Clock size={16} className='mr-2 text-yellow-400' /> },
    { id: 'important', name: '중요 메모', icon: <Star size={16} className='mr-2 text-red-400' /> },
    { id: 'all', name: '모든 메모', icon: <FileText size={16} className='mr-2 text-blue-400' /> },
  ];

  return (
    <div className='p-2'>
      <h2 className='text-xl font-semibold text-white mb-4 flex items-center gap-2 px-2'>
        <FileText size={20} />
        {/* TODO: 다국어처리 */}
        <span>메모 전체보기</span>
      </h2>

      {/* 검색 영역 */}
      <div className='px-2 mb-4'>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none'>
            <Search size={16} className='text-gray-400' />
          </div>
          <input
            type='text'
            placeholder='메모 검색...'
            className='w-full bg-[#3B3B3C] text-white text-sm rounded pl-8 pr-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500'
          />
        </div>
      </div>

      {/* 메모 그룹 */}
      <div className='text-xs text-gray-400 uppercase font-semibold mt-4 mb-2 px-2'>메모 분류</div>

      <div>
        {memoGroups.map((group) => (
          <button
            type='button'
            key={group.id}
            className={cn(
              'flex items-center p-1 mx-1 cursor-pointer hover:bg-[#3B3B3C] rounded transition-colors',
              'text-sm text-gray-300',
              selectedGroup === group.id && 'bg-[#3B3B3C]',
            )}
            onClick={() => setSelectedGroup(group.id === selectedGroup ? null : group.id)}
          >
            {group.icon}
            <span>{group.name}</span>
          </button>
        ))}
      </div>

      {/* 그래프 시각화 영역 */}
      <div className='text-xs text-gray-400 uppercase font-semibold mt-6 mb-2 px-2'>메모 그래프</div>
      <div className='mt-2 mx-2 h-[200px] bg-[#2A2A2A] rounded-lg flex items-center justify-center'>
        <p className='text-gray-400 text-sm'>메모 그래프 시각화 영역</p>
      </div>
    </div>
  );
}
