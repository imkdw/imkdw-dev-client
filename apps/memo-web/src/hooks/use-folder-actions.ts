import { MemoItem } from '@imkdw-dev-client/api-client';
import { useCallback, useState } from 'react';
import { useMemoStore } from '../stores/memo-store';

export function useFolderActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreatingMemo, setIsCreatingMemo] = useState(false);
  const { currentMemo, setCurrentMemo } = useMemoStore();

  const toggleFolder = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleCreateMemo = useCallback(() => {
    setIsOpen(true);
    setTimeout(() => {
      setIsCreatingMemo(true);
    }, 100);
  }, []);

  const handleMemoUpdate = useCallback(
    (updatedMemo: MemoItem, setChildMemos: React.Dispatch<React.SetStateAction<MemoItem[]>>) => {
      setChildMemos((prevMemos) => prevMemos.map((memo) => (memo.id === updatedMemo.id ? updatedMemo : memo)));

      if (currentMemo?.id === updatedMemo.id) {
        setCurrentMemo({ ...currentMemo, path: updatedMemo.path });
      }
    },
    [currentMemo, setCurrentMemo],
  );

  const handleMemoDelete = useCallback(
    (slug: string, setChildMemos: React.Dispatch<React.SetStateAction<MemoItem[]>>) => {
      setChildMemos((prevMemos) => prevMemos.filter((memo) => memo.slug !== slug));
    },
    [],
  );

  return {
    isOpen,
    isCreatingMemo,
    setIsCreatingMemo,
    toggleFolder,
    handleCreateMemo,
    handleMemoUpdate,
    handleMemoDelete,
  };
}
