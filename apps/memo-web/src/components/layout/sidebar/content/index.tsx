'use client';

import { FolderContent } from './folder-content';
import { MemoContent } from './memo-content';

interface ContentRendererProps {
  activeItemId: number | null;
}

export function SidebarContent({ activeItemId }: ContentRendererProps) {
  if (activeItemId === 1) {
    return <FolderContent />;
  }

  if (activeItemId === 2) {
    return <MemoContent />;
  }

  return (
    <div className='flex items-center justify-center h-full text-gray-400'>
      <div className='text-center'>
        {/* TODO: 다국어처리 */}
        <p className='text-lg'>사이드바에서 항목을 선택해주세요.</p>
      </div>
    </div>
  );
}
