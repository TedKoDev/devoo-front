"use client";

import { useState } from "react";
import { MessageCircle, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp } from "lucide-react";
import { useComments } from "@/lib/hooks/useComments";
import { useInteractions } from "@/lib/hooks/useInteractions";
import { TargetType, TargetTypes } from "@/types/content";

interface CommentProps {
  comment: {
    id: number;
    author: string;
    content: string;
    createdAt: string;
  };
  isExpanded: boolean;
  onToggleExpand: () => void;
}

function Comment({ comment, isExpanded, onToggleExpand }: CommentProps) {
  const interactions = useInteractions(TargetTypes.COMMENT, comment.id);
  const { counts, userInteractions } = interactions;

  const handleLike = () => {
    if (userInteractions.hasLiked) {
      interactions.removeLike({ target_type: TargetTypes.COMMENT, target_id: comment.id });
    } else {
      if (userInteractions.hasDisliked) {
        interactions.removeDislike({ target_type: TargetTypes.COMMENT, target_id: comment.id });
      }
      interactions.addLike({ target_type: TargetTypes.COMMENT, target_id: comment.id });
    }
  };

  const handleDislike = () => {
    if (userInteractions.hasDisliked) {
      interactions.removeDislike({ target_type: TargetTypes.COMMENT, target_id: comment.id });
    } else {
      if (userInteractions.hasLiked) {
        interactions.removeLike({ target_type: TargetTypes.COMMENT, target_id: comment.id });
      }
      interactions.addDislike({ target_type: TargetTypes.COMMENT, target_id: comment.id });
    }
  };

  const isLongComment = (content: string) => {
    return content.split("\n").length > 5;
  };

  const shouldShowExpand = isLongComment(comment.content);
  const displayContent = shouldShowExpand && !isExpanded ? comment.content.split("\n").slice(0, 5).join("\n") + "..." : comment.content;

  return (
    <div className="border p-3 rounded-md bg-gray-50">
      <div className="flex justify-between items-start">
        <div className="text-sm font-medium">{comment.author}</div>
        <div className="flex items-center gap-2">
          <button className={`flex items-center gap-1 ${userInteractions.hasLiked ? "text-blue-600" : "text-gray-500 hover:text-blue-600"}`} onClick={handleLike}>
            <ThumbsUp className="w-4 h-4" />
            <span className="text-xs">{counts.likes}</span>
          </button>
          <button className={`flex items-center gap-1 ${userInteractions.hasDisliked ? "text-red-600" : "text-gray-500 hover:text-red-600"}`} onClick={handleDislike}>
            <ThumbsDown className="w-4 h-4" />
            <span className="text-xs">{counts.dislikes}</span>
          </button>
        </div>
      </div>
      <div className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{displayContent}</div>
      {shouldShowExpand && (
        <button className="text-xs text-blue-600 hover:text-blue-800 mt-1 flex items-center gap-1" onClick={onToggleExpand}>
          {isExpanded ? (
            <>
              접기 <ChevronUp className="w-3 h-3" />
            </>
          ) : (
            <>
              펼쳐보기 <ChevronDown className="w-3 h-3" />
            </>
          )}
        </button>
      )}
      <div className="text-xs text-gray-400 mt-1">{new Date(comment.createdAt).toLocaleString("ko-KR")}</div>
    </div>
  );
}

export default function CommentSection({ target_type, target_id }: { target_type: TargetType; target_id: number }) {
  const { comments, isLoading, createComment } = useComments(target_type, target_id);
  const [newComment, setNewComment] = useState("");
  const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert("댓글을 입력해주세요.");
      return;
    }
    try {
      await createComment(newComment);
      setNewComment("");
    } catch (error) {
      alert("댓글 작성에 실패했습니다.");
      console.error(error);
    }
  };

  const toggleExpand = (commentId: number) => {
    setExpandedComments((prev) => {
      const next = new Set(prev);
      if (next.has(commentId)) {
        next.delete(commentId);
      } else {
        next.add(commentId);
      }
      return next;
    });
  };

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
        <MessageCircle className="w-5 h-5" />
        댓글 ({comments.length})
      </h2>

      {/* 댓글 작성 */}
      <div className="flex flex-col gap-2 mb-4">
        <textarea className="w-full border rounded-md p-2 text-sm" rows={3} placeholder="댓글을 입력하세요" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
        <button className="self-end bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-700" onClick={handleAddComment}>
          댓글 작성
        </button>
      </div>

      {/* 댓글 목록 */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-sm text-gray-400">로딩 중...</div>
        ) : comments.length === 0 ? (
          <div className="text-sm text-gray-400">아직 댓글이 없습니다.</div>
        ) : (
          comments.map((comment) => <Comment key={comment.id} comment={comment} isExpanded={expandedComments.has(comment.id)} onToggleExpand={() => toggleExpand(comment.id)} />)
        )}
      </div>
    </div>
  );
}
