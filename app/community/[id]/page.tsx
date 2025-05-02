import Link from "next/link"
import { ArrowLeft, ThumbsUp, MessageSquare, Share2, Bookmark } from "lucide-react"
import ReadingTime from "@/components/utils/ReadingTime"
import CommentSection from "@/components/community/CommentSection"

interface PageProps {
  params: {
    id: string
  }
}

export default function CommunityDetailPage({ params }: PageProps) {
  const postId = Number.parseInt(params.id)

  // 실제 구현에서는 ID를 기반으로 데이터를 가져와야 합니다
  const post = {
    id: postId,
    title:
      postId === 1
        ? "Next.js와 TypeScript로 블로그 만들기"
        : postId === 2
          ? "주니어 개발자의 첫 이직 경험담"
          : "프리랜서 개발자로 살아남기",
    content: `
      <p>안녕하세요, 이번 글에서는 제가 최근에 경험한 내용을 공유하려고 합니다.</p>
      
      <h2>시작하게 된 계기</h2>
      <p>개발자로서 항상 새로운 기술과 도구를 배우는 것은 중요합니다. 특히 웹 개발 분야에서는 기술의 변화 속도가 매우 빠르기 때문에, 최신 트렌드를 따라가는 것이 필수적입니다.</p>
      
      <p>Next.js는 React 기반의 프레임워크로, 서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)을 쉽게 구현할 수 있게 해줍니다. TypeScript는 JavaScript에 타입 시스템을 추가하여 개발 경험을 향상시키고 버그를 줄이는 데 도움을 줍니다.</p>
      
      <h2>주요 기능 구현</h2>
      <p>블로그를 만들면서 가장 중점을 둔 부분은 다음과 같습니다:</p>
      
      <ul>
        <li>SEO 최적화: Next.js의 메타데이터 API를 활용하여 각 페이지의 SEO를 최적화했습니다.</li>
        <li>마크다운 지원: 마크다운으로 글을 작성하고 렌더링할 수 있도록 구현했습니다.</li>
        <li>코드 하이라이팅: 기술 블로그에 필수적인 코드 하이라이팅 기능을 추가했습니다.</li>
        <li>반응형 디자인: 모바일부터 데스크톱까지 다양한 화면 크기에 대응하는 디자인을 적용했습니다.</li>
      </ul>
      
      <h2>배운 점과 어려웠던 점</h2>
      <p>이 프로젝트를 통해 Next.js의 App Router와 TypeScript의 고급 기능들을 깊이 이해할 수 있었습니다. 특히 타입 안전성을 유지하면서 동적 라우팅을 구현하는 부분에서 많은 것을 배웠습니다.</p>
      
      <p>가장 어려웠던 점은 서버 컴포넌트와 클라이언트 컴포넌트의 경계를 명확히 구분하고, 각각의 특성에 맞게 코드를 구성하는 것이었습니다. 초기에는 이 개념에 적응하는 데 시간이 걸렸지만, 점차 익숙해지면서 효율적인 코드 구조를 만들 수 있었습니다.</p>
      
      <h2>결론</h2>
      <p>Next.js와 TypeScript의 조합은 현대적인 웹 애플리케이션을 개발하는 데 매우 강력한 도구입니다. 특히 블로그와 같은 콘텐츠 중심의 웹사이트를 만들 때 그 장점이 더욱 두드러집니다.</p>
      
      <p>이 글이 Next.js와 TypeScript를 시작하려는 분들께 도움이 되었으면 좋겠습니다. 질문이나 의견이 있으시면 댓글로 남겨주세요!</p>
    `,
    author: postId === 1 ? "김개발" : postId === 2 ? "이주니어" : "박프리",
    authorImage: "/placeholder.svg?height=50&width=50",
    authorIp: "123.456.789.012",
    date: "2023-05-15",
    readingTime: 8,
    comments: 12,
    likes: 34,
    tags: ["Next.js", "TypeScript", "블로그"],
    relatedPosts: [
      {
        id: postId === 1 ? 2 : 1,
        title: postId === 1 ? "주니어 개발자의 첫 이직 경험담" : "Next.js와 TypeScript로 블로그 만들기",
      },
      { id: 3, title: "프리랜서 개발자로 살아남기" },
      { id: 4, title: "React와 상태 관리 라이브러리 비교" },
    ],
  }

  // 댓글 데이터
  const mockComments = [
    {
      id: "1",
      content: "정말 유익한 글이네요! Next.js와 TypeScript 조합에 대해 많이 배웠습니다.",
      author: "개발자준",
      authorImage: "/placeholder.svg?height=40&width=40",
      date: "2023-05-18",
      ip: "123.456.789.101",
      likes: 5,
    },
    {
      id: "2",
      content: "코드 예제도 함께 공유해주시면 더 좋을 것 같아요.",
      author: "코딩맘",
      authorImage: "/placeholder.svg?height=40&width=40",
      date: "2023-05-17",
      ip: "123.456.789.102",
      likes: 3,
    },
    {
      id: "3",
      content: "저도 비슷한 프로젝트를 진행 중인데, 많은 도움이 되었습니다. 감사합니다!",
      author: "웹개발러",
      authorImage: "/placeholder.svg?height=40&width=40",
      date: "2023-05-16",
      ip: "123.456.789.103",
      likes: 2,
    },
  ]

  return (
    <div className="py-6">
      <Link href="/community" className="flex items-center text-sm text-gray-600 mb-6 hover:text-primary">
        <ArrowLeft className="h-4 w-4 mr-1" /> 커뮤니티로 돌아가기
      </Link>

      <article className="bg-white rounded-lg border border-gray-200 p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center mb-4">
            <img
              src={post.authorImage || "/placeholder.svg"}
              alt={post.author}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <div className="font-medium">{post.author}</div>
              <div className="text-xs text-gray-500 flex items-center gap-2">
                <span>{post.date}</span>
                <span className="text-gray-400">IP: {post.authorIp.replace(/\d+$/, "xxx")}</span>
                <span>•</span>
                <ReadingTime minutes={post.readingTime} />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="flex items-center justify-between border-t border-b border-gray-200 py-4 my-6">
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-sm text-gray-600 hover:text-primary">
              <ThumbsUp className="h-4 w-4 mr-1" /> 좋아요 {post.likes}
            </button>
            <button className="flex items-center text-sm text-gray-600 hover:text-primary">
              <MessageSquare className="h-4 w-4 mr-1" /> 댓글 {post.comments}
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-sm text-gray-600 hover:text-primary">
              <Share2 className="h-4 w-4 mr-1" /> 공유하기
            </button>
            <button className="flex items-center text-sm text-gray-600 hover:text-primary">
              <Bookmark className="h-4 w-4 mr-1" /> 저장
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">관련 글</h3>
          <div className="space-y-2">
            {post.relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/community/${relatedPost.id}`}
                className="block p-3 border border-gray-200 rounded-md hover:bg-gray-50"
              >
                {relatedPost.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <CommentSection comments={mockComments} postId={post.id.toString()} />
        </div>
      </article>
    </div>
  )
}
