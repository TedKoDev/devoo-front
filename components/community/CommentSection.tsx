"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { useComments } from "@/lib/hooks/useComments";
import { TargetType } from "@/types/content";

export default function CommentSection({ target_type, target_id }: { target_type: TargetType; target_id: number }) {
  const { comments, loading, fetchComments, createComment } = useComments(target_type, target_id);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, [target_id, target_type]);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert(" 댓글을 입력해주세요.");
      return;
    }
    await createComment(newComment);
    setNewComment("");
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
        {loading ? (
          <div className="text-sm text-gray-400">로딩 중...</div>
        ) : comments.length === 0 ? (
          <div className="text-sm text-gray-400">아직 댓글이 없습니다.</div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border p-3 rounded-md bg-gray-50">
              <div className="text-sm font-medium">{comment.author}</div>
              <div className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{comment.content}</div>
              <div className="text-xs text-gray-400 mt-1">{new Date(comment.createdAt).toLocaleString("ko-KR")}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
