import { Search } from 'lucide-react';
import { useState } from 'react';

export function SidebarContentSearch() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className='p-2 relative'>
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 pl-2 flex items-center'>
          <Search size={16} className='text-gray-400' />
        </div>
        <input
          type='text'
          // TODO: 다국어 처리
          placeholder='메모 검색...'
          className='w-full bg-[#3B3B3C] text-white text-base rounded pl-8 py-1.5'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled
        />
      </div>
    </div>
  );
}
