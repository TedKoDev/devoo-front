import { create } from "zustand";
import { persist } from "zustand/middleware";
import getSheetData, { MarketData } from "@/lib/googlesheet/goldoilSheets";

export interface GoldOilRow extends MarketData {
  변화량?: number;
  변화율?: number;
}

interface GoldOilState {
  data: GoldOilRow[];
  isLoading: boolean;
  error: string | null;
  lastFetched: string | null;
  fetchGoldOil: () => Promise<void>;
  clearStore: () => void;
}

function calculateChanges(data: MarketData[]): GoldOilRow[] {
  // 날짜별로 데이터 정리
  const dateMap = new Map<string, MarketData[]>();
  data.forEach((row) => {
    if (!dateMap.has(row.날짜)) {
      dateMap.set(row.날짜, []);
    }
    dateMap.get(row.날짜)?.push(row);
  });

  // 날짜 순으로 정렬
  const dates = Array.from(dateMap.keys()).sort().reverse();
  const today = dates[0];
  const yesterday = dates[1];

  if (today && yesterday) {
    const todayData = dateMap.get(today) || [];
    const yesterdayData = dateMap.get(yesterday) || [];

    return todayData.map((row) => {
      const yesterdayRow = yesterdayData.find((r) => r.항목 === row.항목);
      const todayPrice = parseFloat(row.가격);
      const yesterdayPrice = yesterdayRow ? parseFloat(yesterdayRow.가격) : todayPrice;

      const change = todayPrice - yesterdayPrice;
      const changePercent = (change / yesterdayPrice) * 100;

      return {
        ...row,
        변화량: Number(change.toFixed(2)),
        변화율: Number(changePercent.toFixed(2)),
      };
    });
  }

  return data.map((row) => ({ ...row }));
}

export const useGoldOilStore = create<GoldOilState>()(
  persist(
    (set, get) => ({
      data: [],
      isLoading: false,
      error: null,
      lastFetched: null,
      clearStore: () => {
        set({
          data: [],
          lastFetched: null,
          error: null,
        });
      },
      fetchGoldOil: async () => {
        try {
          set({ isLoading: true, error: null });
          const rawData = await getSheetData();
          const processedData = calculateChanges(rawData);

          // 데이터가 변경되었는지 확인
          const currentData = get().data;
          const hasDataChanged = JSON.stringify(currentData) !== JSON.stringify(processedData);

          if (hasDataChanged) {
            set({
              data: processedData,
              isLoading: false,
              lastFetched: new Date().toISOString().slice(0, 10),
            });
          } else {
            set({ isLoading: false });
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Failed to fetch gold/oil data",
            isLoading: false,
          });
        }
      },
    }),
    {
      name: "goldoil-storage",
      version: 1, // 버전 추가
      onRehydrateStorage: () => (state) => {
        // 재수화 후 상태 검사
        if (state) {
          const today = new Date().toISOString().slice(0, 10);
          if (!state.lastFetched || state.lastFetched !== today) {
            state.fetchGoldOil();
          }
        }
      },
    }
  )
);
