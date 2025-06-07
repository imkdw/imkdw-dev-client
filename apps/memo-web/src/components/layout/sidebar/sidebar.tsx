'use client';

import { SidebarContent } from '@/src/components/layout/sidebar/content/sidebar-content';
import { useSidebar } from '@/src/hooks/ui/use-sidebar';
import { cn } from '@imkdw-dev-client/utils';
import { SidebarNavigator } from './navigator/sidebar-navigator';
import { SidebarResizer } from './resizer/sidebar-resizer';

export function Sidebar() {
  const { activeItemId, sidebarRef, isCollapsed, isResizing, handleItemChange, handleStartResizing } = useSidebar();

  return (
    <div className='flex h-full bg-[#242424]'>
      <div className='h-full w-16 flex-shrink-0 bg-[#3B3B3C] border-r border-[#383838]'>
        <SidebarNavigator activeItem={activeItemId} onItemChange={handleItemChange} />
      </div>

      <div
        ref={sidebarRef}
        className={cn(
          'flex-shrink-0 bg-[#242424] text-white overflow-hidden',
          !isCollapsed && 'border-r border-[#383838]',
          !isResizing && 'transition-[width,opacity] duration-200',
          isCollapsed && 'opacity-0 invisible',
        )}
      >
        <SidebarContent activeItemId={activeItemId} />
      </div>

      {!isCollapsed && <SidebarResizer isResizing={isResizing} onStartResizing={handleStartResizing} />}
    </div>
  );
}
