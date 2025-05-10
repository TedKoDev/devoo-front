"use client";

import Link from "next/link";
import { ArrowRight, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import ReadingTime from "@/components/utils/ReadingTime";
import calculateReadingTime from "@/components/utils/CalculateReadingTime";
import { useBlogPost } from "@/lib/hooks/useBlogs";
import { type BlogPostResponse } from "@/lib/api/blog";
import Image from "next/image";

export default function BlogSection() {
  const { blogPosts, isLoading } = useBlogPost();
  console.log(blogPosts);

  if (isLoading || !blogPosts) return null;

  const getThumbnailUrl = (content: string | undefined) => {
    if (!content) return null;
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
    return imgMatch ? imgMatch[1] : null;
  };

  return (
    <div className="section-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">블로그</h2>
        <Link href="/blogs" className="text-sm text-primary flex items-center">
          더보기 <ArrowRight className="h-3 w-3 ml-1" />
        </Link>
      </div>

      <div className="space-y-3">
        {blogPosts.slice(0, 3).map((blog: BlogPostResponse) => {
          const thumbnailUrl = getThumbnailUrl(blog.content);
          return (
            <Link href={`/blogs/${blog.id}`} key={blog.id} className="block hover:bg-gray-50 p-2 rounded-md -mx-2 transition-colors">
              <div className="flex gap-3">
                {thumbnailUrl && (
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image src={thumbnailUrl} alt={blog.title} fill className="object-cover rounded-md" />
                  </div>
                )}
                <div className="flex flex-col flex-1 min-w-0">
                  <h3 className="font-medium text-sm">{blog.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1">{blog.content?.replace(/<[^>]*>/g, "").slice(0, 100)}</p>

                  <div className="flex flex-wrap items-center mt-1.5 text-xs text-gray-500 gap-x-2 gap-y-1">
                    <span>{blog.author?.username ?? "작성자 미상"}</span>
                    <span>•</span>
                    <span>{new Date(blog.created_at).toLocaleDateString("ko-KR")}</span>
                    <span>•</span>
                    <ReadingTime minutes={calculateReadingTime(blog.content || "")} />
                    <span>•</span>
                    <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-[11px]">{blog.blog_type || "기타"}</span>

                    <div className="flex items-center gap-3 ml-auto">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        <span>{blog.interactions.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsDown className="w-3 h-3" />
                        <span>{blog.interactions.dislikes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{blog.interactions.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
