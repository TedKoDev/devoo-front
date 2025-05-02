import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock blog posts
const mockBlogPosts = [
  {
    id: "1",
    title: "Devooup_hub 개발 시작: 부업과 개발을 위한 플랫폼",
    excerpt: "부업과 개발 정보를 한 곳에서 제공하는 Devooup_hub 프로젝트를 시작하게 된 배경과 목표에 대해 소개합니다.",
    author: "Devooup Team",
    date: "2023-05-01",
    tags: ["개발일지", "프로젝트 소개"],
    thumbnail: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "2",
    title: "Next.js 앱 라우터로 개발하기: 장단점과 실전 팁",
    excerpt:
      "Next.js의 새로운 앱 라우터를 사용하여 Devooup_hub를 개발하면서 경험한 장단점과 실전에서 유용한 팁을 공유합니다.",
    author: "개발자 김철수",
    date: "2023-05-05",
    tags: ["Next.js", "개발 팁"],
    thumbnail: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "3",
    title: "프리랜서 개발자로 시작하는 방법: 첫 발걸음",
    excerpt:
      "프리랜서 개발자로 커리어를 시작하려는 분들을 위한 가이드. 필요한 준비물부터 첫 프로젝트 수주까지의 과정을 설명합니다.",
    author: "프리랜서 박지민",
    date: "2023-05-10",
    tags: ["프리랜서", "부업"],
    thumbnail: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "4",
    title: "개발자를 위한 투자 전략: 시간과 돈 모두 관리하기",
    excerpt: "바쁜 개발자들이 효율적으로 자산을 관리하고 투자할 수 있는 전략과 팁을 소개합니다.",
    author: "투자 전문가 이영희",
    date: "2023-05-15",
    tags: ["투자", "자산관리"],
    thumbnail: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "5",
    title: "React와 TypeScript로 더 안전한 코드 작성하기",
    excerpt: "React와 TypeScript를 함께 사용하여 더 안정적이고 유지보수하기 쉬운 코드를 작성하는 방법을 알아봅니다.",
    author: "시니어 개발자 홍길동",
    date: "2023-05-20",
    tags: ["React", "TypeScript", "개발 팁"],
    thumbnail: "/placeholder.svg?height=400&width=600",
  },
]

export default function BlogPage() {
  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-6">블로그</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockBlogPosts.map((post) => (
          <Link href={`/blog/${post.id}`} key={post.id}>
            <article className="section-card hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full">
              <div className="h-48 overflow-hidden">
                <img
                  src={post.thumbnail || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4 flex-1">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href="/blog/archive" className="inline-flex items-center text-primary">
          더 많은 글 보기
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
