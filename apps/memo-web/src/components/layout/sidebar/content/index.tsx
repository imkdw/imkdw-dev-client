'use client';

import { SidebarContentFolder } from '@/src/components/layout/sidebar/content/sidebar-content-folder';
import { ResponseFindRootMemoFolders, findRootMemoFolders } from '@imkdw-dev-client/api-client';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export function SidebarContent() {
  const [searchQuery, setSearchQuery] = useState('');
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
      {/* 검색 영역 */}
      <div className='p-2 relative'>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 pl-2 flex items-center'>
            <Search size={16} className='text-gray-400' />
          </div>
          <input
            type='text'
            // TODO: 다국어 처리
            placeholder='메모 검색...'
            className='w-full bg-[#3B3B3C] text-white text-base rounded pl-8 py-1.5'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 폴더 구조 - 스크롤 영역 */}
      <div className='overflow-scroll vscode-scrollbar'>
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
