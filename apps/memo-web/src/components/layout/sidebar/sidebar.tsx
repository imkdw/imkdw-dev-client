'use client';

import { SidebarContent } from '@/src/components/layout/sidebar/content/sidebar-content';
import { cn } from '@imkdw-dev-client/utils';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { SidebarNavigator } from './navigator/sidebar-navigator';
import { SidebarResizer } from './resizer/sidebar-resizer';
import { useResizablePanel } from '@/src/hooks/use-resizable-panel';

const SIDEBAR_DEFAULT_WIDTH = 260;

export function Sidebar() {
  const [activeItemId, setActiveItemId] = useState<number | null>(1);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const {
    panelWidth: sidebarWidth,
    isCollapsed,
    isResizing,
    handleStartResizing,
    setIsCollapsed: setIsPanelCollapsed,
  } = useResizablePanel({ initialWidth: SIDEBAR_DEFAULT_WIDTH });

  const handleItemChange: Dispatch<SetStateAction<number | null>> = (value) => {
    const newValue = typeof value === 'function' ? value(activeItemId) : value;

    if (newValue !== null && isCollapsed) {
      setIsPanelCollapsed(false);
    }

    setActiveItemId(newValue);
  };

  useEffect(() => {
    if (activeItemId === null && !isCollapsed && !isResizing) {
      setIsPanelCollapsed(true);
    }
  }, [activeItemId, isCollapsed, isResizing, setIsPanelCollapsed]);

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.style.width = `${sidebarWidth}px`;
    }
  }, [sidebarWidth]);

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
