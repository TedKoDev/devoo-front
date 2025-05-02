import React from "react"
import Link from "next/link"
import { Clock, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import GoogleAdBanner from "@/components/ads/GoogleAdBanner"

// Mock data for hot issues
const mockHotIssues = [
  {
    id: "1",
    title: "2023년 하반기 투자 전략: 전문가들의 조언",
    summary:
      "2023년 하반기 투자 전략에 대한 전문가들의 조언을 모았습니다. 금리, 인플레이션, 경기 침체 우려 등 다양한 변수 속에서 효과적인 투자 방법을 알아봅니다.",
    category: "투자",
    date: "2023-05-18",
    thumbnail: "/placeholder.svg?height=300&width=500",
    readingTime: 7,
    views: 1245,
    tags: ["투자전략", "주식", "채권", "부동산"],
  },
  {
    id: "2",
    title: "부업으로 월 200만원 버는 현실적인 방법",
    summary:
      "본업 외에 부업으로 월 200만원의 추가 수입을 올리는 현실적인 방법을 소개합니다. 시간 투자 대비 효율적인 부업 아이디어와 성공 사례를 분석합니다.",
    category: "부업",
    date: "2023-05-17",
    thumbnail: "/placeholder.svg?height=300&width=500",
    readingTime: 6,
    views: 2356,
    tags: ["부업", "프리랜서", "온라인수익", "부수입"],
  },
  {
    id: "3",
    title: "개발자 취업 시장 동향: 가장 인기 있는 기술 스택",
    summary:
      "2023년 개발자 취업 시장의 최신 동향과 가장 인기 있는 기술 스택을 분석합니다. 취업과 이직을 준비하는 개발자들을 위한 유용한 정보를 제공합니다.",
    category: "개발",
    date: "2023-05-16",
    thumbnail: "/placeholder.svg?height=300&width=500",
    readingTime: 8,
    views: 1876,
    tags: ["개발자", "취업", "기술스택", "IT트렌드"],
  },
  {
    id: "4",
    title: "주식 투자 초보자가 꼭 알아야 할 5가지 원칙",
    summary:
      "주식 투자를 시작하는 초보자들이 반드시 알아야 할 5가지 핵심 원칙을 소개합니다. 실패 확률을 줄이고 장기적인 성공을 위한 투자 마인드셋을 설명합니다.",
    category: "투자",
    date: "2023-05-15",
    thumbnail: "/placeholder.svg?height=300&width=500",
    readingTime: 5,
    views: 3421,
    tags: ["주식투자", "투자원칙", "재테크", "초보투자자"],
  },
  {
    id: "5",
    title: "AI 시대의 직업 변화: 사라지는 직업과 뜨는 직업",
    summary:
      "인공지능의 발전으로 인한 직업 시장의 변화를 분석합니다. 향후 10년간 사라질 위험이 높은 직업과 새롭게 부상할 직업을 예측합니다.",
    category: "커리어",
    date: "2023-05-14",
    thumbnail: "/placeholder.svg?height=300&width=500",
    readingTime: 9,
    views: 2789,
    tags: ["AI", "직업전망", "미래직업", "커리어"],
  },
  {
    id: "6",
    title: "효율적인 재택근무를 위한 홈 오피스 셋업 가이드",
    summary:
      "재택근무의 생산성을 높이기 위한 최적의 홈 오피스 셋업 방법을 소개합니다. 공간 활용, 장비 선택, 업무 환경 조성에 관한 실용적인 팁을 제공합니다.",
    category: "라이프스타일",
    date: "2023-05-13",
    thumbnail: "/placeholder.svg?height=300&width=500",
    readingTime: 6,
    views: 1543,
    tags: ["재택근무", "홈오피스", "업무환경", "생산성"],
  },
  {
    id: "7",
    title: "디지털 노마드 생활 1년 체험기: 장단점과 현실적 조언",
    summary:
      "1년간의 디지털 노마드 생활을 경험한 필자가 전하는 솔직한 후기와 조언. 환상과 현실의 차이, 준비해야 할 것들, 효과적인 원격 근무 방법을 공유합니다.",
    category: "라이프스타일",
    date: "2023-05-12",
    thumbnail: "/placeholder.svg?height=300&width=500",
    readingTime: 10,
    views: 1987,
    tags: ["디지털노마드", "원격근무", "해외생활", "프리랜서"],
  },
  {
    id: "8",
    title: "소액으로 시작하는 해외 ETF 투자 전략",
    summary:
      "적은 금액으로도 시작할 수 있는 해외 ETF 투자 방법을 소개합니다. 분산 투자, 정기 적립식 투자, 세금 최적화 등 효과적인 전략을 알아봅니다.",
    category: "투자",
    date: "2023-05-11",
    thumbnail: "/placeholder.svg?height=300&width=500",
    readingTime: 7,
    views: 2134,
    tags: ["ETF", "해외투자", "소액투자", "분산투자"],
  },
]

export default function HotIssuesPage() {
  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-6">유익한 정보 & 핫이슈</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button variant="default" size="sm">
          전체
        </Button>
        <Button variant="outline" size="sm">
          투자
        </Button>
        <Button variant="outline" size="sm">
          부업
        </Button>
        <Button variant="outline" size="sm">
          개발
        </Button>
        <Button variant="outline" size="sm">
          커리어
        </Button>
        <Button variant="outline" size="sm">
          라이프스타일
        </Button>
        <Button variant="outline" size="sm" className="ml-auto">
          <Filter className="h-4 w-4 mr-2" />
          필터
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockHotIssues.map((issue, index) => (
          <React.Fragment key={issue.id}>
            {index === 3 && (
              <div className="md:col-span-2 lg:col-span-3 my-2">
                <GoogleAdBanner format="horizontal" className="hidden md:block" />
                <GoogleAdBanner format="rectangle" className="md:hidden" />
              </div>
            )}
            <div className="section-card overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src={issue.thumbnail || "/placeholder.svg"}
                  alt={issue.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge>{issue.category}</Badge>
                  <div className="text-xs text-gray-500 flex items-center ml-auto">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>읽는 시간: {issue.readingTime}분</span>
                  </div>
                </div>
                <Link href={`/hot-issues/${issue.id}`}>
                  <h2 className="text-xl font-bold mb-2 hover:text-primary">{issue.title}</h2>
                </Link>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{issue.summary}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {issue.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{issue.date}</span>
                  <span>조회 {issue.views}</span>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button>더 많은 이슈 보기</Button>
      </div>
    </div>
  )
}
