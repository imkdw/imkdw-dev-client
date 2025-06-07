'use client';

import * as AlertDialog from '@radix-ui/react-alert-dialog';

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

export function DeleteConfirmDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  title = '삭제 확인',
  description = '이 작업은 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?',
  confirmText = '삭제',
  cancelText = '취소',
}: Props) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <AlertDialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onOpenChange(false);
          setTimeout(() => {
            document.body.style.pointerEvents = 'auto';
          }, 0);
          return;
        }

        onOpenChange(true);
      }}
    >
      <AlertDialog.Portal>
        <AlertDialog.Overlay className='fixed inset-0 bg-black/50 backdrop-blur-sm z-10' />
        <AlertDialog.Content className='fixed left-1/2 top-1/2 z-10 w-full max-w-md -translate-x-1/2 -translate-y-1/2'>
          <div className='bg-[#1e1e1e] border border-[#3c3c3c] rounded-lg shadow-2xl p-6'>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <AlertDialog.Title className='text-white text-lg font-semibold'>{title}</AlertDialog.Title>
                <AlertDialog.Description className='text-[#cccccc] text-sm leading-relaxed'>
                  {description}
                </AlertDialog.Description>
              </div>

              <div className='flex justify-end gap-3 pt-4'>
                <AlertDialog.Cancel asChild>
                  <button
                    type='button'
                    className='px-4 py-2 text-sm font-medium text-[#cccccc] bg-transparent border border-[#3c3c3c] rounded hover:bg-[#2d2d2d] hover:border-[#464647] transition-colors'
                  >
                    {cancelText}
                  </button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                  <button
                    type='button'
                    onClick={handleConfirm}
                    className='px-4 py-2 text-sm font-medium text-white bg-[#da3633] border border-[#da3633] rounded hover:bg-[#c5302d] hover:border-[#c5302d] transition-colors'
                  >
                    {confirmText}
                  </button>
                </AlertDialog.Action>
              </div>
            </div>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
