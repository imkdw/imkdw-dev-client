import { useState, useEffect, useRef, useCallback } from 'react';

const MIN_WIDTH = 200;
const MAX_WIDTH = 500;
const DEFAULT_WIDTH = 260;
const COLLAPSE_THRESHOLD = 100;

interface UseResizablePanelArgs {
  initialWidth?: number;
  panelRef?: React.RefObject<HTMLDivElement>;
}

export const useResizablePanel = ({
  initialWidth = DEFAULT_WIDTH,
}: UseResizablePanelArgs = {}) => {
  const [panelWidth, setPanelWidth] = useState(initialWidth);
  const [isResizing, setIsResizing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dragOffsetRef = useRef(0);

  const handleStartResizing = useCallback((event: React.MouseEvent) => {
    setIsResizing(true);
    setIsCollapsed(false); // Uncollapse when resizing starts
    dragOffsetRef.current = event.clientX - panelWidth;
  }, [panelWidth]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isResizing) return;

      let newWidth = event.clientX - dragOffsetRef.current;

      if (newWidth < COLLAPSE_THRESHOLD) {
        setPanelWidth(0); // Or MIN_WIDTH if you don't want it to fully collapse to 0 before threshold
        setIsCollapsed(true);
        // It might be better to set isResizing to false here if collapsing means stopping the resize operation
        // setIsResizing(false);
        return; // Early exit if collapsed
      } else {
        setIsCollapsed(false);
      }

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
  }, [isResizing, COLLAPSE_THRESHOLD, MIN_WIDTH, MAX_WIDTH]);

  // Allow external control for collapsing, e.g., when activeItemId is null
  const setPanelCollapsed = useCallback((collapsed: boolean) => {
    setIsCollapsed(collapsed);
    if (collapsed) {
      setPanelWidth(0); // Or MIN_WIDTH if preferred
    } else {
      // Restore to previous width or default if no previous width is stored
      // For simplicity, restoring to default or MIN_WIDTH if panelWidth was 0
      setPanelWidth(panelWidth > 0 ? panelWidth : DEFAULT_WIDTH);
    }
  }, [panelWidth]);


  return {
    panelWidth,
    isCollapsed,
    isResizing,
    handleStartResizing,
    setIsCollapsed: setPanelCollapsed, // Renamed for clarity
  };
};
