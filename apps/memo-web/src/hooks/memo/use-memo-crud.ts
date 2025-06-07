'use client';

import { deleteMemo, updateMemoName } from '@imkdw-dev-client/api-client';
import type { MemoItem } from '@imkdw-dev-client/api-client';
import { showErrorToast, showSuccessToast } from '@imkdw-dev-client/utils';
import { useCallback, useState } from 'react';
import { useMemoStore } from '../../stores/memo-store';

export const useMemoCrud = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { triggerRefresh } = useMemoStore();

  const updateMemo = useCallback(
    async (slug: string, data: { name: string }): Promise<MemoItem | null> => {
      setIsUpdating(true);
      try {
        const result = await updateMemoName(slug, data);
        showSuccessToast('메모 이름이 변경되었습니다.');
        // 수정 후 데이터 갱신
        triggerRefresh();
        return result;
      } catch {
        showErrorToast('메모 이름 변경에 실패했습니다.');
        return null;
      } finally {
        setIsUpdating(false);
      }
    },
    [triggerRefresh],
  );

  const removeMemo = useCallback(
    async (slug: string): Promise<boolean> => {
      setIsDeleting(true);
      try {
        await deleteMemo(slug);
        showSuccessToast('메모가 삭제되었습니다.');
        triggerRefresh();
        return true;
      } catch {
        showErrorToast('메모 삭제에 실패했습니다.');
        return false;
      } finally {
        setIsDeleting(false);
      }
    },
    [triggerRefresh],
  );

  return {
    updateMemo,
    removeMemo,
    isUpdating,
    isDeleting,
  };
};
