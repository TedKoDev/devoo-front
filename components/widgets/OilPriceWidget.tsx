import { ArrowUp, ArrowDown } from "lucide-react";
import type { OilPrice } from "@/types/market";

interface OilPriceWidgetProps {
  data?: OilPrice;
}

export default function OilPriceWidget({ data }: OilPriceWidgetProps) {
  // 데이터가 없을 경우 기본값 제공
  const defaultData: OilPrice = {
    price: 1650,
    change: -25,
    changePercent: -1.49,
    updatedAt: "2023-05-15 15:30:00",
  };

  // 데이터가 제공되지 않으면 기본값 사용
  const oilData = data || defaultData;
  const isPositive = oilData.change > 0;

  return (
    <div className="widget-card">
      <h3 className="text-sm font-medium mb-3">유가</h3>
      <div className="flex flex-col">
        <div className="text-lg font-bold">{oilData.price?.toLocaleString()}원/L</div>
        <div className={`flex items-center text-sm ${isPositive ? "text-red-500" : "text-blue-500"}`}>
          {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
          <span>{Math.abs(oilData.change).toLocaleString()}</span>
          <span className="ml-1">({Math.abs(oilData.changePercent).toFixed(2)}%)</span>
        </div>
        <div className="text-xs text-gray-500 mt-2">업데이트: {oilData.updatedAt}</div>
      </div>
    </div>
  );
}
