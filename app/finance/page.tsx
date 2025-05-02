"use client";
import StockMarketWidget from "@/components/widgets/StockMarketWidget";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import GlobalIssuesWidget from "@/components/widgets/GlobalIssuesWidget";
import MarketCalendarWidget from "@/components/widgets/MarketCalendarWidget";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useStockMarkets, useGlobalIssues, useMarketEvents } from "@/hooks/use-market-data";

export default function FinancePage() {
  const { data: stockMarkets, isLoading: isStockMarketsLoading } = useStockMarkets();
  const { data: globalIssues, isLoading: isGlobalIssuesLoading } = useGlobalIssues();
  const { data: marketEvents, isLoading: isMarketEventsLoading } = useMarketEvents();

  const isLoading = isStockMarketsLoading || isGlobalIssuesLoading || isMarketEventsLoading;

  if (isLoading) {
    return (
      <div className="py-6">
        <h1 className="text-2xl font-bold mb-6">금융 정보</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-6">금융 정보</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <GlobalIssuesWidget data={globalIssues || []} />

        <div className="section-card">
          <CardHeader className="px-0 pt-0">
            <CardTitle>시장 동향 분석</CardTitle>
            <CardDescription>최신 금융 시장 동향 및 전망</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0 space-y-4">
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <Link href={`/finance/analysis/${i}`} key={i} className="block hover:bg-gray-50 p-2 rounded-md -mx-2">
                  <h3 className="font-medium text-sm">
                    {i === 1 && "미국 금리 동결이 한국 증시에 미치는 영향"}
                    {i === 2 && "하반기 원자재 시장 전망: 금과 원유를 중심으로"}
                    {i === 3 && "테크 기업 실적 발표와 주가 전망"}
                  </h3>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <span>2023-05-{15 + i}</span>
                    <span className="mx-1">•</span>
                    <span>읽는 시간: {4 + i}분</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-right">
              <Link href="/finance/analysis" className="text-sm text-primary flex items-center justify-end">
                더 많은 분석 보기 <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
          </CardContent>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StockMarketWidget data={stockMarkets || []} />
        <MarketCalendarWidget data={marketEvents || []} />
        <Card>
          <CardHeader>
            <CardTitle>투자 팁</CardTitle>
            <CardDescription>투자 초보자를 위한 팁</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• 투자는 장기적인 관점에서 접근하세요.</li>
              <li>• 분산 투자로 리스크를 관리하세요.</li>
              <li>• 투자 전 충분한 비상금을 확보하세요.</li>
              <li>• 투자 금액은 감당할 수 있는 범위 내에서 결정하세요.</li>
              <li>• 정기적으로 포트폴리오를 리밸런싱하세요.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>금융 용어 사전</CardTitle>
            <CardDescription>알아두면 유용한 금융 용어</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="font-medium">PER (주가수익비율)</dt>
                <dd className="text-gray-500">주가를 주당순이익으로 나눈 값으로, 기업의 수익 대비 주가 수준을 평가하는 지표</dd>
              </div>
              <div>
                <dt className="font-medium">ROE (자기자본이익률)</dt>
                <dd className="text-gray-500">기업의 자기자본 대비 순이익 비율로, 자본 효율성을 측정하는 지표</dd>
              </div>
              <div>
                <dt className="font-medium">배당수익률</dt>
                <dd className="text-gray-500">주가 대비 배당금 비율로, 투자자에게 돌아가는 현금 수익률</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>경제 뉴스</CardTitle>
            <CardDescription>최신 경제 소식</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div>
                <h3 className="font-medium">한국은행, 기준금리 동결 결정</h3>
                <p className="text-gray-500">한국은행 금융통화위원회가 기준금리를 현 수준에서 동결하기로 결정했습니다.</p>
                <div className="text-xs text-gray-400 mt-1">읽는 시간: 2분</div>
              </div>
              <div>
                <h3 className="font-medium">미 연준, 인플레이션 대응 강화 시사</h3>
                <p className="text-gray-500">미 연방준비제도가 인플레이션 억제를 위한 정책 강화 의지를 표명했습니다.</p>
                <div className="text-xs text-gray-400 mt-1">읽는 시간: 3분</div>
              </div>
              <div>
                <h3 className="font-medium">국내 주택시장, 거래량 소폭 증가</h3>
                <p className="text-gray-500">최근 국내 주택시장에서 거래량이 소폭 증가하며 회복 조짐을 보이고 있습니다.</p>
                <div className="text-xs text-gray-400 mt-1">읽는 시간: 4분</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
