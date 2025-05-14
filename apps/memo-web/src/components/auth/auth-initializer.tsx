'use client';

import { getMyInfo, verifyToken } from '@imkdw-dev-client/api-client';
import { useEffect } from 'react';
import { useAuthStore } from '../../stores/auth-store';

export function AuthInitializer() {
  const { setIsLoggedIn, setMember } = useAuthStore();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const isValidTokenResponse = await verifyToken();

      if (isValidTokenResponse.isValid) {
        const { id, nickname, profileImage, email, role } = await getMyInfo();
        setMember({ id, nickname, profileImage, role, email });
        setIsLoggedIn(true);
      }
    };

    checkLoggedIn();
  }, [setIsLoggedIn, setMember]);

  return null;
}
