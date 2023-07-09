import { create } from "zustand";

export const useOverview = create((set) => ({
  filterBySolved: { easy: false, medium: false, hard: false },
  setFilterBySolved: (name) => {
    set((state) => ({
      ...state,
      filterBySolved: {
        ...state.filterBySolved,
        [name]: !state.filterBySolved[name],
      },
    }));
  },
}));
