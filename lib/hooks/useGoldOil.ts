"use client";
import { useEffect } from "react";
import { useGoldOilStore } from "@/store/useGoldOilStore";

export function useGoldOil() {
  const { data, isLoading, error, fetchGoldOil, lastFetched, clearStore } = useGoldOilStore();

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);

    // 캐시된 데이터가 오늘 날짜가 아니면 스토어를 초기화하고 새로 fetch
    if (!lastFetched || lastFetched !== today) {
      clearStore();
      fetchGoldOil();
    }

    // 주기적으로 데이터 갱신 (5분마다)
    const interval = setInterval(() => {
      fetchGoldOil();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchGoldOil, lastFetched, clearStore]);

  return { data, isLoading, error };
}
