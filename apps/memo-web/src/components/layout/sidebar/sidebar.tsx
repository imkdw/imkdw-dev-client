'use client';

import { SidebarContent } from '@/src/components/layout/sidebar/content/sidebar-content';
import { cn } from '@imkdw-dev-client/utils';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { SidebarNavigator } from './navigator/sidebar-navigator';
import { SidebarResizer } from './resizer/sidebar-resizer';
import { useResizablePanel } from '@/src/hooks/use-resizable-panel';

// Constants like MIN_WIDTH, MAX_WIDTH, COLLAPSE_THRESHOLD are now managed by the hook.
// DEFAULT_WIDTH can be passed to the hook.
const SIDEBAR_DEFAULT_WIDTH = 260; // Or import from a shared constants file if available

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
      // The hook should handle restoring the width when uncollapsing
    }

    setActiveItemId(newValue);
  };

  useEffect(() => {
    // Collapse the panel if activeItemId becomes null and the panel is not already collapsing due to resize
    if (activeItemId === null && !isCollapsed && !isResizing) {
      setIsPanelCollapsed(true);
    }
  }, [activeItemId, isCollapsed, isResizing, setIsPanelCollapsed]);

  useEffect(() => {
    if (sidebarRef.current) {
      // The hook now manages panelWidth directly, including when collapsed (e.g. to 0)
      sidebarRef.current.style.width = `${sidebarWidth}px`;
    }
  }, [sidebarWidth]); // isCollapsed is implicitly handled by panelWidth from the hook

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
          // The hook doesn't expose a separate transition state,
          // but transitions can be applied based on isResizing or kept general.
          // For now, let's assume transitions are handled by CSS or are acceptable during resize.
          // Consider adding !isResizing to classNames if specific transition behavior is needed.
          !isResizing && 'transition-[width,opacity] duration-200',
          isCollapsed && 'opacity-0 invisible',
        )}
        // data-collapsed={isCollapsed} // This can be kept if used by CSS, otherwise optional
      >
        <SidebarContent activeItemId={activeItemId} />
      </div>

      {/* The resizer should only be shown when the panel is not collapsed */}
      {!isCollapsed && <SidebarResizer isResizing={isResizing} onStartResizing={handleStartResizing} />}
    </div>
  );
}
