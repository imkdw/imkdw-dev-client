'use client';

import { SidebarContent } from '@/src/components/layout/sidebar/content';
import { cn } from '@imkdw-dev-client/utils';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { SidebarNav } from './sidebar-nav';

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
  const sidebarRef = useRef<HTMLDivElement>(null);

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

  // 사이드바 너비를 동적으로 설정
  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.style.width = isCollapsed ? '0px' : `${sidebarWidth}px`;
    }
  }, [isCollapsed, sidebarWidth]);

  return (
    <div className='flex h-full bg-[#242424]'>
      <div className='h-full w-16 flex-shrink-0 bg-[#3B3B3C] z-10 border-r border-[#383838]'>
        <SidebarNav activeItem={activeItemId} onItemChange={handleItemChange} />
      </div>

      <div
        ref={sidebarRef}
        className={cn(
          'flex-shrink-0 bg-[#242424] text-white overflow-hidden',
          !isCollapsed && 'border-r border-[#383838]',
          !isResizing && 'transition-[width,opacity] duration-200',
          isCollapsed && 'opacity-0 invisible',
        )}
        data-collapsed={isCollapsed}
      >
        <SidebarContent activeItemId={activeItemId} />
      </div>

      {!isCollapsed && (
        <div
          ref={resizeRef}
          className={cn(
            'w-1 bg-[#3d3d3d] hover:bg-[#4d4d4d] active:bg-[#5d5d5d] z-20 cursor-col-resize',
            isResizing && 'bg-[#5d5d5d]',
          )}
          onMouseDown={startResizing}
        />
      )}
    </div>
  );
}
