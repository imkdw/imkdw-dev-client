import { useAuthStore } from '../../stores/auth-store';

export function useAuthStatus() {
  const { isLoggedIn, member, isInitializing } = useAuthStore();

  return {
    isInitializing,
    isLoggedIn,
    member,
    isAuthReady: !isInitializing,
  };
}
