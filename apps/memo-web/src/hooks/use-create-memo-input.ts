import { ESCAPE_KEY } from '@imkdw-dev-client/consts';
import { useRouter } from '@imkdw-dev-client/i18n';
import { useActionState, useCallback, useEffect, useRef } from 'react';
import { createMemoAction } from '../actions/memo/create-memo.action';

interface UseCreateMemoInputProps {
  setIsCreatingMemo: (value: boolean) => void;
}

export function useCreateMemoInput({ setIsCreatingMemo }: UseCreateMemoInputProps) {
  const [state, formAction, isPending] = useActionState(createMemoAction, { success: false });
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  // 폼 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsCreatingMemo(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsCreatingMemo]);

  // 자동 포커스
  useEffect(() => {
    const focusTimer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    return () => clearTimeout(focusTimer);
  }, []);

  // 메모 생성 성공 시 리다이렉트
  useEffect(() => {
    if (state.success && state.createdMemo?.slug) {
      setIsCreatingMemo(false);
      router.push(`/memo/${state.createdMemo.slug}`);
    }
  }, [state.success, state.createdMemo?.slug, router, setIsCreatingMemo]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === ESCAPE_KEY) {
        setIsCreatingMemo(false);
      }
    },
    [setIsCreatingMemo],
  );

  const hasError = state.errors?.name && state.errors.name.length > 0;

  return {
    inputRef,
    formRef,
    formAction,
    isPending,
    hasError,
    errorMessage: state.errors?.name,
    handleKeyDown,
  };
}
