'use client';

import { ResponseFindRootMemoFolders } from '@imkdw-dev-client/api-client';
import { useRootMemoFolders } from '../../../../hooks/use-root-memo-folders';
import { SidebarContentFolder } from './folder/sidebar-content-folder';
import { SidebarContentSearch } from './sidebar-content-search';

interface Props {
  activeItemId: number | null;
}

export function SidebarContent({ activeItemId }: Props) {
  const { rootMemoFolders } = useRootMemoFolders(activeItemId);

  if (activeItemId !== 1) {
    return null;
  }

  return (
    <div className='flex flex-col h-full bg-[#202020]'>
      <SidebarContentSearch />

      <ul className='overflow-scroll h-full vscode-scrollbar'>
        {rootMemoFolders.map((rootMemoFolder: ResponseFindRootMemoFolders) => (
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
