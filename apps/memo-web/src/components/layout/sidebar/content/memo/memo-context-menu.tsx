'use client';

import * as ContextMenu from '@radix-ui/react-context-menu';
import { Pencil, Trash } from 'lucide-react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onRename: () => void;
  onDelete: () => void;
}

export function MemoContextMenu({ children, onRename, onDelete }: Props) {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>{children}</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className='context-menu-content'>
          <ContextMenu.Item className='context-menu-item' onClick={onRename}>
            <Pencil size={16} className='text-orange-400' />
            이름 변경
          </ContextMenu.Item>
          <ContextMenu.Item className='context-menu-item' onClick={onDelete}>
            <Trash size={16} className='text-red-400' />
            삭제
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}
