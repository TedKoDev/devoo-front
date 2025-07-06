import { create } from "zustand";
import getLatestFinvizImage from "@/lib/googlesheet/finvizSheets";

interface FinvizState {
  imageUrl: string;
  isLoading: boolean;
  error: Error | null;
  lastFetched: string | null;
  fetchFinvizMap: () => Promise<void>;
  clearStore: () => void;
}

export const useFinvizStore = create<FinvizState>((set) => ({
  imageUrl: "",
  isLoading: false,
  error: null,
  lastFetched: null,
  fetchFinvizMap: async () => {
    try {
      set({ isLoading: true, error: null });
      const url = await getLatestFinvizImage();
      set({
        imageUrl: url,
        lastFetched: new Date().toISOString().slice(0, 10),
        isLoading: false,
      });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },
  clearStore: () => {
    set({
      imageUrl: "",
      isLoading: false,
      error: null,
      lastFetched: null,
    });
  },
}));
