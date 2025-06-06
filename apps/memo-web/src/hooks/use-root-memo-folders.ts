import { ResponseFindRootMemoFolders, findRootMemoFolders } from '@imkdw-dev-client/api-client';
import { showErrorToast } from '@imkdw-dev-client/utils';
import { useEffect, useRef, useState } from 'react';
import { SIDEBAR_ITEM_ID } from '../constants/sidebar.const';
import { useMemoStore } from '../stores/memo-store';

export function useRootMemoFolders(activeItemId: number | null) {
  const [rootMemoFolders, setRootMemoFolders] = useState<ResponseFindRootMemoFolders[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { refreshTrigger } = useMemoStore();
  const prevRefreshTrigger = useRef(refreshTrigger);

  useEffect(() => {
    const fetchRootMemoFolders = async () => {
      if (activeItemId !== SIDEBAR_ITEM_ID.MEMO_FOLDERS) {
        setRootMemoFolders([]);
        return;
      }

      setIsLoading(true);
      try {
        const fetchedRootMemoFolders = await findRootMemoFolders();
        setRootMemoFolders(fetchedRootMemoFolders);
      } catch {
        // 루트 폴더 로딩 실패는 심각한 문제이므로 사용자에게 알림
        setRootMemoFolders([]);
        showErrorToast('메모 폴더를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRootMemoFolders();
  }, [activeItemId]);

  // refreshTrigger 변경 감지 및 데이터 다시 로드
  useEffect(() => {
    if (prevRefreshTrigger.current !== refreshTrigger && activeItemId === SIDEBAR_ITEM_ID.MEMO_FOLDERS) {
      const refetchRootFolders = async () => {
        setIsLoading(true);
        try {
          const fetchedRootMemoFolders = await findRootMemoFolders();
          setRootMemoFolders(fetchedRootMemoFolders);
        } catch {
          setRootMemoFolders([]);
          showErrorToast('메모 폴더를 불러오는데 실패했습니다.');
        } finally {
          setIsLoading(false);
        }
      };

      refetchRootFolders();
    }

    prevRefreshTrigger.current = refreshTrigger;
  }, [refreshTrigger, activeItemId]);

  return { rootMemoFolders, isLoading };
}
