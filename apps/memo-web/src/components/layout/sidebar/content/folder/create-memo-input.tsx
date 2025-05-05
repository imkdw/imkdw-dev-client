'use client';

import { ESCAPE_KEY } from '@imkdw-dev-client/consts';
import { useRouter } from '@imkdw-dev-client/i18n';
import { useActionState, useEffect, useRef } from 'react';
import { createMemoAction } from '../../../../../actions/memo/create-memo.action';

interface Props {
  level: number;
  folderId: string;
  setIsCreatingMemo: (value: boolean) => void;
}

export function CreateMemoInput({ level, folderId, setIsCreatingMemo }: Props) {
  const [state, formAction, isPending] = useActionState(createMemoAction, { success: false });

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  /**
   * 폼 외부 클릭 감지 및 폼 닫기
   */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsCreatingMemo(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsCreatingMemo]);

  useEffect(() => {
    const focusTimer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 50);

    return () => clearTimeout(focusTimer);
  }, []);

  /**
   * 메모 생성 성공시 수정창으로 이동처리
   */
  useEffect(() => {
    if (state.success && state.createdMemo?.slug) {
      setIsCreatingMemo(false);
      router.push(`/memo/${state.createdMemo.slug}`);
    }
  }, [state.success, state.createdMemo?.slug, router, setIsCreatingMemo]);

  const hasError = state.errors?.name && state.errors.name.length > 0;

  return (
    <form ref={formRef} className='pl-2' style={{ paddingLeft: `${level * 16 + 28}px` }} action={formAction}>
      <div className='relative'>
        <input
          ref={inputRef}
          type='text'
          className={`w-full py-1 px-2 bg-[#252526] text-[#CCCCCC] text-sm border ${hasError ? 'border-red-500' : 'border-[#007ACC]'} focus:outline-none rounded-none`}
          placeholder='새 메모 이름을 입력하세요'
          name='name'
          onKeyDown={(event) => {
            if (event.key === ESCAPE_KEY) {
              setIsCreatingMemo(false);
            }
          }}
        />

        {/* 에러 툴팁 */}
        {hasError && (
          <div
            id='name-error'
            role='alert'
            className="absolute top-[-30px] left-0 bg-red-500 text-white text-xs px-2 py-1 rounded shadow min-w-[150px] max-w-[250px] z-10 before:content-[''] before:absolute before:left-2 before:bottom-[-6px] before:border-l-[6px] before:border-l-transparent before:border-r-[6px] before:border-r-transparent before:border-t-[6px] before:border-t-red-500"
          >
            {state.errors?.name}
          </div>
        )}
      </div>
      <input type='hidden' name='folderId' value={folderId} />
      <button type='submit' className='hidden' disabled={isPending} />
    </form>
  );
}
