import { getMemo } from '@imkdw-dev-client/api-client';
import { removeMarkdownTags } from '@imkdw-dev-client/utils';
import { Metadata } from 'next';
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
