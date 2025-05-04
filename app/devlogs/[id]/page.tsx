"use client";

import { use } from "react";
import { useSingleDevlog } from "@/lib/hooks/useDevlogs";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DevLogDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);
  const parsedId = parseInt(id, 10);

  const { devlog, isLoading, error } = useSingleDevlog(parsedId.toString());

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  if (!devlog) return <div>개발일지를 찾을 수 없습니다.</div>;

  return (
    <div className="py-6">
      <Link href="/devlogs">
        <Button variant="ghost" className="mb-4 pl-0">
          <ArrowLeft className="h-4 w-4 mr-2" />
          개발일지 목록으로
        </Button>
      </Link>

      <div className="section-card">
        <h1 className="text-2xl font-bold mb-2">{devlog.title}</h1>
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{new Date(devlog.date).toLocaleDateString("ko-KR")}</span>
          </div>
          <span>•</span>
          <span>작성자: {devlog.author.username}</span>
          <span>•</span>
          <span>카테고리: {devlog.category}</span>
        </div>

        <div className="prose max-w-none mb-6">
          <h2 className="text-xl font-semibold mb-4">요약</h2>
          <p className="text-gray-600">{devlog.summary}</p>
        </div>

        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: devlog.content }}></div>
      </div>
    </div>
  );
}
