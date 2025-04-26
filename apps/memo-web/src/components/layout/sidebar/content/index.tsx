'use client';

import { FolderContent } from './folder-content';
import { MemoContent } from './memo-content';

interface ContentRendererProps {
  activeItemId: number | null;
}

export function ContentRenderer({ activeItemId }: ContentRendererProps) {
  if (activeItemId === 1) {
    return <FolderContent />;
  }

  if (activeItemId === 2) {
    return <MemoContent />;
  }

  return (
    <div className="flex items-center justify-center h-full text-gray-400">
      <div className="text-center">
        <p className="text-lg">사이드바에서 항목을 선택해주세요.</p>
        <p className="text-sm mt-2">폴더나 메모 아이콘을 클릭하면 해당 내용이 여기에 표시됩니다.</p>
      </div>
    </div>
  );
}
