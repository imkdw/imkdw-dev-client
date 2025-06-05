'use client';

import * as ContextMenu from '@radix-ui/react-context-menu';
import { useFolderData } from '../../../../../hooks/use-folder-data';
import { useFolderActions } from '../../../../../hooks/use-folder-actions';
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
    setIsCreatingMemo,
    toggleFolder,
    handleCreateMemo,
    handleMemoUpdate,
    handleMemoDelete,
  } = useFolderActions();

  const { childFolders, childMemos, setChildMemos } = useFolderData(folderId, isOpen);

  return (
    <li>
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <FolderItem level={level} folderName={folderName} isOpen={isOpen} onClick={toggleFolder} />
        </ContextMenu.Trigger>
        <FolderContextMenu onCreateMemo={handleCreateMemo} />
      </ContextMenu.Root>

      <FolderChildren
        isOpen={isOpen}
        level={level}
        folderId={folderId}
        childFolders={childFolders}
        childMemos={childMemos}
        isCreatingMemo={isCreatingMemo}
        setIsCreatingMemo={setIsCreatingMemo}
        onMemoUpdate={(updatedMemo) => handleMemoUpdate(updatedMemo, setChildMemos)}
        onMemoDelete={(slug) => handleMemoDelete(slug, setChildMemos)}
      />
    </li>
  );
}
