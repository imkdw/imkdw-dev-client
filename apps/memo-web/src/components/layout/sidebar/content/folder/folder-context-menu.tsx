import * as ContextMenu from '@radix-ui/react-context-menu';
import { FilePlus, FolderPlus, Pencil, Trash } from 'lucide-react';

interface Props {
  onCreateMemo: () => void;
}

export function FolderContextMenu({ onCreateMemo }: Props) {
  return (
    <ContextMenu.Portal>
      <ContextMenu.Content className='context-menu-content'>
        <ContextMenu.Item className='context-menu-item' onClick={onCreateMemo}>
          <FilePlus size={16} className='text-green-400' />새 메모
        </ContextMenu.Item>
        <ContextMenu.Item className='context-menu-item'>
          <FolderPlus size={16} className='text-blue-400' />새 폴더
        </ContextMenu.Item>
        <ContextMenu.Separator className='context-menu-separator' />
        <ContextMenu.Item className='context-menu-item'>
          <Pencil size={16} className='text-orange-400' />
          이름 변경
        </ContextMenu.Item>
        <ContextMenu.Item className='context-menu-item'>
          <Trash size={16} className='text-red-400' />
          삭제
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Portal>
  );
}
