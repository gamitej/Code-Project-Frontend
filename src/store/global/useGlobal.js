import { create } from "zustand";

export const useGlobal = create((set) => ({
  isSideBarOpen: false,
  darkMode: false,
  setDarkMode: (mode) => {
    set((state) => ({
      ...state,
      darkMode: mode,
    }));
  },
  setIsSideBarOpen: (open) => {
    set((state) => ({
      ...state,
      isSideBarOpen: open,
    }));
  },
}));
