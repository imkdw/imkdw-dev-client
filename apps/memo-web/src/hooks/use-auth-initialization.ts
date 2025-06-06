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
        setIsLoggedIn(false);
        setMember(null);
      }
    } catch {
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
