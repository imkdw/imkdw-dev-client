import { useState } from 'react';
import { deleteMemoFolder } from '@imkdw-dev-client/api-client';
import { showErrorToast, showSuccessToast } from '@imkdw-dev-client/utils';
import { useMemoStore } from '../stores/memo-store';

export function useFolderActions(folderId: string, folderName?: string) {
  const [isCreatingMemo, setIsCreatingMemo] = useState(false);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { expandedFolders, toggleFolder, setFolderExpanded, triggerRefresh } = useMemoStore();

  const isOpen = expandedFolders[folderId] || false;

  const handleToggleFolder = () => {
    toggleFolder(folderId);
  };

  const handleCreateMemo = () => {
    if (!isOpen) {
      setFolderExpanded(folderId, true);
    }
    setTimeout(() => {
      setIsCreatingMemo(true);
    }, 100);
  };

  const handleCreateFolder = () => {
    if (!isOpen) {
      setFolderExpanded(folderId, true);
    }
    setTimeout(() => {
      setIsCreatingFolder(true);
    }, 100);
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteMemoFolder(folderId);
      showSuccessToast('폴더가 삭제되었습니다.');
      triggerRefresh(); // 폴더 목록 새로고침
    } catch {
      showErrorToast('폴더 삭제에 실패했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isOpen,
    isCreatingMemo,
    isCreatingFolder,
    isDeleting,
    isDeleteDialogOpen,
    setIsCreatingMemo,
    setIsCreatingFolder,
    setIsDeleteDialogOpen,
    toggleFolder: handleToggleFolder,
    handleCreateMemo,
    handleCreateFolder,
    handleDeleteClick,
    handleDeleteConfirm,
    folderName,
  };
}
