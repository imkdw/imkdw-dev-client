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
    setIsCreatingMemo,
    setIsCreatingFolder,
    toggleFolder,
    handleCreateMemo,
    handleCreateFolder,
  } = useFolderActions(folderId);

  const { childFolders, childMemos } = useFolderData(folderId);

  return (
    <li>
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <FolderItem level={level} folderName={folderName} isOpen={isOpen} onClick={toggleFolder} />
        </ContextMenu.Trigger>
        <FolderContextMenu onCreateMemo={handleCreateMemo} onCreateFolder={handleCreateFolder} />
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
