import Link from "next/link"
import { ArrowLeft, TrendingUp, TrendingDown, Clock, Share2, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import GoogleAdBanner from "@/components/ads/GoogleAdBanner"

// Mock data for global issues
const getGlobalIssueDetails = (id: string) => {
  const issues = {
    "1": {
      id: "1",
      title: "미 연준, 기준금리 동결 결정",
      summary:
        "미국 연방준비제도이사회(Fed)가 기준금리를 현 수준에서 동결하기로 결정했습니다. 인플레이션 우려는 여전하나 경기 침체 가능성을 고려한 결정으로 보입니다.",
      content:
        "미국 연방준비제도이사회(Fed)는 최근 열린 연방공개시장위원회(FOMC)에서 기준금리를 5.25~5.50% 수준에서 동결하기로 결정했습니다. 이는 시장의 예상과 일치하는 결정으로, 인플레이션이 여전히 목표치인 2%를 상회하고 있으나 경기 침체 가능성을 고려한 것으로 분석됩니다. 제롬 파월 연준 의장은 기자회견에서 '인플레이션이 목표치로 안정적으로 하락하고 있다는 더 많은 증거가 필요하다'고 언급하며, 향후 금리 결정은 경제 데이터에 따라 신중하게 이루어질 것임을 시사했습니다.\n\n최근 미국의 경제 지표는 혼조세를 보이고 있습니다. 노동 시장은 여전히 견조한 모습을 보이고 있으나, 제조업 및 서비스업 PMI는 둔화 조짐을 보이고 있습니다. 특히 주택 시장은 높은 모기지 금리로 인해 침체가 지속되고 있으며, 소비자 지출도 둔화되는 모습을 보이고 있습니다.\n\n시장 전문가들은 연준이 올해 하반기에 금리 인하를 시작할 가능성이 높다고 전망하고 있습니다. 골드만삭스는 9월과 12월에 각각 0.25%포인트씩 금리 인하가 이루어질 것으로 예상하고 있으며, JP모건은 연내 총 0.75%포인트의 금리 인하가 있을 것으로 전망하고 있습니다.\n\n금리 동결 결정 이후 미국 주식 시장은 상승세를 보였으며, 특히 금융주와 기술주가 강세를 보였습니다. 채권 시장에서는 10년물 국채 금리가 소폭 하락했으며, 달러 지수는 약세를 보였습니다. 금 가격은 상승세를 보이며 온스당 2,300달러를 돌파했습니다.",
      impact: "positive",
      region: "us",
      timestamp: "2023-05-15 04:30:00",
      readingTime: 4,
      relatedStocks: [
        { ticker: "JPM", name: "JP모건", price: 153.21, change: 1.87, changePercent: 1.24 },
        { ticker: "GS", name: "골드만삭스", price: 342.56, change: 2.34, changePercent: 0.69 },
        { ticker: "BAC", name: "뱅크오브아메리카", price: 37.82, change: 0.95, changePercent: 2.58 },
      ],
      marketImpact: {
        stocks: "금융주와 기술주 중심으로 상승세",
        bonds: "10년물 국채 금리 소폭 하락",
        forex: "달러 지수 약세",
        commodities: "금 가격 상승",
      },
      expertOpinions: [
        {
          name: "제인 스미스",
          organization: "골드만삭스",
          opinion:
            "연준의 금리 동결은 예상된 결정이었으며, 9월과 12월에 각각 0.25%포인트씩 금리 인하가 이루어질 것으로 예상합니다.",
        },
        {
          name: "마이클 존슨",
          organization: "JP모건",
          opinion: "인플레이션이 목표치에 근접함에 따라 연내 총 0.75%포인트의 금리 인하가 있을 것으로 전망합니다.",
        },
      ],
    },
    "2": {
      id: "2",
      title: "중국, 부동산 시장 부양책 발표",
      summary:
        "중국 정부가 침체된 부동산 시장을 활성화하기 위한 새로운 부양책을 발표했습니다. 주택 구매 제한 완화와 모기지 금리 인하 등의 내용을 담고 있습니다.",
      content:
        "중국 정부는 최근 침체된 부동산 시장을 활성화하기 위한 종합적인 부양책을 발표했습니다. 이번 대책에는 주요 도시의 주택 구매 제한 완화, 모기지 금리 인하, 부동산 개발업체에 대한 금융 지원 확대 등의 내용이 포함되어 있습니다. 특히 1선 도시에서 시행 중이던 '구매 제한' 정책을 일부 완화하고, 모기지 금리를 역대 최저 수준으로 인하하는 조치가 주목받고 있습니다. 중국 국가발전개혁위원회는 '부동산 시장의 안정적인 발전이 중국 경제 회복에 중요한 역할을 한다'며 이번 조치의 중요성을 강조했습니다.\n\n중국의 부동산 시장은 지난 2년간 심각한 침체를 겪어왔습니다. 주요 개발업체들의 디폴트와 주택 가격 하락으로 소비자 신뢰가 크게 훼손되었으며, 이는 중국 경제 전반에 부정적인 영향을 미쳤습니다. 부동산 부문은 중국 GDP의 약 25%를 차지하는 핵심 산업으로, 그 중요성이 매우 큽니다.\n\n이번 부양책은 단기적으로 부동산 시장 안정화에 기여할 것으로 예상되나, 장기적인 효과에 대해서는 전문가들 사이에서 의견이 엇갈리고 있습니다. 일부 전문가들은 구조적인 문제가 해결되지 않는 한 지속적인 회복은 어려울 것이라고 지적하고 있습니다.\n\n부양책 발표 이후 중국 주식 시장은 강한 상승세를 보였으며, 특히 부동산 관련 주식들이 큰 폭으로 상승했습니다. 알리바바, JD닷컴 등 소비 관련 주식들도 상승세를 보였으며, 이는 부동산 시장 안정화가 소비 심리 개선으로 이어질 것이라는 기대를 반영한 것으로 분석됩니다.",
      impact: "positive",
      region: "asia",
      timestamp: "2023-05-15 02:15:00",
      readingTime: 5,
      relatedStocks: [
        { ticker: "BABA", name: "알리바바", price: 87.45, change: 3.21, changePercent: 3.81 },
        { ticker: "JD", name: "JD닷컴", price: 28.76, change: 1.45, changePercent: 5.31 },
        { ticker: "PDD", name: "핀두오두오", price: 142.87, change: 5.67, changePercent: 4.13 },
      ],
      marketImpact: {
        stocks: "부동산 및 소비 관련 주식 강세",
        bonds: "중국 국채 금리 상승",
        forex: "위안화 소폭 강세",
        commodities: "구리 등 산업용 금속 가격 상승",
      },
      expertOpinions: [
        {
          name: "리 웨이",
          organization: "중국 인민대학",
          opinion: "이번 부양책은 단기적으로 시장 안정화에 기여할 것이나, 장기적인 구조 개혁이 필요합니다.",
        },
        {
          name: "사라 장",
          organization: "모건스탠리",
          opinion:
            "부동산 시장 안정화는 중국 소비 심리 개선으로 이어져 전반적인 경제 회복에 긍정적 영향을 미칠 것입니다.",
        },
      ],
    },
  }

  return issues[id as keyof typeof issues] || issues["1"]
}

export default function GlobalIssueDetailPage({ params }: { params: { id: string } }) {
  const issue = getGlobalIssueDetails(params.id)

  return (
    <div className="py-6">
      <Link href="/finance/global-issues">
        <Button variant="ghost" className="mb-4 pl-0">
          <ArrowLeft className="h-4 w-4 mr-2" />
          글로벌 이슈 목록으로
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="section-card mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={issue.impact === "positive" ? "default" : "destructive"}>
                {issue.impact === "positive" ? (
                  <>
                    <TrendingUp className="h-3 w-3 mr-1" /> 긍정적
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-3 w-3 mr-1" /> 부정적
                  </>
                )}
              </Badge>
              <Badge variant="outline">
                {issue.region === "us" ? "미국" : issue.region === "asia" ? "아시아" : "유럽"}
              </Badge>
              <div className="text-xs text-gray-500 flex items-center ml-auto">
                <Clock className="h-3 w-3 mr-1" />
                <span>읽는 시간: {issue.readingTime}분</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4">{issue.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{issue.summary}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Bookmark className="h-4 w-4" />
                <span>저장</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                <span>공유</span>
              </Button>
            </div>

            <div className="prose max-w-none mb-6">
              {issue.content.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Ad banner in the middle of content */}
            <div className="my-6 flex justify-center">
              <GoogleAdBanner format="rectangle" />
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">시장 영향</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">주식 시장</h3>
                  <p className="text-sm">{issue.marketImpact.stocks}</p>
                </div>
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">채권 시장</h3>
                  <p className="text-sm">{issue.marketImpact.bonds}</p>
                </div>
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">외환 시장</h3>
                  <p className="text-sm">{issue.marketImpact.forex}</p>
                </div>
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">원자재 시장</h3>
                  <p className="text-sm">{issue.marketImpact.commodities}</p>
                </div>
              </div>

              <h2 className="text-xl font-bold mb-4">전문가 의견</h2>
              <div className="space-y-4 mb-6">
                {issue.expertOpinions.map((expert, index) => (
                  <div key={index} className="border-l-4 border-gray-300 pl-4 py-2">
                    <p className="text-sm italic">"{expert.opinion}"</p>
                    <p className="text-xs text-gray-500 mt-1">
                      - {expert.name}, {expert.organization}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="section-card mb-6">
            <h2 className="text-xl font-semibold mb-4">관련 종목</h2>
            <div className="space-y-4">
              {issue.relatedStocks.map((stock) => (
                <div key={stock.ticker} className="border-b pb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold">{stock.ticker}</div>
                      <div className="text-sm text-gray-500">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${stock.price.toFixed(2)}</div>
                      <div className={`text-xs ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {stock.change >= 0 ? "+" : ""}
                        {stock.change.toFixed(2)} ({stock.change >= 0 ? "+" : ""}
                        {stock.changePercent.toFixed(2)}%)
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar ad */}
          <div className="mb-6">
            <GoogleAdBanner format="rectangle" />
          </div>

          <div className="section-card">
            <h2 className="text-xl font-semibold mb-4">관련 이슈</h2>
            <div className="space-y-3">
              <Link href="/finance/global-issues/3" className="block hover:bg-gray-50 p-2 rounded -mx-2">
                <div className="font-medium">유럽 에너지 위기 심화, 천연가스 가격 급등</div>
                <div className="text-xs text-gray-500 mt-1">읽는 시간: 6분</div>
              </Link>
              <Link href="/finance/global-issues/4" className="block hover:bg-gray-50 p-2 rounded -mx-2">
                <div className="font-medium">애플, 신규 AI 기반 서비스 발표 예정</div>
                <div className="text-xs text-gray-500 mt-1">읽는 시간: 4분</div>
              </Link>
              <Link href="/finance/global-issues/5" className="block hover:bg-gray-50 p-2 rounded -mx-2">
                <div className="font-medium">일본 GDP, 예상보다 낮은 성장률 기록</div>
                <div className="text-xs text-gray-500 mt-1">읽는 시간: 5분</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
