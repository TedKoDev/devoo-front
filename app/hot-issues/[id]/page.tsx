import Link from "next/link"
import { ArrowLeft, Clock, Share2, Bookmark, ThumbsUp, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import GoogleAdBanner from "@/components/ads/GoogleAdBanner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for hot issues
const getHotIssueDetails = (id: string) => {
  const issues = {
    "1": {
      id: "1",
      title: "2023년 하반기 투자 전략: 전문가들의 조언",
      summary:
        "2023년 하반기 투자 전략에 대한 전문가들의 조언을 모았습니다. 금리, 인플레이션, 경기 침체 우려 등 다양한 변수 속에서 효과적인 투자 방법을 알아봅니다.",
      content: `
        <h2>2023년 하반기 투자 환경 전망</h2>
        <p>2023년 상반기는 인플레이션 우려, 금리 인상, 은행 위기 등 다양한 변수로 인해 투자자들에게 도전적인 시기였습니다. 하반기에는 어떤 투자 환경이 펼쳐질까요? 주요 투자 전문가들의 의견을 종합해보았습니다.</p>
        
        <p>대부분의 전문가들은 하반기에 인플레이션이 점진적으로 안정화되고, 중앙은행들의 금리 인상 사이클이 종료 단계에 접어들 것으로 예상하고 있습니다. 다만 경기 침체 우려는 여전히 남아있어, 투자자들은 방어적인 포트폴리오 구성과 함께 선별적인 기회 포착이 중요할 것으로 보입니다.</p>
        
        <h2>자산별 투자 전략</h2>
        
        <h3>1. 주식 시장</h3>
        <p>하반기 주식 시장에 대해서는 전문가들 사이에서도 의견이 엇갈립니다. 모건스탠리의 마이크 윌슨은 "S&P 500이 연말까지 3,900 수준까지 하락할 가능성이 있다"며 신중한 접근을 권고한 반면, JP모건의 마르코 콜라노빅은 "기술주 중심의 상승세가 지속될 것"이라고 전망했습니다.</p>
        
        <p>대체적으로 전문가들은 다음과 같은 주식 투자 전략을 제시하고 있습니다:</p>
        <ul>
          <li>퀄리티 팩터에 집중 (안정적인 수익, 강한 재무구조, 지속 가능한 경쟁우위를 가진 기업)</li>
          <li>배당주 비중 확대 (불확실성 높은 시기에 안정적인 수익 제공)</li>
          <li>AI 관련 기업에 선별적 투자 (장기적 성장 트렌드)</li>
          <li>헬스케어, 필수소비재 등 방어적 섹터 비중 유지</li>
        </ul>
        
        <h3>2. 채권 시장</h3>
        <p>채권 시장은 하반기에 매력도가 높아질 것으로 전망됩니다. 금리 인상 사이클이 종료 단계에 접어들면서 채권 가격의 하방 리스크가 제한적이며, 현재의 높은 금리 수준은 매력적인 수익률을 제공합니다.</p>
        
        <p>피델리티의 채권 전략가 줄리안 팔머는 "2023년 하반기는 채권에 재진입하기 좋은 시기"라며 다음과 같은 전략을 제시했습니다:</p>
        <ul>
          <li>투자등급 회사채 비중 확대 (매력적인 스프레드와 안정적인 수익)</li>
          <li>단기 국채에서 중장기 국채로 듀레이션 확대 (금리 인상 사이클 종료 대비)</li>
          <li>물가연동채권(TIPS) 일부 편입 (인플레이션 헤지)</li>
        </ul>
        
        <h3>3. 대체 투자</h3>
        <p>불확실성이 높은 시기에 포트폴리오 다각화를 위한 대체 투자에 대한 관심도 높아지고 있습니다. 블랙록의 대체투자 책임자 에드윈 콘웨이는 다음과 같은 대체 투자 전략을 제안했습니다:</p>
        <ul>
          <li>금 및 귀금속 (경기 침체 및 지정학적 리스크 헤지)</li>
          <li>인프라 투자 (인플레이션 헤지 및 안정적인 현금흐름)</li>
          <li>부동산 중 데이터센터, 물류센터 등 특정 섹터 (구조적 성장 트렌드)</li>
        </ul>
        
        <h2>투자자 유형별 포트폴리오 전략</h2>
        
        <h3>보수적 투자자</h3>
        <p>경기 침체 우려가 있는 상황에서 보수적인 투자자들은 자본 보존에 중점을 두어야 합니다.</p>
        <ul>
          <li>현금 및 단기 국채: 30-40%</li>
          <li>투자등급 채권: 30-40%</li>
          <li>우량 배당주: 15-20%</li>
          <li>금 및 인프라: 5-10%</li>
        </ul>
        
        <h3>중립적 투자자</h3>
        <p>중립적인 투자자들은 위험과 수익의 균형을 맞추는 포트폴리오를 구성하는 것이 좋습니다.</p>
        <ul>
          <li>현금 및 단기 국채: 15-20%</li>
          <li>채권(투자등급 및 하이일드 혼합): 30-35%</li>
          <li>주식(배당주 및 성장주 혼합): 35-40%</li>
          <li>대체투자: 10-15%</li>
        </ul>
        
        <h3>공격적 투자자</h3>
        <p>장기적 관점에서 높은 수익을 추구하는 투자자들은 다음과 같은 포트폴리오를 고려할 수 있습니다.</p>
        <ul>
          <li>현금 및 단기 국채: 5-10%</li>
          <li>채권: 15-20%</li>
          <li>주식(성장주 중심): 55-65%</li>
          <li>대체투자: 15-20%</li>
        </ul>
        
        <h2>투자 전문가들의 조언</h2>
        
        <p><strong>하워드 막스(Oaktree Capital):</strong> "지금은 욕심을 부릴 때가 아니라 신중해야 할 때입니다. 하지만 과도한 비관론에 빠져 모든 투자 기회를 놓치는 것도 경계해야 합니다. 균형 잡힌 접근이 중요합니다."</p>
        
        <p><strong>캐시 우드(ARK Invest):</strong> "단기적인 변동성에 지나치게 반응하기보다는 혁신 기술의 장기적 성장 잠재력에 집중해야 합니다. AI, 로보틱스, 바이오테크 등의 분야는 향후 5-10년간 큰 성장이 예상됩니다."</p>
        
        <p><strong>레이 달리오(Bridgewater Associates):</strong> "현재의 경제 환경은 전통적인 60/40 포트폴리오의 한계를 보여주고 있습니다. 진정한 다각화를 위해서는 자산 클래스, 지역, 통화 등 다양한 차원에서의 분산 투자가 필요합니다."</p>
        
        <h2>결론</h2>
        
        <p>2023년 하반기는 여전히 불확실성이 높은 투자 환경이 예상됩니다. 그러나 모든 위기에는 기회가 있듯이, 신중하고 전략적인 접근을 통해 이러한 환경에서도 투자 성과를 올릴 수 있습니다. 자신의 투자 성향과 목표에 맞는 포트폴리오를 구성하고, 장기적인 관점에서 투자 원칙을 지키는 것이 중요합니다.</p>
        
        <p>무엇보다 시장의 단기적인 변동성에 과도하게 반응하기보다는, 자신만의 투자 원칙을 세우고 이를 일관되게 실행하는 것이 성공적인 투자의 핵심임을 명심해야 합니다.</p>
      `,
      category: "투자",
      author: "재테크전문가",
      date: "2023-05-18",
      thumbnail: "/placeholder.svg?height=500&width=800",
      readingTime: 7,
      views: 1245,
      likes: 87,
      comments: 24,
      tags: ["투자전략", "주식", "채권", "부동산"],
      relatedIssues: [
        { id: "4", title: "주식 투자 초보자가 꼭 알아야 할 5가지 원칙", category: "투자" },
        { id: "8", title: "소액으로 시작하는 해외 ETF 투자 전략", category: "투자" },
      ],
    },
    "2": {
      id: "2",
      title: "부업으로 월 200만원 버는 현실적인 방법",
      summary:
        "본업 외에 부업으로 월 200만원의 추가 수입을 올리는 현실적인 방법을 소개합니다. 시간 투자 대비 효율적인 부업 아이디어와 성공 사례를 분석합니다.",
      content: `
        <h2>부업, 왜 필요한가?</h2>
        <p>물가 상승, 주택 가격 상승, 노후 준비 등 다양한 이유로 본업 외 추가 수입의 필요성이 커지고 있습니다. 특히 MZ세대를 중심으로 '머니 포트폴리오'를 다각화하려는 움직임이 활발해지면서 부업에 대한 관심이 높아지고 있습니다.</p>
        
        <p>하지만 많은 사람들이 부업을 시작하려 할 때 현실적인 어려움에 부딪힙니다. 시간 부족, 초기 자본 문제, 전문 지식 부재 등이 대표적인 장벽입니다. 이 글에서는 이러한 제약 조건 속에서도 월 200만원의 추가 수입을 올릴 수 있는 현실적인 방법들을 소개합니다.</p>
        
        <h2>부업 선택 시 고려해야 할 요소</h2>
        
        <p>성공적인 부업을 위해서는 다음 요소들을 고려하여 자신에게 맞는 부업을 선택하는 것이 중요합니다:</p>
        
        <ul>
          <li><strong>시간 효율성:</strong> 투입 시간 대비 수익이 높아야 합니다.</li>
          <li><strong>지속 가능성:</strong> 일회성이 아닌 지속적인 수입을 창출할 수 있어야 합니다.</li>
          <li><strong>성장 잠재력:</strong> 시간이 지남에 따라 수입이 증가할 가능성이 있어야 합니다.</li>
          <li><strong>진입 장벽:</strong> 초기 자본이나 전문 지식의 요구 수준이 적절해야 합니다.</li>
          <li><strong>본업과의 시너지:</strong> 가능하다면 본업과 시너지를 낼 수 있는 부업이 좋습니다.</li>
        </ul>
        
        <h2>월 200만원 수익이 가능한 부업 아이디어</h2>
        
        <h3>1. 프리랜서 전문 서비스</h3>
        <p>자신의 전문 지식이나 기술을 활용한 프리랜서 활동은 시간 대비 높은 수익을 올릴 수 있는 대표적인 부업입니다.</p>
        
        <p><strong>수익 잠재력:</strong> 월 100만원~500만원+</p>
        <p><strong>필요 시간:</strong> 주 10~20시간</p>
        <p><strong>진입 난이도:</strong> 중간 (전문 지식/기술 필요)</p>
        
        <p><strong>주요 분야:</strong></p>
        <ul>
          <li>웹/앱 개발: 시간당 5~10만원</li>
          <li>디자인: 로고 디자인 30~50만원, 웹사이트 디자인 100만원+</li>
          <li>콘텐츠 제작: 전문 분야 글쓰기 원고당 10~30만원</li>
          <li>번역: 페이지당 2~5만원</li>
          <li>마케팅 컨설팅: 시간당 5~15만원</li>
        </ul>
        
        <p><strong>성공 사례:</strong> 대기업 마케팅 부서에서 근무하는 A씨는 주말과 평일 저녁 시간을 활용해 중소기업과 스타트업을 대상으로 마케팅 컨설팅을 제공하고 있습니다. 월 평균 15시간을 투자해 200~250만원의 추가 수입을 올리고 있습니다.</p>
        
        <h3>2. 디지털 콘텐츠 판매</h3>
        <p>한 번 제작한 디지털 콘텐츠를 반복적으로 판매하는 방식으로, 시간이 지날수록 수익이 증가하는 장점이 있습니다.</p>
        
        <p><strong>수익 잠재력:</strong> 월 50만원~300만원+</p>
        <p><strong>필요 시간:</strong> 초기 제작에 집중, 이후 유지 관리 시간 적음</p>
        <p><strong>진입 난이도:</strong> 중간 (콘텐츠 제작 능력 필요)</p>
        
        <p><strong>주요 분야:</strong></p>
        <ul>
          <li>온라인 강의: 강의당 50~200만원 (플랫폼에 따라 수수료 차이)</li>
          <li>전자책: 권당 10~30만원</li>
          <li>템플릿/디자인 소스: 건당 1~5만원</li>
          <li>소프트웨어/앱: 다운로드당 1~10만원</li>
          <li>스톡 포토/영상: 건당 0.1~1만원</li>
        </ul>
        
        <p><strong>성공 사례:</strong> 디자이너 B씨는 UI/UX 디자인 템플릿을 제작하여 온라인 마켓플레이스에서 판매하고 있습니다. 초기 3개월간 10개의 고품질 템플릿을 제작한 후, 지속적으로 업데이트하고 있습니다. 현재 월 평균 250만원의 수동적 수입을 올리고 있으며, 신규 템플릿 출시 시 수입이 일시적으로 300만원 이상으로 증가합니다.</p>
        
        <h3>3. 콘텐츠 크리에이터</h3>
        <p>유튜브, 블로그, 인스타그램 등 다양한 플랫폼에서 콘텐츠를 제작하고 광고 수익, 제휴 마케팅, 협찬 등을 통해 수익을 창출하는 방법입니다.</p>
        
        <p><strong>수익 잠재력:</strong> 월 50만원~무제한</p>
        <p><strong>필요 시간:</strong> 주 10~30시간</p>
        <p><strong>진입 난이도:</strong> 낮음 (진입은 쉬우나 성장에 시간 소요)</p>
        
        <p><strong>주요 플랫폼:</strong></p>
        <ul>
          <li>유튜브: 구독자 1만명 이상 시 월 100만원+ 가능</li>
          <li>블로그: 월 방문자 5만명 이상 시 월 100만원+ 가능</li>
          <li>인스타그램: 팔로워 3만명 이상 시 협찬당 50만원+ 가능</li>
          <li>뉴스레터: 구독자 5천명 이상 시 월 100만원+ 가능</li>
          <li>팟캐스트: 청취자 1만명 이상 시 월 100만원+ 가능</li>
        </ul>
        
        <p><strong>성공 사례:</strong> 직장인 C씨는 주식 투자 관련 유튜브 채널을 운영하며, 주 2회 영상을 업로드하고 있습니다. 구독자 3만명을 확보한 현재, 광고 수익과 금융 관련 제휴 마케팅을 통해 월 평균 230만원의 부수입을 올리고 있습니다.</p>
        
        <h3>4. 온라인 커머스</h3>
        <p>온라인 플랫폼을 통해 상품을 판매하거나 중개하는 방식으로, 재고 관리가 필요 없는 드롭시핑이나 제3자 물류(3PL)를 활용하면 시간 효율성을 높일 수 있습니다.</p>
        
        <p><strong>수익 잠재력:</strong> 월 100만원~500만원+</p>
        <p><strong>필요 시간:</strong> 주 10~30시간</p>
        <p><strong>진입 난이도:</strong> 중간 (초기 자본과 마케팅 지식 필요)</p>
        
        <p><strong>주요 방식:</strong></p>
        <ul>
          <li>드롭시핑: 재고 없이 판매 중개, 마진 20~40%</li>
          <li>아마존 FBA: 아마존 물류 시스템 활용, 마진 30~50%</li>
          <li>핸드메이드 제품: 개인 제작 상품 판매, 마진 50~70%</li>
          <li>중고 거래 중개: 구매-판매 차익, 수익률 20~100%</li>
          <li>디지털 상품: 소프트웨어, 게임 아이템 등, 마진 70~90%</li>
        </ul>
        
        <p><strong>성공 사례:</strong> 회사원 D씨는 퇴근 후 시간을 활용해 해외 제품을 국내에 소개하는 드롭시핑 사업을 시작했습니다. 소셜 미디어 마케팅을 통해 틈새 시장을 공략한 결과, 현재 월 평균 180~220만원의 순수익을 올리고 있습니다.</p>
        
        <h3>5. 부동산 임대 및 운영</h3>
        <p>초기 자본이 필요하지만, 일단 궤도에 오르면 적은 시간 투자로 안정적인 수익을 창출할 수 있는 방법입니다.</p>
        
        <p><strong>수익 잠재력:</strong> 월 100만원~무제한</p>
        <p><strong>필요 시간:</strong> 초기 설정 후 월 5~10시간</p>
        <p><strong>진입 난이도:</strong> 높음 (초기 자본 필요)</p>
        
        <p><strong>주요 방식:</strong></p>
        <ul>
          <li>주택 임대: 월세 수익, 수익률 연 3~5%</li>
          <li>상가 임대: 임대료 수익, 수익률 연 4~7%</li>
          <li>에어비앤비 운영: 단기 임대 수익, 수익률 연 6~12%</li>
          <li>공유 오피스 운영: 멤버십 수익, 수익률 연 8~15%</li>
          <li>주차장 운영: 시간당 주차 수익, 수익률 연 5~10%</li>
        </ul>
        
        <p><strong>성공 사례:</strong> 직장인 E씨는 대출을 활용해 소형 오피스텔 2채를 구입한 후, 에어비앤비로 운영하고 있습니다. 청소와 게스트 응대는 전문 업체에 위탁하여 시간 투자를 최소화했으며, 대출 이자를 제외한 순수익으로 월 평균 210만원을 벌고 있습니다.</p>
        
        <h2>부업 성공을 위한 5가지 핵심 전략</h2>
        
        <h3>1. 본업과의 균형 유지하기</h3>
        <p>부업은 본업에 지장을 주지 않는 선에서 진행해야 합니다. 시간 관리와 에너지 분배에 특히 신경 쓰고, 필요하다면 자동화 도구나 외주를 활용하세요.</p>
        
        <h3>2. 전문성 활용하기</h3>
        <p>가장 빠르게 수익을 창출하는 방법은 이미 보유한 전문성을 활용하는 것입니다. 본업에서 쌓은 지식과 기술을 부업에 접목하면 진입 장벽을 낮출 수 있습니다.</p>
        
        <h3>3. 점진적으로 확장하기</h3>
        <p>처음부터 큰 수익을 기대하기보다는 소규모로 시작하여 검증된 모델을 점진적으로 확장하는 전략이 위험을 줄이는 방법입니다.</p>
        
        <h3>4. 수동적 수입 모델 구축하기</h3>
        <p>시간을 직접 투자해야 하는 모델보다는, 초기에 시간과 노력을 투자한 후 지속적으로 수익이 발생하는 수동적 수입 모델을 구축하는 것이 장기적으로 유리합니다.</p>
        
        <h3>5. 세금 및 법적 고려사항 확인하기</h3>
        <p>부업 수익도 세금 신고 대상이며, 업종에 따라 사업자 등록이 필요할 수 있습니다. 세금 문제로 불이익을 받지 않도록 미리 관련 정보를 확인하세요.</p>
        
        <h2>결론</h2>
        
        <p>월 200만원의 부업 수익은 분명 도전적인 목표이지만, 적절한 전략과 꾸준한 노력을 통해 충분히 달성 가능한 목표입니다. 중요한 것은 자신의 상황과 역량에 맞는 부업을 선택하고, 장기적인 관점에서 꾸준히 발전시켜 나가는 것입니다.</p>
        
        <p>부업은 단순한 추가 수입 창출을 넘어, 새로운 경험과 기술을 습득하고 본업에서는 경험할 수 없는 다양한 기회를 제공합니다. 이러한 경험이 모여 궁극적으로는 더 큰 경제적 자유와 커리어 성장으로 이어질 수 있습니다.</p>
      `,
      category: "부업",
      author: "부업전문가",
      date: "2023-05-17",
      thumbnail: "/placeholder.svg?height=500&width=800",
      readingTime: 6,
      views: 2356,
      likes: 134,
      comments: 45,
      tags: ["부업", "프리랜서", "온라인수익", "부수입"],
      relatedIssues: [
        { id: "3", title: "개발자 취업 시장 동향: 가장 인기 있는 기술 스택", category: "개발" },
        { id: "7", title: "디지털 노마드 생활 1년 체험기: 장단점과 현실적 조언", category: "라이프스타일" },
      ],
    },
  }

  return issues[id as keyof typeof issues] || issues["1"]
}

export default function HotIssueDetailPage({ params }: { params: { id: string } }) {
  const issue = getHotIssueDetails(params.id)

  return (
    <div className="py-6">
      <Link href="/hot-issues">
        <Button variant="ghost" className="mb-4 pl-0">
          <ArrowLeft className="h-4 w-4 mr-2" />
          핫이슈 목록으로
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="section-card mb-6">
            <div className="mb-6">
              <img src={issue.thumbnail || "/placeholder.svg"} alt={issue.title} className="w-full h-auto rounded-lg" />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <Badge>{issue.category}</Badge>
              <div className="text-xs text-gray-500 flex items-center ml-auto">
                <Clock className="h-3 w-3 mr-1" />
                <span>읽는 시간: {issue.readingTime}분</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4">{issue.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{issue.summary}</p>

            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>{issue.author.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <span>{issue.author}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{issue.date}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs">조회 {issue.views}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{issue.likes}</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{issue.comments}</span>
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

            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: issue.content }} />

            {/* Ad banner in the middle of content */}
            <div className="my-6 flex justify-center">
              <GoogleAdBanner format="rectangle" />
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {issue.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  #{tag}
                </Badge>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">댓글 ({issue.comments})</h2>
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
                      <AvatarFallback>JH</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">투자자정현</span>
                        <span className="text-xs text-gray-500">2023-05-18</span>
                      </div>
                      <p className="text-sm mt-1">
                        정말 유익한 정보 감사합니다. 특히 자산별 투자 전략 부분이 도움이 많이 되었어요. 하반기에는 채권
                        비중을 좀 더 늘려볼 계획입니다.
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
                      <AvatarFallback>SY</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">경제학도소영</span>
                        <span className="text-xs text-gray-500">2023-05-17</span>
                      </div>
                      <p className="text-sm mt-1">
                        전문가들의 의견이 엇갈리는 부분이 있어서 판단이 어렵네요. 하지만 퀄리티 팩터에 집중하라는 조언은
                        정말 공감됩니다. 불확실성이 큰 시기일수록 기본에 충실한 것이 중요한 것 같아요.
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
            <h2 className="text-xl font-semibold mb-4">글 정보</h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">카테고리</div>
                <div className="font-medium">{issue.category}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">작성자</div>
                <div className="font-medium">{issue.author}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">작성일</div>
                <div className="font-medium">{issue.date}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">조회수</div>
                <div className="font-medium">{issue.views}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">읽는 시간</div>
                <div className="font-medium">{issue.readingTime}분</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">태그</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {issue.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      #{tag}
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
              {issue.relatedIssues.map((related) => (
                <Link
                  href={`/hot-issues/${related.id}`}
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
