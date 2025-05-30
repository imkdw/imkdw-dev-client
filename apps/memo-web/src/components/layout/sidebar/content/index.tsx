'use client';

import { ResponseFindRootMemoFolders, findRootMemoFolders } from '@imkdw-dev-client/api-client';
import { useEffect, useState } from 'react';
import { SidebarContentFolder } from './folder';
import { SidebarSearch } from './search';

export function SidebarContent() {
  const [rootMemoFolders, setRootMemoFolders] = useState<ResponseFindRootMemoFolders[]>([]);

  useEffect(() => {
    const fetchRootMemoFolders = async () => {
      const rootMemoFolders = await findRootMemoFolders();
      setRootMemoFolders(rootMemoFolders);
    };
    fetchRootMemoFolders();
  }, []);

  return (
    <div className='flex flex-col h-full bg-[#202020]'>
      <SidebarSearch />

      {/* 폴더 구조 - 스크롤 영역 */}
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
