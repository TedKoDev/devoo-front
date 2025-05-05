// app/(private)/devlogs/[id]/edit/page.tsx

"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import TiptapEditor from "@/components/editor/TiptapEditor";
import { useDevlog, useSingleDevlog } from "@/lib/hooks/useDevlogs";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/useUserStore";

export default function EditDevlogPage({ params }: { params: { id: string } }) {
  const parsedId = parseInt(params.id, 10);
  const router = useRouter();
  const { toast } = useToast();
  const { isLoggedIn } = useUserStore();
  const { updateDevlog } = useDevlog();
  const { devlog, isLoading, error } = useSingleDevlog(parsedId.toString());

  console.log("devlog received from API:", devlog);

  // devlog가 로드되면 초기값을 설정합니다.
  const [formData, setFormData] = useState({
    title: devlog?.title || "",
    date: devlog?.date ? new Date(devlog.date) : new Date(),
    summary: devlog?.summary || "",
    content: devlog?.content || "",
    category: devlog?.category || "",
  });

  useEffect(() => {
    console.log("useEffect triggered, devlog:", devlog);
    if (devlog) {
      console.log("Setting form data with devlog:", devlog);
      setFormData({
        title: devlog.title ?? "",
        date: new Date(devlog.date),
        summary: devlog.summary ?? "",
        content: devlog.content ?? "",
        category: devlog.category ?? "",
      });
      console.log("Form data set to:", {
        title: devlog.title ?? "",
        date: new Date(devlog.date),
        summary: devlog.summary ?? "",
        content: devlog.content ?? "",
        category: devlog.category ?? "",
      });
    }
  }, [devlog, devlog?.title, devlog?.date, devlog?.summary, devlog?.content, devlog?.category]);

  // 폼 데이터 값 변경 시 로그 추가
  useEffect(() => {
    console.log("Current formData:", formData);
  }, [formData]);

  const showLoginRequiredMessage = () => {
    toast({
      title: "로그인이 필요합니다",
      description: "개발일지를 수정하려면 로그인해 주세요.",
      variant: "destructive",
    });
    router.push("/login");
  };

  useEffect(() => {
    if (!isLoggedIn) {
      showLoginRequiredMessage();
    }
  }, [isLoggedIn]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      showLoginRequiredMessage();
      return;
    }

    if (!formData.title.trim() || !formData.content.trim() || !formData.category || !formData.summary.trim()) {
      toast({
        title: "입력 오류",
        description: "모든 필드를 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateDevlog({ ...formData, id: parsedId.toString() });
      toast({
        title: "성공",
        description: "개발일지가 수정되었습니다.",
      });
      router.push(`/devlogs/${parsedId}`);
    } catch (error) {
      console.error("Error updating devlog:", error);
      toast({
        title: "오류",
        description: error instanceof Error ? error.message : "개발일지 수정 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  if (!devlog) return <div>개발일지를 찾을 수 없습니다.</div>;
  if (!isLoggedIn) return null;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">개발일지 수정</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>제목</Label>
              <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
            </div>
            <div>
              <Label>카테고리</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="개발">개발</SelectItem>
                  <SelectItem value="디자인">디자인</SelectItem>
                  <SelectItem value="비지니스">비즈니스</SelectItem>
                  <SelectItem value="기타">기타</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>요약</Label>
            <Textarea value={formData.summary} onChange={(e) => setFormData({ ...formData, summary: e.target.value })} className="h-24" />
          </div>

          <div className="flex flex-col min-h-[500px]">
            <Label>내용</Label>
            {formData.content && <TiptapEditor content={formData.content} onChange={(content) => setFormData({ ...formData, content })} />}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              취소
            </Button>
            <Button type="submit">수정하기</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
