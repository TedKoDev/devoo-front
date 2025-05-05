import { useState } from "react";
import axios from "axios";
import { TargetType } from "@/types/content";
import { useUserStore } from "@/store/useUserStore";

export interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
}

interface RawComment {
  id: number;
  content: string;
  target_type: TargetType;
  target_id: number;
  user_id: number;
  created_at: string;
  deleted_at: string | null;
  user: {
    id: number;
    username: string;
  };
}

interface CreateCommentDto {
  content: string;
  target_type: TargetType;
  target_id: number;
}

interface UpdateCommentDto {
  content: string;
}

export const useComments = (target_type: TargetType, target_id: number) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useUserStore();

  const normalize = (raw: RawComment): Comment => ({
    id: raw.id,
    author: raw.user.username,
    content: raw.content,
    createdAt: raw.created_at,
  });

  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<RawComment[]>(`/api/comments`, {
        params: { target_type: target_type, target_id: target_id },
      });

      const sorted = response.data.map(normalize).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      setComments(sorted);
    } catch (err) {
      setError("댓글을 불러오는데 실패했습니다.");
      console.error("Error fetching comments:", err);
    } finally {
      setLoading(false);
    }
  };

  const createComment = async (content: string) => {
    if (!token) {
      setError("로그인이 필요합니다.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<RawComment>(
        `/api/comments`,
        {
          content,
          target_type: target_type,
          target_id: target_id,
        } as CreateCommentDto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newComment = normalize(response.data);
      setComments((prev) => [newComment, ...prev]); // 최신순 prepend
      return newComment;
    } catch (err) {
      setError("댓글 작성에 실패했습니다.");
      console.error("Error creating comment:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateComment = async (commentId: number, content: string) => {
    if (!token) {
      setError("로그인이 필요합니다.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.put<RawComment>(
        `/api/comments/${commentId}`,
        {
          content,
        } as UpdateCommentDto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updated = normalize(response.data);
      setComments((prev) => prev.map((comment) => (comment.id === commentId ? updated : comment)));
      return updated;
    } catch (err) {
      setError("댓글 수정에 실패했습니다.");
      console.error("Error updating comment:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (commentId: number) => {
    if (!token) {
      setError("로그인이 필요합니다.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/api/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (err) {
      setError("댓글 삭제에 실패했습니다.");
      console.error("Error deleting comment:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    comments,
    loading,
    error,
    fetchComments,
    createComment,
    updateComment,
    deleteComment,
  };
};
