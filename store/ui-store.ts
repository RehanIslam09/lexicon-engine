/**
 * ui-store.ts
 * Zustand slice for global UI state.
 * Uses `persist` middleware so layout preferences survive page refresh —
 * the "Bicycle for the Mind" must remember its rider.
 *
 * clearAll() must be called on logout to prevent state leakage between sessions.
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  /** Wipe all UI state on logout — prevents cross-session data leakage */
  clearAll: () => void;
}

const INITIAL_STATE = {
  sidebarOpen: false,
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      clearAll: () => set({ ...INITIAL_STATE }),
    }),
    {
      name: "lexicon-ui-state", // localStorage key
    }
  )
);
