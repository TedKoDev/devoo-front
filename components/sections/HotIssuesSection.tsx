import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { HotIssue } from "@/types/content";

interface HotIssuesSectionProps {
  data: HotIssue[];
}

export default function HotIssuesSection({ data }: HotIssuesSectionProps) {
  return (
    <div className="section-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">오늘의 핫이슈</h2>
        <Link href="/hot-issues" className="text-sm text-primary flex items-center">
          더보기 <ArrowRight className="h-3 w-3 ml-1" />
        </Link>
      </div>

      {/* 없으면 빈 배열 출력 */}
      {data?.length === 0 && <div className="text-center text-gray-500 py-4">데이터가 없습니다</div>}

      {data?.length > 0 && (
        <div className="space-y-4">
          {data?.map((issue) => (
            <Link href={`/hot-issues/${issue.id}`} key={issue.id} className="block">
              <div className="flex items-start space-x-3 hover:bg-gray-50 p-2 rounded-md -mx-2">
                {issue.thumbnail && (
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded overflow-hidden">
                    <img src={issue.thumbnail || "/placeholder.svg"} alt={issue.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm line-clamp-2">{issue.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{issue.date}</p>
                  <div className="flex items-center mt-1 space-x-2">
                    {issue.tags.map((tag, index) => (
                      <span key={index} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
