import { create } from 'zustand';

interface PreferencesState {
  hideCompleted: boolean;
  groupByStatus: boolean;
  toggleHideCompleted: () => void;
  toggleGroupByStatus: () => void;
  setHideCompleted: (value: boolean) => void;
  setGroupByStatus: (value: boolean) => void;
}

export const usePreferencesStore = create<PreferencesState>((set) => ({
  hideCompleted: false,
  groupByStatus: true,
  toggleHideCompleted: () => {
    set((state) => ({ hideCompleted: !state.hideCompleted }));
  },
  toggleGroupByStatus: () => {
    set((state) => ({ groupByStatus: !state.groupByStatus }));
  },
  setHideCompleted: (value: boolean) => {
    set({ hideCompleted: value });
  },
  setGroupByStatus: (value: boolean) => {
    set({ groupByStatus: value });
  },
}));
