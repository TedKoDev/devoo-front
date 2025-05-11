"use client";

import { useState, useMemo, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchTerm } from "@/lib/hooks/useSearchTerm";
import { useUserStore } from "@/store/useUserStore";
import { getGoogleSheetData } from "@/lib/googlesheet/keywordSheets";

interface SearchTrend {
  keyword: string;
  rank: number;
  trend?: "up" | "down";
}

interface SearchTrendsWidgetProps {
  data?: {
    google: SearchTrend[];
    nate: SearchTrend[];
    daum: SearchTrend[];
    zum: SearchTrend[];
    blogKeywords: SearchTrend[];
  };
}

// 반환 타입 명시
interface WeekKeywordMap {
  [week: string]: string[];
}

//

export default function SearchTrendsWidget({ data = { google: [], nate: [], daum: [], zum: [], blogKeywords: [] } }: SearchTrendsWidgetProps) {
  const [activeTab, setActiveTab] = useState<"google" | "nate" | "daum" | "zum" | "blogKeywords">("google");
  const { searchTerms } = useSearchTerm();
  const [refreshKey, setRefreshKey] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [blogKeywords, setBlogKeywords] = useState<string[]>([]);

  // 1시간마다 블로그 황금 키워드 갱신
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fetchSheetData = async () => {
      try {
        const data: WeekKeywordMap = await getGoogleSheetData();
        const weekLabels = Object.keys(data);
        if (weekLabels.length === 0) return;
        const latestWeek = weekLabels[weekLabels.length - 1];
        const keywords = data[latestWeek] || [];
        const shuffled = [...keywords].sort(() => Math.random() - 0.5);
        setBlogKeywords(shuffled.slice(0, 10));
        setLastUpdated(new Date());
      } catch (error) {
        console.error("구글 시트 데이터 가져오기 실패:", error);
      }
    };
    fetchSheetData();
    timer = setInterval(fetchSheetData, 60 * 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const formatLastUpdated = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const tabs = [
    { id: "google", label: "구글" },
    { id: "nate", label: "네이트" },
    { id: "daum", label: "다음" },
    { id: "zum", label: "줌" },
    { id: "blogKeywords", label: "블로그 황금 키워드" },
  ] as const;

  const processedData = useMemo(() => {
    if (!searchTerms) return data;

    const sourceMap = {
      googletrend: "google",
      nate: "nate",
      daum: "daum",
      zum: "zum",
    } as const;

    const newData = {
      google: [] as SearchTrend[],
      nate: [] as SearchTrend[],
      daum: [] as SearchTrend[],
      zum: [] as SearchTrend[],
      blogKeywords: [] as SearchTrend[],
    };

    // Process search terms by source
    searchTerms.forEach((term) => {
      const source = sourceMap[term.source.name as keyof typeof sourceMap];
      if (source) {
        newData[source].push({
          keyword: term.keyword,
          rank: term.rank,
        });
      }
    });

    // Sort by rank
    Object.keys(newData).forEach((key) => {
      if (key !== "blogKeywords") {
        newData[key as keyof typeof newData].sort((a, b) => a.rank - b.rank);
      }
    });

    // 블로그 황금 키워드: 구글 시트에서 가져온 최신 주차의 랜덤 10개
    newData.blogKeywords = blogKeywords.map((keyword, index) => ({
      keyword,
      rank: index + 1,
    }));

    return newData;
  }, [searchTerms, data, refreshKey, blogKeywords]);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>실시간 검색어</CardTitle>
        <div className="text-xs text-muted-foreground">
          {activeTab === "blogKeywords" ? "1시간" : "1분"}마다 갱신
          <span className="ml-2">({formatLastUpdated(lastUpdated)})</span>
        </div>
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

        <div className="space-y-1">
          {processedData[activeTab]?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[160px] text-gray-500">
              <div className="text-sm">데이터를 불러오는 중...</div>
            </div>
          ) : (
            processedData[activeTab]?.slice(0, 10).map((item, index) => (
              <div key={index} className="flex items-center text-sm py-1 hover:bg-gray-50 rounded-md px-1">
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
