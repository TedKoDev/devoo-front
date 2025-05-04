"use client";
import { Calendar, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useDevlog, type Devlog } from "@/lib/hooks/useDevlogs";
import { Button } from "@/components/ui/button";
import ReadingTime from "@/components/utils/ReadingTime";
import calculateReadingTime from "@/components/utils/CalculateReadingTime";
import { useRouter } from "next/navigation";

export default function DevLogsPage() {
  const { devlogs, isLoading, error } = useDevlog();
  const router = useRouter();

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">개발일지</h1>
        <Link href="/devlogs/create">
          <Button>새 개발일지 작성</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {devlogs?.map((devlog: Devlog) => (
          <div key={devlog.id} onClick={() => router.push(`/devlogs/${devlog.id}`)} className="cursor-pointer rounded-lg border p-5 hover:shadow-md transition-shadow bg-white">
            <h2 className="text-lg font-semibold">{devlog.title}</h2>

            <div className="flex items-center text-sm text-gray-500 mt-1 gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(devlog.date).toLocaleDateString("ko-KR")}</span>
              <span>•</span>
              <ReadingTime minutes={calculateReadingTime(devlog.content)} />
            </div>

            <p className="text-gray-600 mt-3 line-clamp-2">{devlog.summary}</p>

            <div className="flex mt-4 justify-between items-center">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{devlog.category}</span>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" /> {devlog.interactions.likes}
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsDown className="w-4 h-4" /> {devlog.interactions.dislikes}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" /> {devlog.interactions.comments}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
