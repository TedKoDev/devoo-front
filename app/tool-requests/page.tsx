"use client";

import type React from "react";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchToolRequests, type ToolRequest } from "@/lib/api/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, AlertCircle } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ToolRequestsPage() {
  const { isLoggedIn } = useUserStore();
  const { toast } = useToast();
  const [newToolName, setNewToolName] = useState("");
  const [newToolDescription, setNewToolDescription] = useState("");

  const { data: toolRequests = [], isLoading } = useQuery<ToolRequest[]>({
    queryKey: ["toolRequests"],
    queryFn: fetchToolRequests,
  });

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast({
        title: "로그인이 필요합니다",
        description: "툴 요청을 작성하려면 로그인해 주세요.",
        variant: "destructive",
      });
      return;
    }

    if (!newToolName.trim() || !newToolDescription.trim()) {
      toast({
        title: "입력 오류",
        description: "툴 이름과 설명을 모두 입력해 주세요.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would submit to an API
    toast({
      title: "툴 요청이 등록되었습니다",
      description: "관리자 검토 후 목록에 추가됩니다.",
    });

    setNewToolName("");
    setNewToolDescription("");
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
  const sortedRequests = toolRequests ? [...toolRequests].sort((a, b) => b.votes - a.votes) : [];

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-6">툴 요청</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
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
                  sortedRequests.map((request) => (
                    <Card key={request.id}>
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
                        <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => handleVote(request.id)}>
                          <ThumbsUp className="h-4 w-4" />
                          <span>{request.votes}</span>
                        </Button>

                        {request.status === "completed" && (
                          <Button size="sm" variant="default">
                            사용해보기
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="recent">
              <div className="space-y-4">
                {isLoading ? (
                  <p>로딩 중...</p>
                ) : (
                  [...toolRequests]
                    .sort((a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime())
                    .map((request) => (
                      <Card key={request.id}>
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
                          <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => handleVote(request.id)}>
                            <ThumbsUp className="h-4 w-4" />
                            <span>{request.votes}</span>
                          </Button>

                          {request.status === "completed" && (
                            <Button size="sm" variant="default">
                              사용해보기
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))
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
                    .map((request) => (
                      <Card key={request.id}>
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
                          <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => handleVote(request.id)}>
                            <ThumbsUp className="h-4 w-4" />
                            <span>{request.votes}</span>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
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
                    .map((request) => (
                      <Card key={request.id}>
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
                          <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => handleVote(request.id)}>
                            <ThumbsUp className="h-4 w-4" />
                            <span>{request.votes}</span>
                          </Button>

                          <Button size="sm" variant="default">
                            사용해보기
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>새 툴 요청하기</CardTitle>
              <CardDescription>개발자들이 만들어주길 원하는 툴을 요청해보세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="tool-name" className="text-sm font-medium">
                    툴 이름
                  </label>
                  <Input id="tool-name" placeholder="요청할 툴의 이름" value={newToolName} onChange={(e) => setNewToolName(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="tool-description" className="text-sm font-medium">
                    설명
                  </label>
                  <Textarea
                    id="tool-description"
                    placeholder="이 툴이 어떤 기능을 해야 하는지 설명해주세요"
                    rows={4}
                    value={newToolDescription}
                    onChange={(e) => setNewToolDescription(e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full">
                  요청하기
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <AlertCircle className="h-4 w-4 mr-2" />
                <span>투표수가 많은 툴부터 개발됩니다</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
