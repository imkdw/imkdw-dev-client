import { create } from 'zustand';

interface AuthStore {
  isLoggedIn: boolean;
  member: {
    id: string;
    nickname: string;
    profileImage: string;
  } | null;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setMember: (member: AuthStore['member']) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  member: null,
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  setMember: (member: AuthStore['member']) => set({ member }),
}));
