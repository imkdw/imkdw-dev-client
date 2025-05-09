'use client';

import { ResponseGetMyInfo } from '@imkdw-dev-client/api-client';
import { useAuthStore } from '../../stores/auth-store';
import { useEffect } from 'react';

interface Props {
  loggedInMember: ResponseGetMyInfo | null;
}
export function AuthInitializer({ loggedInMember }: Props) {
  const { member, setIsLoggedIn, setMember } = useAuthStore();

  useEffect(() => {
    if (loggedInMember) {
      setMember({
        id: loggedInMember.id,
        nickname: loggedInMember.nickname,
        profileImage: loggedInMember.profileImage,
      });
      setIsLoggedIn(true);
    }
  }, [loggedInMember, setIsLoggedIn, setMember]);

  return null;
}
