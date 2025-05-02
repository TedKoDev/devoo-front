import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock tools data focused on side hustlers and non-developers
const mockTools = [
  {
    id: "1",
    name: "블로그 버튼 생성기",
    description: "블로그에 삽입할 수 있는 HTML 버튼 코드 생성",
    longDescription:
      "블로그나 웹사이트에 삽입할 수 있는 다양한 스타일의 HTML 버튼 코드를 쉽게 생성해주는 도구입니다. 코딩 지식 없이도 디자인과 기능을 커스터마이징할 수 있습니다.",
    icon: "/placeholder.svg?height=40&width=40",
    rating: 4.7,
    category: "콘텐츠 제작",
    url: "/tools/1",
    tags: ["블로그", "HTML", "디자인", "무료"],
  },
  {
    id: "2",
    name: "GPT 프롬프트 생성기",
    description: "효과적인 AI 프롬프트 작성 도우미",
    longDescription:
      "ChatGPT, GPT-4 등의 AI 모델에서 더 좋은 결과를 얻을 수 있는 프롬프트를 생성해주는 도구입니다. 목적에 맞는 프롬프트 템플릿과 최적화 방법을 제공합니다.",
    icon: "/placeholder.svg?height=40&width=40",
    rating: 4.9,
    category: "AI 도구",
    url: "/tools/2",
    tags: ["AI", "GPT", "프롬프트 엔지니어링"],
  },
  {
    id: "3",
    name: "소셜 미디어 콘텐츠 스케줄러",
    description: "여러 플랫폼 콘텐츠 일정 관리 도구",
    longDescription:
      "Instagram, Facebook, Twitter 등 여러 소셜 미디어 플랫폼의 콘텐츠 게시 일정을 한 곳에서 관리할 수 있는 도구입니다. 최적의 게시 시간 추천 기능도 제공합니다.",
    icon: "/placeholder.svg?height=40&width=40",
    rating: 4.6,
    category: "마케팅",
    url: "/tools/3",
    tags: ["소셜 미디어", "마케팅", "자동화"],
  },
  {
    id: "4",
    name: "간편 인보이스 생성기",
    description: "프리랜서를 위한 전문적인 인보이스 제작",
    longDescription:
      "프리랜서와 소상공인을 위한 전문적인 인보이스 생성 도구입니다. 다양한 템플릿과 자동 계산 기능을 제공하며, PDF로 저장하거나 이메일로 바로 전송할 수 있습니다.",
    icon: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
    category: "비즈니스",
    url: "/tools/4",
    tags: ["인보이스", "프리랜서", "비즈니스"],
  },
  {
    id: "5",
    name: "썸네일 디자이너",
    description: "블로그 및 유튜브 썸네일 제작 도구",
    longDescription:
      "블로그 포스트나 유튜브 영상을 위한 전문적인 썸네일을 쉽게 만들 수 있는 도구입니다. 다양한 템플릿과 편집 기능을 제공하여 디자인 지식이 없어도 눈에 띄는 썸네일을 제작할 수 있습니다.",
    icon: "/placeholder.svg?height=40&width=40",
    rating: 4.5,
    category: "디자인",
    url: "/tools/5",
    tags: ["썸네일", "디자인", "유튜브", "블로그"],
  },
  {
    id: "6",
    name: "SEO 키워드 분석기",
    description: "블로그 및 웹사이트 검색 최적화 도구",
    longDescription:
      "블로그나 웹사이트의 검색 엔진 최적화를 위한 키워드 분석 도구입니다. 경쟁이 적고 검색량이 많은 키워드를 찾아주며, 콘텐츠 최적화 방법도 제안합니다.",
    icon: "/placeholder.svg?height=40&width=40",
    rating: 4.7,
    category: "마케팅",
    url: "/tools/6",
    tags: ["SEO", "키워드", "콘텐츠 마케팅"],
  },
  {
    id: "7",
    name: "자동 블로그 포스팅 도구",
    description: "AI를 활용한 블로그 콘텐츠 생성",
    longDescription:
      "AI를 활용하여 블로그 포스트 초안을 자동으로 생성해주는 도구입니다. 키워드만 입력하면 구조화된 글을 작성해주며, 편집 후 바로 블로그에 게시할 수 있습니다.",
    icon: "/placeholder.svg?height=40&width=40",
    rating: 4.4,
    category: "콘텐츠 제작",
    url: "/tools/7",
    tags: ["AI", "블로그", "콘텐츠 생성"],
  },
  {
    id: "8",
    name: "디지털 상품 판매 플랫폼",
    description: "e-book, 템플릿 등 디지털 상품 판매",
    longDescription:
      "e-book, 디자인 템플릿, 코스 등 디지털 상품을 쉽게 판매할 수 있는 플랫폼입니다. 결제 처리, 상품 전달, 마케팅 도구 등을 제공합니다.",
    icon: "/placeholder.svg?height=40&width=40",
    rating: 4.6,
    category: "비즈니스",
    url: "/tools/8",
    tags: ["디지털 상품", "판매", "부업"],
  },
  {
    id: "9",
    name: "HTML 위젯 생성기",
    description: "블로그용 커스텀 위젯 코드 생성",
    longDescription:
      "블로그나 웹사이트에 삽입할 수 있는 다양한 위젯(달력, 카운트다운, 소셜 미디어 피드 등)의 HTML 코드를 생성해주는 도구입니다. 코딩 지식 없이도 쉽게 사용할 수 있습니다.",
    icon: "/placeholder.svg?height=40&width=40",
    rating: 4.5,
    category: "콘텐츠 제작",
    url: "/tools/9",
    tags: ["HTML", "위젯", "블로그", "커스터마이징"],
  },
]

// Categories for filtering
const categories = ["전체", "콘텐츠 제작", "AI 도구", "마케팅", "비즈니스", "디자인"]

export default function ToolsPage() {
  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-6">부업 도구 모음</h1>

      <p className="text-gray-600 mb-6">
        부업, 블로그 운영, 콘텐츠 제작 등에 활용할 수 있는 유용한 도구들을 소개합니다. 개발 지식이 없어도 쉽게 사용할 수
        있는 도구들이 많이 있습니다.
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <Button key={category} variant={category === "전체" ? "default" : "outline"} size="sm">
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockTools.map((tool) => (
          <Card key={tool.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                  <img src={tool.icon || "/placeholder.svg"} alt={tool.name} className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-gray-600 mb-3">{tool.longDescription}</p>
              <div className="flex flex-wrap gap-1 mb-2">
                {tool.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2 border-t">
              <div className="flex items-center text-yellow-500">
                <Star className="h-4 w-4 fill-current mr-1" />
                <span className="text-sm">{tool.rating.toFixed(1)}</span>
              </div>
              <Link href={tool.url}>
                <Button size="sm" className="flex items-center gap-1">
                  <span>사용해보기</span>
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
