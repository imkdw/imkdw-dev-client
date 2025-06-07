import { useState } from 'react';
import { useMemoStore } from '../../stores/memo-store';

export function useFolderState(folderId: string) {
  const [isCreatingMemo, setIsCreatingMemo] = useState(false);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { expandedFolders, toggleFolder, setFolderExpanded } = useMemoStore();

  const isOpen = expandedFolders[folderId] || false;

  const handleToggleFolder = () => {
    toggleFolder(folderId);
  };

  const startCreatingMemo = () => {
    if (!isOpen) {
      setFolderExpanded(folderId, true);
    }
    setTimeout(() => {
      setIsCreatingMemo(true);
    }, 100);
  };

  const startCreatingFolder = () => {
    if (!isOpen) {
      setFolderExpanded(folderId, true);
    }
    setTimeout(() => {
      setIsCreatingFolder(true);
    }, 100);
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const stopEditing = () => {
    setIsEditing(false);
  };

  return {
    // 상태
    isOpen,
    isCreatingMemo,
    isCreatingFolder,
    isEditing,

    // 상태 변경 함수들
    setIsCreatingMemo,
    setIsCreatingFolder,
    toggleFolder: handleToggleFolder,
    startCreatingMemo,
    startCreatingFolder,
    startEditing,
    stopEditing,
  };
}
