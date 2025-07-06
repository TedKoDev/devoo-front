"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import TiptapEditor from "@/components/editor/TiptapEditor";
import { useBlogPost } from "@/lib/hooks/useBlogs";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/useUserStore";
import { PublishStatus, BLOG_TYPES } from "@/types/content";
import { BlogPostRequest } from "@/lib/api/blog";
import { MultiSelect } from "@/components/ui/multi-select";

export default function CreateBlogPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { isLoggedIn, user } = useUserStore();
  const { writeBlogPost } = useBlogPost();

  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    blog_channel_id: number;
    keyword_id: number;
    publish_status: PublishStatus;
    blog_type: string;
    tag_ids: number[];
    author_id: number;
  }>({
    title: "",
    content: "",
    blog_channel_id: 1,
    keyword_id: 1,
    publish_status: PublishStatus.SUCCESS,
    blog_type: "TECH",
    tag_ids: [],
    author_id: 2,
  });

  const showLoginRequiredMessage = () => {
    toast({
      title: "로그인이 필요합니다",
      description: "블로그 글을 작성하려면 로그인해 주세요.",
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
    console.log("ddd", formData);
    if (!formData.title.trim() || !formData.content.trim() || !formData.keyword_id) {
      toast({
        title: "입력 오류",
        description: "필수 필드를 모두 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    try {
      await writeBlogPost({
        title: formData.title,
        content: formData.content,
        blog_channel_id: formData.blog_channel_id,
        keyword_id: formData.keyword_id,
        publish_status: formData.publish_status,
        blog_type: formData.blog_type,
        tag_ids: formData.tag_ids,
      });
      toast({
        title: "성공",
        description: "블로그 글이 작성되었습니다.",
      });
      router.push("/blog");
    } catch (error) {
      console.error("Error creating blog post:", error);
      toast({
        title: "오류",
        description: error instanceof Error ? error.message : "블로그 글 작성 중 오류가 발생했습니다.",
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
        <h1 className="text-2xl font-bold mb-8">새 블로그 글 작성</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>제목</Label>
            <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>발행 상태</Label>
              <Select value={formData.publish_status} onValueChange={(value) => setFormData({ ...formData, publish_status: value as PublishStatus })}>
                <SelectTrigger>
                  <SelectValue placeholder="발행 상태 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={PublishStatus.PENDING}>대기중</SelectItem>
                  <SelectItem value={PublishStatus.SUCCESS}>발행완료</SelectItem>
                  <SelectItem value={PublishStatus.FAILED}>실패</SelectItem>
                  <SelectItem value={PublishStatus.RETRYING}>재시도중</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>블로그 타입</Label>
              <Select value={formData.blog_type} onValueChange={(value) => setFormData({ ...formData, blog_type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="블로그 타입 선택" />
                </SelectTrigger>
                <SelectContent>
                  {BLOG_TYPES.filter((type) => type.id !== "ALL").map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>태그</Label>
            <MultiSelect
              options={[
                { value: 1, label: "JavaScript" },
                { value: 2, label: "TypeScript" },
                { value: 3, label: "React" },
                { value: 4, label: "Next.js" },
                { value: 5, label: "Node.js" },
                { value: 6, label: "Python" },
                { value: 7, label: "Django" },
                { value: 8, label: "Flask" },
                { value: 9, label: "AWS" },
                { value: 10, label: "Docker" },
              ]}
              value={formData.tag_ids}
              onChange={(values) => setFormData({ ...formData, tag_ids: values })}
              placeholder="태그 선택"
            />
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
