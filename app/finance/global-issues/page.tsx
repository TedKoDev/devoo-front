import React from "react"
import Link from "next/link"
import { TrendingUp, TrendingDown, Clock, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import GoogleAdBanner from "@/components/ads/GoogleAdBanner"

// Mock data for global issues
const mockGlobalIssues = [
  {
    id: "1",
    title: "미 연준, 기준금리 동결 결정",
    summary:
      "미국 연방준비제도이사회(Fed)가 기준금리를 현 수준에서 동결하기로 결정했습니다. 인플레이션 우려는 여전하나 경기 침체 가능성을 고려한 결정으로 보입니다.",
    content:
      "미국 연방준비제도이사회(Fed)는 최근 열린 연방공개시장위원회(FOMC)에서 기준금리를 5.25~5.50% 수준에서 동결하기로 결정했습니다. 이는 시장의 예상과 일치하는 결정으로, 인플레이션이 여전히 목표치인 2%를 상회하고 있으나 경기 침체 가능성을 고려한 것으로 분석됩니다. 제롬 파월 연준 의장은 기자회견에서 '인플레이션이 목표치로 안정적으로 하락하고 있다는 더 많은 증거가 필요하다'고 언급하며, 향후 금리 결정은 경제 데이터에 따라 신중하게 이루어질 것임을 시사했습니다.",
    impact: "positive",
    region: "us",
    timestamp: "2023-05-15 04:30:00",
    readingTime: 4,
    relatedStocks: ["JPM", "GS", "BAC"],
  },
  {
    id: "2",
    title: "중국, 부동산 시장 부양책 발표",
    summary:
      "중국 정부가 침체된 부동산 시장을 활성화하기 위한 새로운 부양책을 발표했습니다. 주택 구매 제한 완화와 모기지 금리 인하 등의 내용을 담고 있습니다.",
    content:
      "중국 정부는 최근 침체된 부동산 시장을 활성화하기 위한 종합적인 부양책을 발표했습니다. 이번 대책에는 주요 도시의 주택 구매 제한 완화, 모기지 금리 인하, 부동산 개발업체에 대한 금융 지원 확대 등의 내용이 포함되어 있습니다. 특히 1선 도시에서 시행 중이던 '구매 제한' 정책을 일부 완화하고, 모기지 금리를 역대 최저 수준으로 인하하는 조치가 주목받고 있습니다. 중국 국가발전개혁위원회는 '부동산 시장의 안정적인 발전이 중국 경제 회복에 중요한 역할을 한다'며 이번 조치의 중요성을 강조했습니다.",
    impact: "positive",
    region: "asia",
    timestamp: "2023-05-15 02:15:00",
    readingTime: 5,
    relatedStocks: ["BABA", "JD", "PDD"],
  },
  {
    id: "3",
    title: "유럽 에너지 위기 심화, 천연가스 가격 급등",
    summary:
      "러시아의 가스 공급 중단으로 유럽의 에너지 위기가 심화되고 있습니다. 천연가스 가격이 전주 대비 15% 상승했으며, 이는 유럽 경제에 부담으로 작용할 전망입니다.",
    content:
      "러시아의 천연가스 공급 중단이 장기화되면서 유럽의 에너지 위기가 심화되고 있습니다. 네덜란드 TTF 천연가스 선물 가격은 전주 대비 15% 상승하며 MWh당 45유로를 기록했습니다. 이는 지난 3개월 내 최고치로, 겨울철 난방 수요 증가를 앞두고 우려가 커지고 있습니다. 유럽연합(EU)은 에너지 소비 절감 캠페인을 강화하고 대체 공급원 확보에 나서고 있으나, 단기간 내 러시아산 가스를 완전히 대체하기는 어려운 상황입니다. 에너지 가격 상승은 유럽 전역의 제조업체들의 생산 비용을 증가시키고, 소비자 물가 상승으로 이어져 경기 침체 우려를 가중시키고 있습니다.",
    impact: "negative",
    region: "europe",
    timestamp: "2023-05-15 01:45:00",
    readingTime: 6,
    relatedStocks: ["BP", "SHEL", "EQNR"],
  },
  {
    id: "4",
    title: "애플, 신규 AI 기반 서비스 발표 예정",
    summary:
      "애플이 다음 주 개최되는 WWDC에서 생성형 AI 기반의 새로운 서비스를 발표할 예정이라고 블룸버그가 보도했습니다. 이는 애플의 AI 전략에 중요한 전환점이 될 것으로 예상됩니다.",
    content:
      "블룸버그는 애플이 다음 주 개최되는 세계개발자회의(WWDC)에서 생성형 AI 기반의 새로운 서비스를 발표할 예정이라고 보도했습니다. 익명의 소식통에 따르면, 애플은 iOS 18에 통합된 AI 기능을 선보일 계획이며, 이는 Siri의 대대적인 업그레이드와 함께 메시지, 메일, 사진 앱 등에 AI 기능을 추가하는 내용을 포함할 것으로 알려졌습니다. 특히 애플은 자체 개발한 AI 모델을 기반으로 하되, OpenAI 및 Anthropic과 같은 외부 AI 기업들과의 협력도 모색 중인 것으로 전해졌습니다. 이번 발표는 애플이 Microsoft, Google 등 경쟁사들의 AI 행보에 대응하는 중요한 전략적 움직임으로 해석되고 있습니다.",
    impact: "positive",
    region: "us",
    timestamp: "2023-05-14 23:20:00",
    readingTime: 4,
    relatedStocks: ["AAPL", "MSFT", "GOOGL"],
  },
  {
    id: "5",
    title: "일본 GDP, 예상보다 낮은 성장률 기록",
    summary:
      "일본의 1분기 GDP가 시장 예상치를 하회하는 0.4% 성장에 그쳤습니다. 엔화 약세에도 불구하고 내수 부진이 성장을 제한한 것으로 분석됩니다.",
    content:
      "일본 내각부가 발표한 1분기 국내총생산(GDP) 성장률이 시장 예상치인 0.6%를 하회하는 0.4%(연율 1.6%)에 그쳤습니다. 엔화 약세로 인한 수출 증가에도 불구하고, 지속적인 물가 상승으로 인한 소비 위축이 성장을 제한한 것으로 분석됩니다. 특히 개인소비는 전분기 대비 0.2% 감소했으며, 이는 2022년 3분기 이후 처음으로 나타난 감소세입니다. 일본 정부는 경기 부양을 위한 추가 대책을 검토 중이나, 재정 건전성 우려로 인해 대규모 부양책 시행에는 신중한 입장을 보이고 있습니다. 일본은행(BOJ)은 현재의 초저금리 정책을 유지하고 있으나, 인플레이션 지속 시 정책 변화 가능성도 제기되고 있습니다.",
    impact: "negative",
    region: "asia",
    timestamp: "2023-05-14 22:30:00",
    readingTime: 5,
    relatedStocks: ["SONY", "TM", "HMC"],
  },
  {
    id: "6",
    title: "테슬라, 중국 시장에서 점유율 하락세",
    summary:
      "테슬라의 중국 전기차 시장 점유율이 지난 분기 대비 3% 하락했습니다. BYD 등 현지 업체들의 공격적인 가격 정책과 신모델 출시가 주요 원인으로 분석됩니다.",
    content:
      "테슬라의 중국 전기차 시장 점유율이 지난 분기 대비 3% 하락한 8%를 기록했습니다. 중국 자동차공업협회(CAAM)의 데이터에 따르면, BYD, 리오토, 샤오펑 등 현지 전기차 업체들의 시장 점유율은 같은 기간 증가세를 보였습니다. 특히 BYD는 공격적인 가격 정책과 다양한 신모델 출시로 시장 점유율을 15%까지 확대했습니다. 테슬라는 이에 대응해 Model 3와 Model Y의 가격을 추가로 인하했으나, 중국 소비자들의 현지 브랜드 선호 현상이 강화되면서 효과는 제한적인 것으로 나타났습니다. 전문가들은 테슬라가 중국 시장에서 경쟁력을 유지하기 위해서는 현지 소비자 취향에 맞는 신모델 출시가 필요하다고 지적하고 있습니다.",
    impact: "negative",
    region: "asia",
    timestamp: "2023-05-14 20:15:00",
    readingTime: 4,
    relatedStocks: ["TSLA", "NIO", "LI"],
  },
  {
    id: "7",
    title: "영국 인플레이션, 2년 만에 최저치 기록",
    summary:
      "영국의 4월 소비자물가지수(CPI)가 전년 동월 대비 3.2% 상승하며 2년 만에 최저치를 기록했습니다. 에너지 가격 하락이 주요 요인으로 작용했습니다.",
    content:
      "영국 통계청(ONS)이 발표한 4월 소비자물가지수(CPI)는 전년 동월 대비 3.2% 상승하며 2022년 3월 이후 최저치를 기록했습니다. 이는 시장 예상치인 3.1%보다 소폭 높은 수준이나, 전월의 3.8%에서 크게 하락한 수치입니다. 에너지 가격 하락이 인플레이션 둔화의 주요 요인으로 작용했으며, 식품 물가 상승률도 둔화세를 보였습니다. 영국 중앙은행(BOE)은 이번 데이터를 바탕으로 6월 통화정책회의에서 금리 인하를 검토할 가능성이 높아졌습니다. 다만 서비스 물가는 여전히 5.9%의 높은 상승률을 유지하고 있어, 인플레이션의 완전한 안정화까지는 시간이 더 필요할 것으로 전망됩니다.",
    impact: "positive",
    region: "europe",
    timestamp: "2023-05-14 18:45:00",
    readingTime: 5,
    relatedStocks: ["BP", "HSBC", "BARC"],
  },
  {
    id: "8",
    title: "아마존, 클라우드 사업 확장 위한 대규모 투자 계획 발표",
    summary:
      "아마존이 AWS 클라우드 사업 확장을 위해 향후 5년간 500억 달러 규모의 투자 계획을 발표했습니다. AI 인프라 구축에 중점을 둘 예정입니다.",
    content:
      "아마존이 자사의 클라우드 서비스인 AWS(Amazon Web Services) 사업 확장을 위해 향후 5년간 500억 달러 규모의 투자 계획을 발표했습니다. 이번 투자는 전 세계 데이터 센터 확충과 AI 인프라 구축에 중점을 둘 예정이며, 특히 생성형 AI 서비스 수요 증가에 대응하기 위한 GPU 인프라 확대가 핵심입니다. 아마존은 이번 투자를 통해 미국, 유럽, 아시아 등 주요 지역에 새로운 데이터 센터를 건설하고, 기존 시설을 업그레이드할 계획입니다. 앤디 재시 아마존 CEO는 '클라우드와 AI는 기업의 디지털 혁신을 가속화하는 핵심 기술'이라며 '이번 투자로 AWS의 글로벌 리더십을 더욱 강화할 것'이라고 밝혔습니다.",
    impact: "positive",
    region: "us",
    timestamp: "2023-05-14 16:30:00",
    readingTime: 4,
    relatedStocks: ["AMZN", "MSFT", "GOOGL"],
  },
]

export default function GlobalIssuesPage() {
  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-6">글로벌 이슈</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button variant="default" size="sm">
          전체
        </Button>
        <Button variant="outline" size="sm">
          미국
        </Button>
        <Button variant="outline" size="sm">
          아시아
        </Button>
        <Button variant="outline" size="sm">
          유럽
        </Button>
        <Button variant="outline" size="sm" className="ml-auto">
          <Filter className="h-4 w-4 mr-2" />
          필터
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockGlobalIssues.map((issue, index) => (
          <React.Fragment key={issue.id}>
            {index === 2 && (
              <div className="md:col-span-2 my-2">
                <GoogleAdBanner format="horizontal" className="hidden md:block" />
                <GoogleAdBanner format="rectangle" className="md:hidden" />
              </div>
            )}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`mt-1 p-2 rounded-full ${
                      issue.impact === "positive"
                        ? "bg-green-100 text-green-600"
                        : issue.impact === "negative"
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {issue.impact === "positive" ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : issue.impact === "negative" ? (
                      <TrendingDown className="h-4 w-4" />
                    ) : (
                      <Clock className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <Link href={`/finance/global-issues/${issue.id}`}>
                      <h2 className="text-lg font-bold hover:text-primary">{issue.title}</h2>
                    </Link>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <span>{issue.timestamp}</span>
                      <span className="mx-1">•</span>
                      <span>{issue.region === "us" ? "미국" : issue.region === "asia" ? "아시아" : "유럽"}</span>
                      <span className="mx-1">•</span>
                      <span>읽는 시간: {issue.readingTime}분</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{issue.summary}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">관련 종목:</Badge>
                  {issue.relatedStocks.map((stock) => (
                    <Badge key={stock} variant="secondary">
                      {stock}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
