'use client';

import { useState } from 'react';
import { MemoForm } from '../memo-form/memo-form';

interface Props {
  memoId: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function MemoDetailActions({ memoId }: Props) {
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState<boolean>(false);

  const handleUpdateClick = () => {
    setIsUpdateFormOpen(true);
  };

  const handleFormClose = () => {
    setIsUpdateFormOpen(false);
  };

  return (
    <>
      <div className='flex gap-2'>
        <button
          onClick={handleUpdateClick}
          className='px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium'
        >
          Modify
        </button>
        <button className='px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 font-medium'>
          Delete
        </button>
      </div>

      <MemoForm isOpen={isUpdateFormOpen} mode='update' onClose={handleFormClose} />
    </>
  );
}
