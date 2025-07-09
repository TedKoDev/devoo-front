"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchToolRequests, type ToolRequest } from "@/lib/api/content";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ThumbsUp,
  ArrowLeft,
  Calendar,
  User,
  MessageSquare,
} from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useToast } from "@/hooks/use-toast";
import CommentSection from "@/components/community/CommentSection";
import { TargetTypes } from "@/types/content";

export default function ToolRequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isLoggedIn } = useUserStore();
  const { toast } = useToast();
  const [isVoted, setIsVoted] = useState(false);

  const { data: toolRequests = [], isLoading } = useQuery<ToolRequest[]>({
    queryKey: ["toolRequests"],
    queryFn: fetchToolRequests,
  });

  const toolRequest = toolRequests.find((request) => request.id === params.id);

  const handleVote = () => {
    if (!isLoggedIn) {
      toast({
        title: "로그인이 필요합니다",
        description: "투표하려면 로그인해 주세요.",
        variant: "destructive",
      });
      return;
    }

    if (isVoted) {
      toast({
        title: "이미 투표했습니다",
        description: "한 사용자당 하나의 투표만 가능합니다.",
        variant: "destructive",
      });
      return;
    }

    setIsVoted(true);
    toast({
      title: "투표가 완료되었습니다",
      description: "해당 툴 요청에 투표했습니다.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "requested":
        return <Badge variant="outline">요청됨</Badge>;
      case "in_progress":
        return <Badge variant="secondary">개발 중</Badge>;
      case "completed":
        return <Badge variant="default">완료됨</Badge>;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="py-6">
        <div className="max-w-4xl mx-auto">
          <p>로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!toolRequest) {
    return (
      <div className="py-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-500">
                요청된 툴을 찾을 수 없습니다.
              </p>
              <div className="flex justify-center mt-4">
                <Button
                  onClick={() => router.push("/tool-requests")}
                  variant="outline"
                >
                  목록으로 돌아가기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-4xl mx-auto">
        {/* 뒤로가기 버튼 */}
        <div className="mb-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/tool-requests")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            목록으로 돌아가기
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">
                  {toolRequest.name}
                </CardTitle>
                <CardDescription className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {toolRequest.requestedBy}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {toolRequest.requestedAt}
                  </div>
                </CardDescription>
              </div>
              {getStatusBadge(toolRequest.status)}
            </div>
          </CardHeader>

          <CardContent>
            {/* 요약 설명 */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">요약</h3>
              <p className="text-gray-700">{toolRequest.description}</p>
            </div>

            {/* 상세 내용 */}
            {toolRequest.content && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3">상세 설명</h3>
                <div className="prose prose-sm max-w-none">
                  <div
                    dangerouslySetInnerHTML={{ __html: toolRequest.content }}
                  />
                </div>
              </div>
            )}

            {/* 투표 및 액션 버튼 */}
            <div className="flex justify-between items-center pt-4 border-t">
              <Button
                variant={isVoted ? "secondary" : "outline"}
                onClick={handleVote}
                className="flex items-center gap-2"
                disabled={isVoted}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{toolRequest.votes + (isVoted ? 1 : 0)}</span>
                <span>{isVoted ? "투표함" : "투표하기"}</span>
              </Button>

              <div className="flex gap-2">
                {toolRequest.status === "completed" && (
                  <Button size="sm" variant="default">
                    사용해보기
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <MessageSquare className="h-4 w-4" />
                  댓글
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 댓글 섹션 */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <CommentSection
              target_type={TargetTypes.TOOL_REQUEST}
              target_id={parseInt(toolRequest.id)}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
