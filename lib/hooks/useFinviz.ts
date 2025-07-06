"use client";
import { useEffect } from "react";
import { useFinvizStore } from "@/store/useFinvizStore";

export function useFinviz() {
  const { imageUrl, isLoading, error, fetchFinvizMap, lastFetched, clearStore } = useFinvizStore();
  console.log("imageUrl", imageUrl);
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);

    // 캐시된 데이터가 오늘 날짜가 아니면 스토어를 초기화하고 새로 fetch
    if (!lastFetched || lastFetched !== today) {
      clearStore();
      fetchFinvizMap();
    }

    // 주기적으로 데이터 갱신 (5분마다)
    const interval = setInterval(() => {
      fetchFinvizMap();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchFinvizMap, lastFetched, clearStore]);

  return { imageUrl, isLoading, error };
}
