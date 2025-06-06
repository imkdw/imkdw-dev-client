import { getMemo } from '@imkdw-dev-client/api-client';
import { removeMarkdownTags } from '@imkdw-dev-client/utils';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { MemoBreadcrumb } from '../../../../components/memo/memo-breadcrumb';
import { MemoDetail } from '../../../../components/memo/memo-detail';
import { MemoInitializer } from '../../../../components/memo/memo-initializer';
import { generateMemoSEOMetadata } from '../../../../utils/seo.util';

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;

  const memo = await getMemo(slug);

  const description = removeMarkdownTags(memo.content).slice(0, 150) + (memo.content.length > 150 ? '...' : '');

  return generateMemoSEOMetadata({ title: memo.name, content: description, slug, locale });
}

function MemoSkeleton() {
  return (
    <div className='w-full h-full'>
      {/* Breadcrumb Skeleton */}
      <div className='p-2 bg-[#2d2d2d] animate-pulse'>
        <div className='h-5 bg-gray-600 rounded w-1/3' />
      </div>

      {/* Content Skeleton */}
      <div className='flex flex-col h-full bg-[#242424] p-2'>
        <div className='space-y-3 animate-pulse'>
          <div className='h-4 bg-gray-600 rounded w-3/4' />
          <div className='h-4 bg-gray-600 rounded w-1/2' />
          <div className='h-4 bg-gray-600 rounded w-5/6' />
        </div>
      </div>
    </div>
  );
}

export default async function MemoDetailPage({ params }: Props) {
  const { slug } = await params;

  const memo = await getMemo(slug);

  if (!memo) {
    return <div className='w-full h-full flex items-center justify-center text-white'>메모를 찾을 수 없습니다.</div>;
  }

  return (
    <Suspense fallback={<MemoSkeleton />}>
      <div className='w-full h-full'>
        <MemoInitializer memo={memo} />
        <MemoBreadcrumb initialPath={memo.path} />
        <MemoDetail memo={memo} />
      </div>
    </Suspense>
  );
}
