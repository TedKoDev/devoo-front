"use client";

import Link from "next/link";
import { ArrowRight, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import ReadingTime from "@/components/utils/ReadingTime";
import calculateReadingTime from "@/components/utils/CalculateReadingTime";
import { useDevlog } from "@/lib/hooks/useDevlogs";
import { type Devlog } from "@/lib/hooks/useDevlogs";

export default function DevLogsSection() {
  const { devlogs, isLoading } = useDevlog();

  if (isLoading || !devlogs) return null;

  return (
    <div className="section-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">개발 일지</h2>
        <Link href="/devlogs" className="text-sm text-primary flex items-center">
          더보기 <ArrowRight className="h-3 w-3 ml-1" />
        </Link>
      </div>

      <div className="space-y-3">
        {devlogs.slice(0, 3).map((log: Devlog) => (
          <Link href={`/devlogs/${log.id}`} key={log.id} className="block hover:bg-gray-50 p-2 rounded-md -mx-2 transition-colors">
            <div className="flex flex-col">
              <h3 className="font-medium text-sm">{log.title}</h3>
              <p className="text-xs text-gray-500 line-clamp-2 mt-1">{log.summary}</p>

              <div className="flex flex-wrap items-center mt-1.5 text-xs text-gray-500 gap-x-2 gap-y-1">
                <span>{log.author?.username ?? "작성자 미상"}</span>
                <span>•</span>
                <span>{new Date(log.date).toLocaleDateString("ko-KR")}</span>
                <span>•</span>
                <ReadingTime minutes={calculateReadingTime(log.content)} />
                <span>•</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-[11px]">{log.category}</span>

                {/* 반응형: 아이콘 줄바꿈 방지 및 줄일 수 있는 사이즈로 */}
                <div className="flex items-center gap-3 ml-auto">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{log.interactions.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsDown className="w-3 h-3" />
                    <span>{log.interactions.dislikes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>{log.interactions.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
