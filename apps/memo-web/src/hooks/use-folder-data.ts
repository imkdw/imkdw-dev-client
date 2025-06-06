import { MemoFolder, MemoItem, findChildMemoFolders, findFolderMemos } from '@imkdw-dev-client/api-client';
import { showErrorToast } from '@imkdw-dev-client/utils';
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
        showErrorToast('폴더 목록을 불러오는데 실패했습니다.');
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
        showErrorToast('메모 목록을 불러오는데 실패했습니다.');
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
