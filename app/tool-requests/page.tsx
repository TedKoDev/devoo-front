"use client";

import type React from "react";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchToolRequests, type ToolRequest } from "@/lib/api/content";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThumbsUp, Plus, MessageCircle } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ToolRequestsPage() {
  const { isLoggedIn } = useUserStore();
  const { toast } = useToast();
  const router = useRouter();

  const { data: toolRequests = [], isLoading } = useQuery<ToolRequest[]>({
    queryKey: ["toolRequests"],
    queryFn: fetchToolRequests,
  });

  const handleCreateRequest = () => {
    if (!isLoggedIn) {
      toast({
        title: "로그인이 필요합니다",
        description: "툴 요청을 작성하려면 로그인해 주세요.",
        variant: "destructive",
      });
      return;
    }

    router.push("/tool-requests/create");
  };

  const handleVote = (id: string) => {
    if (!isLoggedIn) {
      toast({
        title: "로그인이 필요합니다",
        description: "투표하려면 로그인해 주세요.",
        variant: "destructive",
      });
      return;
    }

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

  // Sort tool requests by votes (descending)
  const sortedRequests = toolRequests
    ? [...toolRequests].sort((a, b) => b.votes - a.votes)
    : [];

  const renderRequestCard = (request: ToolRequest) => (
    <Card
      key={request.id}
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => router.push(`/tool-requests/${request.id}`)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{request.name}</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              {request.requestedBy} • {request.requestedAt}
            </CardDescription>
          </div>
          {getStatusBadge(request.status)}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm">{request.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={(e) => {
              e.stopPropagation();
              handleVote(request.id);
            }}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{request.votes}</span>
          </Button>

          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <MessageCircle className="h-4 w-4" />
            <span>{request.comments}</span>
          </div>
        </div>

        {request.status === "completed" && (
          <Button
            size="sm"
            variant="default"
            onClick={(e) => e.stopPropagation()}
          >
            사용해보기
          </Button>
        )}
      </CardFooter>
    </Card>
  );

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">툴 요청</h1>
        <Button
          onClick={handleCreateRequest}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />새 툴 요청하기
        </Button>
      </div>

      <div className="w-full max-w-6xl">
        <Tabs defaultValue="popular">
          <TabsList className="mb-4">
            <TabsTrigger value="popular">인기순</TabsTrigger>
            <TabsTrigger value="recent">최신순</TabsTrigger>
            <TabsTrigger value="in-progress">개발 중</TabsTrigger>
            <TabsTrigger value="completed">완료됨</TabsTrigger>
          </TabsList>

          <TabsContent value="popular">
            <div className="space-y-4">
              {isLoading ? (
                <p>로딩 중...</p>
              ) : (
                sortedRequests.map(renderRequestCard)
              )}
            </div>
          </TabsContent>

          <TabsContent value="recent">
            <div className="space-y-4">
              {isLoading ? (
                <p>로딩 중...</p>
              ) : (
                [...toolRequests]
                  .sort(
                    (a, b) =>
                      new Date(b.requestedAt).getTime() -
                      new Date(a.requestedAt).getTime()
                  )
                  .map(renderRequestCard)
              )}
            </div>
          </TabsContent>

          <TabsContent value="in-progress">
            <div className="space-y-4">
              {isLoading ? (
                <p>로딩 중...</p>
              ) : (
                toolRequests
                  .filter((request) => request.status === "in_progress")
                  .map(renderRequestCard)
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="space-y-4">
              {isLoading ? (
                <p>로딩 중...</p>
              ) : (
                toolRequests
                  .filter((request) => request.status === "completed")
                  .map(renderRequestCard)
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
