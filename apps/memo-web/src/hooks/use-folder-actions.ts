import { useState } from 'react';
import { useMemoStore } from '../stores/memo-store';

export function useFolderActions(folderId: string) {
  const [isCreatingMemo, setIsCreatingMemo] = useState(false);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const { expandedFolders, toggleFolder, setFolderExpanded } = useMemoStore();

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

  return {
    isOpen,
    isCreatingMemo,
    isCreatingFolder,
    setIsCreatingMemo,
    setIsCreatingFolder,
    toggleFolder: handleToggleFolder,
    handleCreateMemo,
    handleCreateFolder,
  };
}
