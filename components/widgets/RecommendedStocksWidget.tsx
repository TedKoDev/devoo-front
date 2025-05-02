"use client";

import { useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import type { Stock } from "@/types/market";

interface RecommendedStocksWidgetProps {
  data: {
    korean: Stock[];
    us: Stock[];
  };
}

export default function RecommendedStocksWidget({ data }: RecommendedStocksWidgetProps) {
  const [activeTab, setActiveTab] = useState<"korean" | "us">("korean");

  return (
    <div className="widget-card">
      <h3 className="text-sm font-medium mb-3">추천 종목</h3>

      <div className="flex space-x-2 mb-3">
        <button onClick={() => setActiveTab("korean")} className={`px-3 py-1 text-xs rounded-md ${activeTab === "korean" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
          한국 증시
        </button>
        <button onClick={() => setActiveTab("us")} className={`px-3 py-1 text-xs rounded-md ${activeTab === "us" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
          미국 증시
        </button>
      </div>

      <div className="space-y-2">
        {data[activeTab]?.map((stock) => (
          <div key={stock.symbol} className="flex justify-between items-center text-sm">
            <div className="flex flex-col">
              <span className="font-medium">{stock.name}</span>
              <span className="text-xs text-gray-500">{stock.symbol}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-medium">{activeTab === "korean" ? `${stock.price.toLocaleString()}원` : `$${stock.price.toLocaleString()}`}</span>
              <div className={`flex items-center text-xs ${stock.change > 0 ? "text-red-500" : "text-blue-500"}`}>
                {stock.change > 0 ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
                <span>{Math.abs(stock.change).toLocaleString()}</span>
                <span className="ml-1">({Math.abs(stock.changePercent).toFixed(2)}%)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
