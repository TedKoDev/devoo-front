"use client";

import { ArrowUp, ArrowDown, ArrowRightLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect, memo } from "react";

// 구글시트 JSON API URL (환율 데이터)
const GOOGLE_SHEETS_JSON_URL = "https://docs.google.com/spreadsheets/d/1D1BM4tC7xvpHJUlVJyQvFb1g3duMX7CS4YoEEY8d1v0/gviz/tq?tqx=out:json&gid=514392219";

interface MarketData {
  날짜: string;
  항목: string;
  가격: string;
  단위: string;
  출처: string;
}

interface ProcessedRate {
  currency: string;
  krwRate: number;
  date: string;
  change: number;
  changePercent: number;
}

const SUPPORTED_CURRENCIES = ["USD", "EUR", "JPY", "CNY", "RUB"];

function ExchangeRatesWidget() {
  const [data, setData] = useState<MarketData[]>([]);
  const [rates, setRates] = useState<ProcessedRate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [fromAmount, setFromAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("KRW");
  const [toCurrency, setToCurrency] = useState("USD");
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    const fetchMarketData = async () => {
      const today = new Date().toISOString().slice(0, 10);
      const cacheKey = `market_data_${today}`;
      
      // localStorage에서 오늘 데이터 확인
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        try {
          const parsed = JSON.parse(cachedData);
          console.log('Using cached market data for exchange rates:', parsed);
          setData(parsed.data || []);
          processExchangeData(parsed.data || []);
          setIsLoading(false);
          return;
        } catch (e) {
          console.log('Cache parse error, fetching fresh data');
        }
      }

      try {
        console.log('Fetching market data for exchange rates from Google Sheets...');
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(GOOGLE_SHEETS_JSON_URL, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const responseText = await response.text();
        
        // 구글시트 JSON 응답에서 실제 JSON 부분만 추출
        const jsonMatch = responseText.match(/google\.visualization\.Query\.setResponse\((.*)\);/);
        if (!jsonMatch) {
          throw new Error('Invalid Google Sheets response format');
        }
        
        const data = JSON.parse(jsonMatch[1]);
        console.log('Google Sheets market data for exchange rates:', data);
        
        if (data.table && data.table.rows && data.table.rows.length > 0) {
          // 모든 행을 MarketData 형태로 변환
          const marketData: MarketData[] = data.table.rows.map((row: any) => ({
            날짜: row.c[0]?.f || "",      // 첫 번째 컬럼: 날짜
            항목: row.c[1]?.v || "",      // 두 번째 컬럼: 항목
            가격: row.c[2]?.v?.toString() || "", // 세 번째 컬럼: 가격
            단위: row.c[3]?.v || "",      // 네 번째 컬럼: 단위
            출처: row.c[4]?.v || "",      // 다섯 번째 컬럼: 출처
          }));
          
          console.log('Parsed market data for exchange rates:', marketData);
          
          setData(marketData);
          processExchangeData(marketData);
          
          // localStorage에 저장
          localStorage.setItem(cacheKey, JSON.stringify({
            data: marketData,
            timestamp: Date.now()
          }));
        } else {
          setError("데이터를 찾을 수 없습니다.");
        }
      } catch (err) {
        console.error('Market data fetch error for exchange rates:', err);
        setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  const processExchangeData = (marketData: MarketData[]) => {
    // 날짜별로 데이터 그룹화
    const dataByDate = marketData.reduce((acc, curr) => {
      if (!acc[curr.날짜]) {
        acc[curr.날짜] = {};
      }
      acc[curr.날짜][curr.항목] = curr;
      return acc;
    }, {} as Record<string, Record<string, MarketData>>);

    // 날짜 정렬 (최신순)
    const sortedDates = Object.keys(dataByDate).sort().reverse();
    const latestDate = sortedDates[0];
    const previousDate = sortedDates[1];

    const latestData = dataByDate[latestDate] || {};
    const previousData = dataByDate[previousDate] || {};

    // 환율 데이터 추출 및 KRW 기준으로 변환
    const processedRates = SUPPORTED_CURRENCIES.map((currency) => {
      let currentRow, prevRow;
      
      if (currency === "USD") {
        currentRow = latestData["USD/KRW"];
        prevRow = previousData["USD/KRW"];
      } else {
        currentRow = latestData[`USD/${currency}`];
        prevRow = previousData[`USD/${currency}`];
      }

      if (!currentRow) {
        console.log(`Missing current data for currency: ${currency}`);
        return null;
      }

      const baseRate = parseFloat(currentRow.가격);
      let krwRate, prevKrwRate;

      if (currency === "USD") {
        krwRate = baseRate;
        prevKrwRate = prevRow ? parseFloat(prevRow.가격) : baseRate;
      } else {
        const usdKrwRow = latestData["USD/KRW"];
        const prevUsdKrwRow = previousData["USD/KRW"];
        
        if (!usdKrwRow) {
          console.log("Missing USD/KRW rate");
          return null;
        }
        
        const usdKrwRate = parseFloat(usdKrwRow.가격);
        krwRate = usdKrwRate / baseRate;
        
        if (prevRow && prevUsdKrwRow) {
          const prevBaseRate = parseFloat(prevRow.가격);
          const prevUsdKrwRate = parseFloat(prevUsdKrwRow.가격);
          prevKrwRate = prevUsdKrwRate / prevBaseRate;
        } else {
          prevKrwRate = krwRate;
        }
      }

      // 변화량 계산
      const change = krwRate - prevKrwRate;
      const changePercent = prevKrwRate !== 0 ? (change / prevKrwRate) * 100 : 0;

      return {
        currency,
        krwRate,
        date: currentRow.날짜,
        change: Math.round(change * 100) / 100, // 소수점 2자리까지
        changePercent: changePercent,
      };
    }).filter((rate): rate is NonNullable<typeof rate> => rate !== null);

    setRates(processedRates);
  };

  if (isLoading) return <div className="widget-card">Loading...</div>;
  if (error) return <div className="widget-card">Error: {error}</div>;

  const calculateConversion = () => {
    const amount = parseFloat(fromAmount.replace(/,/g, ""));
    if (isNaN(amount)) return;

    if (fromCurrency === "KRW" && toCurrency !== "KRW") {
      // KRW -> 외화
      const rate = rates.find((r) => r.currency === toCurrency);
      if (rate) {
        const converted = amount / rate.krwRate;
        setResult(converted.toFixed(2));
      }
    } else if (fromCurrency !== "KRW" && toCurrency === "KRW") {
      // 외화 -> KRW
      const rate = rates.find((r) => r.currency === fromCurrency);
      if (rate) {
        const converted = amount * rate.krwRate;
        setResult(converted.toFixed(2));
      }
    } else if (fromCurrency !== "KRW" && toCurrency !== "KRW") {
      // 외화 -> 외화
      const fromRate = rates.find((r) => r.currency === fromCurrency);
      const toRate = rates.find((r) => r.currency === toCurrency);
      if (fromRate && toRate) {
        const krwAmount = amount * fromRate.krwRate;
        const converted = krwAmount / toRate.krwRate;
        setResult(converted.toFixed(2));
      }
    } else if (fromCurrency === "KRW" && toCurrency === "KRW") {
      // KRW -> KRW
      setResult(amount.toFixed(2));
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount("");
    setResult("");
  };

  const PriceChangeIndicator = ({ change = 0, changePercent = 0 }) => (
    <div className={`flex items-center text-sm ${change >= 0 ? "text-red-500" : "text-blue-500"}`}>
      {change >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
      <span>{Math.abs(change).toFixed(2)}</span>
      <span className="ml-1">({Math.abs(changePercent).toFixed(2)}%)</span>
    </div>
  );

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "JPY":
        return "¥";
      case "CNY":
        return "¥";
      case "RUB":
        return "₽";
      case "KRW":
        return "₩";
      default:
        return "";
    }
  };

  const getCurrencyName = (currency: string) => {
    switch (currency) {
      case "USD":
        return "미국 달러";
      case "EUR":
        return "유로";
      case "JPY":
        return "일본 엔";
      case "CNY":
        return "중국 위안";
      case "RUB":
        return "러시아 루블";
      case "KRW":
        return "대한민국 원";
      default:
        return currency;
    }
  };

  const availableCurrencies = ["KRW", ...rates.map((rate) => rate.currency)];

  return (
    <div className="widget-card">
      <Tabs defaultValue="rates">
        <TabsList className="w-full mb-3">
          <TabsTrigger value="rates">환율 정보</TabsTrigger>
          <TabsTrigger value="converter">환율 계산기</TabsTrigger>
        </TabsList>

        <TabsContent value="rates">
          <div className="grid grid-cols-2 gap-3">
            {rates.map((rate) => (
              <div key={rate.currency} className="p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {getCurrencySymbol(rate.currency)} {getCurrencyName(rate.currency)}
                  </div>
                  <PriceChangeIndicator change={rate.change} changePercent={rate.changePercent} />
                </div>
                <div className="text-base font-bold mt-1">
                  1 {rate.currency} = {rate.krwRate.toLocaleString()}원
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  1,000원 = {(1000 / rate.krwRate).toFixed(2)} {rate.currency}
                </div>
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-400 mt-2 text-right">{rates[0]?.date && `업데이트: ${rates[0].date}`}</div>
        </TabsContent>

        <TabsContent value="converter">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-1 block">변환할 통화</label>
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCurrencies.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {getCurrencySymbol(currency)} {getCurrencyName(currency)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="pt-6">
                  <Button variant="ghost" size="icon" onClick={swapCurrencies}>
                    <ArrowRightLeft className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium mb-1 block">변환될 통화</label>
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCurrencies.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {getCurrencySymbol(currency)} {getCurrencyName(currency)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  금액 ({getCurrencySymbol(fromCurrency)})
                </label>
                <Input
                  type="text"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  결과 ({getCurrencySymbol(toCurrency)})
                </label>
                <Input value={result} readOnly placeholder="0" />
              </div>
            </div>

            <Button onClick={calculateConversion} className="w-full">
              환율 계산
            </Button>

            {rates.length > 0 && (
              <div className="text-xs text-gray-500 text-center">
                현재 환율 기준: {rates[0].date}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// React.memo로 컴포넌트를 감싸서 불필요한 리렌더링 방지
export default memo(ExchangeRatesWidget);
