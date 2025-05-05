import {
  findChildMemoFolders,
  FindChildMemoFoldersResponse,
  findFolderMemos,
  FindFolderMemosResponse,
} from '@imkdw-dev-client/api-client';
import { cn } from '@imkdw-dev-client/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, FilePlus, FolderPlus, Folder, Pencil, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SidebarContentMemo } from './sidebar-content-memo';
import * as ContextMenu from '@radix-ui/react-context-menu';

interface Props {
  level: number;
  folderName: string;
  folderId: string;
}

export function SidebarContentFolder({ level = 0, folderName, folderId }: Props) {
  const [childFolders, setChildFolders] = useState<FindChildMemoFoldersResponse[]>([]);
  const [childMemos, setChildMemos] = useState<FindFolderMemosResponse[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchChildFolders = async () => {
      if (isOpen) {
        const childFolders = await findChildMemoFolders(folderId);
        setChildFolders(childFolders);
      }
    };

    fetchChildFolders();
  }, [isOpen, folderId]);

  useEffect(() => {
    const fetchChildMemos = async () => {
      if (isOpen) {
        const childMemos = await findFolderMemos(folderId);
        console.log(childMemos);
        setChildMemos(childMemos);
      }
    };

    fetchChildMemos();
  }, [isOpen, folderId]);

  return (
    <li>
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <button
            type='button'
            className={cn(
              'flex items-center p-1 w-full cursor-pointer hover:bg-[#3B3B3C] rounded',
              'text-base text-gray-300',
            )}
            style={{ paddingLeft: `${level * 16 + 8}px` }}
            onClick={toggleFolder}
          >
            <motion.div
              className='mr-1 flex-shrink-0 text-gray-400 z-10'
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.15 }}
            >
              <ChevronRight size={16} />
            </motion.div>
            <Folder size={16} className='mr-2 flex-shrink-0 text-blue-400' />
            <span className='truncate min-w-0'>{folderName}</span>
          </button>
        </ContextMenu.Trigger>

        <ContextMenu.Portal>
          <ContextMenu.Content className='context-menu-content'>
            <ContextMenu.Item className='context-menu-item'>
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
      </ContextMenu.Root>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0, overflow: 'hidden' }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: { duration: 0.2, ease: 'easeOut' },
                opacity: { duration: 0.3, ease: 'easeOut' },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.2, ease: 'easeIn' },
                opacity: { duration: 0.1, ease: 'easeIn' },
              },
            }}
          >
            {childFolders.map((childFolder) => (
              <SidebarContentFolder
                key={childFolder.id}
                level={level + 1}
                folderName={childFolder.name}
                folderId={childFolder.id}
              />
            ))}
            {childMemos.map((childMemo) => (
              <SidebarContentMemo
                key={childMemo.id}
                level={level + 1}
                memoName={childMemo.name}
                slug={childMemo.slug}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}
