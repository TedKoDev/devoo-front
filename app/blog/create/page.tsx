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
    tag_names: string[];
    author_id: number;
  }>({
    title: "",
    content: "",
    blog_channel_id: 1,
    keyword_id: 1,
    publish_status: PublishStatus.SUCCESS,
    blog_type: "TECH",
    tag_ids: [],
    tag_names: [],
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
        tag_names: formData.tag_names,
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
                // 프론트엔드
                { value: 1, label: "JavaScript" },
                { value: 2, label: "TypeScript" },
                { value: 3, label: "React" },
                { value: 4, label: "Next.js" },
                { value: 5, label: "Vue.js" },
                { value: 6, label: "Angular" },
                { value: 7, label: "Svelte" },
                { value: 8, label: "HTML" },
                { value: 9, label: "CSS" },
                { value: 10, label: "SCSS" },
                { value: 11, label: "Tailwind CSS" },
                { value: 12, label: "Bootstrap" },
                { value: 13, label: "Redux" },
                { value: 14, label: "Zustand" },
                { value: 15, label: "GraphQL" },

                // 백엔드
                { value: 16, label: "Node.js" },
                { value: 17, label: "Python" },
                { value: 18, label: "Django" },
                { value: 19, label: "Flask" },
                { value: 20, label: "FastAPI" },
                { value: 21, label: "Java" },
                { value: 22, label: "Spring Boot" },
                { value: 23, label: "Go" },
                { value: 24, label: "Rust" },
                { value: 25, label: "PHP" },
                { value: 26, label: "Laravel" },
                { value: 27, label: "C#" },
                { value: 28, label: ".NET" },

                // 데이터베이스
                { value: 29, label: "MySQL" },
                { value: 30, label: "PostgreSQL" },
                { value: 31, label: "MongoDB" },
                { value: 32, label: "Redis" },
                { value: 33, label: "SQLite" },
                { value: 34, label: "Elasticsearch" },

                // 클라우드 & DevOps
                { value: 35, label: "AWS" },
                { value: 36, label: "Docker" },
                { value: 37, label: "Kubernetes" },
                { value: 38, label: "Azure" },
                { value: 39, label: "GCP" },
                { value: 40, label: "Vercel" },
                { value: 41, label: "Netlify" },
                { value: 42, label: "GitHub Actions" },
                { value: 43, label: "Jenkins" },
                { value: 44, label: "Terraform" },

                // 모바일 & 데스크톱
                { value: 45, label: "React Native" },
                { value: 46, label: "Flutter" },
                { value: 47, label: "Swift" },
                { value: 48, label: "Kotlin" },
                { value: 49, label: "Electron" },
                { value: 50, label: "Tauri" },

                // AI & ML
                { value: 51, label: "AI" },
                { value: 52, label: "Machine Learning" },
                { value: 53, label: "Deep Learning" },
                { value: 54, label: "TensorFlow" },
                { value: 55, label: "PyTorch" },
                { value: 56, label: "OpenAI" },
                { value: 57, label: "ChatGPT" },
                { value: 58, label: "Computer Vision" },
                { value: 59, label: "NLP" },

                // 개발 도구
                { value: 60, label: "Git" },
                { value: 61, label: "VS Code" },
                { value: 62, label: "Webpack" },
                { value: 63, label: "Vite" },
                { value: 64, label: "ESLint" },
                { value: 65, label: "Prettier" },
                { value: 66, label: "Jest" },
                { value: 67, label: "Cypress" },
                { value: 68, label: "Storybook" },

                // 기타 기술
                { value: 69, label: "WebRTC" },
                { value: 70, label: "WebSocket" },
                { value: 71, label: "PWA" },
                { value: 72, label: "Microservices" },
                { value: 73, label: "Serverless" },
                { value: 74, label: "JAMstack" },
                { value: 75, label: "Blockchain" },
                { value: 76, label: "Web3" },
                { value: 77, label: "NFT" },
                { value: 78, label: "Cryptocurrency" },

                // 비즈니스 & 커리어
                { value: 79, label: "프리랜서" },
                { value: 80, label: "스타트업" },
                { value: 81, label: "투자" },
                { value: 82, label: "마케팅" },
                { value: 83, label: "UX/UI" },
                { value: 84, label: "프로젝트 관리" },
                { value: 85, label: "애자일" },
                { value: 86, label: "스크럼" },
                { value: 87, label: "리더십" },
                { value: 88, label: "커리어" },
                { value: 89, label: "면접" },
                { value: 90, label: "이력서" },
              ]}
              value={formData.tag_ids}
              onChange={(values, labels) =>
                setFormData({
                  ...formData,
                  tag_ids: values,
                  tag_names: labels || [],
                })
              }
              placeholder="태그 선택 (쉼표로 구분하거나 직접 입력)"
              allowCustomInput={true}
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
