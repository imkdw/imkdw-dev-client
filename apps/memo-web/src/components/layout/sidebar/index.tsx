'use client';

import { useState } from 'react';
import { SidebarNav } from './sidebar-nav';
import { ContentRenderer } from '@/src/components/layout/sidebar/content';

export function Sidebar() {
  const [activeItemId, setActiveItemId] = useState<number | null>(null);

  return (
    <div className="flex h-screen w-full">
      {/* 사이드바 */}
      <div className="h-full w-16 flex-shrink-0 bg-[#3B3B3C] z-10 border-r border-[#383838]">
        <SidebarNav activeItem={activeItemId} onItemChange={setActiveItemId} />
      </div>

      {/* 컨텐츠 영역 - 고정된 가로 너비 */}
      <div className="w-[300px] flex-shrink-0 bg-[#242424] text-white overflow-auto border-r border-[#383838]">
        <ContentRenderer activeItemId={activeItemId} />
      </div>
    </div>
  );
}
