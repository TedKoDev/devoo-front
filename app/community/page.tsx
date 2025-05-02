import Link from "next/link"
import ReadingTime from "@/components/utils/ReadingTime"

export default function CommunityPage() {
  const posts = [
    {
      id: 1,
      title: "Next.js와 TypeScript로 블로그 만들기",
      excerpt:
        "Next.js와 TypeScript를 사용하여 개인 블로그를 만드는 과정을 공유합니다. SEO 최적화와 성능 개선에 중점을 두었습니다.",
      author: "김개발",
      date: "2023-05-15",
      readingTime: 8,
      comments: 12,
      likes: 34,
      tags: ["Next.js", "TypeScript", "블로그"],
    },
    {
      id: 2,
      title: "주니어 개발자의 첫 이직 경험담",
      excerpt: "개발자로 첫 회사에서 1년을 보내고 이직을 결심하게 된 이유와 이직 과정에서 겪은 경험을 공유합니다.",
      author: "이주니어",
      date: "2023-05-14",
      readingTime: 6,
      comments: 28,
      likes: 56,
      tags: ["이직", "커리어", "개발자"],
    },
    {
      id: 3,
      title: "프리랜서 개발자로 살아남기",
      excerpt: "3년차 프리랜서 개발자로서 겪은 경험과 노하우, 그리고 주의해야 할 점들을 공유합니다.",
      author: "박프리",
      date: "2023-05-13",
      readingTime: 10,
      comments: 15,
      likes: 42,
      tags: ["프리랜서", "원격근무", "개발자"],
    },
    {
      id: 4,
      title: "React와 상태 관리 라이브러리 비교",
      excerpt: "Redux, Recoil, Zustand, Jotai 등 다양한 상태 관리 라이브러리의 장단점을 비교 분석합니다.",
      author: "최리액트",
      date: "2023-05-12",
      readingTime: 7,
      comments: 9,
      likes: 28,
      tags: ["React", "상태관리", "Redux"],
    },
    {
      id: 5,
      title: "개발자의 효율적인 시간 관리법",
      excerpt: "업무 효율을 높이고 번아웃을 방지하기 위한 개발자 맞춤형 시간 관리 방법을 소개합니다.",
      author: "정시간",
      date: "2023-05-11",
      readingTime: 5,
      comments: 7,
      likes: 19,
      tags: ["생산성", "시간관리", "개발자"],
    },
  ]

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">커뮤니티</h1>
        <Link href="/community/write" className="btn-primary">
          글쓰기
        </Link>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            href={`/community/${post.id}`}
            key={post.id}
            className="block bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <div className="p-4">
              <h2 className="text-lg font-medium mb-2">{post.title}</h2>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>

              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag) => (
                  <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center text-xs text-gray-500">
                <span>{post.author}</span>
                <span className="mx-1">•</span>
                <span>{post.date}</span>
                <span className="mx-1">•</span>
                <ReadingTime minutes={post.readingTime} />
                <span className="mx-1">•</span>
                <span>댓글 {post.comments}</span>
                <span className="mx-1">•</span>
                <span>좋아요 {post.likes}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
