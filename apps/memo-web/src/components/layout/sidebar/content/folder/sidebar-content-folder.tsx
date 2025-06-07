'use client';

import * as ContextMenu from '@radix-ui/react-context-menu';
import { useFolderActions } from '../../../../../hooks/use-folder-actions';
import { useFolderData } from '../../../../../hooks/use-folder-data';
import { FolderChildren } from './folder-children';
import { FolderContextMenu } from './folder-context-menu';
import { FolderItem } from './folder-item';

interface Props {
  level: number;
  folderName: string;
  folderId: string;
}

export function SidebarContentFolder({ level = 0, folderName, folderId }: Props) {
  const {
    isOpen,
    isCreatingMemo,
    isCreatingFolder,
    isDeleting,
    isDeleteDialogOpen,
    setIsCreatingMemo,
    setIsCreatingFolder,
    setIsDeleteDialogOpen,
    toggleFolder,
    handleCreateMemo,
    handleCreateFolder,
    handleDeleteClick,
    handleDeleteConfirm,
    folderName: hookFolderName,
  } = useFolderActions(folderId, folderName);

  const { childFolders, childMemos } = useFolderData(folderId);

  return (
    <li>
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <FolderItem level={level} folderName={folderName} isOpen={isOpen} onClick={toggleFolder} />
        </ContextMenu.Trigger>
        <FolderContextMenu
          onCreateMemo={handleCreateMemo}
          onCreateFolder={handleCreateFolder}
          onDeleteClick={handleDeleteClick}
          onDeleteConfirm={handleDeleteConfirm}
          isDeleting={isDeleting}
          isDeleteDialogOpen={isDeleteDialogOpen}
          onDeleteDialogChange={setIsDeleteDialogOpen}
          folderName={hookFolderName}
        />
      </ContextMenu.Root>

      <FolderChildren
        isOpen={isOpen}
        level={level}
        folderId={folderId}
        childFolders={childFolders}
        childMemos={childMemos}
        isCreatingMemo={isCreatingMemo}
        isCreatingFolder={isCreatingFolder}
        setIsCreatingMemo={setIsCreatingMemo}
        setIsCreatingFolder={setIsCreatingFolder}
      />
    </li>
  );
}
