import {
  findChildMemoFolders,
  FindChildMemoFoldersResponse,
  findFolderMemos,
  FindFolderMemosItem,
} from '@imkdw-dev-client/api-client';
import { cn } from '@imkdw-dev-client/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, Folder } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SidebarContentMemo } from './sidebar-content-memo';

interface Props {
  level: number;
  folderName: string;
  folderId: string;
}

export function SidebarContentFolder({ level = 0, folderName, folderId }: Props) {
  const [childFolders, setChildFolders] = useState<FindChildMemoFoldersResponse[]>([]);
  const [childMemos, setChildMemos] = useState<FindFolderMemosItem[]>([]);
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
        setChildMemos(childMemos);
      }
    };

    fetchChildMemos();
  }, [isOpen, folderId]);

  return (
    <li>
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
