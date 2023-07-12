import { create } from "zustand";

export const useGlobal = create((set) => ({
  darkMode: false,
  setDarkMode: (mode) => {
    set((state) => ({
      ...state,
      darkMode: mode,
    }));
  },
}));
