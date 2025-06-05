'use client';

import { useCreateMemoInput } from '../../../../../hooks/use-create-memo-input';

interface Props {
  level: number;
  folderId: string;
  setIsCreatingMemo: (value: boolean) => void;
}

export function CreateMemoInput({ level, folderId, setIsCreatingMemo }: Props) {
  const { inputRef, formRef, formAction, isPending, hasError, errorMessage, handleKeyDown } = useCreateMemoInput({
    setIsCreatingMemo,
  });

  return (
    <form ref={formRef} className='pl-2' style={{ paddingLeft: `${level * 16 + 28}px` }} action={formAction}>
      <div className='relative'>
        <input
          ref={inputRef}
          type='text'
          className={`w-full py-1 px-2 bg-[#252526] text-[#CCCCCC] text-sm border ${hasError ? 'border-red-500' : 'border-[#007ACC]'} focus:outline-none rounded-none`}
          placeholder='새 메모 이름을 입력하세요'
          name='name'
          onKeyDown={handleKeyDown}
        />

        {/* 에러 툴팁 */}
        {hasError && (
          <div
            id='name-error'
            role='alert'
            className="absolute top-[-30px] left-0 bg-red-500 text-white text-xs px-2 py-1 rounded shadow min-w-[150px] max-w-[250px] z-10 before:content-[''] before:absolute before:left-2 before:bottom-[-6px] before:border-l-[6px] before:border-l-transparent before:border-r-[6px] before:border-r-transparent before:border-t-[6px] before:border-t-red-500"
          >
            {errorMessage}
          </div>
        )}
      </div>
      <input type='hidden' name='folderId' value={folderId} />
      <button type='submit' className='hidden' disabled={isPending} />
    </form>
  );
}
