import Link from "next/link";
import { ArrowRight, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { GlobalIssue } from "@/types/market";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GlobalIssuesWidgetProps {
  data?: GlobalIssue[];
}

export default function GlobalIssuesWidget({ data = [] }: GlobalIssuesWidgetProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>글로벌 이슈</CardTitle>
        <Link href="/finance/global-issues" className="text-xs text-primary flex items-center">
          더보기 <ArrowRight className="h-3 w-3 ml-1" />
        </Link>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="text-center text-gray-500 py-4">데이터가 없습니다</div>
        ) : (
          <div className="space-y-3">
            {data.slice(0, 3).map((issue) => (
              <Link href={`/finance/global-issues/${issue.id}`} key={issue.id}>
                <div className="hover:bg-gray-50 p-2 rounded-md -mx-2">
                  <div className="flex items-start gap-2">
                    <div
                      className={`mt-1 p-1 rounded-full ${
                        issue.impact === "positive" ? "bg-green-100 text-green-600" : issue.impact === "negative" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {issue.impact === "positive" ? <TrendingUp className="h-3 w-3" /> : issue.impact === "negative" ? <TrendingDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium line-clamp-1">{issue.title}</h4>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{issue.summary}</p>
                      <div className="flex items-center text-xs text-gray-400 mt-1">
                        <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">{issue.category}</span>
                        <span className="mx-1">•</span>
                        <span>{issue.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
