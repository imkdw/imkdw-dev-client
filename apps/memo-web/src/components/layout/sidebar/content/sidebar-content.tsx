'use client';

import { ResponseFindRootMemoFolders, findRootMemoFolders } from '@imkdw-dev-client/api-client';
import { useEffect, useState } from 'react';
import { SidebarContentFolder } from './folder/sidebar-content-folder';
import { SidebarContentSearch } from './sidebar-content-search';

interface Props {
  activeItemId: number | null;
}

export function SidebarContent({ activeItemId }: Props) {
  const [rootMemoFolders, setRootMemoFolders] = useState<ResponseFindRootMemoFolders[]>([]);

  useEffect(() => {
    const fetchRootMemoFolders = async () => {
      const fetchedRootMemoFolders = await findRootMemoFolders();
      setRootMemoFolders(fetchedRootMemoFolders);
    };

    if (activeItemId === 1) {
      fetchRootMemoFolders();
    } else {
      setRootMemoFolders([]);
    }
  }, [activeItemId]);

  if (activeItemId !== 1) {
    return null;
  }

  return (
    <div className='flex flex-col h-full bg-[#202020]'>
      <SidebarContentSearch />

      <ul className='overflow-scroll h-full vscode-scrollbar'>
        {rootMemoFolders.map((rootMemoFolder) => (
          <SidebarContentFolder
            key={rootMemoFolder.id}
            level={0}
            folderName={rootMemoFolder.name}
            folderId={rootMemoFolder.id}
          />
        ))}
      </ul>
    </div>
  );
}
