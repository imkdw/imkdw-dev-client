'use client';

import { SidebarContentFolder } from '@/src/components/layout/sidebar/content/sidebar-content-folder';
import { findRootMemoFolders, FindRootMemoFoldersResponse } from '@imkdw-dev-client/api-client';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SidebarContentProps {
  activeItemId: number | null;
}

export function SidebarContent({ activeItemId }: SidebarContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [rootMemoFolders, setRootMemoFolders] = useState<FindRootMemoFoldersResponse[]>([]);

  // 현재 메모 ID 추출
  // const getCurrentMemoId = useCallback((): string | null => {
  //   const match = pathname.match(/\/memo\/([^\/]+)/);
  //   return match?.[1] || null;
  // }, [pathname]);

  // const currentMemoId = getCurrentMemoId();

  // 폴더 토글 핸들러
  // const toggleFolder = useCallback((folderId: string, event: MouseEvent) => {
  //   event.stopPropagation();
  //   setExpandedFolders((prev) => ({
  //     ...prev,
  //     [folderId]: !prev[folderId],
  //   }));
  // }, []);

  // 파일 활성화 체크
  // const isFileActive = useCallback(
  //   (memoId?: string): boolean => {
  //     return !!memoId && memoId === currentMemoId;
  //   },
  //   [currentMemoId],
  // );

  // const handleMemoClick = useCallback(
  //   (event: MouseEvent, memoId: string) => {
  //     if (currentMemoId === memoId) {
  //       event.preventDefault();
  //       return;
  //     }

  //     router.push(`/memo/${memoId}`);
  //   },
  //   [router, currentMemoId],
  // );

  // 메모 변경 시 해당 메모의 상위 폴더 펼치기
  // useEffect(() => {
  //   if (!currentMemoId) return;

  //   // 메모의 상위 폴더를 찾아 확장하는 함수
  //   const expandParentFolders = (items: SidebarItem[]): boolean => {
  //     for (const item of items) {
  //       // 파일이고 현재 메모 ID와 일치하면 찾음
  //       if (item.type === 'file' && item.memoId === currentMemoId) {
  //         return true;
  //       }

  //       // 폴더이고 자식이 있으면 재귀적으로 검색
  //       if (item.type === 'folder' && item.children) {
  //         const foundInChildren = expandParentFolders(item.children);

  //         // 자식에서 찾았으면 이 폴더를 펼침
  //         if (foundInChildren) {
  //           setExpandedFolders((prev) => ({ ...prev, [item.id]: true }));
  //           return true;
  //         }
  //       }
  //     }

  //     return false;
  //   };

  //   // 실행
  //   expandParentFolders(dummyData);
  // }, [currentMemoId]);

  // 폴더 트리 렌더링
  // const renderTree = useCallback(
  //   (items: SidebarItem[], level = 0) => {
  //     return items.map((item) => (
  //       <div key={item.id}>
  //         {item.type === 'folder' ? (
  //           // 폴더 아이템
  //           <SidebarContentFolder level={level} folderName={item.name} />
  //         ) : (
  //           // 파일 아이템
  //           <SidebarContentMemo level={level} memoName={item.name} />
  //         )}

  //         {/* 폴더 하위 항목 렌더링 */}
  //         {item.type === 'folder' && item.children && (
  //           <AnimatePresence initial={false} mode='wait'>
  //             {expandedFolders[item.id] && (
  //               <motion.div
  //                 key={`folder-${item.id}-content`}
  //                 initial='collapsed'
  //                 animate='expanded'
  //                 exit='collapsed'
  //                 variants={{
  //                   expanded: {
  //                     height: 'auto',
  //                     opacity: 1,
  //                     transition: {
  //                       height: { duration: 0.15, ease: 'easeOut' },
  //                       opacity: { duration: 0.15, ease: 'easeOut' },
  //                     },
  //                   },
  //                   collapsed: {
  //                     height: 0,
  //                     opacity: 0,
  //                     transition: {
  //                       height: { duration: 0.1, ease: 'easeIn' },
  //                       opacity: { duration: 0.05, ease: 'easeIn' },
  //                     },
  //                   },
  //                 }}
  //                 style={{ overflow: 'hidden' }}
  //               >
  //                 {renderTree(item.children, level + 1)}
  //               </motion.div>
  //             )}
  //           </AnimatePresence>
  //         )}
  //       </div>
  //     ));
  //   },
  //   [expandedFolders, isFileActive, toggleFolder, handleMemoClick],
  // );

  // if (!activeItemId) {
  //   return (
  //     <div className='flex items-center justify-center h-full text-gray-400'>
  //       <div className='text-center'>
  //         {/* TODO: 다국어 처리 */}
  //         <p className='text-base'>사이드바에서 항목을 선택해주세요.</p>
  //       </div>
  //     </div>
  //   );
  // }

  useEffect(() => {
    const fetchRootMemoFolders = async () => {
      const rootMemoFolders = await findRootMemoFolders();
      setRootMemoFolders(rootMemoFolders);
    };
    fetchRootMemoFolders();
  }, []);

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
        <div className='mt-2'>
          {rootMemoFolders.map((rootMemoFolder) => (
            <SidebarContentFolder
              key={rootMemoFolder.id}
              level={0}
              folderName={rootMemoFolder.name}
              folderId={rootMemoFolder.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
