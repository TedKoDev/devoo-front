import { useQuery } from "@tanstack/react-query";
import { fetchSearchTrends, fetchStockMarket, fetchGoldPrice, fetchOilPrice, fetchExchangeRates, fetchGlobalIssues, fetchMarketEvents } from "@/lib/api/market-data";

// 검색 트렌드 데이터 가져오기
export function useSearchTrends() {
  return useQuery({
    queryKey: ["searchTrends"],
    queryFn: fetchSearchTrends,
  });
}

// 주식 시장 데이터 가져오기
export function useStockMarkets() {
  return useQuery({
    queryKey: ["stockMarkets"],
    queryFn: fetchStockMarket,
  });
}

// 금 시세 데이터 가져오기
export function useGoldPrice() {
  return useQuery({
    queryKey: ["goldPrice"],
    queryFn: fetchGoldPrice,
  });
}

// 유가 데이터 가져오기
export function useOilPrice() {
  return useQuery({
    queryKey: ["oilPrice"],
    queryFn: fetchOilPrice,
  });
}

// 환율 데이터 가져오기
export function useExchangeRates() {
  return useQuery({
    queryKey: ["exchangeRates"],
    queryFn: fetchExchangeRates,
  });
}

// 글로벌 이슈 데이터 가져오기
export function useGlobalIssues() {
  return useQuery({
    queryKey: ["globalIssues"],
    queryFn: fetchGlobalIssues,
  });
}

// 시장 이벤트 데이터 가져오기
export function useMarketEvents() {
  return useQuery({
    queryKey: ["marketEvents"],
    queryFn: fetchMarketEvents,
  });
}

// TODO: API 구현 후 주석 해제
// 추천 주식 데이터 가져오기
// export function useRecommendedStocks() {
//   return useQuery({
//     queryKey: ["recommendedStocks"],
//     queryFn: async () => {
//       try {
//         return await marketDataAPI.getRecommendedStocks();
//       } catch (error) {
//         console.error("추천 주식 데이터 가져오기 실패:", error);
//         return [];
//       }
//     },
//   });
// }

// 모든 시장 데이터 한 번에 가져오기
export function useAllMarketData() {
  const searchTrends = useSearchTrends();
  const stockMarkets = useStockMarkets();
  const goldPrice = useGoldPrice();
  const oilPrice = useOilPrice();
  const exchangeRates = useExchangeRates();
  const globalIssues = useGlobalIssues();
  const marketEvents = useMarketEvents();
  // const recommendedStocks = useRecommendedStocks();

  return {
    searchTrends,
    stockMarkets,
    goldPrice,
    oilPrice,
    exchangeRates,
    globalIssues,
    marketEvents,
    // recommendedStocks,
    isLoading: searchTrends.isLoading || stockMarkets.isLoading || goldPrice.isLoading || oilPrice.isLoading || exchangeRates.isLoading || globalIssues.isLoading || marketEvents.isLoading,
    // || recommendedStocks.isLoading,
    isError: searchTrends.isError || stockMarkets.isError || goldPrice.isError || oilPrice.isError || exchangeRates.isError || globalIssues.isError || marketEvents.isError,
    // || recommendedStocks.isError,
  };
}
