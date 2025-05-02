import Link from "next/link"
import { ArrowLeft, Star, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import GoogleAdBanner from "@/components/ads/GoogleAdBanner"

// Mock tool data
const getToolDetails = (id: string) => {
  const tools = {
    "1": {
      id: "1",
      name: "블로그 버튼 생성기",
      description: "블로그에 삽입할 수 있는 HTML 버튼 코드 생성",
      longDescription:
        "블로그나 웹사이트에 삽입할 수 있는 다양한 스타일의 HTML 버튼 코드를 쉽게 생성해주는 도구입니다. 코딩 지식 없이도 디자인과 기능을 커스터마이징할 수 있습니다.",
      fullDescription: `
        <p>블로그 버튼 생성기는 HTML, CSS, JavaScript 코드를 직접 작성하지 않고도 전문적인 버튼을 만들 수 있는 도구입니다.</p>
        
        <h2>주요 기능</h2>
        <ul>
          <li>다양한 버튼 스타일 및 디자인 템플릿 제공</li>
          <li>색상, 크기, 모서리 둥글기, 그림자 등 세부 조정 가능</li>
          <li>호버 효과, 클릭 효과 등 인터랙션 설정</li>
          <li>링크 URL 및 타겟 설정 (새 탭에서 열기 등)</li>
          <li>아이콘 추가 및 위치 조정</li>
          <li>모바일 반응형 설정</li>
        </ul>
        
        <h2>사용 방법</h2>
        <ol>
          <li>원하는 버튼 스타일 템플릿 선택</li>
          <li>색상, 텍스트, 크기 등 세부 사항 조정</li>
          <li>미리보기로 결과 확인</li>
          <li>HTML 코드 생성 버튼 클릭</li>
          <li>생성된 코드를 복사하여 블로그나 웹사이트에 붙여넣기</li>
        </ol>
        
        <h2>활용 사례</h2>
        <p>블로그 버튼 생성기는 다음과 같은 용도로 활용할 수 있습니다:</p>
        <ul>
          <li>블로그 포스트 내 관련 글로 이동하는 링크 버튼</li>
          <li>제품 구매 페이지로 연결되는 CTA(Call-to-Action) 버튼</li>
          <li>뉴스레터 구독 양식으로 연결되는 버튼</li>
          <li>소셜 미디어 프로필로 연결되는 버튼</li>
          <li>다운로드 링크 버튼</li>
        </ul>
        
        <h2>HTML 코드 예시</h2>
        <pre><code>&lt;button class="custom-btn" style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;"&gt;버튼 텍스트&lt;/button&gt;</code></pre>
      `,
      icon: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
      category: "콘텐츠 제작",
      url: "#",
      tags: ["블로그", "HTML", "디자인", "무료"],
      screenshots: [
        "/placeholder.svg?height=300&width=600",
        "/placeholder.svg?height=300&width=600",
        "/placeholder.svg?height=300&width=600",
      ],
      reviews: [
        {
          user: "블로거123",
          rating: 5,
          comment: "코딩을 몰라도 쉽게 예쁜 버튼을 만들 수 있어요. 블로그 가독성이 훨씬 좋아졌습니다.",
        },
        {
          user: "디자인초보",
          rating: 4,
          comment: "템플릿이 다양해서 좋아요. 가끔 모바일에서 깨지는 경우가 있어 4점 드립니다.",
        },
        { user: "웹마스터", rating: 5, comment: "전문적인 버튼을 빠르게 만들 수 있어 시간 절약에 큰 도움이 됩니다." },
      ],
    },
    "2": {
      id: "2",
      name: "GPT 프롬프트 생성기",
      description: "효과적인 AI 프롬프트 작성 도우미",
      longDescription:
        "ChatGPT, GPT-4 등의 AI 모델에서 더 좋은 결과를 얻을 수 있는 프롬프트를 생성해주는 도구입니다. 목적에 맞는 프롬프트 템플릿과 최적화 방법을 제공합니다.",
      fullDescription: `
        <p>GPT 프롬프트 생성기는 AI 모델과의 효과적인 소통을 위한 최적화된 프롬프트를 만들어주는 도구입니다.</p>
        
        <h2>주요 기능</h2>
        <ul>
          <li>목적별 프롬프트 템플릿 제공 (콘텐츠 작성, 코드 생성, 아이디어 브레인스토밍 등)</li>
          <li>프롬프트 최적화 및 개선 제안</li>
          <li>다양한 AI 모델(GPT-3.5, GPT-4, Claude 등)에 맞춘 프롬프트 조정</li>
          <li>프롬프트 저장 및 관리 기능</li>
          <li>성공적인 프롬프트 예시 라이브러리</li>
        </ul>
        
        <h2>사용 방법</h2>
        <ol>
          <li>원하는 AI 작업 유형 선택 (글쓰기, 분석, 요약, 코딩 등)</li>
          <li>세부 목적과 원하는 결과물 형태 지정</li>
          <li>필요한 추가 정보 입력</li>
          <li>프롬프트 생성 버튼 클릭</li>
          <li>생성된 프롬프트를 복사하여 ChatGPT 등의 AI 서비스에 붙여넣기</li>
        </ol>
        
        <h2>활용 사례</h2>
        <p>GPT 프롬프트 생성기는 다음과 같은 용도로 활용할 수 있습니다:</p>
        <ul>
          <li>블로그 포스트 작성을 위한 구조화된 프롬프트</li>
          <li>마케팅 카피 생성을 위한 상세 프롬프트</li>
          <li>코드 작성 및 디버깅을 위한 기술적 프롬프트</li>
          <li>비즈니스 아이디어 발굴을 위한 브레인스토밍 프롬프트</li>
          <li>학습 자료 생성을 위한 교육용 프롬프트</li>
        </ul>
        
        <h2>프롬프트 예시</h2>
        <pre><code>당신은 SEO에 최적화된 블로그 포스트를 작성하는 전문가입니다. [키워드]에 대한 2000자 분량의 포스트를 작성해주세요. 포스트는 다음 구조를 따라야 합니다:
1. 흥미로운 도입부
2. [키워드]에 대한 정의와 중요성
3. 주요 포인트 5가지 (각 포인트는 소제목과 2-3개 문단으로 구성)
4. 실용적인 팁이나 예시
5. 결론 및 행동 유도문

전문적이면서도 대화체로 작성하고, 각 섹션 사이에 자연스러운 연결이 있어야 합니다. SEO를 위해 [키워드]를 자연스럽게 5-7회 포함시켜주세요.</code></pre>
      `,
      icon: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      category: "AI 도구",
      url: "#",
      tags: ["AI", "GPT", "프롬프트 엔지니어링"],
      screenshots: [
        "/placeholder.svg?height=300&width=600",
        "/placeholder.svg?height=300&width=600",
        "/placeholder.svg?height=300&width=600",
      ],
      reviews: [
        {
          user: "AI마스터",
          rating: 5,
          comment: "이 도구 덕분에 ChatGPT에서 훨씬 더 좋은 결과물을 얻을 수 있게 되었어요!",
        },
        {
          user: "콘텐츠크리에이터",
          rating: 5,
          comment: "블로그 글 작성 시간이 절반으로 줄었습니다. 프롬프트 템플릿이 정말 유용해요.",
        },
        {
          user: "마케터김",
          rating: 4,
          comment: "마케팅 카피 작성에 큰 도움이 됩니다. 더 많은 업종별 템플릿이 있으면 좋겠어요.",
        },
      ],
    },
  }

  return tools[id as keyof typeof tools] || tools["1"]
}

export default function ToolDetailPage({ params }: { params: { id: string } }) {
  const tool = getToolDetails(params.id)

  return (
    <div className="py-6">
      <Link href="/tools">
        <Button variant="ghost" className="mb-4 pl-0">
          <ArrowLeft className="h-4 w-4 mr-2" />
          도구 목록으로
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="section-card mb-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                <img src={tool.icon || "/placeholder.svg"} alt={tool.name} className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{tool.name}</h1>
                <p className="text-gray-600">{tool.description}</p>
                <div className="flex items-center mt-2 text-yellow-500">
                  <Star className="h-5 w-5 fill-current mr-1" />
                  <span className="font-medium">{tool.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {tool.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">도구 소개</h2>
              <p className="text-gray-700">{tool.longDescription}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">스크린샷</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tool.screenshots.map((screenshot, index) => (
                  <div key={index} className="border rounded-md overflow-hidden">
                    <img
                      src={screenshot || "/placeholder.svg"}
                      alt={`${tool.name} 스크린샷 ${index + 1}`}
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">상세 설명</h2>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: tool.fullDescription }} />
            </div>

            {/* Ad banner in the middle of content */}
            <div className="my-6 flex justify-center">
              <GoogleAdBanner format="rectangle" />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">사용자 리뷰</h2>
              <div className="space-y-4">
                {tool.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">{review.user}</div>
                      <div className="flex items-center text-yellow-500">
                        <Star className="h-4 w-4 fill-current mr-1" />
                        <span>{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="section-card mb-6">
            <h2 className="text-xl font-semibold mb-4">도구 정보</h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">카테고리</div>
                <div className="font-medium">{tool.category}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">평점</div>
                <div className="font-medium flex items-center">
                  <Star className="h-4 w-4 fill-current text-yellow-500 mr-1" />
                  {tool.rating.toFixed(1)}/5.0
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">태그</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {tool.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button className="w-full flex items-center justify-center gap-1" size="lg">
                <span>사용해보기</span>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Sidebar ad */}
          <div className="mb-6">
            <GoogleAdBanner format="rectangle" />
          </div>

          <div className="section-card">
            <h2 className="text-xl font-semibold mb-4">관련 도구</h2>
            <div className="space-y-3">
              <Link href="/tools/3" className="block hover:bg-gray-50 p-2 rounded -mx-2">
                <div className="font-medium">소셜 미디어 콘텐츠 스케줄러</div>
                <div className="text-sm text-gray-500">여러 플랫폼 콘텐츠 일정 관리 도구</div>
              </Link>
              <Link href="/tools/5" className="block hover:bg-gray-50 p-2 rounded -mx-2">
                <div className="font-medium">썸네일 디자이너</div>
                <div className="text-sm text-gray-500">블로그 및 유튜브 썸네일 제작 도구</div>
              </Link>
              <Link href="/tools/9" className="block hover:bg-gray-50 p-2 rounded -mx-2">
                <div className="font-medium">HTML 위젯 생성기</div>
                <div className="text-sm text-gray-500">블로그용 커스텀 위젯 코드 생성</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
