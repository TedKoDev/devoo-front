"use client";

import { ArrowUp, ArrowDown, RefreshCw } from "lucide-react";
import type { GoldPrice, OilPrice } from "@/types/market";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface GoldPriceWidgetProps {
  data?: GoldPrice;
  goldData?: GoldPrice; // Keep this for backward compatibility
  oilData?: OilPrice;
}

export default function GoldPriceWidget({ data, goldData: propGoldData, oilData }: GoldPriceWidgetProps) {
  // 데이터가 없을 경우 기본값 제공
  const defaultData: GoldPrice = {
    price: 98750,
    change: 1250,
    changePercent: 1.28,
    updatedAt: "2023-05-15 15:30:00",
  };

  // 데이터가 제공되지 않으면 기본값 사용
  const goldData = data || propGoldData || defaultData;
  const isPositive = goldData.change > 0;

  const [goldAmount, setGoldAmount] = useState("");
  const [goldValue, setGoldValue] = useState("");
  const [calculationDirection, setCalculationDirection] = useState<"toKRW" | "toGold">("toKRW");

  const handleGoldCalculation = () => {
    if (calculationDirection === "toKRW") {
      // Convert gold amount to KRW
      const amount = Number.parseFloat(goldAmount);
      if (!isNaN(amount)) {
        const value = (amount * goldData.price).toLocaleString();
        setGoldValue(value);
      }
    } else {
      // Convert KRW to gold amount
      const value = Number.parseFloat(goldValue.replace(/,/g, ""));
      if (!isNaN(value)) {
        const amount = (value / goldData.price).toFixed(4);
        setGoldAmount(amount);
      }
    }
  };

  const switchCalculationDirection = () => {
    setCalculationDirection((prev) => (prev === "toKRW" ? "toGold" : "toKRW"));
    setGoldAmount("");
    setGoldValue("");
  };

  return (
    <div className="widget-card h-full">
      <h3 className="text-sm font-medium mb-3">금/유가 시세</h3>

      <Tabs defaultValue="prices">
        <TabsList className="w-full mb-3">
          <TabsTrigger value="prices">시세 정보</TabsTrigger>
          <TabsTrigger value="calculator">금 계산기</TabsTrigger>
        </TabsList>

        <TabsContent value="prices" className="space-y-4">
          <div className="space-y-3">
            <div>
              <div className="text-sm font-medium mb-1">금 시세</div>
              <div className="flex flex-col">
                <div className="text-lg font-bold">{goldData.price?.toLocaleString()}원/g</div>
                <div className={`flex items-center text-sm ${isPositive ? "text-red-500" : "text-blue-500"}`}>
                  {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                  <span>{Math.abs(goldData.change).toLocaleString()}</span>
                  <span className="ml-1">({Math.abs(goldData.changePercent).toFixed(2)}%)</span>
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium mb-1">유가</div>
              {oilData && (
                <div className="flex flex-col">
                  <div className="text-lg font-bold">{oilData.price.toLocaleString()}원/L</div>
                  <div className={`flex items-center text-sm ${oilData.change > 0 ? "text-red-500" : "text-blue-500"}`}>
                    {oilData.change > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                    <span>{Math.abs(oilData.change).toLocaleString()}</span>
                    <span className="ml-1">({Math.abs(oilData.changePercent).toFixed(2)}%)</span>
                  </div>
                </div>
              )}
            </div>

            <div className="text-xs text-gray-500">업데이트: {goldData.updatedAt}</div>
          </div>
        </TabsContent>

        <TabsContent value="calculator">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{calculationDirection === "toKRW" ? "금 → 원화" : "원화 → 금"}</span>
              <Button variant="ghost" size="sm" onClick={switchCalculationDirection} className="h-8 w-8 p-0">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            {calculationDirection === "toKRW" ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm">금 (g)</label>
                  <Input type="number" value={goldAmount} onChange={(e) => setGoldAmount(e.target.value)} placeholder="금 무게 (g)" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm">원화 (₩)</label>
                  <Input value={goldValue} readOnly placeholder="계산된 금액" />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-sm">원화 (₩)</label>
                  <Input
                    type="text"
                    value={goldValue}
                    onChange={(e) => {
                      // Allow only numbers and commas
                      const value = e.target.value.replace(/[^\d,]/g, "");
                      setGoldValue(value);
                    }}
                    placeholder="금액 (원)"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm">금 (g)</label>
                  <Input value={goldAmount} readOnly placeholder="계산된 금 무게" />
                </div>
              </>
            )}

            <Button onClick={handleGoldCalculation} className="w-full">
              계산하기
            </Button>

            <div className="text-xs text-gray-500">현재 금 시세: {goldData.price?.toLocaleString()}원/g</div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
