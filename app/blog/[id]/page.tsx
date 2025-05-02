import Link from "next/link"
import { ArrowLeft, Calendar, User, Share2, Bookmark, ThumbsUp, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import GoogleAdBanner from "@/components/ads/GoogleAdBanner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock blog post data
const getBlogPostDetails = (id: string) => {
  const posts = {
    "1": {
      id: "1",
      title: "Devooup_hub 개발 시작: 부업과 개발을 위한 플랫폼",
      excerpt:
        "부업과 개발 정보를 한 곳에서 제공하는 Devooup_hub 프로젝트를 시작하게 된 배경과 목표에 대해 소개합니다.",
      author: "Devooup Team",
      date: "2023-05-01",
      tags: ["개발일지", "프로젝트 소개"],
      thumbnail: "/placeholder.svg?height=400&width=800",
      views: 1245,
      likes: 87,
      comments: 24,
      content: `
        <h2>Devooup_hub 프로젝트 소개</h2>
        <p>안녕하세요, Devooup 팀입니다. 오늘은 저희가 새롭게 시작한 'Devooup_hub' 프로젝트에 대해 소개드리려고 합니다. Devooup_hub는 부업, 자영업, 개발 관련 실용 정보와 도구를 제공하는 종합 플랫폼입니다.</p>
        
        <h2>프로젝트 배경</h2>
        <p>최근 몇 년간 부업과 자영업에 대한 관심이 크게 증가했습니다. 특히 개발자들 사이에서는 본업 외에 부수입을 올릴 수 있는 다양한 방법들이 논의되고 있습니다. 하지만 이러한 정보들이 여러 플랫폼에 분산되어 있어 필요한 정보를 찾기 어렵다는 문제가 있었습니다.</p>
        
        <p>저희 팀은 이런 문제를 해결하기 위해 부업, 자영업, 개발 관련 정보를 한 곳에서 제공하는 플랫폼을 만들기로 결정했습니다. 특히 개발자들이 자신의 기술을 활용해 부수입을 올릴 수 있는 방법에 초점을 맞추고 있습니다.</p>
        
        <h2>주요 기능 및 콘텐츠</h2>
        <p>Devooup_hub는 다음과 같은 주요 기능과 콘텐츠를 제공할 예정입니다:</p>
        
        <h3>1. 실시간 금융 정보</h3>
        <p>주식, 환율, 금 시세 등 투자에 필요한 실시간 금융 정보를 제공합니다. 이를 통해 사용자들은 투자 결정을 내리는 데 필요한 정보를 빠르게 확인할 수 있습니다.</p>
        
        <h3>2. 부업 정보 및 가이드</h3>
        <p>프리랜서 개발, 콘텐츠 제작, 온라인 강의 등 다양한 부업 방법에 대한 정보와 상세 가이드를 제공합니다. 각 부업의 수익성, 필요 기술, 시작 방법 등을 자세히 설명합니다.</p>
        
        <h3>3. 개발 도구 모음</h3>
        <p>개발자들이 자주 사용하는 도구들을 소개하고, 부업이나 자영업에 활용할 수 있는 방법을 제안합니다. 또한 사용자들이 직접 도구를 요청하고 공유할 수 있는 기능도 제공할 예정입니다.</p>
        
        <h3>4. 커뮤니티</h3>
        <p>사용자들이 자신의 경험과 지식을 공유하고, 질문과 답변을 통해 서로 도울 수 있는 커뮤니티 공간을 마련합니다. 이를 통해 실제 경험자들의 생생한 정보를 얻을 수 있습니다.</p>
        
        <h3>5. 개발일지</h3>
        <p>Devooup_hub 프로젝트의 개발 과정과 기술적 도전, 해결 방법 등을 공유하는 개발일지를 정기적으로 업데이트합니다. 이를 통해 사용자들에게 투명성을 제공하고, 개발에 관심 있는 사용자들에게 유용한 정보를 제공합니다.</p>
        
        <h2>기술 스택</h2>
        <p>Devooup_hub는 다음과 같은 기술 스택을 사용하여 개발되고 있습니다:</p>
        <ul>
          <li><strong>프론트엔드:</strong> Next.js, React, TypeScript, Tailwind CSS</li>
          <li><strong>백엔드:</strong> Node.js, Express</li>
          <li><strong>데이터베이스:</strong> MongoDB</li>
          <li><strong>배포:</strong> Vercel</li>
          <li><strong>상태 관리:</strong> Zustand</li>
          <li><strong>API 통신:</strong> React Query</li>
        </ul>
        
        <h2>개발 로드맵</h2>
        <p>Devooup_hub의 개발은 다음과 같은 단계로 진행될 예정입니다:</p>
        
        <ol>
          <li><strong>1단계 (2023년 5월):</strong> 기본 UI/UX 설계 및 핵심 기능 구현</li>
          <li><strong>2단계 (2023년 6월):</strong> 실시간 금융 정보 및 부업 정보 콘텐츠 추가</li>
          <li><strong>3단계 (2023년 7월):</strong> 커뮤니티 기능 및 사용자 인증 시스템 구현</li>
          <li><strong>4단계 (2023년 8월):</strong> 개발 도구 모음 및 도구 요청 기능 추가</li>
          <li><strong>5단계 (2023년 9월):</strong> 베타 테스트 및 피드백 수집</li>
          <li><strong>6단계 (2023년 10월):</strong> 정식 출시 및 지속적인 업데이트</li>
        </ol>
        
        <h2>참여 방법</h2>
        <p>Devooup_hub 프로젝트에 관심이 있으신 분들은 다음과 같은 방법으로 참여하실 수 있습니다:</p>
        
        <ul>
          <li>베타 테스터로 참여하여 피드백 제공</li>
          <li>콘텐츠 작성자로 부업 및 개발 관련 정보 공유</li>
          <li>개발자로 프로젝트에 기여 (GitHub 저장소 공개 예정)</li>
          <li>SNS를 통한 프로젝트 홍보 및 공유</li>
        </ul>
        
        <h2>마무리</h2>
        <p>Devooup_hub는 부업, 자영업, 개발에 관심 있는 모든 분들에게 유용한 정보와 도구를 제공하는 것을 목표로 합니다. 앞으로의 개발 과정과 업데이트 소식은 이 블로그를 통해 정기적으로 공유할 예정이니 많은 관심과 응원 부탁드립니다.</p>
        
        <p>궁금한 점이나 제안사항이 있으시면 언제든지 댓글로 남겨주세요. 감사합니다!</p>
      `,
      relatedPosts: [
        { id: "2", title: "Next.js 앱 라우터로 개발하기: 장단점과 실전 팁", category: "개발 팁" },
        { id: "3", title: "프리랜서 개발자로 시작하는 방법: 첫 발걸음", category: "부업" },
      ],
    },
    "2": {
      id: "2",
      title: "Next.js 앱 라우터로 개발하기: 장단점과 실전 팁",
      excerpt:
        "Next.js의 새로운 앱 라우터를 사용하여 Devooup_hub를 개발하면서 경험한 장단점과 실전에서 유용한 팁을 공유합니다.",
      author: "개발자 김철수",
      date: "2023-05-05",
      tags: ["Next.js", "개발 팁"],
      thumbnail: "/placeholder.svg?height=400&width=800",
      views: 2356,
      likes: 134,
      comments: 45,
      content: `
        <h2>Next.js 앱 라우터 소개</h2>
        <p>Next.js 13에서 도입된 앱 라우터(App Router)는 기존의 페이지 라우터(Pages Router)를 대체하는 새로운 라우팅 시스템입니다. 이번 글에서는 Devooup_hub 프로젝트를 개발하면서 경험한 앱 라우터의 장단점과 실전에서 유용한 팁을 공유하고자 합니다.</p>
        
        <h2>앱 라우터의 주요 특징</h2>
        <p>앱 라우터는 다음과 같은 주요 특징을 가지고 있습니다:</p>
        
        <h3>1. 폴더 기반 라우팅</h3>
        <p>앱 라우터는 app 디렉토리 내의 폴더 구조를 기반으로 라우팅을 처리합니다. 각 폴더는 URL 경로의 세그먼트에 해당하며, 특수 파일(page.js, layout.js 등)을 통해 해당 경로의 UI를 정의합니다.</p>
        
        <pre><code>app/
  page.js         // 홈페이지 (/)
  about/
    page.js       // 소개 페이지 (/about)
  blog/
    page.js       // 블로그 목록 페이지 (/blog)
    [slug]/
      page.js     // 블로그 상세 페이지 (/blog/[slug])</code></pre>
        
        <h3>2. 서버 컴포넌트</h3>
        <p>앱 라우터에서는 기본적으로 모든 컴포넌트가 React 서버 컴포넌트로 동작합니다. 서버 컴포넌트는 서버에서 렌더링되어 HTML로 클라이언트에 전송되므로, 클라이언트 측 JavaScript 번들 크기를 줄일 수 있습니다.</p>
        
        <h3>3. 중첩 레이아웃</h3>
        <p>layout.js 파일을 통해 중첩된 레이아웃을 쉽게 구현할 수 있습니다. 각 레이아웃은 해당 경로와 그 하위 경로에 적용되며, 페이지 전환 시에도 레이아웃은 유지됩니다.</p>
        
        <h3>4. 데이터 페칭</h3>
        <p>서버 컴포넌트에서는 async/await를 사용하여 직접 데이터를 페칭할 수 있습니다. 이를 통해 데이터 페칭 로직을 컴포넌트와 함께 배치할 수 있어 코드 구성이 더 직관적입니다.</p>
        
        <h2>장점</h2>
        <p>Devooup_hub 프로젝트에서 경험한 앱 라우터의 주요 장점은 다음과 같습니다:</p>
        
        <h3>1. 향상된 성능</h3>
        <p>서버 컴포넌트를 통해 클라이언트로 전송되는 JavaScript 양이 크게 줄어들어 초기 로딩 성능이 향상되었습니다. 특히 데이터를 많이 표시하는 페이지에서 체감할 수 있었습니다.</p>
        
        <h3>2. 직관적인 폴더 구조</h3>
        <p>폴더 기반 라우팅은 프로젝트 구조를 더 직관적으로 만들어 주었습니다. URL 구조와 폴더 구조가 일치하기 때문에 코드 탐색이 용이해졌습니다.</p>
        
        <h3>3. 중첩 레이아웃의 편리함</h3>
        <p>중첩 레이아웃을 통해 공통 UI 요소를 효율적으로 관리할 수 있었습니다. 예를 들어, 대시보드 섹션의 모든 페이지에 공통으로 적용되는 사이드바를 쉽게 구현할 수 있었습니다.</p>
        
        <h3>4. 간소화된 데이터 페칭</h3>
        <p>서버 컴포넌트에서 직접 데이터를 페칭할 수 있어 코드가 더 간결해졌습니다. 또한 서버에서 데이터를 페칭하므로 API 키 등의 민감한 정보를 클라이언트에 노출하지 않아도 됩니다.</p>
        
        <h2>단점 및 주의사항</h2>
        <p>앱 라우터를 사용하면서 경험한 단점과 주의해야 할 점은 다음과 같습니다:</p>
        
        <h3>1. 학습 곡선</h3>
        <p>서버 컴포넌트와 클라이언트 컴포넌트의 구분, 새로운 데이터 페칭 방식 등 새로운 개념을 이해하는 데 시간이 필요했습니다. 특히 기존 Pages Router에 익숙한 개발자들은 적응하는 데 어려움을 겪을 수 있습니다.</p>
        
        <h3>2. 클라이언트 상태 관리의 복잡성</h3>
        <p>서버 컴포넌트에서는 useState, useEffect 등의 React 훅을 사용할 수 없어 상태 관리 방식을 재고해야 했습니다. 클라이언트 컴포넌트와 서버 컴포넌트 사이의 경계를 명확히 설계하는 것이 중요했습니다.</p>
        
        <h3>3. 라이브러리 호환성 문제</h3>
        <p>일부 클라이언트 사이드 라이브러리가 서버 컴포넌트와 호환되지 않아 'use client' 지시어를 사용하거나 별도의 래퍼 컴포넌트를 만들어야 했습니다.</p>
        
        <h3>4. 빌드 시간 증가</h3>
        <p>프로젝트 규모가 커질수록 빌드 시간이 Pages Router에 비해 더 길어지는 경향이 있었습니다.</p>
        
        <h2>실전 팁</h2>
        <p>Devooup_hub 개발 과정에서 얻은 실전 팁을 공유합니다:</p>
        
        <h3>1. 서버와 클라이언트 컴포넌트 구분하기</h3>
        <p>프로젝트 초기에 어떤 컴포넌트가 서버 컴포넌트이고 어떤 컴포넌트가 클라이언트 컴포넌트인지 명확히 구분하는 것이 중요합니다. 저희는 파일명에 접두사를 붙이거나(예: Client*.tsx) 폴더로 구분하는 방식을 사용했습니다.</p>
        
        <h3>2. 데이터 페칭 전략 수립하기</h3>
        <p>서버 컴포넌트에서의 데이터 페칭, React Query를 활용한 클라이언트 사이드 데이터 페칭 등 상황에 맞는 데이터 페칭 전략을 수립하는 것이 중요합니다. 저희는 초기 로딩 데이터는 서버 컴포넌트에서, 사용자 인터랙션에 따른 데이터는 클라이언트 컴포넌트에서 페칭하는 전략을 사용했습니다.</p>
        
        <h3>3. 점진적 마이그레이션 고려하기</h3>
        <p>기존 프로젝트를 앱 라우터로 마이그레이션할 경우, 한 번에 모든 것을 변경하기보다는 점진적으로 마이그레이션하는 것이 좋습니다. Next.js는 Pages Router와 App Router를 동시에 사용할 수 있도록 지원합니다.</p>
        
        <h3>4. 타입스크립트 활용하기</h3>
        <p>타입스크립트를 사용하면 서버 컴포넌트와 클라이언트 컴포넌트 사이의 props 전달 등에서 발생할 수 있는 오류를 사전에 방지할 수 있습니다.</p>
        
        <h2>Devooup_hub에서의 적용 사례</h2>
        <p>Devooup_hub 프로젝트에서는 앱 라우터를 다음과 같이 활용했습니다:</p>
        
        <h3>1. 공통 레이아웃</h3>
        <p>app/layout.tsx에서 전체 애플리케이션에 공통으로 적용되는 헤더, 푸터, 네비게이션 등을 구현했습니다.</p>
        
        <h3>2. 데이터 페칭</h3>
        <p>금융 정보, 부업 정보 등 정적인 데이터는 서버 컴포넌트에서 페칭하여 초기 로딩 성능을 최적화했습니다.</p>
        
        <h3>3. 인터랙티브 요소</h3>
        <p>사용자 인터랙션이 필요한 요소(댓글 작성, 좋아요 등)는 클라이언트 컴포넌트로 분리하여 구현했습니다.</p>
        
        <h2>결론</h2>
        <p>Next.js 앱 라우터는 학습 곡선이 있지만, 성능 향상과 개발 경험 개선 등 많은 장점을 제공합니다. 특히 서버 컴포넌트를 통한 성능 최적화는 사용자 경험을 크게 향상시킬 수 있습니다.</p>
        
        <p>Devooup_hub 프로젝트에서는 앱 라우터를 적극 활용하여 빠르고 사용자 친화적인 웹 애플리케이션을 구축할 수 있었습니다. 앞으로도 Next.js의 발전에 맞춰 지속적으로 프로젝트를 개선해 나갈 예정입니다.</p>
        
        <p>여러분의 Next.js 앱 라우터 경험이나 질문이 있다면 댓글로 공유해주세요!</p>
      `,
      relatedPosts: [
        { id: "1", title: "Devooup_hub 개발 시작: 부업과 개발을 위한 플랫폼", category: "개발일지" },
        { id: "3", title: "프리랜서 개발자로 시작하는 방법: 첫 발걸음", category: "부업" },
      ],
    },
  }

  return posts[id as keyof typeof posts] || posts["1"]
}

export default function BlogPostDetailPage({ params }: { params: { id: string } }) {
  const post = getBlogPostDetails(params.id)

  return (
    <div className="py-6">
      <Link href="/blog">
        <Button variant="ghost" className="mb-4 pl-0">
          <ArrowLeft className="h-4 w-4 mr-2" />
          블로그 목록으로
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="section-card mb-6">
            <div className="mb-6">
              <img src={post.thumbnail || "/placeholder.svg"} alt={post.title} className="w-full h-auto rounded-lg" />
            </div>

            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs">조회 {post.views}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

            {/* Ad banner in the middle of content */}
            <div className="my-6 flex justify-center">
              <GoogleAdBanner format="rectangle" />
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{post.likes}</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{post.comments}</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Bookmark className="h-4 w-4" />
                <span>저장</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                <span>공유</span>
              </Button>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">댓글 ({post.comments})</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>사용자</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <textarea
                      className="w-full border rounded-md p-2 text-sm"
                      rows={3}
                      placeholder="댓글을 작성해주세요..."
                    ></textarea>
                    <div className="flex justify-end mt-2">
                      <Button size="sm">댓글 작성</Button>
                    </div>
                  </div>
                </div>

                {/* Sample comments */}
                <div className="border-t pt-4">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">개발자민준</span>
                        <span className="text-xs text-gray-500">2023-05-02</span>
                      </div>
                      <p className="text-sm mt-1">
                        흥미로운 프로젝트네요! 저도 부업에 관심이 많아서 이런 플랫폼이 있으면 좋겠다고 생각했었는데,
                        기대가 됩니다. 특히 개발자들을 위한 부업 정보가 잘 정리되어 있으면 좋겠어요.
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          답글
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 px-2 flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          <span>5</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>SY</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">투자자소영</span>
                        <span className="text-xs text-gray-500">2023-05-01</span>
                      </div>
                      <p className="text-sm mt-1">
                        실시간 금융 정보 기능이 특히 기대되네요. 주식과 환율 정보를 한 곳에서 볼 수 있으면 정말 편리할
                        것 같아요. 출시되면 꼭 사용해보고 싶습니다!
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          답글
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 px-2 flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          <span>3</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="section-card mb-6">
            <h2 className="text-xl font-semibold mb-4">글 정보</h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">작성자</div>
                <div className="font-medium">{post.author}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">작성일</div>
                <div className="font-medium">{post.date}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">조회수</div>
                <div className="font-medium">{post.views}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">태그</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar ad */}
          <div className="mb-6">
            <GoogleAdBanner format="rectangle" />
          </div>

          <div className="section-card">
            <h2 className="text-xl font-semibold mb-4">관련 글</h2>
            <div className="space-y-3">
              {post.relatedPosts.map((related) => (
                <Link
                  href={`/blog/${related.id}`}
                  key={related.id}
                  className="block hover:bg-gray-50 p-2 rounded -mx-2"
                >
                  <div className="font-medium">{related.title}</div>
                  <div className="text-sm text-gray-500">{related.category}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
