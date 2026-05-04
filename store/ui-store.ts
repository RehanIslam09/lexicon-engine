/**
 * ui-store.ts
 * Zustand slice for global UI state.
 * Uses `persist` middleware so layout preferences survive page refresh —
 * the "Bicycle for the Mind" must remember its rider.
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    {
      name: "lexicon-ui-state", // localStorage key
    }
  )
);
