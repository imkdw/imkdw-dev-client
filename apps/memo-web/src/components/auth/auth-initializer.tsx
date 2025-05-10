'use client';

import { getMyInfo } from '@imkdw-dev-client/api-client';
import { useAuthStore } from '../../stores/auth-store';
import { useEffect } from 'react';

export function AuthInitializer() {
  const { setIsLoggedIn, setMember } = useAuthStore();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const loggedInMember = await getMyInfo();
      setMember({
        id: loggedInMember.id,
        nickname: loggedInMember.nickname,
        profileImage: loggedInMember.profileImage,
      });
      setIsLoggedIn(true);
    };

    checkLoggedIn();
  }, [setIsLoggedIn, setMember]);

  return null;
}
