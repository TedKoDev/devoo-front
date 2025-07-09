import type { HotIssue, Tool, SideHustle, DevLog } from "@/types/content";

// Mock API for hot issues
export async function fetchHotIssues(): Promise<HotIssue[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          title: "2023년 개발자 연봉 동향: IT 업계 급여 상승세 지속",
          date: "2023-05-15",
          thumbnail: "/placeholder.svg?height=100&width=100",
          tags: ["개발", "취업"],
        },
        {
          id: "2",
          title: "부업으로 월 300만원 버는 프리랜서 개발자의 비법",
          date: "2023-05-14",
          thumbnail: "/placeholder.svg?height=100&width=100",
          tags: ["부업", "프리랜서"],
        },
        {
          id: "3",
          title:
            "주식 투자 초보자를 위한 기초 가이드: 시작하기 전 알아야 할 것들",
          date: "2023-05-13",
          thumbnail: "/placeholder.svg?height=100&width=100",
          tags: ["투자", "주식"],
        },
        {
          id: "4",
          title: "AI 기반 개발 도구로 생산성 2배 높이는 방법",
          date: "2023-05-12",
          thumbnail: "/placeholder.svg?height=100&width=100",
          tags: ["AI", "개발 도구"],
        },
      ]);
    }, 800);
  });
}

// Mock API for recommended tools
export async function fetchRecommendedTools(): Promise<Tool[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          name: "VSCode",
          description: "가장 인기 있는 코드 에디터",
          icon: "/placeholder.svg?height=40&width=40",
          rating: 4.8,
        },
        {
          id: "2",
          name: "Figma",
          description: "협업 디자인 툴",
          icon: "/placeholder.svg?height=40&width=40",
          rating: 4.7,
        },
        {
          id: "3",
          name: "Notion",
          description: "올인원 노트 및 프로젝트 관리",
          icon: "/placeholder.svg?height=40&width=40",
          rating: 4.6,
        },
        {
          id: "4",
          name: "GitHub Copilot",
          description: "AI 코드 어시스턴트",
          icon: "/placeholder.svg?height=40&width=40",
          rating: 4.5,
        },
        {
          id: "5",
          name: "Vercel",
          description: "프론트엔드 배포 플랫폼",
          icon: "/placeholder.svg?height=40&width=40",
          rating: 4.9,
        },
      ]);
    }, 700);
  });
}

// Mock API for popular side hustles
export async function fetchPopularSideHustles(): Promise<SideHustle[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          title: "프리랜서 웹 개발",
          category: "개발",
          incomeRange: "월 200~500만원",
          description: "React, Next.js 등을 활용한 웹 개발 프리랜서 일자리",
          thumbnail: "/placeholder.svg?height=100&width=100",
        },
        {
          id: "2",
          title: "주식 투자",
          category: "투자",
          incomeRange: "변동적",
          description: "장기 투자를 통한 자산 증식 방법",
          thumbnail: "/placeholder.svg?height=100&width=100",
        },
        {
          id: "3",
          title: "유튜브 채널 운영",
          category: "콘텐츠",
          incomeRange: "월 0~1000만원",
          description: "개발, 투자 관련 지식 공유 채널 운영하기",
          thumbnail: "/placeholder.svg?height=100&width=100",
        },
        {
          id: "4",
          title: "온라인 강의 제작",
          category: "교육",
          incomeRange: "월 100~300만원",
          description: "프로그래밍 강의 제작 및 판매",
          thumbnail: "/placeholder.svg?height=100&width=100",
        },
      ]);
    }, 600);
  });
}

// Mock API for dev logs
export async function fetchDevLogs(): Promise<DevLog[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          title: "Devooup_hub 프로젝트 시작",
          date: "2023-05-01",
          summary: "부업/자영업자/개발자를 위한 실용 정보 플랫폼 개발 시작",
        },
        {
          id: "2",
          title: "Next.js 앱 라우터 적용기",
          date: "2023-05-05",
          summary: "Next.js 13의 앱 라우터를 적용하면서 겪은 문제와 해결 방법",
        },
        {
          id: "3",
          title: "실시간 데이터 연동 구현",
          date: "2023-05-10",
          summary: "금 시세, 환율 등 실시간 데이터 연동 방식 구현 과정",
        },
        {
          id: "4",
          title: "모바일 최적화 작업",
          date: "2023-05-15",
          summary: "반응형 디자인과 모바일 최적화 작업 진행 내용",
        },
      ]);
    }, 500);
  });
}

export interface ToolRequest {
  id: string;
  name: string;
  description: string;
  content?: string; // 에디터로 작성한 상세 내용
  votes: number;
  status: "requested" | "in_progress" | "completed";
  requestedBy: string;
  requestedAt: string;
  comments: number;
}

export async function fetchToolRequests(): Promise<ToolRequest[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          name: "AI 코드 리뷰 도구",
          description: "코드를 자동으로 리뷰하고 개선점을 제안하는 도구",
          content: `<h2>AI 코드 리뷰 도구 상세 설명</h2>
          <p>이 도구는 다음과 같은 기능을 제공합니다:</p>
          <ul>
            <li>자동 코드 분석 및 버그 탐지</li>
            <li>코딩 스타일 및 컨벤션 검사</li>
            <li>성능 최적화 제안</li>
            <li>보안 취약점 스캔</li>
          </ul>
          <h3>기대 효과</h3>
          <p>개발 시간 단축과 코드 품질 향상을 통해 전체적인 생산성을 높일 수 있습니다.</p>`,
          votes: 156,
          status: "requested",
          requestedBy: "user123",
          requestedAt: "2023-05-01",
          comments: 23,
        },
        {
          id: "2",
          name: "주식 포트폴리오 분석기",
          description: "주식 포트폴리오의 위험도와 수익률을 분석하는 도구",
          content: `<h2>주식 포트폴리오 분석기</h2>
          <p>투자자들을 위한 종합적인 포트폴리오 분석 도구입니다.</p>
          <h3>주요 기능</h3>
          <ul>
            <li>포트폴리오 위험도 분석</li>
            <li>수익률 예측 모델링</li>
            <li>섹터별 비중 분석</li>
            <li>리밸런싱 제안</li>
          </ul>
          <blockquote>현재 개발 진행률: 70%</blockquote>`,
          votes: 98,
          status: "in_progress",
          requestedBy: "investor99",
          requestedAt: "2023-05-05",
          comments: 15,
        },
        {
          id: "3",
          name: "프리랜서 계약서 생성기",
          description: "프리랜서 개발자를 위한 계약서 템플릿 생성 도구",
          content: `<h2>프리랜서 계약서 생성기</h2>
          <p>✅ <strong>개발 완료!</strong> 이제 사용할 수 있습니다.</p>
          <h3>제공 기능</h3>
          <ul>
            <li>다양한 계약서 템플릿</li>
            <li>자동 조항 생성</li>
            <li>법적 검토 체크리스트</li>
            <li>PDF 다운로드</li>
          </ul>
          <p>프리랜서 개발자들이 안전하고 전문적인 계약을 체결할 수 있도록 도와줍니다.</p>`,
          votes: 87,
          status: "completed",
          requestedBy: "freelancer42",
          requestedAt: "2023-04-20",
          comments: 31,
        },
      ]);
    }, 800);
  });
}
