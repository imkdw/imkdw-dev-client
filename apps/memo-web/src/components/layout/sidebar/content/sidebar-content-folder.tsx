import {
  findChildMemoFolders,
  FindChildMemoFoldersResponse,
  findFolderMemos,
  FindFolderMemosResponse,
} from '@imkdw-dev-client/api-client';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { useEffect, useState } from 'react';
import { FolderItem } from './folder/folder-item';
import { FolderContextMenu } from './folder/folder-context-menu';
import { FolderChildren } from './folder/folder-children';

interface Props {
  level: number;
  folderName: string;
  folderId: string;
}

export function SidebarContentFolder({ level = 0, folderName, folderId }: Props) {
  const [childFolders, setChildFolders] = useState<FindChildMemoFoldersResponse[]>([]);
  const [childMemos, setChildMemos] = useState<FindFolderMemosResponse[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCreatingMemo, setIsCreatingMemo] = useState(false);

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  const handleCreateMemo = () => {
    setIsOpen(true);
    setTimeout(() => {
      setIsCreatingMemo(true);
    }, 100);
  };

  /**
   * 폴더 목록 조회
   */
  useEffect(() => {
    const fetchChildFolders = async () => {
      if (isOpen) {
        const childFolders = await findChildMemoFolders(folderId);
        setChildFolders(childFolders);
      }
    };

    fetchChildFolders();
  }, [isOpen, folderId]);

  /**
   * 메모 목록 조회
   */
  useEffect(() => {
    const fetchChildMemos = async () => {
      if (isOpen) {
        const childMemos = await findFolderMemos(folderId);
        setChildMemos(childMemos);
      }
    };

    fetchChildMemos();
  }, [isOpen, folderId]);

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
        childFolders={childFolders}
        childMemos={childMemos}
        isCreatingMemo={isCreatingMemo}
        setIsCreatingMemo={setIsCreatingMemo}
      />
    </li>
  );
}
