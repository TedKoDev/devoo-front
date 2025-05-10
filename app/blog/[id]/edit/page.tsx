"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import TiptapEditor from "@/components/editor/TiptapEditor";
import { useToast } from "@/hooks/use-toast";
import { useSingleBlogPost, useBlogPost } from "@/lib/hooks/useBlogs";
import { useUserStore } from "@/store/useUserStore";
// TODO: Replace with your actual blog API import
// import { blogApi } from "@/lib/api/blog";

export default function BlogEditPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const { user, token } = useUserStore();
  const { blogPost, isLoading } = useSingleBlogPost(params.id as string);
  const { updateBlogPost } = useBlogPost();
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  // Fetch the blog post data
  useEffect(() => {
    if (blogPost) {
      setTitle(blogPost.title);
      setContent(blogPost.content || "");
      setTags(blogPost.tags || []);
    }
  }, [blogPost]);

  const handleSave = async () => {
    if (!token) {
      toast({ title: "오류", description: "로그인이 필요합니다.", variant: "destructive" });
      router.push("/login");
      return;
    }

    setSaving(true);
    try {
      await updateBlogPost({
        id: params.id as string,
        data: {
          title,
          content,
          tags,
          keyword_id: blogPost?.keyword_id || 0,
          blog_channel_id: blogPost?.blog_channel_id || 0,
        },
      });
      toast({ title: "수정 완료", description: "블로그 글이 수정되었습니다." });
      router.push(`/blog/${params.id}`);
    } catch (e) {
      toast({ title: "수정 실패", description: "블로그 글 수정에 실패했습니다.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) return <div>로딩중...</div>;
  if (!blogPost) return <div>블로그 글을 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">블로그 글 수정</h1>
      <div className="mb-4">
        <label className="block mb-1 font-medium">제목</label>
        <input className="w-full border rounded px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">내용</label>
        <TiptapEditor content={content} onChange={setContent} />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">태그 (쉼표로 구분)</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={tags.join(", ")}
          onChange={(e) =>
            setTags(
              e.target.value
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean)
            )
          }
        />
      </div>
      <Button onClick={handleSave} disabled={saving}>
        {saving ? "저장 중..." : "저장하기"}
      </Button>
    </div>
  );
}
