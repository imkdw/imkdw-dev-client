import { MemoDetail } from '@imkdw-dev-client/api-client';
import { create } from 'zustand';

// 폴더 확장 상태를 관리하는 인터페이스
interface FolderExpansionState {
  [folderId: string]: boolean;
}

interface MemoStore {
  currentMemo: MemoDetail | null;
  setCurrentMemo: (memo: MemoDetail) => void;

  // 폴더 확장 상태 관리
  expandedFolders: FolderExpansionState;
  toggleFolder: (folderId: string) => void;
  setFolderExpanded: (folderId: string, isExpanded: boolean) => void;

  // 데이터 갱신 트리거
  refreshTrigger: number;
  triggerRefresh: () => void;
}

export const useMemoStore = create<MemoStore>((set) => ({
  currentMemo: null,
  setCurrentMemo: (memo: MemoDetail) => set({ currentMemo: memo }),

  // 폴더 확장 상태 관리
  expandedFolders: {},
  toggleFolder: (folderId: string) =>
    set((state) => ({
      expandedFolders: {
        ...state.expandedFolders,
        [folderId]: !state.expandedFolders[folderId],
      },
    })),
  setFolderExpanded: (folderId: string, isExpanded: boolean) =>
    set((state) => ({
      expandedFolders: {
        ...state.expandedFolders,
        [folderId]: isExpanded,
      },
    })),

  // 데이터 갱신 트리거
  refreshTrigger: 0,
  triggerRefresh: () => set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),
}));
