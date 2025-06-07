'use client';

import * as ContextMenu from '@radix-ui/react-context-menu';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Pencil, Trash } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
  onRename: () => void;
  onDelete: () => void;
}

export function MemoContextMenu({ children, onRename, onDelete }: Props) {
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

  const handleDelete = () => {
    onDelete();
    setIsOpenDeleteDialog(false);
  };

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

      <AlertDialog.Root
        open={isOpenDeleteDialog}
        onOpenChange={(open) => {
          if (!open) {
            setIsOpenDeleteDialog(false);
            setTimeout(() => {
              document.body.style.pointerEvents = 'auto';
            }, 0);
            return;
          }

          setIsOpenDeleteDialog(true);
        }}
      >
        <AlertDialog.Portal>
          <AlertDialog.Overlay className='fixed inset-0 bg-black/50 backdrop-blur-sm z-10' />
          <AlertDialog.Content className='fixed left-1/2 top-1/2 z-10 w-full max-w-md -translate-x-1/2 -translate-y-1/2'>
            <div className='bg-[#1e1e1e] border border-[#3c3c3c] rounded-lg shadow-2xl p-6'>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <AlertDialog.Title className='text-white text-lg font-semibold'>메모 삭제 확인</AlertDialog.Title>
                  <AlertDialog.Description className='text-[#cccccc] text-sm leading-relaxed'>
                    이 작업은 되돌릴 수 없습니다. 정말로 메모를 삭제하시겠습니까?
                  </AlertDialog.Description>
                </div>

                <div className='flex justify-end gap-3 pt-4'>
                  <AlertDialog.Cancel asChild>
                    <button
                      type='button'
                      className='px-4 py-2 text-sm font-medium text-[#cccccc] bg-transparent border border-[#3c3c3c] rounded hover:bg-[#2d2d2d] hover:border-[#464647] transition-colors'
                    >
                      취소
                    </button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action asChild>
                    <button
                      type='button'
                      onClick={handleDelete}
                      className='px-4 py-2 text-sm font-medium text-white bg-[#da3633] border border-[#da3633] rounded hover:bg-[#c5302d] hover:border-[#c5302d] transition-colors'
                    >
                      삭제
                    </button>
                  </AlertDialog.Action>
                </div>
              </div>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
}
