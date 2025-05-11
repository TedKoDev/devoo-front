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

const GOLDEN_KEYWORDS = [
  // 건강/운동
  { keyword: "간헐적 단식 효과", category: "건강/운동" },
  { keyword: "유산소 운동 종류", category: "건강/운동" },
  { keyword: "홈트 루틴 추천", category: "건강/운동" },
  { keyword: "단백질 섭취 타이밍", category: "건강/운동" },
  { keyword: "다이어트 식단표", category: "건강/운동" },
  { keyword: "체지방 줄이는 운동", category: "건강/운동" },
  { keyword: "스트레칭 루틴", category: "건강/운동" },
  { keyword: "걷기 운동 효과", category: "건강/운동" },
  { keyword: "운동 전 먹으면 좋은 음식", category: "건강/운동" },
  { keyword: "헬스 초보 루틴", category: "건강/운동" },

  // 재테크/투자
  { keyword: "2025년 유망 주식", category: "재테크/투자" },
  { keyword: "ETF 초보 가이드", category: "재테크/투자" },
  { keyword: "금 투자 방법", category: "재테크/투자" },
  { keyword: "코인 세금 계산기", category: "재테크/투자" },
  { keyword: "미국 주식 사는 법", category: "재테크/투자" },
  { keyword: "부동산 경매 입문", category: "재테크/투자" },
  { keyword: "사회초년생 재테크", category: "재테크/투자" },
  { keyword: "신용점수 올리는 팁", category: "재테크/투자" },
  { keyword: "월급 관리법", category: "재테크/투자" },
  { keyword: "배당금 높은 종목", category: "재테크/투자" },

  // 자기계발/생산성
  { keyword: "1인 기업 시작법", category: "자기계발/생산성" },
  { keyword: "아침 루틴 정리", category: "자기계발/생산성" },
  { keyword: "시간 관리 앱 추천", category: "자기계발/생산성" },
  { keyword: "집중력 높이는 방법", category: "자기계발/생산성" },
  { keyword: "퇴사 후 해야 할 일", category: "자기계발/생산성" },
  { keyword: "독서 노트 정리법", category: "자기계발/생산성" },
  { keyword: "버킷리스트 작성법", category: "자기계발/생산성" },
  { keyword: "마인드맵 활용법", category: "자기계발/생산성" },
  { keyword: "루틴 만들기 앱", category: "자기계발/생산성" },
  { keyword: "작심삼일 극복법", category: "자기계발/생산성" },

  // IT/디지털
  { keyword: "ChatGPT 사용법", category: "IT/디지털" },
  { keyword: "Notion 활용법", category: "IT/디지털" },
  { keyword: "구글 스프레드시트 자동화", category: "IT/디지털" },
  { keyword: "블로그 자동 포스팅", category: "IT/디지털" },
  { keyword: "AI로 유튜브 만드는 법", category: "IT/디지털" },
  { keyword: "n8n 워크플로우 예제", category: "IT/디지털" },
  { keyword: "초보를 위한 코딩 언어", category: "IT/디지털" },
  { keyword: "무료 이미지 사이트", category: "IT/디지털" },
  { keyword: "스마트워크 도구 추천", category: "IT/디지털" },
  { keyword: "파이썬 자동화 예제", category: "IT/디지털" },

  // 창업/부업
  { keyword: "쿠팡 파트너스 수익", category: "창업/부업" },
  { keyword: "디지털 노마드 시작법", category: "창업/부업" },
  { keyword: "스마트스토어 운영 노하우", category: "창업/부업" },
  { keyword: "재고 없는 쇼핑몰", category: "창업/부업" },
  { keyword: "무자본 창업 아이템", category: "창업/부업" },
  { keyword: "1인 크리에이터 수익화", category: "창업/부업" },
  { keyword: "블로그로 돈 벌기", category: "창업/부업" },
  { keyword: "인스타 마켓 운영법", category: "창업/부업" },
  { keyword: "배달대행 수익 후기", category: "창업/부업" },
  { keyword: "스마트폰으로 부업 시작", category: "창업/부업" },

  // 생활 꿀팁
  { keyword: "가계부 앱 추천", category: "생활 꿀팁" },
  { keyword: "마트 세일 일정", category: "생활 꿀팁" },
  { keyword: "알뜰폰 요금제 정리", category: "생활 꿀팁" },
  { keyword: "전기세 줄이는 법", category: "생활 꿀팁" },
  { keyword: "쿠팡 환불 꿀팁", category: "생활 꿀팁" },
  { keyword: "해외직구 주의사항", category: "생활 꿀팁" },
  { keyword: "냉장고 정리 팁", category: "생활 꿀팁" },
  { keyword: "신용카드 혜택 비교", category: "생활 꿀팁" },
  { keyword: "여행 짐 싸기 리스트", category: "생활 꿀팁" },
  { keyword: "이사 준비 체크리스트", category: "생활 꿀팁" },

  // 육아/교육
  { keyword: "아이 언어발달 놀이", category: "육아/교육" },
  { keyword: "영어 그림책 추천", category: "육아/교육" },
  { keyword: "초등 공부 습관", category: "육아/교육" },
  { keyword: "유아 간식 레시피", category: "육아/교육" },
  { keyword: "홈스쿨링 노하우", category: "육아/교육" },
  { keyword: "아이와 가볼만한 곳", category: "육아/교육" },
  { keyword: "자녀 경제교육 팁", category: "육아/교육" },
  { keyword: "어린이 스마트폰 중독 해결", category: "육아/교육" },
  { keyword: "육아 브이로그 장비", category: "육아/교육" },
  { keyword: "유치원 입학 준비", category: "육아/교육" },

  // 패션/뷰티
  { keyword: "퍼스널컬러 진단", category: "패션/뷰티" },
  { keyword: "2025 패션 트렌드", category: "패션/뷰티" },
  { keyword: "남자 피부관리 루틴", category: "패션/뷰티" },
  { keyword: "데일리룩 코디", category: "패션/뷰티" },
  { keyword: "향수 추천 TOP 10", category: "패션/뷰티" },
  { keyword: "기초화장품 순서", category: "패션/뷰티" },
  { keyword: "셀프 네일 꿀팁", category: "패션/뷰티" },
  { keyword: "헤어스타일 추천 앱", category: "패션/뷰티" },
  { keyword: "여름 립 추천", category: "패션/뷰티" },
  { keyword: "저자극 선크림 추천", category: "패션/뷰티" },

  // 여행/문화
  { keyword: "혼자 여행 가기 좋은 곳", category: "여행/문화" },
  { keyword: "해외 자유여행 준비물", category: "여행/문화" },
  { keyword: "제주도 3박 4일 코스", category: "여행/문화" },
  { keyword: "일몰 명소 베스트", category: "여행/문화" },
  { keyword: "서울 핫플 정리", category: "여행/문화" },
  { keyword: "국내 숨은 여행지", category: "여행/문화" },
  { keyword: "카페 투어 루트", category: "여행/문화" },
  { keyword: "항공권 싸게 사는 법", category: "여행/문화" },
  { keyword: "일본 여행 총정리", category: "여행/문화" },
  { keyword: "해외여행 짐 체크리스트", category: "여행/문화" },

  // 트렌드/라이프스타일
  { keyword: "요즘 핫한 앱", category: "트렌드/라이프스타일" },
  { keyword: "2025 소비 트렌드", category: "트렌드/라이프스타일" },
  { keyword: "제로 웨이스트 실천", category: "트렌드/라이프스타일" },
  { keyword: "밀레니얼 가치소비", category: "트렌드/라이프스타일" },
  { keyword: "1일 1깡 챌린지 후기", category: "트렌드/라이프스타일" },
  { keyword: "스몰 럭셔리 브랜드", category: "트렌드/라이프스타일" },
  { keyword: "감성 사진 보정법", category: "트렌드/라이프스타일" },
  { keyword: "브이로그 촬영 장비", category: "트렌드/라이프스타일" },
  { keyword: "스마트홈 구축 팁", category: "트렌드/라이프스타일" },
  { keyword: "미니멀 라이프 시작법", category: "트렌드/라이프스타일" },
];

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
    <Card className="h-auto">
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
