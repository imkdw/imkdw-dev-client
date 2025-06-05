import { ResponseFindRootMemoFolders, findRootMemoFolders } from '@imkdw-dev-client/api-client';
import { useEffect, useState } from 'react';

export function useRootMemoFolders(activeItemId: number | null) {
  const [rootMemoFolders, setRootMemoFolders] = useState<ResponseFindRootMemoFolders[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRootMemoFolders = async () => {
      if (activeItemId !== 1) {
        setRootMemoFolders([]);
        return;
      }

      setIsLoading(true);
      try {
        const fetchedRootMemoFolders = await findRootMemoFolders();
        setRootMemoFolders(fetchedRootMemoFolders);
      } catch {
        // 에러 발생 시 빈 배열로 설정
        setRootMemoFolders([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRootMemoFolders();
  }, [activeItemId]);

  return { rootMemoFolders, isLoading };
}
