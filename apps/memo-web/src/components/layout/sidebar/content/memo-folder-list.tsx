'use client';

import { ResponseFindRootMemoFolders } from '@imkdw-dev-client/api-client';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { FolderPlus } from 'lucide-react';
import { useState } from 'react';
import { useRootMemoFolders } from '../../../../hooks/folder/use-root-memo-folders';
import { CreateRootFolderInput } from './folder/create-root-folder-input';
import { SidebarContentFolder } from './folder/sidebar-content-folder';
import { SidebarContentSearch } from './sidebar-content-search';

interface Props {
  activeItemId: number;
}

export function MemoFolderList({ activeItemId }: Props) {
  const { rootMemoFolders } = useRootMemoFolders(activeItemId);
  const [isCreatingRootFolder, setIsCreatingRootFolder] = useState(false);

  const handleCreateRootFolder = () => {
    setIsCreatingRootFolder(true);
  };

  return (
    <div className='flex flex-col h-full bg-[#202020]'>
      <SidebarContentSearch />

      <ContextMenu.Root>
        <ContextMenu.Trigger asChild>
          <ul className='overflow-scroll h-full vscode-scrollbar flex-1'>
            {rootMemoFolders.map((rootMemoFolder: ResponseFindRootMemoFolders) => (
              <SidebarContentFolder
                key={rootMemoFolder.id}
                level={0}
                folderName={rootMemoFolder.name}
                folderId={rootMemoFolder.id}
              />
            ))}

            {/* 최상위 폴더 생성 입력 */}
            {isCreatingRootFolder && <CreateRootFolderInput setIsCreatingRootFolder={setIsCreatingRootFolder} />}
          </ul>
        </ContextMenu.Trigger>

        <ContextMenu.Portal>
          <ContextMenu.Content className='context-menu-content'>
            <ContextMenu.Item className='context-menu-item' onClick={handleCreateRootFolder}>
              <FolderPlus size={16} className='text-blue-400' />새 폴더
            </ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Portal>
      </ContextMenu.Root>
    </div>
  );
}
