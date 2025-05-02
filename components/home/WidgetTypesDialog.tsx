"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// 위젯 정의
const widgetDefinitions = [
  {
    id: "stockMarket",
    name: "주요 증시",
    defaultVisible: true,
    description: "국내외 주요 증시 지수와 등락률을 실시간으로 제공합니다.",
    category: "금융",
  },
  {
    id: "searchTrends",
    name: "실시간 검색어",
    defaultVisible: true,
    description: "주요 포털 사이트의 실시간 검색어 순위를 확인할 수 있습니다.",
    category: "트렌드",
  },
  {
    id: "recommendedStocks",
    name: "추천 종목",
    defaultVisible: true,
    description: "국내외 추천 주식 종목 정보를 제공합니다.",
    category: "투자",
  },
  {
    id: "globalIssues",
    name: "글로벌 이슈",
    defaultVisible: true,
    description: "글로벌 금융 시장에 영향을 미치는 주요 이슈를 제공합니다.",
    category: "뉴스",
  },
  {
    id: "marketCalendar",
    name: "증시 이슈 캘린더",
    defaultVisible: true,
    description: "주요 경제 지표 발표, 실적 발표 등 증시 관련 일정을 제공합니다.",
    category: "금융",
  },
  {
    id: "oilPrice",
    name: "유가",
    defaultVisible: true,
    description: "국제 유가 정보와 변동률을 제공합니다.",
    category: "원자재",
  },
  {
    id: "goldPrice",
    name: "금 시세",
    defaultVisible: true,
    description: "금 시세 정보와 변동률을 제공합니다.",
    category: "원자재",
  },
  {
    id: "exchangeRates",
    name: "환율",
    defaultVisible: true,
    description: "주요 통화의 환율 정보를 제공합니다.",
    category: "금융",
  },
]

// 위젯 카테고리
const widgetCategories = ["전체", "금융", "투자", "원자재", "트렌드", "뉴스"]

export default function WidgetTypesDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Info className="h-4 w-4" />
          <span>위젯 종류 보기</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>위젯 종류</DialogTitle>
          <DialogDescription>Devooup Hub에서 제공하는 다양한 위젯을 확인해보세요.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="전체" className="mt-4">
          <TabsList className="mb-4">
            {widgetCategories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          {widgetCategories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {widgetDefinitions
                  .filter((widget) => category === "전체" || widget.category === category)
                  .map((widget) => (
                    <Card key={widget.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{widget.name}</CardTitle>
                        <CardDescription className="text-xs">{widget.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{widget.description}</p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
