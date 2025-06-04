import { useState, useEffect, useRef, useCallback, RefObject, MouseEvent as ReactMouseEvent } from 'react';

const MIN_WIDTH = 200;
const MAX_WIDTH = 500;
const DEFAULT_WIDTH = 260;
const COLLAPSE_THRESHOLD = 100;

interface UseResizablePanelArgs {
  initialWidth?: number;
  panelRef?: RefObject<HTMLDivElement>;
}

export const useResizablePanel = ({ initialWidth = DEFAULT_WIDTH }: UseResizablePanelArgs = {}) => {
  const [panelWidth, setPanelWidth] = useState(initialWidth);
  const [isResizing, setIsResizing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dragOffsetRef = useRef(0);

  const handleStartResizing = useCallback(
    (event: ReactMouseEvent) => {
      setIsResizing(true);
      setIsCollapsed(false);
      dragOffsetRef.current = event.clientX - panelWidth;
    },
    [panelWidth],
  );

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isResizing) return;

      let newWidth = event.clientX - dragOffsetRef.current;

      if (newWidth < COLLAPSE_THRESHOLD) {
        setPanelWidth(0);
        setIsCollapsed(true);
        return;
      }

      setIsCollapsed(false);

      newWidth = Math.max(MIN_WIDTH, Math.min(newWidth, MAX_WIDTH));
      setPanelWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const setPanelCollapsed = useCallback(
    (collapsed: boolean) => {
      setIsCollapsed(collapsed);
      if (collapsed) {
        setPanelWidth(0);
      } else {
        setPanelWidth(panelWidth > 0 ? panelWidth : DEFAULT_WIDTH);
      }
    },
    [panelWidth],
  );

  return {
    panelWidth,
    isCollapsed,
    isResizing,
    handleStartResizing,
    setIsCollapsed: setPanelCollapsed,
  };
};
