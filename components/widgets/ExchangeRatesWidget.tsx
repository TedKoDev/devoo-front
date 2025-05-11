"use client";

import { useGoldOil } from "@/lib/hooks/useGoldOil";
import { ArrowUp, ArrowDown, ArrowRightLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const SUPPORTED_CURRENCIES = ["USD", "EUR", "JPY", "CNY", "RUB"];

export default function ExchangeRatesWidget() {
  const { data, isLoading, error } = useGoldOil();

  const [fromAmount, setFromAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("KRW");
  const [toCurrency, setToCurrency] = useState("USD");
  const [result, setResult] = useState<string>("");

  if (isLoading) return <div className="widget-card">Loading...</div>;
  if (error) return <div className="widget-card">Error: {error}</div>;

  // 환율 데이터 추출 및 KRW 기준으로 변환
  const rates = SUPPORTED_CURRENCIES.map((currency) => {
    let row;
    if (currency === "USD") {
      row = data.find((r) => r.항목 === "USD/KRW");
    } else {
      row = data.find((r) => r.항목 === `USD/${currency}`);
    }

    if (!row) {
      console.log(`Missing data for currency: ${currency}`);
      return null;
    }

    const baseRate = parseFloat(row.가격);
    let krwRate;

    if (currency === "USD") {
      krwRate = baseRate;
    } else {
      const usdKrwRate = data.find((r) => r.항목 === "USD/KRW");
      if (!usdKrwRate) {
        console.log("Missing USD/KRW rate");
        return null;
      }
      krwRate = parseFloat(usdKrwRate.가격) / baseRate;
    }

    return {
      currency,
      krwRate,
      date: row.날짜,
      change: row.변화량,
      changePercent: row.변화율,
    };
  }).filter((rate): rate is NonNullable<typeof rate> => rate !== null);

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
      <span>{Math.abs(change).toLocaleString()}</span>
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
                  <PriceChangeIndicator change={rate.change || 0} changePercent={rate.changePercent || 0} />
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

            <div className="space-y-2">
              <label className="text-sm font-medium">금액</label>
              <Input
                type="text"
                value={fromAmount}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d,]/g, "");
                  setFromAmount(value);
                }}
                placeholder="금액을 입력하세요"
              />
            </div>

            <Button onClick={calculateConversion} className="w-full">
              계산하기
            </Button>

            {result && (
              <div className="p-4 bg-gray-50 rounded-lg mt-4">
                <div className="text-sm text-gray-500 mb-1">변환 결과</div>
                <div className="text-lg font-semibold">
                  {fromAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {fromCurrency} =
                </div>
                <div className="text-2xl font-bold text-primary">
                  {parseFloat(result).toLocaleString()} {toCurrency}
                </div>
                {fromCurrency !== "KRW" && toCurrency !== "KRW" && <div className="text-xs text-gray-400 mt-2">* 원화(KRW)를 통한 교차 환율로 계산됨</div>}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
