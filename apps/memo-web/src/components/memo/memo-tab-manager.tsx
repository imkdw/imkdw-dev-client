'use client';

import { useEffect } from 'react';
import { useMemoTabStore } from './memo-tab-store';
import { MemoTabs } from './memo-tabs';
import { useRouter } from '@imkdw-dev-client/i18n';

interface Props {
  memoId: string;
  title: string;
}

export function MemoTabManager({ memoId, title }: Props) {
  const { addTab, tabs, removeTab } = useMemoTabStore();
  const router = useRouter();

  useEffect(() => {
    if (memoId && title) {
      addTab({ id: memoId, title });
    }
  }, [memoId, title, addTab]);

  // 모든 탭이 닫혔는지 확인
  useEffect(() => {
    // 현재 메모 ID가 탭에 없으면 메인 페이지로 이동
    const tabExists = tabs.some((tab) => tab.id === memoId);
    if (!tabExists && tabs.length > 0) {
      // 다른 탭이 있으면 첫 번째 탭으로 이동
      const firstTab = tabs[0];
      if (firstTab) {
        router.push(`/memo/${firstTab.id}`);
      }
    } else if (tabs.length === 0) {
      // 모든 탭이 닫혔으면 메인 페이지로 이동
      router.push('/');
    }
  }, [tabs, memoId, router]);

  const handleCloseTab = (id: string) => {
    const remainingTabs = tabs.filter((tab) => tab.id !== id);
    removeTab(id);

    // 닫은 탭이 현재 보고 있는 탭이면
    if (id === memoId) {
      if (remainingTabs.length > 0) {
        // 다른 탭이 있으면 첫 번째 탭으로 이동
        const firstRemainingTab = remainingTabs[0];
        if (firstRemainingTab) {
          router.push(`/memo/${firstRemainingTab.id}`);
        }
      } else {
        // 마지막 탭이면 메인 페이지로 이동
        router.push('/');
      }
    }
  };

  return <MemoTabs currentMemoId={memoId} onCloseTab={handleCloseTab} />;
}
