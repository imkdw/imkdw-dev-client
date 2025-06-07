'use client';

import { Keyboard } from '@imkdw-dev-client/consts';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useMemoFolderCrud } from '../../../../../hooks/folder/use-memo-folder-crud';

interface Props {
  setIsCreatingRootFolder: (value: boolean) => void;
}

export function CreateRootFolderInput({ setIsCreatingRootFolder }: Props) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const { createFolder, isCreating } = useMemoFolderCrud();

  useEffect(() => {
    // DOM 업데이트 후 포커스 적용
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('폴더명을 입력해주세요');
      return;
    }

    if (name.trim().length > 50) {
      setError('폴더명은 50자 이하로 입력해주세요');
      return;
    }

    setError('');

    // 최상위 폴더 생성 (parentId를 명시적으로 null로 설정)
    const result = await createFolder({
      name: name.trim(),
      parentId: null,
    });

    if (result) {
      setName('');
      setIsCreatingRootFolder(false);
    }
  };

  const handleCancel = () => {
    setName('');
    setError('');
    setIsCreatingRootFolder(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === Keyboard.ENTER) {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === Keyboard.ESCAPE) {
      e.preventDefault();
      handleCancel();
    }
  };

  return (
    <li>
      <div ref={formRef} className='pl-2' style={{ paddingLeft: '8px' }}>
        <div className='relative'>
          <input
            ref={inputRef}
            type='text'
            className={`w-full py-1 px-2 bg-[#252526] text-[#CCCCCC] text-sm border ${
              error ? 'border-red-500' : 'border-[#007ACC]'
            } focus:outline-none rounded-none`}
            placeholder='새 폴더 이름을 입력하세요'
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              if (name.trim()) {
                handleSubmit();
              } else {
                handleCancel();
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
    </li>
  );
}
