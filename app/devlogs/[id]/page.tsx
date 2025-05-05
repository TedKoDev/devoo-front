"use client";

import { use } from "react";
import { useSingleDevlog, useDevlog } from "@/lib/hooks/useDevlogs";
import { Calendar, ArrowLeft, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CommentSection from "@/components/community/CommentSection";
import InteractionSection from "@/components/community/InteractionSection";
import { TargetType, TargetTypes } from "@/types/content";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function DevLogDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);
  const parsedId = parseInt(id, 10);
  const { user, token } = useUserStore();
  const router = useRouter();
  const { toast } = useToast();
  const { deleteDevlog } = useDevlog();

  const { devlog, isLoading, error } = useSingleDevlog(parsedId.toString());

  const handleDelete = async () => {
    if (!token) {
      toast({
        title: "오류",
        description: "로그인이 필요합니다.",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }

    if (window.confirm("정말로 이 개발일지를 삭제하시겠습니까?")) {
      try {
        await deleteDevlog(parsedId.toString());
        toast({
          title: "성공",
          description: "개발일지가 삭제되었습니다.",
        });
        router.push("/devlogs");
      } catch (error) {
        toast({
          title: "오류",
          description: error instanceof Error ? error.message : "개발일지 삭제 중 오류가 발생했습니다.",
          variant: "destructive",
        });
      }
    }
  };

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  if (!devlog) return <div>개발일지를 찾을 수 없습니다.</div>;

  const isAuthor = user?.id === devlog.author.id;

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-4">
        <Link href="/devlogs">
          <Button variant="ghost" className="pl-0">
            <ArrowLeft className="h-4 w-4 mr-2" />
            개발일지 목록으로
          </Button>
        </Link>
        {isAuthor && (
          <div className="flex gap-2">
            <Link href={`/devlogs/${parsedId}/edit`}>
              <Button variant="outline" size="sm">
                <Pencil className="h-4 w-4 mr-2" />
                수정
              </Button>
            </Link>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              삭제
            </Button>
          </div>
        )}
      </div>
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

      <InteractionSection target_type={TargetTypes.DEV_LOG} target_id={parsedId} />

      <CommentSection target_type={TargetTypes.DEV_LOG} target_id={parsedId} />
    </div>
  );
}
