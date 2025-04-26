import { Suspense } from 'react';
import { MemoDetail } from '@/src/components/memo/memo-detail';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '메모 상세 | IMKDW Dev',
  description: '메모 상세 페이지입니다.',
};

interface MemoDetailPageProps {
  params: Promise<{ memoId: string }>;
}

export default async function MemoDetailPage({ params }: MemoDetailPageProps) {
  const { memoId } = await params;

  return (
    <div className="w-full h-full">
      <Suspense fallback={<div className="text-white">로딩 중...</div>}>
        <MemoDetail memoId={memoId} />
      </Suspense>
    </div>
  );
}
