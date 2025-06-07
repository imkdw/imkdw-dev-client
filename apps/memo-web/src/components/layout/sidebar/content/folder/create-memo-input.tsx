'use client';

import { useCreateMemoInput } from '@/src/hooks/memo/use-create-memo-input';

interface Props {
  level: number;
  folderId: string;
  setIsCreatingMemo: (value: boolean) => void;
}

export function CreateMemoInput({ level, folderId, setIsCreatingMemo }: Props) {
  const { name, setName, inputRef, formRef, isLoading, error, handleSubmit, handleKeyDown } = useCreateMemoInput({
    folderId,
    setIsCreatingMemo,
  });

  return (
    <div ref={formRef} className='pl-2' style={{ paddingLeft: `${level * 16 + 28}px` }}>
      <div className='relative'>
        <input
          ref={inputRef}
          type='text'
          className={`w-full py-1 px-2 bg-[#252526] text-[#CCCCCC] text-sm border ${error ? 'border-red-500' : 'border-[#007ACC]'} focus:outline-none rounded-none`}
          placeholder='새 메모 이름을 입력하세요'
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (name.trim()) {
              handleSubmit();
            }
          }}
          disabled={isLoading}
        />

        {/* 에러 툴팁 */}
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
