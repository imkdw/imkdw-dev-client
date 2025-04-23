'use client';

import { PencilLine } from 'lucide-react';
import { useState } from 'react';
import { MemoForm } from '@/src/components/memo/memo-form';

export function HeaderTopButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        className='flex items-center gap-2 rounded-lg bg-white p-4 shadow-primary flex-1'
        onClick={() => setIsModalOpen(true)}
      >
        <PencilLine className='text-gray-400' fontSize={28} />
        <div className='flex items-center h-full'>
          <span className='text-gray-400'>Create Memo</span>
        </div>
      </button>
      <MemoForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} mode='create' />
    </>
  );
}
