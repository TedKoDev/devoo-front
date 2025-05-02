import type { SearchTrend, GoldPrice, OilPrice, ExchangeRate, StockMarket } from "@/types/market"

// Mock API for search trends
export async function fetchSearchTrends(): Promise<{
  google: SearchTrend[]
  nate: SearchTrend[]
  daum: SearchTrend[]
  zum: SearchTrend[]
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        google: [
          { keyword: "Next.js 14", url: "#" },
          { keyword: "React Server Components", url: "#" },
          { keyword: "TypeScript 5.0", url: "#" },
          { keyword: "부업 아이디어", url: "#" },
          { keyword: "프리랜서 개발자", url: "#" },
          { keyword: "AI 개발 도구", url: "#" },
          { keyword: "주식 시장 전망", url: "#" },
          { keyword: "부동산 투자", url: "#" },
          { keyword: "사이드 프로젝트", url: "#" },
          { keyword: "온라인 마케팅", url: "#" },
        ],
        nate: [
          { keyword: "주식 시장 전망", url: "#" },
          { keyword: "부동산 투자", url: "#" },
          { keyword: "사이드 프로젝트", url: "#" },
          { keyword: "온라인 마케팅", url: "#" },
          { keyword: "Next.js 14", url: "#" },
          { keyword: "React Server Components", url: "#" },
          { keyword: "TypeScript 5.0", url: "#" },
          { keyword: "부업 아이디어", url: "#" },
          { keyword: "프리랜서 개발자", url: "#" },
          { keyword: "AI 개발 도구", url: "#" },
        ],
        daum: [
          { keyword: "AI 개발 도구", url: "#" },
          { keyword: "주식 시장 전망", url: "#" },
          { keyword: "부동산 투자", url: "#" },
          { keyword: "사이드 프로젝트", url: "#" },
          { keyword: "온라인 마케팅", url: "#" },
          { keyword: "Next.js 14", url: "#" },
          { keyword: "React Server Components", url: "#" },
          { keyword: "TypeScript 5.0", url: "#" },
          { keyword: "부업 아이디어", url: "#" },
          { keyword: "프리랜서 개발자", url: "#" },
        ],
        zum: [
          { keyword: "프리랜서 개발자", url: "#" },
          { keyword: "AI 개발 도구", url: "#" },
          { keyword: "주식 시장 전망", url: "#" },
          { keyword: "부동산 투자", url: "#" },
          { keyword: "사이드 프로젝트", url: "#" },
          { keyword: "온라인 마케팅", url: "#" },
          { keyword: "Next.js 14", url: "#" },
          { keyword: "React Server Components", url: "#" },
          { keyword: "TypeScript 5.0", url: "#" },
          { keyword: "부업 아이디어", url: "#" },
        ],
      })
    }, 800)
  })
}

// Mock API for gold price
export async function fetchGoldPrice(): Promise<GoldPrice> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        price: 98750,
        change: 1250,
        changePercent: 1.28,
        updatedAt: "2023-05-15 15:30:00",
      })
    }, 600)
  })
}

// Mock API for oil price
export async function fetchOilPrice(): Promise<OilPrice> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        price: 1650,
        change: -25,
        changePercent: -1.49,
        updatedAt: "2023-05-15 15:30:00",
      })
    }, 700)
  })
}

// Mock API for exchange rates
export async function fetchExchangeRates(): Promise<ExchangeRate[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          currency: "미국 달러",
          currencyCode: "USD",
          rate: 1350.25,
          change: 5.75,
        },
        {
          currency: "중국 위안",
          currencyCode: "CNY",
          rate: 186.42,
          change: -0.58,
        },
        {
          currency: "일본 엔",
          currencyCode: "JPY",
          rate: 8.95,
          change: 0.12,
        },
        {
          currency: "유로",
          currencyCode: "EUR",
          rate: 1456.8,
          change: 3.2,
        },
      ])
    }, 500)
  })
}

// Mock API for stock market
export async function fetchStockMarket(): Promise<StockMarket[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          name: "KOSPI",
          price: 2568.34,
          change: 12.45,
          changePercent: 0.49,
        },
        {
          name: "KOSDAQ",
          price: 876.21,
          change: -3.78,
          changePercent: -0.43,
        },
        {
          name: "NASDAQ",
          price: 14356.78,
          change: 145.67,
          changePercent: 1.02,
        },
        {
          name: "S&P 500",
          price: 4567.89,
          change: 34.56,
          changePercent: 0.76,
        },
        {
          name: "DOW",
          price: 35678.9,
          change: -123.45,
          changePercent: -0.35,
        },
      ])
    }, 900)
  })
}
