import { getMyInfo, verifyToken } from '@imkdw-dev-client/api-client';
import { useCallback, useEffect, useState } from 'react';
import { useAuthStore } from '../stores/auth-store';

export function useAuthInitialization() {
  const [isInitializing, setIsInitializing] = useState(true);
  const { setIsLoggedIn, setMember } = useAuthStore();

  const checkAuthentication = useCallback(async () => {
    try {
      const isValidTokenResponse = await verifyToken();

      if (isValidTokenResponse.isValid) {
        const { id, nickname, profileImage, email, role } = await getMyInfo();
        setMember({ id, nickname, profileImage, role, email });
        setIsLoggedIn(true);
      }
    } catch {
      // 인증 실패 시 로그아웃 상태 유지
      setIsLoggedIn(false);
      setMember(null);
    } finally {
      setIsInitializing(false);
    }
  }, [setIsLoggedIn, setMember]);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  return { isInitializing };
}
