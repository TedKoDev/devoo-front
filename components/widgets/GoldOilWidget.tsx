"use client";
import { useGoldOil } from "@/lib/hooks/useGoldOil";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function GoldOilWidget() {
  const { data, isLoading, error } = useGoldOil();
  const [goldAmount, setGoldAmount] = useState("");
  const [goldValue, setGoldValue] = useState("");

  if (isLoading) return <div className="widget-card">Loading...</div>;
  if (error) return <div className="widget-card">Error: {error}</div>;

  // 금, 유가 데이터 추출
  const gold = data.find((row) => row.항목 === "금");
  const oil = data.find((row) => row.항목 === "WTI");

  // 금 계산기 함수
  const handleGoldCalculation = () => {
    const amount = parseFloat(goldAmount);
    if (!isNaN(amount) && gold) {
      const price = parseFloat(gold.가격);
      const calculated = (amount * price).toLocaleString();
      setGoldValue(calculated);
    }
  };

  const PriceChangeIndicator = ({ change = 0, changePercent = 0 }) => (
    <div className={`flex items-center text-sm ${change >= 0 ? "text-red-500" : "text-blue-500"}`}>
      {change >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
      <span>{Math.abs(change).toLocaleString()}</span>
      <span className="ml-1">({Math.abs(changePercent).toFixed(2)}%)</span>
    </div>
  );

  return (
    <div className="widget-card">
      <Tabs defaultValue="prices">
        <TabsList className="w-full mb-3">
          <TabsTrigger value="prices">시세 정보</TabsTrigger>
          <TabsTrigger value="calculator">금 계산기</TabsTrigger>
        </TabsList>

        <TabsContent value="prices">
          <div className="space-y-4">
            {/* 금 시세 */}
            <div>
              <div className="text-sm text-gray-500 mb-1">금</div>
              <div className="text-lg font-bold">
                {parseFloat(gold?.가격 || "0").toLocaleString()} {gold?.단위}
              </div>
              {gold && <PriceChangeIndicator change={gold.변화량 || 0} changePercent={gold.변화율 || 0} />}
              <div className="text-xs text-gray-400 mt-1">업데이트: {gold?.날짜}</div>
            </div>

            {/* 유가 시세 */}
            <div>
              <div className="text-sm text-gray-500 mb-1">WTI(유가)</div>
              <div className="text-lg font-bold">
                {parseFloat(oil?.가격 || "0").toLocaleString()} {oil?.단위}
              </div>
              {oil && <PriceChangeIndicator change={oil.변화량 || 0} changePercent={oil.변화율 || 0} />}
              <div className="text-xs text-gray-400 mt-1">업데이트: {oil?.날짜}</div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="calculator">
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm">금 (g)</label>
              <Input type="number" value={goldAmount} onChange={(e) => setGoldAmount(e.target.value)} placeholder="금 무게 (g)" />
            </div>
            <div className="space-y-2">
              <label className="text-sm">원화 (₩)</label>
              <Input value={goldValue} readOnly placeholder="계산된 금액" />
            </div>
            <Button onClick={handleGoldCalculation} className="w-full">
              계산하기
            </Button>
            {gold && <div className="text-xs text-gray-500">현재 금 시세: {parseFloat(gold.가격).toLocaleString()}원/g</div>}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
