import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

// Mock side hustles data
const mockSideHustles = [
  {
    id: "1",
    title: "프리랜서 웹 개발",
    category: "개발",
    incomeRange: "월 200~500만원",
    description: "React, Next.js 등을 활용한 웹 개발 프리랜서 일자리",
    longDescription:
      "웹 개발 기술을 활용하여 기업이나 개인 고객의 웹사이트나 웹 애플리케이션을 개발하는 프리랜서 일자리입니다. React, Next.js, Vue.js 등의 프레임워크를 활용한 프론트엔드 개발과 Node.js, Django, Laravel 등을 활용한 백엔드 개발 모두 수요가 많습니다.",
    difficulty: "중간",
    timeRequired: "주 10~40시간",
    skills: ["HTML/CSS", "JavaScript", "React", "Next.js", "Node.js"],
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "주식 투자",
    category: "투자",
    incomeRange: "변동적",
    description: "장기 투자를 통한 자산 증식 방법",
    longDescription:
      "주식 시장에 투자하여 기업의 성장과 배당을 통해 수익을 얻는 방법입니다. 장기적인 관점에서 안정적인 기업에 투자하는 가치 투자 방식이 초보자에게 추천됩니다. 투자 전 충분한 학습과 분석이 필요하며, 분산 투자를 통해 리스크를 관리하는 것이 중요합니다.",
    difficulty: "중간",
    timeRequired: "주 1~10시간",
    skills: ["재무제표 분석", "산업 분석", "위험 관리"],
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "유튜브 채널 운영",
    category: "콘텐츠",
    incomeRange: "월 0~1000만원",
    description: "개발, 투자 관련 지식 공유 채널 운영하기",
    longDescription:
      "개발, 투자 등 전문 지식을 유튜브 채널을 통해 공유하며 광고 수익, 후원, 제품 홍보 등으로 수익을 창출하는 방법입니다. 초기에는 수익이 적지만, 구독자가 늘어나면 수익도 함께 증가합니다. 꾸준한 콘텐츠 제작과 채널 운영이 필요합니다.",
    difficulty: "높음",
    timeRequired: "주 10~20시간",
    skills: ["영상 편집", "스피킹", "콘텐츠 기획", "마케팅"],
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    title: "온라인 강의 제작",
    category: "교육",
    incomeRange: "월 100~300만원",
    description: "프로그래밍 강의 제작 및 판매",
    longDescription:
      "프로그래밍, 디자인, 마케팅 등 전문 지식을 온라인 강의로 제작하여 판매하는 방법입니다. Udemy, Inflearn 등의 플랫폼을 활용하거나 개인 웹사이트를 통해 판매할 수 있습니다. 한 번 제작한 강의는 지속적인 수익을 창출할 수 있는 장점이 있습니다.",
    difficulty: "중간",
    timeRequired: "초기 제작 100~200시간, 유지보수 월 5~10시간",
    skills: ["전문 지식", "강의 설계", "영상 제작", "마케팅"],
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "5",
    title: "블로그 수익화",
    category: "콘텐츠",
    incomeRange: "월 50~500만원",
    description: "전문 블로그 운영 및 광고 수익 창출",
    longDescription:
      "특정 분야에 대한 전문 블로그를 운영하며 Google AdSense, 제휴 마케팅, 스폰서십 등을 통해 수익을 창출하는 방법입니다. SEO 최적화를 통해 검색 엔진에서 상위 노출되도록 하는 것이 중요합니다. 꾸준한 콘텐츠 생산과 마케팅이 필요합니다.",
    difficulty: "중간",
    timeRequired: "주 10~20시간",
    skills: ["글쓰기", "SEO", "마케팅", "콘텐츠 기획"],
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "6",
    title: "앱 개발 및 출시",
    category: "개발",
    incomeRange: "변동적",
    description: "모바일 앱 개발 및 앱스토어 출시",
    longDescription:
      "모바일 앱을 개발하여 App Store나 Google Play에 출시하고 인앱 결제, 광고, 구독 등을 통해 수익을 창출하는 방법입니다. 유용한 기능을 제공하는 앱이나 게임 등이 인기를 끌 수 있습니다. 초기 개발 후에도 지속적인 업데이트와 마케팅이 필요합니다.",
    difficulty: "높음",
    timeRequired: "초기 개발 200~500시간, 유지보수 월 10~30시간",
    skills: ["모바일 앱 개발", "UI/UX 디자인", "마케팅", "고객 지원"],
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
]

// Categories for filtering
const categories = ["전체", "개발", "투자", "콘텐츠", "교육", "마케팅"]

export default function SideHustlesPage() {
  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-6">부업 정보</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <Button key={category} variant={category === "전체" ? "default" : "outline"} size="sm">
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockSideHustles.map((hustle) => (
          <Card key={hustle.id}>
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src={hustle.thumbnail || "/placeholder.svg"}
                  alt={hustle.title}
                  className="w-full h-full object-cover rounded-l-lg"
                />
              </div>
              <div className="md:w-2/3">
                <CardHeader className="pb-2">
                  <div>
                    <CardTitle className="text-lg">{hustle.title}</CardTitle>
                    <CardDescription>{hustle.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge>{hustle.category}</Badge>
                    <Badge variant="outline">수익: {hustle.incomeRange}</Badge>
                    <Badge variant="secondary">난이도: {hustle.difficulty}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{hustle.longDescription}</p>
                </CardContent>
                <CardFooter className="pt-2">
                  <Link href={`/side-hustles/${hustle.id}`} className="w-full">
                    <Button variant="outline" className="w-full flex items-center justify-center gap-1">
                      <span>자세히 보기</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
