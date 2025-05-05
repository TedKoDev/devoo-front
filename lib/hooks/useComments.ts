"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { TargetType, TargetTypes } from "@/types/content";
import { useUserStore } from "@/store/useUserStore";

export interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  likes: number;
  dislikes: number;
  hasLiked?: boolean;
  hasDisliked?: boolean;
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
  const { token } = useUserStore();
  const queryClient = useQueryClient();

  const normalize = (raw: RawComment): Comment => ({
    id: raw.id,
    author: raw.user.username,
    content: raw.content,
    createdAt: raw.created_at,
    likes: 0,
    dislikes: 0,
    hasLiked: false,
    hasDisliked: false,
  });

  // 댓글 목록 가져오기
  const {
    data: comments = [],
    isLoading,
    error,
  } = useQuery<Comment[]>({
    queryKey: ["comments", target_type, target_id],
    queryFn: async () => {
      const res = await axios.get<RawComment[]>("/api/comments", {
        params: {
          target_type: target_type.toUpperCase(),
          target_id,
        },
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      return res.data.map(normalize).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },
    enabled: !!target_type && !!target_id,
  });

  // 댓글 작성
  const createCommentMutation = useMutation({
    mutationFn: async (content: string) => {
      const res = await axios.post<RawComment>(
        "/api/comments",
        {
          content,
          target_type: target_type.toUpperCase(),
          target_id,
        } as CreateCommentDto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return normalize(res.data);
    },
    onSuccess: () => {
      // 댓글 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["comments", target_type, target_id] });
      // 개발일지 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["devlogs"] });
      // 단일 개발일지 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["devlog"] });
    },
  });

  return {
    comments,
    isLoading,
    error,
    createComment: createCommentMutation.mutateAsync,
  };
};
