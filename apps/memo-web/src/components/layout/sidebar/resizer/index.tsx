import { cn } from '@imkdw-dev-client/utils';
import { MouseEvent, useRef } from 'react';

interface Props {
  isResizing: boolean;
  onStartResizing: (event: MouseEvent) => void;
}

export function SidebarResizer({ isResizing, onStartResizing }: Props) {
  const resizeRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={resizeRef}
      className={cn(
        'w-0.5 bg-[#3d3d3d] hover:bg-[#4d4d4d] active:bg-[#5d5d5d] z-20 cursor-col-resize',
        isResizing && 'bg-[#5d5d5d]',
      )}
      onMouseDown={onStartResizing}
    />
  );
}
