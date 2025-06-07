import { MemoFolder, MemoItem } from '@imkdw-dev-client/api-client';
import { AnimatePresence, motion } from 'framer-motion';
import { SidebarContentMemo } from '../memo/sidebar-content-memo';
import { CreateFolderInput } from './create-folder-input';
import { CreateMemoInput } from './create-memo-input';
import { SidebarContentFolder } from './sidebar-content-folder';

interface Props {
  isOpen: boolean;
  level: number;
  folderId: string | null;
  childFolders: MemoFolder[];
  childMemos: MemoItem[];
  isCreatingMemo: boolean;
  isCreatingFolder: boolean;
  setIsCreatingMemo: (value: boolean) => void;
  setIsCreatingFolder: (value: boolean) => void;
}

export function FolderChildren({
  isOpen,
  level,
  folderId,
  childFolders,
  childMemos,
  isCreatingMemo,
  isCreatingFolder,
  setIsCreatingMemo,
  setIsCreatingFolder,
}: Props) {
  return (
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

          {isCreatingFolder && (
            <CreateFolderInput level={level} parentId={folderId} setIsCreatingFolder={setIsCreatingFolder} />
          )}

          {isCreatingMemo && (
            <CreateMemoInput level={level} folderId={folderId} setIsCreatingMemo={setIsCreatingMemo} />
          )}

          {childMemos.map((memo) => (
            <SidebarContentMemo key={memo.id} level={level + 1} memo={memo} />
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
