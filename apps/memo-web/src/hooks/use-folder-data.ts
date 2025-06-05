import { MemoFolder, MemoItem, findChildMemoFolders, findFolderMemos } from '@imkdw-dev-client/api-client';
import { useEffect, useState } from 'react';

export function useFolderData(folderId: string, isOpen: boolean) {
  const [childFolders, setChildFolders] = useState<MemoFolder[]>([]);
  const [childMemos, setChildMemos] = useState<MemoItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 폴더 목록 조회
  useEffect(() => {
    const fetchChildFolders = async () => {
      if (!isOpen) return;

      setIsLoading(true);
      try {
        const folders = await findChildMemoFolders(folderId);
        setChildFolders(folders);
      } catch {
        setChildFolders([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChildFolders();
  }, [isOpen, folderId]);

  // 메모 목록 조회
  useEffect(() => {
    const fetchChildMemos = async () => {
      if (!isOpen) return;

      try {
        const memos = await findFolderMemos(folderId);
        setChildMemos(memos);
      } catch {
        setChildMemos([]);
      }
    };

    fetchChildMemos();
  }, [isOpen, folderId]);

  return {
    childFolders,
    childMemos,
    isLoading,
    setChildMemos,
  };
}
