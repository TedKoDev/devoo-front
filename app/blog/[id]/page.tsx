"use client";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Share2, Bookmark, ThumbsUp, MessageSquare, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import GoogleAdBanner from "@/components/ads/GoogleAdBanner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSingleBlogPost, useBlogPost } from "@/lib/hooks/useBlogs";
import InteractionSection from "@/components/community/InteractionSection";
import CommentSection from "@/components/community/CommentSection";
import { TargetTypes } from "@/types/content";
import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useOverlay } from "@toss/use-overlay";
import { ConfirmDialog } from "@/components/ads/Confirmdialog";

interface Keyword {
  id: number;
  text: string;
  status: string;
  priority: number | null;
  prompt_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface BlogChannel {
  id: number;
  name: string;
  platform: string;
  base_url: string;
  client_id: string | null;
  client_secret: string | null;
  access_token: string | null;
  refresh_token: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface Interactions {
  likes: number;
  dislikes: number;
  comments: number;
}

interface BlogPost {
  id: number;
  keyword_id: number;
  blog_channel_id: number;
  title: string;
  content: string;
  publish_status: string;
  published_at: string | null;
  blog_type: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  keyword: Keyword;
  blog_channel: BlogChannel;
  platform_logs: any[];
  thumbnails: any[];
  buttons: any[];
  tags: string[];
  view_count: number;
  interactions: Interactions;
  author: {
    id: number;
    username: string;
  };
}

interface TransformedBlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: {
    id: number;
    username: string;
  };
  date: string;
  tags: string[];
  thumbnail: string;
  views: number;
  likes: number;
  comments: number;
  content: string;
  relatedPosts: Array<{ id: string; title: string; category: string }>;
}

function extractFirstImageSrc(html: string): string | null {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

const getBlogPostDetails = (id: string): TransformedBlogPost | null => {
  const { blogPost } = useSingleBlogPost(id);
  console.log("blogPost", blogPost);

  if (!blogPost) {
    return null;
  }

  // Cast the blogPost to our expected type
  const typedBlogPost = blogPost as unknown as BlogPost;

  // 썸네일 우선순위: thumbnails[0]?.url > 본문 첫 이미지 > placeholder
  const thumbnail = typedBlogPost.thumbnails[0]?.url || extractFirstImageSrc(typedBlogPost.content) || "/placeholder.svg?height=400&width=800";

  return {
    id: typedBlogPost.id,
    title: typedBlogPost.title,
    excerpt: typedBlogPost.keyword.text,
    author: typedBlogPost.author,
    date: new Date(typedBlogPost.created_at).toLocaleDateString(),
    tags: typedBlogPost.tags,
    thumbnail,
    views: typedBlogPost.view_count,
    likes: typedBlogPost.interactions.likes,
    comments: typedBlogPost.interactions.comments,
    content: typedBlogPost.content,
    relatedPosts: [], // TODO: Implement related posts
  };
};

function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      alert("클립보드 복사에 실패했습니다.");
    }
  };

  return (
    <Button variant="outline" size="sm" className="flex items-center gap-1 ml-2" onClick={handleShare}>
      <Share2 className="h-4 w-4" />
      <span>{copied ? "복사됨!" : "공유"}</span>
    </Button>
  );
}

export default function BlogPostDetailPage({ params }: { params: { id: string } }) {
  const post = getBlogPostDetails(params.id);

  const { user, token } = useUserStore();
  const router = useRouter();
  const { toast } = useToast();
  const overlay = useOverlay();
  const { deleteBlogPost } = useBlogPost();

  if (!post) {
    return <div>Loading...</div>;
  }

  // 작성자만 수정/삭제 가능 (id 비교)
  const isAuthor = Number(user?.id) === post.author.id;

  const handleDelete = async () => {
    if (!token) {
      toast({ title: "오류", description: "로그인이 필요합니다.", variant: "destructive" });
      router.push("/login");
      return;
    }
    // Confirm with overlay dialog
    const confirmed = await new Promise<boolean>((resolve) => {
      overlay.open(({ isOpen, close }) => (
        <ConfirmDialog
          open={isOpen}
          onClose={() => {
            resolve(false);
            close();
          }}
          onConfirm={() => {
            resolve(true);
            close();
          }}
        />
      ));
    });
    if (!confirmed) return;
    try {
      await deleteBlogPost(post.id.toString());
      toast({ title: "성공", description: "글이 삭제되었습니다." });
      router.push("/blog");
    } catch (error) {
      toast({ title: "오류", description: "삭제 중 오류가 발생했습니다.", variant: "destructive" });
    }
  };

  return (
    <div className="py-6 min-h-screen flex flex-col">
      <Link href="/blog">
        <Button variant="ghost" className="mb-4 pl-0">
          <ArrowLeft className="h-4 w-4 mr-2" />
          블로그 목록으로
        </Button>
      </Link>

      {/* 수정/삭제 버튼 (작성자만) */}
      {isAuthor && (
        <div className="flex gap-2 mb-4">
          <Link href={`/blog/${post.id}/edit`}>
            <Button variant="outline" size="sm">
              수정
            </Button>
          </Link>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            삭제
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          <div className="section-card mb-6">
            <div className="mb-6">
              <img src={post.thumbnail} alt={post.title} className="w-full h-auto rounded-lg" />
            </div>

            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{post.author.username}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs">조회 {post.views}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* 좋아요/싫어요 인터랙션 + 공유 */}
          <div className="flex items-center gap-2 mb-4">
            <InteractionSection target_type={TargetTypes.BLOG_POST} target_id={post.id} />
            <ShareButton />
          </div>

          {/* 댓글 섹션 */}
          <CommentSection target_type={TargetTypes.BLOG_POST} target_id={post.id} />
        </div>

        <div>
          <div className="section-card mb-4 p-4">
            <h2 className="text-lg font-semibold mb-2">글 정보</h2>
            <div className="space-y-2">
              <div>
                <div className="text-xs text-gray-500">작성자</div>
                <div className="font-medium text-sm">{post.author.username}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">작성일</div>
                <div className="font-medium text-sm">{post.date}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">조회수</div>
                <div className="font-medium text-sm">{post.views}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">태그</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar ad
          <div className="mb-6">
            <GoogleAdBanner format="rectangle" />
          </div> */}

          <div className="section-card p-4">
            <h2 className="text-lg font-semibold mb-2">관련 글</h2>
            {post.relatedPosts.length === 0 ? (
              <div className="text-sm text-gray-400">관련 글이 없습니다.</div>
            ) : (
              <div className="space-y-2">
                {post.relatedPosts.map((related) => (
                  <Link href={`/blog/${related.id}`} key={related.id} className="block hover:bg-gray-50 p-2 rounded -mx-2">
                    <div className="font-medium">{related.title}</div>
                    <div className="text-xs text-gray-500">{related.category}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
