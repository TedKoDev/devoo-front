"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
import { useDevlog, type Devlog } from "@/lib/hooks/useDevlog";
import { Button } from "@/components/ui/button";

export default function DevLogsPage() {
  const { devlogs, isLoading, error } = useDevlog();

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
          <Link href={`/devlogs/${devlog.id}`} key={devlog.id} className="block">
            <div className="rounded-lg border p-5 hover:shadow-md transition-shadow bg-white">
              <h2 className="text-lg font-semibold">{devlog.title}</h2>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{new Date(devlog.date).toLocaleDateString("ko-KR")}</span>
              </div>
              <p className="text-gray-600 mt-3 line-clamp-2">{devlog.summary}</p>
              <div className="flex mt-4">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{devlog.category}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
