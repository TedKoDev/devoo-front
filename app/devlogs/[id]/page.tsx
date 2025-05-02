import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DevLogDetailPage({ params }: { params: { id: string } }) {
  const id = params.id

  return (
    <div className="py-6">
      <Link href="/devlogs">
        <Button variant="ghost" className="mb-4 pl-0">
          <ArrowLeft className="h-4 w-4 mr-2" />
          개발일지 목록으로
        </Button>
      </Link>

      <div className="section-card">
        <h1 className="text-2xl font-bold">Devooup_hub 개발일지 #{id}</h1>
        <div className="flex items-center text-sm text-gray-500 mt-2 mb-6">
          <Calendar className="h-4 w-4 mr-1" />
          <span>2023-05-{id.padStart(2, "0")}</span>
        </div>

        <div className="prose max-w-none">
          <p>안녕하세요, Devooup_hub 개발팀입니다. 오늘은 개발일지 #{id}를 공유해 드립니다.</p>

          <h2>오늘의 작업 내용</h2>
          <p>
            오늘은{" "}
            {id === "1"
              ? "프로젝트 초기 설정과 기본 구조를 잡았습니다."
              : id === "2"
                ? "Next.js 앱 라우터를 적용하고 페이지 구조를 설계했습니다."
                : id === "3"
                  ? "실시간 데이터 연동 방식을 구현했습니다."
                  : id === "4"
                    ? "모바일 최적화 작업을 진행했습니다."
                    : "프로젝트의 다양한 기능을 개발했습니다."}
          </p>

          <h2>기술적 도전과 해결 방법</h2>
          <p>
            {id === "1"
              ? "프로젝트 구조를 설계하면서 확장성과 유지보수성을 고려했습니다. 특히 feature 기반 폴더 구조를 채택하여 관련 코드를 함께 관리할 수 있도록 했습니다."
              : id === "2"
                ? "Next.js 앱 라우터는 기존 페이지 라우터와 다른 점이 많아 적응하는 데 시간이 필요했습니다. 특히 서버 컴포넌트와 클라이언트 컴포넌트의 구분이 중요했습니다."
                : id === "3"
                  ? "실시간 데이터를 효율적으로 가져오기 위해 React Query를 활용했습니다. 캐싱과 재요청 전략을 최적화하여 불필요한 API 호출을 줄였습니다."
                  : id === "4"
                    ? "모바일 환경에서의 사용성을 높이기 위해 반응형 디자인을 적용했습니다. 특히 바텀 네비게이션을 추가하여 모바일에서의 탐색을 편리하게 만들었습니다."
                    : "다양한 기술적 도전을 해결하면서 프로젝트를 발전시켰습니다."}
          </p>

          <h2>다음 단계</h2>
          <p>
            다음 개발 일정은{" "}
            {id === "1"
              ? "핵심 컴포넌트 개발과 스타일링 작업입니다."
              : id === "2"
                ? "데이터 모델 설계와 API 연동 작업입니다."
                : id === "3"
                  ? "사용자 인증 시스템 구현입니다."
                  : id === "4"
                    ? "검색 기능 최적화와 필터링 기능 추가입니다."
                    : "추가 기능 개발과 성능 최적화입니다."}
          </p>

          <h2>마무리</h2>
          <p>
            오늘도 Devooup_hub 개발에 관심을 가져주셔서 감사합니다. 다음 개발일지에서 더 많은 진행 상황을 공유해
            드리겠습니다.
          </p>
        </div>
      </div>
    </div>
  )
}
