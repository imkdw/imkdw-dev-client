import { useState } from 'react';
import { updateMemoFolderName } from '@imkdw-dev-client/api-client';
import { showErrorToast, showSuccessToast } from '@imkdw-dev-client/utils';
import { useMemoStore } from '../../stores/memo-store';

export function useFolderRename(folderId: string, currentName?: string) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { triggerRefresh } = useMemoStore();

  const handleRenameConfirm = async (newName: string) => {
    if (!newName.trim()) {
      showErrorToast('폴더명을 입력해주세요.');
      return false;
    }

    if (newName.trim() === currentName) {
      return true;
    }

    setIsUpdating(true);
    try {
      await updateMemoFolderName(folderId, { name: newName.trim() });
      showSuccessToast('폴더명이 변경되었습니다.');
      triggerRefresh();
      return true;
    } catch {
      showErrorToast('폴더명 변경에 실패했습니다.');
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    isUpdating,
    handleRenameConfirm,
  };
}
