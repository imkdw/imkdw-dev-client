import { MemoFolder, MemoItem } from '@imkdw-dev-client/api-client';
import { AnimatePresence, motion } from 'framer-motion';
import { SidebarContentFolder } from './sidebar-content-folder';
import { SidebarContentMemo } from '../memo/sidebar-content-memo';
import { CreateMemoInput } from './create-memo-input';

interface Props {
  isOpen: boolean;
  level: number;
  folderId: string;
  childFolders: MemoFolder[];
  childMemos: MemoItem[];
  isCreatingMemo: boolean;
  setIsCreatingMemo: (value: boolean) => void;
  onMemoUpdate: (updatedMemo: MemoItem) => void;
  onMemoDelete: (slug: string) => void;
}

export function FolderChildren({
  isOpen,
  level,
  folderId,
  childFolders,
  childMemos,
  isCreatingMemo,
  setIsCreatingMemo,
  onMemoUpdate,
  onMemoDelete,
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
          {/* 폴더 목록 */}
          {childFolders.map((childFolder) => (
            <SidebarContentFolder
              key={childFolder.id}
              level={level + 1}
              folderName={childFolder.name}
              folderId={childFolder.id}
            />
          ))}

          {/* 새 메모 생성시 파일명 입력칸 */}
          {isCreatingMemo && (
            <CreateMemoInput level={level} folderId={folderId} setIsCreatingMemo={setIsCreatingMemo} />
          )}

          {/* 메모 목록 */}
          {childMemos.map((memo) => (
            <SidebarContentMemo
              key={memo.id}
              level={level + 1}
              memo={memo}
              onMemoUpdate={onMemoUpdate}
              onMemoDelete={onMemoDelete}
            />
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
