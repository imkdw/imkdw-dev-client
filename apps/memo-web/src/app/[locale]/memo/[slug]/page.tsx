import { MemoBreadcrumb } from '@/src/components/memo/memo-breadcrumb';
import { MemoDetail } from '@/src/components/memo/memo-detail';
import { getMemo } from '@imkdw-dev-client/api-client';
import { Metadata } from 'next';
import { MemoInitializer } from '../../../../components/memo/memo-initializer';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const memo = await getMemo(slug);

  return {
    title: memo.name,
    openGraph: {
      images: '/images/angelic-buster.webp',
      url: `https://imkdw-dev.com/memo/${slug}`,
      type: 'website',
    },
  };
}

export default async function MemoDetailPage({ params }: Props) {
  const { slug } = await params;

  const memo = await getMemo(slug);

  if (!memo) {
    return <div className='w-full h-full flex items-center justify-center text-white'>메모를 찾을 수 없습니다.</div>;
  }

  return (
    <div className='w-full h-full'>
      <MemoInitializer memo={memo} />
      <MemoBreadcrumb />
      <MemoDetail memo={memo} />
    </div>
  );
}
