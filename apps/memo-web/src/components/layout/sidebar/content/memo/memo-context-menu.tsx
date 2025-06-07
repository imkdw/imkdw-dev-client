'use client';

import * as ContextMenu from '@radix-ui/react-context-menu';
import { Pencil, Trash } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { DeleteConfirmDialog } from '../../../../common/delete-confirm-dialog';

interface Props {
  children: ReactNode;
  onRename: () => void;
  onDelete: () => void;
}

export function MemoContextMenu({ children, onRename, onDelete }: Props) {
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

  return (
    <>
      <ContextMenu.Root>
        <ContextMenu.Trigger>{children}</ContextMenu.Trigger>
        <ContextMenu.Portal>
          <ContextMenu.Content className='context-menu-content'>
            <ContextMenu.Item className='context-menu-item' onClick={onRename}>
              <Pencil size={16} className='text-orange-400' />
              이름 변경
            </ContextMenu.Item>
            <ContextMenu.Item className='context-menu-item' onClick={() => setIsOpenDeleteDialog(true)}>
              <Trash size={16} className='text-red-400' />
              삭제
            </ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Portal>
      </ContextMenu.Root>

      <DeleteConfirmDialog
        isOpen={isOpenDeleteDialog}
        onOpenChange={setIsOpenDeleteDialog}
        onConfirm={onDelete}
        title='메모 삭제 확인'
        description='이 작업은 되돌릴 수 없습니다. 정말로 메모를 삭제하시겠습니까?'
      />
    </>
  );
}
