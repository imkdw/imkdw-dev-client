import { MemoBreadcrumb } from '@/src/components/memo/memo-breadcrumb';
import { MemoDetail } from '@/src/components/memo/memo-detail';
import { getMemo } from '@imkdw-dev-client/api-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '메모 상세 | IMKDW Dev',
  description: '메모 상세 페이지입니다.',
};

interface MemoDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function MemoDetailPage({ params }: MemoDetailPageProps) {
  const { slug } = await params;

  const memo = await getMemo(slug);

  if (!memo) {
    return <div className='w-full h-full flex items-center justify-center text-white'>메모를 찾을 수 없습니다.</div>;
  }

  return (
    <div className='w-full h-full'>
      <MemoBreadcrumb memo={memo} />
      <MemoDetail memo={memo} />
    </div>
  );
}
