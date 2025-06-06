import { MemberRole } from '@imkdw-dev-client/consts';
import { create } from 'zustand';

interface AuthStore {
  isLoggedIn: boolean;
  isInitializing: boolean;
  member: {
    id: string;
    nickname: string;
    email: string;
    profileImage: string;
    role: keyof typeof MemberRole;
  } | null;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setMember: (member: AuthStore['member']) => void;
  setIsInitializing: (isInitializing: boolean) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  isInitializing: true,
  member: null,
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  setMember: (member: AuthStore['member']) => set({ member }),
  setIsInitializing: (isInitializing: boolean) => set({ isInitializing }),
  clear: () => set({ isLoggedIn: false, member: null, isInitializing: false }),
}));
