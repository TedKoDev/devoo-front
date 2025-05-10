"use client";

import { blogPostApi, type BlogPostRequest } from "@/lib/api/blog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/store/useUserStore";

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  summary: string;
  content: string;
  category: string;
  author: {
    id: number;
    username: string;
  };
  interactions: {
    likes: number;
    dislikes: number;
    comments: number;
  };
  views: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export function useBlogPost() {
  const { token } = useUserStore();
  const queryClient = useQueryClient();

  const writeBlogPostMutation = useMutation({
    mutationFn: async (data: BlogPostRequest) => {
      if (!token) throw new Error("로그인이 필요합니다.");
      return blogPostApi.createBlogPost(data, `Bearer ${token}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
    },
  });

  const getBlogPosts = useQuery({
    queryKey: ["blogPosts"],
    queryFn: () => blogPostApi.getAllBlogPosts(),
  });

  const updateBlogPostMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: BlogPostRequest }) => {
      if (!token) throw new Error("로그인이 필요합니다.");
      return blogPostApi.updateBlogPost(Number(id), data, `Bearer ${token}`);
    },
  });

  const deleteBlogPostMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!token) throw new Error("로그인이 필요합니다.");
      return blogPostApi.deleteBlogPost(Number(id), `Bearer ${token}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
    },
  });

  return {
    writeBlogPost: writeBlogPostMutation.mutateAsync,
    blogPosts: getBlogPosts.data,
    updateBlogPost: updateBlogPostMutation.mutateAsync,
    deleteBlogPost: deleteBlogPostMutation.mutateAsync,
    isLoading: writeBlogPostMutation.isPending || getBlogPosts.isPending || updateBlogPostMutation.isPending || deleteBlogPostMutation.isPending,
    error: getBlogPosts.error,
  };
}

export function useSingleBlogPost(id: string) {
  const { token } = useUserStore();

  const getSingleBlogPost = useQuery({
    queryKey: ["blogPost", id],
    queryFn: () => blogPostApi.getBlogPostById(Number(id)),
  });

  return {
    blogPost: getSingleBlogPost.data,
    isLoading: getSingleBlogPost.isPending,
    error: getSingleBlogPost.error,
  };
}
