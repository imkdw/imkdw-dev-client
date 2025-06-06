'use client';

import { MemoDetail } from '@imkdw-dev-client/api-client';
import { useLayoutEffect } from 'react';
import { useMemoStore } from '../../stores/memo-store';

interface Props {
  memo: MemoDetail;
}

export function MemoInitializer({ memo }: Props) {
  const { setCurrentMemo } = useMemoStore();

  useLayoutEffect(() => {
    setCurrentMemo(memo);
  }, [memo, setCurrentMemo]);

  return null;
}
