import Link from "next/link"
import { ArrowLeft, Calendar, User, Share2, Bookmark, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import GoogleAdBanner from "@/components/ads/GoogleAdBanner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock side hustle data
const getSideHustleDetails = (id: string) => {
  const sideHustles = {
    "1": {
      id: "1",
      title: "프리랜서 웹 개발",
      category: "개발",
      incomeRange: "월 200~500만원",
      description: "React, Next.js 등을 활용한 웹 개발 프리랜서 일자리",
      difficulty: "중간",
      timeRequired: "주 10~40시간",
      skills: ["HTML/CSS", "JavaScript", "React", "Next.js", "Node.js"],
      thumbnail: "/placeholder.svg?height=400&width=800",
      author: "개발자김",
      date: "2023-05-10",
      views: 1245,
      likes: 87,
      dislikes: 3,
      comments: 24,
      content: `
        <h2>프리랜서 웹 개발자란?</h2>
        <p>프리랜서 웹 개발자는 특정 회사에 소속되지 않고 독립적으로 웹사이트나 웹 애플리케이션을 개발하는 전문가입니다. 클라이언트의 요구사항에 맞춰 프로젝트 단위로 작업하며, 자유로운 시간 관리와 다양한 프로젝트 경험이 가능한 직업입니다.</p>
        
        <h2>필요한 기술과 역량</h2>
        <p>프리랜서 웹 개발자로 성공하기 위해서는 다음과 같은 기술과 역량이 필요합니다:</p>
        <ul>
          <li><strong>기술적 역량:</strong> HTML, CSS, JavaScript는 기본이며, React, Vue, Angular 등의 프론트엔드 프레임워크와 Node.js, Django, Laravel 등의 백엔드 기술 중 하나 이상에 능숙해야 합니다.</li>
          <li><strong>프로젝트 관리 능력:</strong> 일정 관리, 요구사항 분석, 클라이언트 커뮤니케이션 등 프로젝트를 독립적으로 진행할 수 있는 능력이 중요합니다.</li>
          <li><strong>자기 관리 능력:</strong> 시간 관리, 자기 동기부여, 지속적인 학습 등 스스로를 관리하고 발전시킬 수 있어야 합니다.</li>
          <li><strong>비즈니스 감각:</strong> 견적 작성, 계약 협상, 세금 관리 등 비즈니스 측면의 이해도 필요합니다.</li>
        </ul>
        
        <h2>수익 창출 방법</h2>
        <p>프리랜서 웹 개발자는 다양한 방식으로 수익을 창출할 수 있습니다:</p>
        <ol>
          <li><strong>프로젝트 기반 작업:</strong> 클라이언트와 계약하여 특정 프로젝트를 완성하고 보수를 받는 방식입니다. 프로젝트 규모와 복잡도에 따라 수백만원에서 수천만원까지 다양합니다.</li>
          <li><strong>시간당 계약:</strong> 작업 시간을 기준으로 보수를 받는 방식으로, 경력과 전문성에 따라 시간당 3만원에서 10만원 이상까지 책정할 수 있습니다.</li>
          <li><strong>유지보수 계약:</strong> 개발한 웹사이트나 애플리케이션의 지속적인 유지보수를 담당하고 월 단위로 고정 보수를 받는 방식입니다.</li>
          <li><strong>교육 및 멘토링:</strong> 웹 개발 지식을 바탕으로 강의나 멘토링을 제공하여 부수입을 올릴 수 있습니다.</li>
        </ol>
        
        <h2>시작하는 방법</h2>
        <p>프리랜서 웹 개발자로 시작하기 위한 단계별 가이드:</p>
        <ol>
          <li><strong>기술 습득:</strong> HTML, CSS, JavaScript 등 웹 개발의 기본 기술을 습득하고, 하나 이상의 프레임워크에 능숙해지세요.</li>
          <li><strong>포트폴리오 구축:</strong> 개인 프로젝트나 오픈 소스 기여를 통해 실력을 증명할 수 있는 포트폴리오를 만드세요.</li>
          <li><strong>프리랜서 플랫폼 활용:</strong> Upwork, Freelancer, 크몽 등의 플랫폼에 프로필을 등록하고 첫 프로젝트를 수주해보세요.</li>
          <li><strong>네트워크 구축:</strong> 개발자 커뮤니티, 밋업, 컨퍼런스 등에 참여하여 인맥을 쌓고 잠재 클라이언트를 만나세요.</li>
          <li><strong>비즈니스 설정:</strong> 사업자 등록, 세금 신고 방법, 계약서 작성 등 비즈니스 측면도 준비하세요.</li>
        </ol>
        
        <h2>장단점</h2>
        <h3>장점</h3>
        <ul>
          <li>유연한 근무 시간과 장소</li>
          <li>다양한 프로젝트 경험</li>
          <li>높은 수입 잠재력</li>
          <li>자율성과 창의성</li>
        </ul>
        
        <h3>단점</h3>
        <ul>
          <li>불안정한 수입</li>
          <li>클라이언트 확보의 어려움</li>
          <li>자기 관리의 필요성</li>
          <li>복리후생 부재</li>
        </ul>
        
        <h2>성공 사례</h2>
        <p>30대 개발자 A씨는 회사에 다니면서 주말에 프리랜서 프로젝트를 시작했습니다. 6개월 동안 포트폴리오를 쌓은 후 퇴사하여 전업 프리랜서로 전환했고, 현재는 월 평균 400만원의 수입을 올리고 있습니다. 특히 React와 Next.js 전문성을 바탕으로 스타트업 클라이언트를 다수 확보하여 안정적인 프로젝트를 유지하고 있습니다.</p>
        
        <h2>유용한 자원</h2>
        <p>프리랜서 웹 개발을 시작하는 데 도움이 되는 자원들:</p>
        <ul>
          <li>온라인 학습 플랫폼: Udemy, Coursera, 인프런</li>
          <li>프리랜서 플랫폼: Upwork, Freelancer, 크몽, 위시켓</li>
          <li>개발자 커뮤니티: GitHub, Stack Overflow, 페이스북 개발자 그룹</li>
          <li>포트폴리오 호스팅: GitHub Pages, Vercel, Netlify</li>
        </ul>
      `,
      relatedHustles: [
        { id: "3", title: "유튜브 채널 운영", category: "콘텐츠" },
        { id: "4", title: "온라인 강의 제작", category: "교육" },
        { id: "6", title: "앱 개발 및 출시", category: "개발" },
      ],
    },
    "2": {
      id: "2",
      title: "주식 투자",
      category: "투자",
      incomeRange: "변동적",
      description: "장기 투자를 통한 자산 증식 방법",
      difficulty: "중간",
      timeRequired: "주 1~10시간",
      skills: ["재무제표 분석", "산업 분석", "위험 관리"],
      thumbnail: "/placeholder.svg?height=400&width=800",
      author: "투자전문가",
      date: "2023-05-12",
      views: 2356,
      likes: 134,
      dislikes: 12,
      comments: 45,
      content: `
        <h2>주식 투자란?</h2>
        <p>주식 투자는 기업의 소유권 일부를 구매하여 해당 기업의 성장과 수익을 공유하는 투자 방법입니다. 주가 상승에 따른 자본 이득과 배당금을 통해 수익을 얻을 수 있으며, 장기적인 관점에서 인플레이션을 상회하는 수익률을 기대할 수 있습니다.</p>
        
        <h2>주식 투자의 기본 원칙</h2>
        <p>성공적인 주식 투자를 위한 기본 원칙들:</p>
        <ul>
          <li><strong>장기 투자:</strong> 단기 변동성에 흔들리지 않고 장기적인 관점에서 투자하세요.</li>
          <li><strong>분산 투자:</strong> 다양한 산업과 기업에 투자하여 리스크를 분산시키세요.</li>
          <li><strong>가치 투자:</strong> 기업의 내재 가치보다 저평가된 주식을 찾아 투자하세요.</li>
          <li><strong>복리의 힘:</strong> 배당금을 재투자하고 장기간 투자하여 복리 효과를 극대화하세요.</li>
          <li><strong>감정 제어:</strong> 공포와 탐욕에 휘둘리지 않고 원칙에 따라 투자하세요.</li>
        </ul>
        
        <h2>시작하는 방법</h2>
        <p>주식 투자를 시작하기 위한 단계별 가이드:</p>
        <ol>
          <li><strong>기초 지식 습득:</strong> 주식 시장의 기본 개념, 용어, 작동 원리를 이해하세요.</li>
          <li><strong>투자 계좌 개설:</strong> 증권사에 계좌를 개설하고 주식 거래 방법을 익히세요.</li>
          <li><strong>투자 전략 수립:</strong> 자신의 재정 상황, 목표, 위험 감수 성향에 맞는 투자 전략을 세우세요.</li>
          <li><strong>종목 분석:</strong> 재무제표, 산업 동향, 경쟁 환경 등을 분석하여 투자할 종목을 선정하세요.</li>
          <li><strong>분산 투자:</strong> 자금을 여러 종목에 분산하여 투자하세요.</li>
          <li><strong>정기적 점검:</strong> 포트폴리오를 정기적으로 점검하고 필요시 리밸런싱하세요.</li>
        </ol>
        
        <h2>투자 방법론</h2>
        <h3>가치 투자</h3>
        <p>기업의 내재 가치를 분석하여 저평가된 주식에 투자하는 방법입니다. 벤저민 그레이엄과 워렌 버핏이 대표적인 가치 투자자입니다. PER, PBR, 배당수익률 등의 지표를 활용하여 저평가된 기업을 찾습니다.</p>
        
        <h3>성장 투자</h3>
        <p>높은 성장 잠재력을 가진 기업에 투자하는 방법입니다. 매출과 이익이 빠르게 성장하는 기업을 찾아 투자하며, 현재는 고평가되어 있더라도 미래 성장성을 보고 투자합니다.</p>
        
        <h3>배당 투자</h3>
        <p>안정적인 배당금을 지급하는 기업에 투자하여 정기적인 수입을 얻는 방법입니다. 배당수익률이 높고 배당 성장률이 안정적인 기업을 선호합니다.</p>
        
        <h2>주의사항</h2>
        <ul>
          <li><strong>투자 금액 관리:</strong> 감당할 수 있는 금액만 투자하고, 비상금은 별도로 유지하세요.</li>
          <li><strong>과도한 거래 자제:</strong> 잦은 매매는 수수료 부담을 증가시키고 수익률을 저하시킵니다.</li>
          <li><strong>정보의 질:</strong> 신뢰할 수 있는 정보원을 활용하고, 루머나 팁에 의존하지 마세요.</li>
          <li><strong>세금 고려:</strong> 양도소득세, 배당소득세 등 투자 관련 세금을 이해하고 계획하세요.</li>
          <li><strong>장기적 관점:</strong> 단기 변동성에 흔들리지 말고 장기적인 관점을 유지하세요.</li>
        </ul>
        
        <h2>성공 사례</h2>
        <p>40대 직장인 B씨는 월 소득의 20%를 꾸준히 주식에 투자해왔습니다. 처음에는 개별 종목에 투자했지만, 점차 ETF와 우량 배당주 중심으로 포트폴리오를 재구성했습니다. 10년간의 투자로 초기 자본의 3배 이상의 자산을 형성했으며, 현재는 배당금만으로도 월 50만원의 추가 수입을 올리고 있습니다.</p>
        
        <h2>유용한 자원</h2>
        <p>주식 투자를 시작하는 데 도움이 되는 자원들:</p>
        <ul>
          <li>책: '주식투자 무작정 따라하기', '현명한 투자자', '워렌 버핏의 투자 원칙'</li>
          <li>웹사이트: 금융감독원, 한국거래소, 모닝스타, 에프앤가이드</li>
          <li>앱: 증권사 앱, 스톡플러스, 팍스넷</li>
          <li>커뮤니티: 디시인사이드 주식갤러리, 네이버 금융 카페</li>
        </ul>
      `,
      relatedHustles: [
        { id: "5", title: "블로그 수익화", category: "콘텐츠" },
        { id: "3", title: "유튜브 채널 운영", category: "콘텐츠" },
        { id: "4", title: "온라인 강의 제작", category: "교육" },
      ],
    },
  }

  return sideHustles[id as keyof typeof sideHustles] || sideHustles["1"]
}

export default function SideHustleDetailPage({ params }: { params: { id: string } }) {
  const sideHustle = getSideHustleDetails(params.id)

  return (
    <div className="py-6">
      <Link href="/side-hustles">
        <Button variant="ghost" className="mb-4 pl-0">
          <ArrowLeft className="h-4 w-4 mr-2" />
          부업 정보 목록으로
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="section-card mb-6">
            <div className="mb-6">
              <img
                src={sideHustle.thumbnail || "/placeholder.svg"}
                alt={sideHustle.title}
                className="w-full h-auto rounded-lg"
              />
            </div>

            <h1 className="text-3xl font-bold mb-4">{sideHustle.title}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{sideHustle.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{sideHustle.date}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>{sideHustle.category}</Badge>
                <Badge variant="outline">수익: {sideHustle.incomeRange}</Badge>
                <Badge variant="secondary">난이도: {sideHustle.difficulty}</Badge>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{sideHustle.likes}</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ThumbsDown className="h-4 w-4" />
                <span>{sideHustle.dislikes}</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{sideHustle.comments}</span>
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

            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: sideHustle.content }} />

            {/* Ad banner in the middle of content */}
            <div className="my-6 flex justify-center">
              <GoogleAdBanner format="rectangle" />
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">댓글 ({sideHustle.comments})</h2>
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
                      <AvatarFallback>JK</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">개발자준</span>
                        <span className="text-xs text-gray-500">2023-05-15</span>
                      </div>
                      <p className="text-sm mt-1">
                        정말 유용한 정보 감사합니다. 저도 프리랜서 개발자로 전환을 고민하고 있었는데, 이 글을 보고
                        용기를 얻었습니다. 특히 포트폴리오 구축 부분이 도움이 많이 되었어요.
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          답글
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 px-2 flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          <span>12</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>MK</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">프리랜서민경</span>
                        <span className="text-xs text-gray-500">2023-05-14</span>
                      </div>
                      <p className="text-sm mt-1">
                        3년차 프리랜서 개발자입니다. 글에 언급된 내용 모두 공감해요. 추가로 말씀드리자면, 처음에는
                        단가를 조금 낮게 잡더라도 좋은 포트폴리오를 만드는 것이 중요합니다. 그리고 꾸준히 기술 학습을
                        하는 것도 필수예요.
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          답글
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 px-2 flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          <span>8</span>
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
            <h2 className="text-xl font-semibold mb-4">부업 정보</h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">카테고리</div>
                <div className="font-medium">{sideHustle.category}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">수익 범위</div>
                <div className="font-medium">{sideHustle.incomeRange}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">난이도</div>
                <div className="font-medium">{sideHustle.difficulty}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">필요 시간</div>
                <div className="font-medium">{sideHustle.timeRequired}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">필요 기술</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {sideHustle.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
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
            <h2 className="text-xl font-semibold mb-4">관련 부업</h2>
            <div className="space-y-3">
              {sideHustle.relatedHustles.map((related) => (
                <Link
                  href={`/side-hustles/${related.id}`}
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
