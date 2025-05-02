"use client";

import { useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import type { SearchTrend } from "@/types/market";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SearchTrendsWidgetProps {
  data?: {
    google: SearchTrend[];
    nate: SearchTrend[];
    daum: SearchTrend[];
    zum: SearchTrend[];
    blogKeywords: SearchTrend[];
  };
}

export default function SearchTrendsWidget({ data = { google: [], nate: [], daum: [], zum: [], blogKeywords: [] } }: SearchTrendsWidgetProps) {
  const [activeTab, setActiveTab] = useState<"google" | "nate" | "daum" | "zum" | "blogKeywords">("google");

  const tabs = [
    { id: "google", label: "구글" },
    { id: "nate", label: "네이트" },
    { id: "daum", label: "다음" },
    { id: "zum", label: "줌" },
    { id: "blogKeywords", label: "블로그 황금 키워드" },
  ] as const;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>실시간 검색어</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-1 mb-3 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2 py-1 text-xs rounded-md whitespace-nowrap ${activeTab === tab.id ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {data[activeTab]?.length === 0 ? (
            <div className="text-center text-gray-500 py-4">데이터가 없습니다</div>
          ) : (
            data[activeTab]?.slice(0, 10).map((item, index) => (
              <div key={index} className="flex items-center text-sm">
                <div className="w-5 text-gray-500 font-medium">{index + 1}</div>
                <div className="flex-1 truncate">{item.keyword}</div>
                {item.trend && (
                  <div className={item.trend === "up" ? "text-red-500" : "text-blue-500"}>{item.trend === "up" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}</div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
