import { useFolderState } from './use-folder-state';
import { useFolderDelete } from './use-folder-delete';
import { useFolderRename } from './use-folder-rename';

export function useFolderActions(folderId: string, folderName?: string) {
  const folderState = useFolderState(folderId);
  const folderDelete = useFolderDelete(folderId);
  const folderRename = useFolderRename(folderId, folderName);

  const handleRenameFolder = () => {
    folderState.startEditing();
  };

  const handleRenameConfirm = async (newName: string) => {
    const success = await folderRename.handleRenameConfirm(newName);
    if (success) {
      folderState.stopEditing();
    }
    return success;
  };

  const handleRenameCancel = () => {
    folderState.stopEditing();
  };

  return {
    // 폴더 상태
    isOpen: folderState.isOpen,
    isCreatingMemo: folderState.isCreatingMemo,
    isCreatingFolder: folderState.isCreatingFolder,
    isEditing: folderState.isEditing,

    // 폴더 삭제
    isDeleting: folderDelete.isDeleting,
    isDeleteDialogOpen: folderDelete.isDeleteDialogOpen,

    // 폴더 이름 변경
    isUpdating: folderRename.isUpdating,

    // 상태 변경 함수들
    setIsCreatingMemo: folderState.setIsCreatingMemo,
    setIsCreatingFolder: folderState.setIsCreatingFolder,
    setIsDeleteDialogOpen: folderDelete.setIsDeleteDialogOpen,

    // 액션 함수들
    toggleFolder: folderState.toggleFolder,
    handleCreateMemo: folderState.startCreatingMemo,
    handleCreateFolder: folderState.startCreatingFolder,
    handleDeleteClick: folderDelete.handleDeleteClick,
    handleDeleteConfirm: folderDelete.handleDeleteConfirm,
    handleRenameFolder,
    handleRenameConfirm,
    handleRenameCancel,

    // 기타
    folderName,
  };
}
