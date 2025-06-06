import { ResponseFindRootMemoFolders, findRootMemoFolders } from '@imkdw-dev-client/api-client';
import { showErrorToast } from '@imkdw-dev-client/utils';
import { useEffect, useState } from 'react';
import { SIDEBAR_ITEM_ID } from '../constants/sidebar.const';

export function useRootMemoFolders(activeItemId: number | null) {
  const [rootMemoFolders, setRootMemoFolders] = useState<ResponseFindRootMemoFolders[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return { rootMemoFolders, isLoading };
}
