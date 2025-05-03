import { MemoBreadcrumb } from '@/src/components/memo/memo-breadcrumb';
import { MemoDetail } from '@/src/components/memo/memo-detail';
import { Memo } from '@/src/components/memo/memo.type';
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
  const memo: Memo = {
    content: 'content',
    createdAt: 'createdAt',
    id: 'id',
    path: ['path'],
    title: 'title',
    updatedAt: 'updatedAt',
  };

  if (!memo) {
    return <div className='w-full h-full flex items-center justify-center text-white'>메모를 찾을 수 없습니다.</div>;
  }

  return (
    <div className='w-full h-full'>
      <MemoBreadcrumb path={memo.path} />
      <MemoDetail memo={memo} />
    </div>
  );
}
