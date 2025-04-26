import { create } from 'zustand';
import type { StateCreator } from 'zustand';
import { MemoTab } from './memo.type';

interface State {
  tabs: MemoTab[];
  addTab: (tab: Omit<MemoTab, 'isActive'>) => void;
  removeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  getActiveTab: () => MemoTab | undefined;
}

export const useMemoTabStore = create<State>((set, get) => ({
  tabs: [],

  addTab: (newTab: Omit<MemoTab, 'isActive'>) => {
    set((state: State) => {
      const existingTabIndex = state.tabs.findIndex((tab) => tab.id === newTab.id);

      if (existingTabIndex !== -1) {
        return {
          tabs: state.tabs.map((tab) => ({
            ...tab,
            isActive: tab.id === newTab.id,
          })),
        };
      }

      return {
        tabs: [
          ...state.tabs.map((tab) => ({ ...tab, isActive: false })),
          { id: newTab.id, title: newTab.title, isActive: true },
        ],
      };
    });
  },

  removeTab: (id: string) => {
    set((state: State) => {
      const currentTabs = state.tabs;
      const tabToRemoveIndex = currentTabs.findIndex((tab) => tab.id === id);

      if (tabToRemoveIndex === -1) {
        return state;
      }

      const tabToRemove = currentTabs[tabToRemoveIndex];
      const isActiveTab = tabToRemove ? tabToRemove.isActive : false;
      const newTabs = currentTabs.filter((tab) => tab.id !== id);

      if (isActiveTab && newTabs.length > 0) {
        const nextActiveIndex = Math.min(tabToRemoveIndex, newTabs.length - 1);
        const updatedTab = newTabs[nextActiveIndex];
        if (updatedTab) {
          newTabs[nextActiveIndex] = { ...updatedTab, isActive: true };
        }
      }

      return { tabs: newTabs };
    });
  },

  setActiveTab: (id: string) => {
    set((state: State) => ({
      tabs: state.tabs.map((tab) => ({
        ...tab,
        isActive: tab.id === id,
      })),
    }));
  },

  getActiveTab: () => {
    const state = get();
    return state.tabs.find((tab) => tab.isActive);
  },
}));
