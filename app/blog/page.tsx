"use client";

import Link from "next/link";
import { Calendar, User, ArrowRight, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useBlogPost } from "@/lib/hooks/useBlogs";
import { BlogPostResponse } from "@/lib/api/blog";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { BLOG_TYPES } from "@/types/content";

const getBlogTypeLabel = (type: string | undefined) => {
  const found = BLOG_TYPES.find((t) => t.id === type);
  return found ? { label: found.label, color: found.color } : { label: "기타", color: "default" };
};

export default function BlogPage() {
  const { user } = useUserStore();
  const { blogPosts = [] } = useBlogPost();

  console.log("blogPosts", blogPosts);

  const [activeTab, setActiveTab] = useState("ALL");

  const filteredPosts = activeTab === "ALL" ? blogPosts : blogPosts.filter((post) => post.blog_type === activeTab);

  const getThumbnailUrl = (post: BlogPostResponse) => {
    // Extract first image from content if it exists
    const content = post.content || "";
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }

    return "/placeholder.svg";
  };

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">블로그</h1>
        {user?.username === "devoong" && (
          <Link href="/blog/create">
            <Button>새 블로그 글 작성</Button>
          </Link>
        )}
      </div>

      {/* Blog Type Tabs */}
      <div className="border-b mb-6">
        <div className="flex space-x-4">
          {BLOG_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveTab(type.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
                activeTab === type.id ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.length === 0 ? (
          <div className="col-span-2 text-center py-8 text-gray-500">해당 카테고리의 글이 없습니다.</div>
        ) : (
          filteredPosts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id}>
              <article className="section-card hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full">
                <div className="h-48 overflow-hidden">
                  <img src={getThumbnailUrl(post)} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant="outline"
                      className={cn("text-xs", {
                        "border-blue-500 text-blue-500": getBlogTypeLabel(post.blog_type).color === "blue",
                        "border-green-500 text-green-500": getBlogTypeLabel(post.blog_type).color === "green",
                        "border-purple-500 text-purple-500": getBlogTypeLabel(post.blog_type).color === "purple",
                        "border-orange-500 text-orange-500": getBlogTypeLabel(post.blog_type).color === "orange",
                        "border-red-500 text-red-500": getBlogTypeLabel(post.blog_type).color === "red",
                        "border-yellow-500 text-yellow-500": getBlogTypeLabel(post.blog_type).color === "yellow",
                      })}
                    >
                      {getBlogTypeLabel(post.blog_type).label}
                    </Badge>
                  </div>
                  <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4 flex-1">{post.content?.replace(/<[^>]*>/g, "").substring(0, 150)}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags?.map((tag) => (
                      <Badge key={tag.id} variant="secondary">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        <span>{post.author?.username || "Unknown"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>
                          <ThumbsUp className="h-4 w-4 inline mr-1" /> {post.interactions?.likes || 0}
                        </span>
                        <span>
                          <ThumbsDown className="h-4 w-4 inline mr-1" /> {post.interactions?.dislikes || 0}
                        </span>
                        <span>
                          <MessageSquare className="h-4 w-4 inline mr-1" /> {post.interactions?.comments || 0}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))
        )}
      </div>

      {/* <div className="mt-8 text-center">
        <Link href="/blog/archive" className="inline-flex items-center text-primary">
          더 많은 글 보기
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div> */}
    </div>
  );
}
