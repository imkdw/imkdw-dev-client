'use client';

import { SidebarContentFolder } from '@/src/components/layout/sidebar/content/sidebar-content-folder';
import { findRootMemoFolders, FindRootMemoFoldersResponse } from '@imkdw-dev-client/api-client';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SidebarContentProps {
  activeItemId: number | null;
}

export function SidebarContent({ activeItemId }: SidebarContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [rootMemoFolders, setRootMemoFolders] = useState<FindRootMemoFoldersResponse[]>([]);

  useEffect(() => {
    const fetchRootMemoFolders = async () => {
      const rootMemoFolders = await findRootMemoFolders();
      setRootMemoFolders(rootMemoFolders);
    };
    fetchRootMemoFolders();
  }, []);

  return (
    <div className='p-2 h-full overflow-auto bg-[#202020] vscode-scrollbar'>
      {/* 검색 영역 */}
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none'>
          <Search size={16} className='text-gray-400' />
        </div>
        <input
          type='text'
          // TODO: 다국어 처리
          placeholder='메모 검색...'
          className='w-full bg-[#3B3B3C] text-white text-base rounded pl-8 pr-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 폴더 구조 */}
      <div className='pt-2'>
        {rootMemoFolders.map((rootMemoFolder) => (
          <SidebarContentFolder
            key={rootMemoFolder.id}
            level={0}
            folderName={rootMemoFolder.name}
            folderId={rootMemoFolder.id}
          />
        ))}
      </div>
    </div>
  );
}
