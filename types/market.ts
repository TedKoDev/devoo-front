export interface StockMarket {
  name: string
  price: number
  change: number
  changePercent: number
}

export interface SearchTrend {
  keyword: string
  trend?: "up" | "down"
}

export interface Stock {
  name: string
  symbol: string
  price: number
  change: number
  changePercent: number
}

export interface GlobalIssue {
  id: string
  title: string
  summary: string
  date: string
  category: string
  impact: "positive" | "negative" | "neutral"
  relatedStocks: Stock[]
}

export interface ExchangeRate {
  currency: string
  currencyCode: string
  rate: number
  change: number
}

export interface GoldPrice {
  price: number
  change: number
  changePercent: number
  updatedAt: string
}

export interface OilPrice {
  price: number
  change: number
  changePercent: number
  updatedAt: string
}

export interface MarketEvent {
  id: string
  title: string
  date: string
  time?: string
  country: string
  importance: "high" | "medium" | "low"
  category: "economic" | "earnings" | "ipo" | "dividend" | "policy"
  description?: string
  impact?: "positive" | "negative" | "neutral"
}
