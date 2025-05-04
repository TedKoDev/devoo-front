"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import TiptapEditor from "@/components/editor/TiptapEditor";
import { useDevlog } from "@/lib/hooks/useDevlogs";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/useUserStore";

export default function CreateDevlogPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { isLoggedIn } = useUserStore();
  const { writeDevlog } = useDevlog();

  const [formData, setFormData] = useState({
    title: "",
    date: new Date(),
    summary: "",
    content: "",
    category: "",
  });

  const showLoginRequiredMessage = () => {
    toast({
      title: "로그인이 필요합니다",
      description: "개발일지를 작성하려면 로그인해 주세요.",
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
      await writeDevlog(formData);
      toast({
        title: "성공",
        description: "개발일지가 작성되었습니다.",
      });
      router.push("/devlogs");
    } catch (error) {
      console.error("Error creating devlog:", error);
      toast({
        title: "오류",
        description: error instanceof Error ? error.message : "개발일지 작성 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">새 블로그 작성</h1>

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
            <Textarea value={formData.summary} onChange={(e) => setFormData({ ...formData, summary: e.target.value })} placeholder="글의 주요 내용을 간단히 요약해주세요" className="h-24" />
          </div>

          <div className="flex flex-col min-h-[500px]">
            <Label>내용</Label>
            <TiptapEditor content={formData.content} onChange={(content) => setFormData({ ...formData, content })} placeholder="내용을 입력하세요..." className="flex-1" />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              취소
            </Button>
            <Button type="submit">작성하기</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
