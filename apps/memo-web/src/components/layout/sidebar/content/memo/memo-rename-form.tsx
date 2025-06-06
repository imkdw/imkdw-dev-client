'use client';

import { Keyboard } from '@imkdw-dev-client/consts';
import { Edit2 } from 'lucide-react';
import { KeyboardEvent, useEffect, useRef } from 'react';

interface Props {
  level: number;
  newName: string;
  setNewName: (name: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function MemoRenameForm({ level, newName, setNewName, onSave, onCancel }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        const length = inputRef.current.value.length;
        inputRef.current.setSelectionRange(length, length);
      }
    }, 50);
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === Keyboard.ENTER) {
      onSave();
    } else if (e.key === Keyboard.ESCAPE) {
      onCancel();
    }
  };

  return (
    <div
      className='flex items-center p-1 w-full rounded bg-[#3B3B3C] border border-blue-400'
      style={{ paddingLeft: `${level * 16 + 8}px` }}
    >
      <Edit2 size={16} className='text-orange-400 w-4 flex-shrink-0' />
      <input
        ref={inputRef}
        type='text'
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={onSave}
        className='bg-[#2B2B2C] text-white px-2 py-0.5 ml-2 rounded w-full focus:outline-none border border-gray-500 focus:border-blue-400'
        placeholder='메모 이름 입력...'
      />
    </div>
  );
}
