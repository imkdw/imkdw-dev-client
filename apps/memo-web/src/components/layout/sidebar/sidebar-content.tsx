'use client';

import { usePathname, useRouter } from '@imkdw-dev-client/i18n';
import { cn } from '@imkdw-dev-client/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, Clock, File, FileText, Folder, Search, Star } from 'lucide-react';
import { MouseEvent, useCallback, useEffect, useState } from 'react';

interface SidebarItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: SidebarItem[];
  memoId?: string;
}

// 더미 데이터를 컴포넌트 외부에 정의하여 리렌더링에 영향을 받지 않게 함
const dummyData: SidebarItem[] = [
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

interface SidebarContentProps {
  activeItemId: number | null;
}

export function SidebarContent({ activeItemId }: SidebarContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>(initialExpandedState);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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
    const expandParentFolders = (items: SidebarItem[]): boolean => {
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
    expandParentFolders(dummyData);
  }, [currentMemoId]);

  // 폴더 트리 렌더링
  const renderTree = useCallback(
    (items: SidebarItem[], level = 0) => {
      return items.map((item) => (
        <div key={item.id}>
          {item.type === 'folder' ? (
            // 폴더 아이템
            <button
              type='button'
              className={cn(
                'flex items-center p-1 w-full cursor-pointer hover:bg-[#3B3B3C] rounded',
                'text-base text-gray-300',
              )}
              style={{ paddingLeft: `${level * 16 + 8}px` }}
              onClick={(event) => toggleFolder(item.id, event)}
            >
              <motion.div
                className='mr-1 text-gray-400 z-10'
                animate={{ rotate: expandedFolders[item.id] ? 90 : 0 }}
                transition={{ duration: 0.15 }}
              >
                <ChevronRight size={16} />
              </motion.div>
              <Folder size={16} className='mr-2 text-blue-400' />
              <span>{item.name}</span>
            </button>
          ) : (
            // 파일 아이템
            <button
              type='button'
              onClick={(e) => item.memoId && handleMemoClick(e, item.memoId)}
              className={cn(
                'flex items-center p-1 w-full cursor-pointer hover:bg-[#3B3B3C] rounded',
                'text-base text-gray-300 hover:text-white',
                isFileActive(item.memoId) && 'bg-[#3B3B3C] text-white font-medium',
              )}
              style={{ paddingLeft: `${level * 16 + 8}px` }}
            >
              <span className='mr-1 text-gray-400 w-4' />
              <File size={16} className={cn('mr-2 text-gray-400')} />
              <span>{item.name}</span>
            </button>
          )}

          {/* 폴더 하위 항목 렌더링 */}
          {item.type === 'folder' && item.children && (
            <AnimatePresence initial={false} mode='wait'>
              {expandedFolders[item.id] && (
                <motion.div
                  key={`folder-${item.id}-content`}
                  initial='collapsed'
                  animate='expanded'
                  exit='collapsed'
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

  // 메모 그룹 정의
  const memoGroups = [
    { id: 'recent', name: '최근 메모', icon: <Clock size={16} className='mr-2 text-yellow-400' /> },
    { id: 'important', name: '중요 메모', icon: <Star size={16} className='mr-2 text-red-400' /> },
    { id: 'all', name: '모든 메모', icon: <FileText size={16} className='mr-2 text-blue-400' /> },
  ];

  if (!activeItemId) {
    return (
      <div className='flex items-center justify-center h-full text-gray-400'>
        <div className='text-center'>
          {/* TODO: 다국어 처리 */}
          <p className='text-base'>사이드바에서 항목을 선택해주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-2 h-full overflow-auto bg-[#202020]'>
      {/* 검색 영역 */}
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none'>
          <Search size={16} className='text-gray-400' />
        </div>
        <input
          type='text'
          // TODO: 다국어 처리
          placeholder='메모 검색...'
          className='w-full bg-[#3B3B3C] text-white text-base rounded pl-8 pr-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 폴더 구조 */}
      <div className=''>
        {/* TODO: 다국어 처리 */}
        <div className='mt-2'>{renderTree(dummyData)}</div>
      </div>
    </div>
  );
}
