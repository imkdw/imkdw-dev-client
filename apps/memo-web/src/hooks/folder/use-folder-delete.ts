import { useState } from 'react';
import { deleteMemoFolder } from '@imkdw-dev-client/api-client';
import { showErrorToast, showSuccessToast } from '@imkdw-dev-client/utils';
import { useMemoStore } from '../../stores/memo-store';

export function useFolderDelete(folderId: string) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { triggerRefresh } = useMemoStore();

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteMemoFolder(folderId);
      showSuccessToast('폴더가 삭제되었습니다.');
      triggerRefresh();
      setIsDeleteDialogOpen(false);
    } catch {
      showErrorToast('폴더 삭제에 실패했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };

  return {
    isDeleting,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  };
}
