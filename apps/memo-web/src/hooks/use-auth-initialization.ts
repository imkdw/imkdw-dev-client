import { getMyInfo, verifyToken } from '@imkdw-dev-client/api-client';
import { useCallback, useEffect } from 'react';
import { useAuthStore } from '../stores/auth-store';

export function useAuthInitialization() {
  const { setIsLoggedIn, setMember, setIsInitializing, isInitializing } = useAuthStore();

  const checkAuthentication = useCallback(async () => {
    try {
      const isValidTokenResponse = await verifyToken();

      if (isValidTokenResponse.isValid) {
        const { id, nickname, profileImage, email, role } = await getMyInfo();
        setMember({ id, nickname, profileImage, role, email });
        setIsLoggedIn(true);
      } else {
        // 토큰이 유효하지 않은 경우
        setIsLoggedIn(false);
        setMember(null);
      }
    } catch {
      // 인증 확인 실패 (네트워크 오류 등) - 조용히 처리
      setIsLoggedIn(false);
      setMember(null);
    } finally {
      setIsInitializing(false);
    }
  }, [setIsLoggedIn, setMember, setIsInitializing]);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  return { isInitializing };
}
