import { SidebarContentMemo } from '@/src/components/layout/sidebar/content/sidebar-content-memo';
import {
  FindChildMemoFoldersResponse,
  FindFolderMemosItem,
  findChildMemoFolders,
  findFolderMemos,
} from '@imkdw-dev-client/api-client';
import { cn } from '@imkdw-dev-client/utils';
import { motion } from 'framer-motion';
import { ChevronRight, Folder } from 'lucide-react';
import { useEffect, useState } from 'react';

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
          className='mr-1 text-gray-400 z-10'
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.15 }}
        >
          <ChevronRight size={16} />
        </motion.div>
        <Folder size={16} className='mr-2 text-blue-400' />
        <span>{folderName}</span>
      </button>

      {isOpen && (
        <ul>
          {childFolders.map((childFolder) => (
            <SidebarContentFolder
              key={childFolder.id}
              level={level + 1}
              folderName={childFolder.name}
              folderId={childFolder.id}
            />
          ))}
          {childMemos.map((childMemo) => (
            <SidebarContentMemo key={childMemo.id} level={level + 1} memoName={childMemo.name} slug={childMemo.slug} />
          ))}
        </ul>
      )}
    </li>
  );
}
