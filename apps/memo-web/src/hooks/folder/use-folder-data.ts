import { MemoFolder, MemoItem, findChildMemoFolders, findFolderMemos } from '@imkdw-dev-client/api-client';
import { showErrorToast } from '@imkdw-dev-client/utils';
import { useEffect, useRef, useState } from 'react';
import { useMemoStore } from '../../stores/memo-store';

export function useFolderData(folderId: string) {
  const [childFolders, setChildFolders] = useState<MemoFolder[]>([]);
  const [childMemos, setChildMemos] = useState<MemoItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { expandedFolders, refreshTrigger } = useMemoStore();
  const isOpen = expandedFolders[folderId] || false;
  const prevRefreshTrigger = useRef(refreshTrigger);

  // 폴더 목록 조회
  useEffect(() => {
    const fetchChildFolders = async () => {
      if (!isOpen) {
        setChildFolders([]);
        return;
      }

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
      if (!isOpen) {
        setChildMemos([]);
        return;
      }

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

  // refreshTrigger 변경 감지 및 데이터 다시 로드
  useEffect(() => {
    if (prevRefreshTrigger.current !== refreshTrigger && isOpen) {
      // 폴더 목록 다시 조회
      const refetchFolders = async () => {
        try {
          const folders = await findChildMemoFolders(folderId);
          setChildFolders(folders);
        } catch {
          setChildFolders([]);
          showErrorToast('폴더 목록을 불러오는데 실패했습니다.');
        }
      };

      // 메모 목록 다시 조회
      const refetchMemos = async () => {
        try {
          const memos = await findFolderMemos(folderId);
          setChildMemos(memos);
        } catch {
          setChildMemos([]);
          showErrorToast('메모 목록을 불러오는데 실패했습니다.');
        }
      };

      refetchFolders();
      refetchMemos();
    }

    prevRefreshTrigger.current = refreshTrigger;
  }, [refreshTrigger, isOpen, folderId]);

  return {
    childFolders,
    childMemos,
    isLoading,
    isOpen,
  };
}
