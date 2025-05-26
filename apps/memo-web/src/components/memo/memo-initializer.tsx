'use client';

import { MemoDetail } from '@imkdw-dev-client/api-client';
import { useEffect } from 'react';
import { useMemoStore } from '../../stores/memo-store';

interface Props {
  memo: MemoDetail;
}

export function MemoInitializer({ memo }: Props) {
  const { setCurrentMemo } = useMemoStore();

  useEffect(() => {
    setCurrentMemo(memo);
  }, [memo, setCurrentMemo]);

  return null;
}
