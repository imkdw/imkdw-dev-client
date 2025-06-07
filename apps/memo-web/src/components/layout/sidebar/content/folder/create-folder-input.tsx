'use client';

import { Keyboard } from '@imkdw-dev-client/consts';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useMemoFolderCrud } from '../../../../../hooks/folder/use-memo-folder-crud';

interface Props {
  level: number;
  parentId: string;
  setIsCreatingFolder: (value: boolean) => void;
}

export function CreateFolderInput({ level, parentId, setIsCreatingFolder }: Props) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const { createFolder, isCreating } = useMemoFolderCrud();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  }, []);

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('폴더명을 입력해주세요');
      return;
    }

    setError('');

    await createFolder({
      name: name.trim(),
      parentId,
    });

    setName('');
    setIsCreatingFolder(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === Keyboard.ENTER) {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === Keyboard.ESCAPE) {
      setIsCreatingFolder(false);
    }
  };

  return (
    <div ref={formRef} className='pl-2' style={{ paddingLeft: `${level * 16 + 28}px` }}>
      <div className='relative'>
        <input
          ref={inputRef}
          type='text'
          className={`w-full py-1 px-2 bg-[#252526] text-[#CCCCCC] text-sm border ${error ? 'border-red-500' : 'border-[#007ACC]'} focus:outline-none rounded-none`}
          placeholder='새 폴더 이름을 입력하세요'
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (name.trim()) {
              handleSubmit();
            } else {
              setIsCreatingFolder(false);
            }
          }}
          disabled={isCreating}
        />

        {error && (
          <div
            id='name-error'
            role='alert'
            className="absolute top-[-30px] left-0 bg-red-500 text-white text-xs px-2 py-1 rounded shadow min-w-[150px] max-w-[250px] z-10 before:content-[''] before:absolute before:left-2 before:bottom-[-6px] before:border-l-[6px] before:border-l-transparent before:border-r-[6px] before:border-r-transparent before:border-t-[6px] before:border-t-red-500"
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
