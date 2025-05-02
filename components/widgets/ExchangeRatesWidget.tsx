"use client"

import { ArrowUp, ArrowDown, RefreshCw } from "lucide-react"
import type { ExchangeRate } from "@/types/market"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

interface ExchangeRatesWidgetProps {
  data?: ExchangeRate[]
}

export default function ExchangeRatesWidget({ data }: ExchangeRatesWidgetProps) {
  // 데이터가 없을 경우 기본값 제공
  const defaultData: ExchangeRate[] = [
    {
      currency: "미국 달러",
      currencyCode: "USD",
      rate: 1350.25,
      change: 5.75,
    },
    {
      currency: "유로",
      currencyCode: "EUR",
      rate: 1456.8,
      change: 3.2,
    },
  ]

  // 데이터가 제공되지 않으면 기본값 사용
  const exchangeRates = data || defaultData

  const [selectedCurrency, setSelectedCurrency] = useState("USD")
  const [amount, setAmount] = useState("")
  const [result, setResult] = useState("")
  const [calculationDirection, setCalculationDirection] = useState<"toForeign" | "toKRW">("toForeign")

  const selectedRate = exchangeRates.find((rate) => rate.currencyCode === selectedCurrency)

  const handleCalculation = () => {
    if (!selectedRate) return

    if (calculationDirection === "toForeign") {
      // Convert KRW to foreign currency
      const krwAmount = Number.parseFloat(amount.replace(/,/g, ""))
      if (!isNaN(krwAmount)) {
        const foreignAmount = (krwAmount / selectedRate.rate).toFixed(2)
        setResult(foreignAmount)
      }
    } else {
      // Convert foreign currency to KRW
      const foreignAmount = Number.parseFloat(amount)
      if (!isNaN(foreignAmount)) {
        const krwAmount = (foreignAmount * selectedRate.rate).toLocaleString()
        setResult(krwAmount)
      }
    }
  }

  const switchCalculationDirection = () => {
    setCalculationDirection((prev) => (prev === "toForeign" ? "toKRW" : "toForeign"))
    setAmount("")
    setResult("")
  }

  return (
    <div className="widget-card h-full">
      <h3 className="text-sm font-medium mb-3">환율</h3>

      <Tabs defaultValue="rates">
        <TabsList className="w-full mb-3">
          <TabsTrigger value="rates">환율 정보</TabsTrigger>
          <TabsTrigger value="converter">환율 계산기</TabsTrigger>
        </TabsList>

        <TabsContent value="rates">
          <div className="space-y-2">
            {exchangeRates.slice(0, 2).map((rate) => {
              const isPositive = rate.change > 0

              return (
                <div key={rate.currencyCode} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="font-medium mr-1">{rate.currencyCode}</span>
                    <span className="text-xs text-gray-500">{rate.currency}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-sm font-medium">{rate.rate.toLocaleString()}원</div>
                    <div className={`flex items-center text-xs ${isPositive ? "text-red-500" : "text-blue-500"}`}>
                      {isPositive ? <ArrowUp className="h-2 w-2 mr-0.5" /> : <ArrowDown className="h-2 w-2 mr-0.5" />}
                      <span>{Math.abs(rate.change).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="converter">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {calculationDirection === "toForeign" ? "원화 → 외화" : "외화 → 원화"}
              </span>
              <Button variant="ghost" size="sm" onClick={switchCalculationDirection} className="h-8 w-8 p-0">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm">통화 선택</label>
              <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="통화 선택" />
                </SelectTrigger>
                <SelectContent>
                  {exchangeRates.map((rate) => (
                    <SelectItem key={rate.currencyCode} value={rate.currencyCode}>
                      {rate.currencyCode} - {rate.currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {calculationDirection === "toForeign" ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm">원화 (₩)</label>
                  <Input
                    type="text"
                    value={amount}
                    onChange={(e) => {
                      // Allow only numbers and commas
                      const value = e.target.value.replace(/[^\d,]/g, "")
                      setAmount(value)
                    }}
                    placeholder="금액 (원)"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm">{selectedCurrency}</label>
                  <Input value={result} readOnly placeholder="계산된 외화 금액" />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-sm">{selectedCurrency}</label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="외화 금액"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm">원화 (₩)</label>
                  <Input value={result} readOnly placeholder="계산된 원화 금액" />
                </div>
              </>
            )}

            <Button onClick={handleCalculation} className="w-full">
              계산하기
            </Button>

            {selectedRate && (
              <div className="text-xs text-gray-500">
                현재 환율: 1 {selectedCurrency} = {selectedRate.rate.toLocaleString()}원
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
