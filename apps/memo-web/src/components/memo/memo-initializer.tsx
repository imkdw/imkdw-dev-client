'use client';

import { MemoDetail } from '@imkdw-dev-client/api-client';
import { useEffect } from 'react';
import { useMemoStore } from '../../stores/memo-store';
import { useRouter } from '@imkdw-dev-client/i18n';
import { useAuthStore } from '../../stores/auth-store';
import { MemberRole } from '@imkdw-dev-client/consts';

interface Props {
  memo: MemoDetail;
}

export function MemoInitializer({ memo }: Props) {
  const { setCurrentMemo } = useMemoStore();
  const { member } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (member?.role === MemberRole.ADMIN) {
      router.push(`/memo/${memo.slug}/edit`);
    }
  }, [member?.role, memo.slug, router]);

  useEffect(() => {
    setCurrentMemo(memo);
  }, [memo, setCurrentMemo]);

  return null;
}
