import { ArrowUp, ArrowDown } from "lucide-react";
import type { StockMarket } from "@/types/market";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StockMarketWidgetProps {
  data: StockMarket[];
}

export default function StockMarketWidget({ data }: StockMarketWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>주요 증시</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="text-center text-gray-500 py-4">데이터가 없습니다</div>
        ) : (
          <div className="space-y-2">
            {data.map((market) => {
              const isPositive = market.change > 0;

              return (
                <div key={market.name} className="flex justify-between items-center">
                  <div className="font-medium">{market.name}</div>
                  <div className="flex flex-col items-end">
                    <div className="text-sm font-medium">{market.price.toLocaleString()}</div>
                    <div className={`flex items-center text-xs ${isPositive ? "text-red-500" : "text-blue-500"}`}>
                      {isPositive ? <ArrowUp className="h-2 w-2 mr-0.5" /> : <ArrowDown className="h-2 w-2 mr-0.5" />}
                      <span>{Math.abs(market.change).toFixed(2)}</span>
                      <span className="ml-1">({Math.abs(market.changePercent).toFixed(2)}%)</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
