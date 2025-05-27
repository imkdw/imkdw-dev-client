'use client';

import { MemoFolder, MemoItem, findChildMemoFolders, findFolderMemos } from '@imkdw-dev-client/api-client';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { useEffect, useState } from 'react';
import { FolderItem } from './folder-item';
import { FolderContextMenu } from './folder-context-menu';
import { FolderChildren } from './folder-children';
import { useMemoStore } from '../../../../../stores/memo-store';

interface Props {
  level: number;
  folderName: string;
  folderId: string;
}

export function SidebarContentFolder({ level = 0, folderName, folderId }: Props) {
  const [childFolders, setChildFolders] = useState<MemoFolder[]>([]);
  const [childMemos, setChildMemos] = useState<MemoItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCreatingMemo, setIsCreatingMemo] = useState(false);
  const { currentMemo, setCurrentMemo } = useMemoStore();

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  const handleCreateMemo = () => {
    setIsOpen(true);
    setTimeout(() => {
      setIsCreatingMemo(true);
    }, 100);
  };

  const handleMemoUpdate = (updatedMemo: MemoItem) => {
    setChildMemos((prevMemos) => prevMemos.map((memo) => (memo.id === updatedMemo.id ? updatedMemo : memo)));
    if (currentMemo?.id === updatedMemo.id) {
      setCurrentMemo({ ...currentMemo, path: updatedMemo.path });
    }
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
        folderId={folderId}
        childFolders={childFolders}
        childMemos={childMemos}
        isCreatingMemo={isCreatingMemo}
        setIsCreatingMemo={setIsCreatingMemo}
        onMemoUpdate={handleMemoUpdate}
      />
    </li>
  );
}
