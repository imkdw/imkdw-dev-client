'use client';

import { getMemo, MemoDetail } from '@imkdw-dev-client/api-client';
import { useEffect, useState } from 'react';
import { MemoBreadcrumb } from '../../../../../components/memo/memo-breadcrumb';
import { MemoEditor } from '../../../../../components/memo/memo-editor';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function EditMemoPage({ params }: Props) {
  const [memo, setMemo] = useState<MemoDetail | null>(null);

  useEffect(() => {
    const loadMemo = async () => {
      const { slug } = await params;
      const memoData = await getMemo(slug);
      setMemo(memoData);
    };

    loadMemo();
  }, [params]);

  if (!memo) {
    return <div className='w-full h-full flex items-center justify-center text-white'>로딩 중...</div>;
  }

  return (
    <div className='h-full flex flex-col'>
      <MemoBreadcrumb />
      <MemoEditor memo={memo} />
    </div>
  );
}
