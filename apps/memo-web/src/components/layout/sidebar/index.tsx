'use client';

import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { SidebarNav } from './sidebar-nav';
import { SidebarContent } from '@/src/components/layout/sidebar/content';

const MIN_WIDTH = 20;
const MAX_WIDTH = 600;
const DEFAULT_WIDTH = 300;
const COLLAPSE_THRESHOLD = 50;

export function Sidebar() {
  const [activeItemId, setActiveItemId] = useState<number | null>(null);
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_WIDTH);
  const [isResizing, setIsResizing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const resizeRef = useRef<HTMLDivElement>(null);
  const dragOffsetRef = useRef<number>(0);

  const startResizing = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    dragOffsetRef.current = event.clientX - sidebarWidth;
    setIsResizing(true);
  };

  const handleItemChange: Dispatch<SetStateAction<number | null>> = (value) => {
    const newValue = typeof value === 'function' ? value(activeItemId) : value;

    if (newValue !== null && isCollapsed) {
      setIsCollapsed(false);
      setSidebarWidth(DEFAULT_WIDTH);
    }

    setActiveItemId(newValue);
  };

  useEffect(() => {
    if (activeItemId === null && !isCollapsed && !isResizing) {
      setIsCollapsed(true);
      setSidebarWidth(0);
    }
  }, [activeItemId, isCollapsed, isResizing]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isResizing) return;

      let newWidth = event.clientX - dragOffsetRef.current;

      if (newWidth < COLLAPSE_THRESHOLD) {
        setIsCollapsed(true);
        setSidebarWidth(0);
        setIsResizing(false);
        return;
      }

      if (newWidth < MIN_WIDTH) {
        newWidth = MIN_WIDTH;
      }

      if (newWidth > MAX_WIDTH) {
        newWidth = MAX_WIDTH;
      }

      setIsCollapsed(false);
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      if (isResizing) {
        setIsResizing(false);
      }
    };

    if (isResizing) {
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div className="flex h-full">
      <div className="h-full w-16 flex-shrink-0 bg-[#3B3B3C] z-10 border-r border-[#383838]">
        <SidebarNav activeItem={activeItemId} onItemChange={handleItemChange} />
      </div>

      <div
        className={`flex-shrink-0 bg-[#242424] text-white border-r border-[#383838] overflow-hidden
          ${isResizing ? '' : 'transition-all duration-200'}`}
        style={{
          width: isCollapsed ? '0px' : `${sidebarWidth}px`,
          opacity: isCollapsed ? 0 : 1,
          visibility: isCollapsed ? 'hidden' : 'visible',
        }}
      >
        <SidebarContent activeItemId={activeItemId} />
      </div>

      {!isCollapsed && (
        <div
          ref={resizeRef}
          className={`w-1 hover:bg-blue-500 active:bg-blue-600 z-20
            ${isResizing ? 'bg-blue-600 cursor-col-resize' : 'bg-transparent cursor-col-resize'}`}
          onMouseDown={startResizing}
        />
      )}
    </div>
  );
}
