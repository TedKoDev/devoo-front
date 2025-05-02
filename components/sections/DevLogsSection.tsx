import Link from "next/link"
import { ArrowRight } from "lucide-react"
import ReadingTime from "@/components/utils/ReadingTime"

export default function DevLogsSection() {
  const devlogs = [
    {
      id: 1,
      title: "Next.js 14에서 App Router 사용하기",
      excerpt: "Next.js 14에서 새롭게 도입된 App Router의 주요 기능과 사용법을 알아봅니다.",
      author: "김개발",
      date: "2023-05-15",
      readingTime: 5,
      tags: ["Next.js", "React", "Web Development"],
    },
    {
      id: 2,
      title: "TypeScript 5.0 새로운 기능 총정리",
      excerpt: "TypeScript 5.0에서 추가된 새로운 기능들과 개선사항을 자세히 살펴봅니다.",
      author: "이타입",
      date: "2023-05-14",
      readingTime: 7,
      tags: ["TypeScript", "JavaScript", "Programming"],
    },
    {
      id: 3,
      title: "React Server Components 실전 가이드",
      excerpt: "React Server Components를 실제 프로젝트에 적용하는 방법과 주의사항을 알아봅니다.",
      author: "박리액트",
      date: "2023-05-13",
      readingTime: 8,
      tags: ["React", "Server Components", "Web Development"],
    },
  ]

  return (
    <div className="section-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">개발 일지</h2>
        <Link href="/devlogs" className="text-sm text-primary flex items-center">
          더보기 <ArrowRight className="h-3 w-3 ml-1" />
        </Link>
      </div>
      <div className="space-y-3">
        {devlogs.map((log) => (
          <Link href={`/devlogs/${log.id}`} key={log.id} className="block hover:bg-gray-50 p-2 rounded-md -mx-2">
            <div className="flex flex-col">
              <h3 className="font-medium text-sm">{log.title}</h3>
              <p className="text-xs text-gray-500 line-clamp-2 mt-1">{log.excerpt}</p>
              <div className="flex items-center mt-1.5 text-xs text-gray-500">
                <span>{log.author}</span>
                <span className="mx-1">•</span>
                <span>{log.date}</span>
                <span className="mx-1">•</span>
                <ReadingTime minutes={log.readingTime} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
