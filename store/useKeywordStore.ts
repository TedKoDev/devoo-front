import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WeekKeywordMap, getGoogleSheetData } from "@/lib/googlesheet/keywordSheets";

interface KeywordState {
  keywords: WeekKeywordMap;
  isLoading: boolean;
  error: string | null;
  fetchKeywords: () => Promise<void>;
}

export const useKeywordStore = create<KeywordState>()(
  persist(
    (set) => ({
      keywords: {},
      isLoading: false,
      error: null,
      fetchKeywords: async () => {
        try {
          set({ isLoading: true, error: null });
          const data = await getGoogleSheetData();
          set({ keywords: data, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Failed to fetch keywords",
            isLoading: false,
          });
        }
      },
    }),
    {
      name: "keyword-storage",
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          return JSON.parse(str);
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);
