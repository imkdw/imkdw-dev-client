import { createMemo } from '@imkdw-dev-client/api-client';
import { Keyboard } from '@imkdw-dev-client/consts';
import { useRouter } from '@imkdw-dev-client/i18n';
import { showSuccessToast } from '@imkdw-dev-client/utils';
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';

interface UseCreateMemoInputProps {
  folderId: string;
  setIsCreatingMemo: (value: boolean) => void;
}

export function useCreateMemoInput({ folderId, setIsCreatingMemo }: UseCreateMemoInputProps) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
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

  const handleSubmit = useCallback(async () => {
    if (!name.trim()) {
      setError('메모 이름을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { slug } = await createMemo({ folderId, name: name.trim() });
      showSuccessToast('메모가 생성되었습니다.');
      setIsCreatingMemo(false);
      router.push(`/memo/${slug}`);
    } catch {
      setError('메모 생성에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [folderId, name, router, setIsCreatingMemo]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === Keyboard.ENTER && !isLoading) {
        event.preventDefault();
        handleSubmit();
      } else if (event.key === Keyboard.ESCAPE) {
        setIsCreatingMemo(false);
      }
    },
    [handleSubmit, isLoading, setIsCreatingMemo],
  );

  const handleNameChange = (value: string) => {
    setName(value);
    if (error) setError(null);
  };

  return {
    name,
    setName: handleNameChange,
    inputRef,
    formRef,
    isLoading,
    error,
    handleSubmit,
    handleKeyDown,
  };
}
