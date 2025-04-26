'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight, Folder, File } from 'lucide-react';
import { cn } from '@imkdw-dev-client/utils';

interface FolderItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: FolderItem[];
}

export function FolderContent() {
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        // 실제 API 호출 구현 필요
        // const response = await fetch('/api/folders');
        // const data = await response.json();

        // 중첩 구조의 더미 데이터
        const dummyData: FolderItem[] = [
          {
            id: '1',
            name: 'Nest.js',
            type: 'folder',
            children: [
              {
                id: '1-1',
                name: 'controllers',
                type: 'folder',
                children: [
                  { id: '1-1-1', name: 'auth.controller.ts', type: 'file' },
                  { id: '1-1-2', name: 'user.controller.ts', type: 'file' },
                ],
              },
              {
                id: '1-2',
                name: 'services',
                type: 'folder',
                children: [
                  { id: '1-2-1', name: 'auth.service.ts', type: 'file' },
                  { id: '1-2-2', name: 'user.service.ts', type: 'file' },
                ],
              },
              { id: '1-3', name: 'main.ts', type: 'file' },
            ],
          },
          {
            id: '2',
            name: 'Postgres',
            type: 'folder',
            children: [
              { id: '2-1', name: 'schema.sql', type: 'file' },
              {
                id: '2-2',
                name: 'migrations',
                type: 'folder',
                children: [{ id: '2-2-1', name: '001_init.sql', type: 'file' }],
              },
            ],
          },
          {
            id: '3',
            name: 'Typescript',
            type: 'folder',
            children: [
              { id: '3-1', name: 'tsconfig.json', type: 'file' },
              {
                id: '3-2',
                name: 'examples',
                type: 'folder',
                children: [
                  { id: '3-2-1', name: 'interfaces.ts', type: 'file' },
                  { id: '3-2-2', name: 'generics.ts', type: 'file' },
                ],
              },
            ],
          },
        ];

        setFolders(dummyData);
      } catch (err) {
        console.error('폴더 목록을 불러오는 중 오류 발생:', err);
      }
    };

    fetchFolders();
  }, []);

  const renderTree = (items: FolderItem[], level = 0) => {
    return items.map((item) => (
      <div key={item.id}>
        <div
          className={cn('flex items-center p-1 cursor-pointer hover:bg-[#3B3B3C] rounded', 'text-sm text-gray-300')}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => item.type === 'folder' && toggleFolder(item.id)}
        >
          {item.type === 'folder' ? (
            <>
              <span className="mr-1 text-gray-400">
                {expandedFolders[item.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </span>
              <Folder size={16} className="mr-2 text-blue-400" />
            </>
          ) : (
            <>
              <span className="mr-1 text-gray-400 w-4"></span>
              <File size={16} className="mr-2 text-gray-400" />
            </>
          )}
          <span>{item.name}</span>
        </div>
        {item.children && expandedFolders[item.id] && renderTree(item.children, level + 1)}
      </div>
    ));
  };

  return (
    <div className="px-2">
      <div className="text-sm text-gray-400 uppercase font-semibold mt-4 mb-2 px-2">FOLDERS</div>
      <div className="mt-2">{renderTree(folders)}</div>
    </div>
  );
}
