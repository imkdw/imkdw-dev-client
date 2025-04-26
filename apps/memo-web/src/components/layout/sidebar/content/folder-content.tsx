'use client';

import { useEffect, useState, useCallback, MouseEvent } from 'react';
import { ChevronRight, Folder, File } from 'lucide-react';
import { cn } from '@imkdw-dev-client/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from '@imkdw-dev-client/i18n';

interface FolderItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: FolderItem[];
  memoId?: string;
}

// 더미 데이터를 컴포넌트 외부에 정의하여 리렌더링에 영향을 받지 않게 함
const dummyFolders: FolderItem[] = [
  {
    id: 'folder-react',
    name: 'React',
    type: 'folder',
    children: [
      {
        id: 'folder-react-hooks',
        name: 'Hooks',
        type: 'folder',
        children: [{ id: 'file-react-hooks-1', name: '리액트 훅 사용법', type: 'file', memoId: '1' }],
      },
    ],
  },
  {
    id: 'folder-typescript',
    name: 'TypeScript',
    type: 'folder',
    children: [
      { id: 'file-typescript-basics', name: 'TypeScript 기초', type: 'file', memoId: '2' },
      {
        id: 'folder-typescript-advanced',
        name: 'Advanced',
        type: 'folder',
        children: [],
      },
    ],
  },
  {
    id: 'folder-nextjs',
    name: 'Next.js',
    type: 'folder',
    children: [{ id: 'file-nextjs-routing', name: 'Next.js 라우팅', type: 'file', memoId: '3' }],
  },
];

// 초기 확장 상태를 컴포넌트 외부에 정의
const initialExpandedState: Record<string, boolean> = {
  'folder-react': true,
  'folder-react-hooks': true,
  'folder-typescript': true,
  'folder-nextjs': true,
};

export function FolderContent() {
  const router = useRouter();
  const pathname = usePathname();
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>(initialExpandedState);

  // 현재 메모 ID 추출
  const getCurrentMemoId = useCallback((): string | null => {
    const match = pathname.match(/\/memo\/([^\/]+)/);
    return match?.[1] || null;
  }, [pathname]);

  const currentMemoId = getCurrentMemoId();

  // 폴더 토글 핸들러
  const toggleFolder = useCallback((folderId: string, event: MouseEvent) => {
    event.stopPropagation();
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  }, []);

  // 파일 활성화 체크
  const isFileActive = useCallback(
    (memoId?: string): boolean => {
      return !!memoId && memoId === currentMemoId;
    },
    [currentMemoId],
  );

  const handleMemoClick = useCallback(
    (event: MouseEvent, memoId: string) => {
      if (currentMemoId === memoId) {
        event.preventDefault();
        return;
      }

      router.push(`/memo/${memoId}`);
    },
    [router, currentMemoId],
  );

  // 메모 변경 시 해당 메모의 상위 폴더 펼치기
  useEffect(() => {
    if (!currentMemoId) return;

    // 메모의 상위 폴더를 찾아 확장하는 함수
    const expandParentFolders = (items: FolderItem[]): boolean => {
      for (const item of items) {
        // 파일이고 현재 메모 ID와 일치하면 찾음
        if (item.type === 'file' && item.memoId === currentMemoId) {
          return true;
        }

        // 폴더이고 자식이 있으면 재귀적으로 검색
        if (item.type === 'folder' && item.children) {
          const foundInChildren = expandParentFolders(item.children);

          // 자식에서 찾았으면 이 폴더를 펼침
          if (foundInChildren) {
            setExpandedFolders((prev) => ({ ...prev, [item.id]: true }));
            return true;
          }
        }
      }

      return false;
    };

    // 실행
    expandParentFolders(dummyFolders);
  }, [currentMemoId]);

  // 폴더 트리 렌더링
  const renderTree = useCallback(
    (items: FolderItem[], level = 0) => {
      return items.map((item) => (
        <div key={item.id}>
          {item.type === 'folder' ? (
            // 폴더 아이템
            <div
              className={cn('flex items-center p-1 cursor-pointer hover:bg-[#3B3B3C] rounded', 'text-sm text-gray-300')}
              style={{ paddingLeft: `${level * 16 + 8}px` }}
              onClick={(event) => toggleFolder(item.id, event)}
            >
              <motion.div
                className="mr-1 text-gray-400 z-10"
                animate={{ rotate: expandedFolders[item.id] ? 90 : 0 }}
                transition={{ duration: 0.15 }}
              >
                <ChevronRight size={16} />
              </motion.div>
              <Folder size={16} className="mr-2 text-blue-400" />
              <span>{item.name}</span>
            </div>
          ) : (
            // 파일 아이템
            <div
              onClick={(e) => item.memoId && handleMemoClick(e, item.memoId)}
              className={cn(
                'flex items-center p-1 cursor-pointer hover:bg-[#3B3B3C] rounded',
                'text-sm text-gray-300 hover:text-white',
                isFileActive(item.memoId) && 'bg-[#3B3B3C] text-white font-medium',
              )}
              style={{ paddingLeft: `${level * 16 + 8}px` }}
            >
              <span className="mr-1 text-gray-400 w-4"></span>
              <File size={16} className={cn('mr-2', isFileActive(item.memoId) ? 'text-blue-400' : 'text-gray-400')} />
              <span>{item.name}</span>
            </div>
          )}

          {/* 폴더 하위 항목 렌더링 */}
          {item.type === 'folder' && item.children && (
            <AnimatePresence initial={false} mode="wait">
              {expandedFolders[item.id] && (
                <motion.div
                  key={`folder-${item.id}-content`}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  variants={{
                    expanded: {
                      height: 'auto',
                      opacity: 1,
                      transition: {
                        height: { duration: 0.15, ease: 'easeOut' },
                        opacity: { duration: 0.15, ease: 'easeOut' },
                      },
                    },
                    collapsed: {
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: { duration: 0.1, ease: 'easeIn' },
                        opacity: { duration: 0.05, ease: 'easeIn' },
                      },
                    },
                  }}
                  style={{ overflow: 'hidden' }}
                >
                  {renderTree(item.children, level + 1)}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      ));
    },
    [expandedFolders, isFileActive, toggleFolder, handleMemoClick],
  );

  return (
    <div className="px-2">
      <div className="text-sm text-gray-400 uppercase font-semibold mt-4 mb-2 px-2">FOLDERS</div>
      <div className="mt-2">{renderTree(dummyFolders)}</div>
    </div>
  );
}
