import StockMarketWidget from "@/components/widgets/StockMarketWidget"
import SearchTrendsWidget from "@/components/widgets/SearchTrendsWidget"
import OilPriceWidget from "@/components/widgets/OilPriceWidget"
import GoldPriceWidget from "@/components/widgets/GoldPriceWidget"
import ExchangeRatesWidget from "@/components/widgets/ExchangeRatesWidget"
import GlobalIssuesWidget from "@/components/widgets/GlobalIssuesWidget"
import RecommendedStocksWidget from "@/components/widgets/RecommendedStocksWidget"
import MarketCalendarWidget from "@/components/widgets/MarketCalendarWidget"
import type { SearchTrend, StockMarket, GlobalIssue, Stock } from "@/types/market"
import { getMockOilPrice, getMockGoldPrice, getMockExchangeRates, getMockMarketEvents } from "@/lib/api/mock-data"

interface HomeWidgetGridProps {
  searchTrends: {
    google: SearchTrend[]
    nate: SearchTrend[]
    daum: SearchTrend[]
    zum: SearchTrend[]
    blogKeywords: SearchTrend[]
  }
  stockMarkets: StockMarket[]
  recommendedStocks: {
    korean: Stock[]
    us: Stock[]
  }
  globalIssues: GlobalIssue[]
}

export default function HomeWidgetGrid({
  searchTrends,
  stockMarkets,
  recommendedStocks,
  globalIssues,
}: HomeWidgetGridProps) {
  // 추가 데이터 가져오기
  const oilPrice = getMockOilPrice()
  const goldPrice = getMockGoldPrice()
  const exchangeRates = getMockExchangeRates()
  const marketEvents = getMockMarketEvents()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <StockMarketWidget data={stockMarkets} />
      <SearchTrendsWidget data={searchTrends} />
      <RecommendedStocksWidget data={recommendedStocks} />
      <GlobalIssuesWidget data={globalIssues} />
      <MarketCalendarWidget data={marketEvents} />
      <OilPriceWidget data={oilPrice} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GoldPriceWidget data={goldPrice} />
        <ExchangeRatesWidget data={exchangeRates} />
      </div>
    </div>
  )
}
