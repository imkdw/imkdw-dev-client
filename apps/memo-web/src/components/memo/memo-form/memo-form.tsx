'use client';

import { X } from 'lucide-react';
import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type MemoFormMode = 'create' | 'update';

interface MemoFormProps {
  isOpen: boolean;
  mode: MemoFormMode;
  onClose: () => void;
}

function MemoSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className='w-full rounded-lg border border-gray-200'>
      <div className='p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg'>{title}</div>
      {children}
    </div>
  );
}

export function MemoForm({ isOpen, mode, onClose }: MemoFormProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.section
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3 }}
          className='fixed top-8 left-8 bottom-8 right-8 rounded-lg shadow-primary bg-white z-[9999]'
        >
          <div className='flex p-6 flex-col gap-6 h-full'>
            <div className='flex justify-between'>
              <h2 className='text-2xl'>{mode === 'create' ? 'Create Memo' : 'Update Memo'}</h2>
              <button onClick={onClose}>
                <X />
              </button>
            </div>
            <div>
              <input
                type='text'
                placeholder='Title'
                className='w-full border-b border-gray-200 p-2 outline-none text-lg'
              />
            </div>
            <div className='flex gap-4 justify-between flex-1'>
              <MemoSection title='Edit'>
                <textarea placeholder='Content' className='w-full p-4 outline-none text-lg resize-none' />
              </MemoSection>
              <MemoSection title='Preview'>
                <div className='p-4'>Preview</div>
              </MemoSection>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
