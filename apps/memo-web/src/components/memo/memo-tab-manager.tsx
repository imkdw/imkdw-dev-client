'use client';

import { usePathname, useRouter } from '@imkdw-dev-client/i18n';
import { useEffect, useRef, useState } from 'react';
import { MemoTab } from './memo.type';
import { MemoTabs } from './memo-tabs';

interface Props {
  memoId?: string;
  title?: string;
}

export function MemoTabManager({ memoId, title }: Props) {
  // useState로 변경하여 확실하게 리렌더링 보장
  const [tabs, setTabs] = useState<MemoTab[]>([]);
  // 중복 방지용 처리중인 메모 ID 추적
  const processingMemoIdRef = useRef<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // 메모가 변경될 때 탭 업데이트
  useEffect(() => {
    if (!memoId || !title) {
      return;
    }

    // 이미 이 memoId를 처리 중이면 중복 실행 방지
    if (processingMemoIdRef.current === memoId) {
      return;
    }

    // 처리 시작
    processingMemoIdRef.current = memoId;

    // 이미 존재하는 탭인지 확인
    const existingTabIndex = tabs.findIndex((tab) => tab.id === memoId);

    if (existingTabIndex !== -1) {
      // 이미 탭이 있으면 해당 탭만 활성화
      setTabs((prevTabs) =>
        prevTabs.map((tab, index) => ({
          ...tab,
          isActive: index === existingTabIndex,
          // 제목이 변경된 경우 업데이트
          title: index === existingTabIndex ? title : tab.title,
        })),
      );
    } else {
      // 새 탭 추가 (기존 탭들은 비활성화)
      setTabs((prevTabs) => [
        ...prevTabs.map((tab) => ({
          ...tab,
          isActive: false,
        })),
        {
          id: memoId,
          title,
          isActive: true,
          uid: Date.now().toString(), // 고유 식별자 추가
        },
      ]);
    }

    // 처리 완료 표시 (약간의 지연을 두어 빠른 연속 호출에서도 중복 방지)
    setTimeout(() => {
      processingMemoIdRef.current = null;
    }, 100);
  }, [memoId, title, tabs.length]); // tabs.length만 의존성에 추가하여 메모를 바꿀 때만 실행되도록

  // 탭 닫기 처리
  const handleCloseTab = (tabId: string) => {
    const isCurrentTab = memoId === tabId;
    const closedTabIndex = tabs.findIndex((tab) => tab.id === tabId);

    // 탭이 존재하지 않으면 종료
    if (closedTabIndex === -1) return;

    // 탭 제거
    const newTabs = tabs.filter((tab) => tab.id !== tabId);

    // 활성화된 탭을 닫았고 다른 탭이 있는 경우
    if (isCurrentTab && newTabs.length > 0) {
      // 다음 활성화할 탭의 인덱스
      const nextIndex = Math.min(closedTabIndex, newTabs.length - 1);

      // 다음 탭이 존재하는지 확인
      if (nextIndex >= 0 && nextIndex < newTabs.length) {
        const nextTab = newTabs[nextIndex];

        // nextTab이 undefined가 아닌지 확인
        if (nextTab) {
          // 다음 탭 활성화
          setTabs(
            newTabs.map((tab, index) => ({
              ...tab,
              isActive: index === nextIndex,
            })),
          );

          // 다음 탭으로 라우팅
          router.push(`/memo/${nextTab.id}`);
        }
      }
    }
    // 마지막 탭을 닫은 경우
    else if (isCurrentTab) {
      setTabs(newTabs);
      router.push('/');
    }
    // 현재 활성화된 탭이 아닌 다른 탭을 닫은 경우
    else {
      setTabs(newTabs);
    }
  };

  // 메모 페이지가 아니거나 메모 ID가 없으면 표시하지 않음
  if (!memoId || !pathname.startsWith('/memo/')) {
    return null;
  }

  return <MemoTabs tabs={tabs} currentMemoId={memoId} onCloseTab={handleCloseTab} />;
}
