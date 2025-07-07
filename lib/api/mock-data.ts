
import type { MarketEvent } from "@/types/market" 

export function getMockMarketEvents(): MarketEvent[] {
  return [
    {
      id: "1",
      title: "미국 연방준비제도 금리 발표",
      date: "2024-07-10",
      time: "14:00",
      country: "US",
      importance: "high",
      category: "policy",
      description: "연방공개시장위원회(FOMC) 정례회의 결과 발표"
    },
    {
      id: "2", 
      title: "미국 소비자물가지수(CPI)",
      date: "2024-07-11",
      time: "08:30",
      country: "US",
      importance: "high",
      category: "economic",
      description: "6월 소비자물가지수 발표"
    },
    {
      id: "3",
      title: "유럽중앙은행 금리 발표",
      date: "2024-07-18",
      time: "13:45",
      country: "EU",
      importance: "medium",
      category: "policy",
      description: "ECB 통화정책회의 결과"
    },
    {
      id: "4",
      title: "일본 소비자물가지수",
      date: "2024-07-19",
      time: "08:30",
      country: "JP",
      importance: "medium",
      category: "economic",
      description: "6월 일본 CPI 발표"
    }
  ]
} 