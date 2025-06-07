import * as ContextMenu from '@radix-ui/react-context-menu';
import { FilePlus, FolderPlus, Pencil, Trash } from 'lucide-react';
import { DeleteConfirmDialog } from '../../../../common/delete-confirm-dialog';

interface Props {
  onCreateMemo: () => void;
  onCreateFolder: () => void;
  onRenameFolder?: () => void;
  onDeleteClick?: () => void;
  onDeleteConfirm?: () => void;
  isDeleting?: boolean;
  isDeleteDialogOpen?: boolean;
  onDeleteDialogChange?: (open: boolean) => void;
  folderName?: string;
}

export function FolderContextMenu({
  onCreateMemo,
  onCreateFolder,
  onRenameFolder,
  onDeleteClick,
  onDeleteConfirm,
  isDeleting = false,
  isDeleteDialogOpen = false,
  onDeleteDialogChange,
  folderName,
}: Props) {
  return (
    <>
      <ContextMenu.Portal>
        <ContextMenu.Content className='context-menu-content'>
          <ContextMenu.Item className='context-menu-item' onClick={onCreateMemo}>
            <FilePlus size={16} className='text-green-400' />새 메모
          </ContextMenu.Item>
          <ContextMenu.Item className='context-menu-item' onClick={onCreateFolder}>
            <FolderPlus size={16} className='text-blue-400' />새 폴더
          </ContextMenu.Item>
          <ContextMenu.Separator className='context-menu-separator' />
          {onRenameFolder && (
            <ContextMenu.Item className='context-menu-item' onClick={onRenameFolder}>
              <Pencil size={16} className='text-orange-400' />
              이름 변경
            </ContextMenu.Item>
          )}
          {onDeleteClick && (
            <ContextMenu.Item className='context-menu-item' onClick={onDeleteClick} disabled={isDeleting}>
              <Trash size={16} className='text-red-400' />
              {isDeleting ? '삭제 중...' : '삭제'}
            </ContextMenu.Item>
          )}
        </ContextMenu.Content>
      </ContextMenu.Portal>

      {onDeleteConfirm && onDeleteDialogChange && (
        <DeleteConfirmDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={onDeleteDialogChange}
          onConfirm={onDeleteConfirm}
          title='폴더 삭제 확인'
          description={`"${folderName}" 폴더를 삭제하시겠습니까?\n\n폴더 내부의 모든 메모와 하위 폴더가 함께 삭제됩니다.`}
        />
      )}
    </>
  );
}
