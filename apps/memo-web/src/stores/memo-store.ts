import { MemoDetail } from '@imkdw-dev-client/api-client';
import { create } from 'zustand';

interface MemoStore {
  currentMemo: MemoDetail | null;
  setCurrentMemo: (memo: MemoDetail) => void;
}

export const useMemoStore = create<MemoStore>((set) => ({
  currentMemo: null,
  setCurrentMemo: (memo: MemoDetail) => set({ currentMemo: memo }),
}));
