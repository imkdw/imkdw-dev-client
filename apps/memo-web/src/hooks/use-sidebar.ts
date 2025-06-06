import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { SIDEBAR_CONFIG } from '../constants/sidebar';
import { useResizablePanel } from './use-resizable-panel';

export function useSidebar() {
  const [activeItemId, setActiveItemId] = useState<number | null>(SIDEBAR_CONFIG.DEFAULT_ACTIVE_ITEM);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const {
    panelWidth: sidebarWidth,
    isCollapsed,
    isResizing,
    handleStartResizing,
    setIsCollapsed: setIsPanelCollapsed,
  } = useResizablePanel({ initialWidth: SIDEBAR_CONFIG.DEFAULT_WIDTH });

  const handleItemChange: Dispatch<SetStateAction<number | null>> = useCallback(
    (value) => {
      const newValue = typeof value === 'function' ? value(activeItemId) : value;

      if (newValue !== null && isCollapsed) {
        setIsPanelCollapsed(false);
      }

      setActiveItemId(newValue);
    },
    [activeItemId, isCollapsed, setIsPanelCollapsed],
  );

  // 아이템이 선택되지 않았을 때 사이드바 자동 접기
  useEffect(() => {
    if (activeItemId === null && !isCollapsed && !isResizing) {
      setIsPanelCollapsed(true);
    }
  }, [activeItemId, isCollapsed, isResizing, setIsPanelCollapsed]);

  // 사이드바 너비 동적 조정
  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.style.width = `${sidebarWidth}px`;
    }
  }, [sidebarWidth]);

  return {
    activeItemId,
    sidebarRef,
    sidebarWidth,
    isCollapsed,
    isResizing,
    handleItemChange,
    handleStartResizing,
  };
}
