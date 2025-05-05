import { PublishStatus } from "@/types/content";
import { apiClient } from "./api-client";

// ============================
// DTO Interfaces Matching Server
// ============================

export interface BlogPostRequest {
  keyword_id: number;
  blog_channel_id: number;
  title: string;
  content?: string;
  publish_status?: PublishStatus;
  blog_type?: string;
}

export interface BlogPostResponse {
  id: number;
  keyword_id: number;
  blog_channel_id: number;
  title: string;
  content?: string;
  publish_status: PublishStatus;
  published_at?: Date;
  blog_type?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  view_count: number;
}

// ============================
// Blog Post API Functions
// ============================

export const blogPostApi = {
  createBlogPost: (data: BlogPostRequest, authHeader?: string): Promise<BlogPostResponse> => {
    return apiClient.post<BlogPostResponse>("/blog-posts", data, {
      headers: authHeader ? { Authorization: authHeader } : undefined,
    });
  },

  getAllBlogPosts: (): Promise<BlogPostResponse[]> => apiClient.get<BlogPostResponse[]>("/blog-posts"),

  getBlogPostById: (id: number): Promise<BlogPostResponse> => apiClient.get<BlogPostResponse>(`/blog-posts/${id}`),

  updateBlogPost: (id: number, data: BlogPostRequest, authHeader?: string): Promise<BlogPostResponse> => {
    return apiClient.put<BlogPostResponse>(`/blog-posts/${id}`, data, {
      headers: authHeader ? { Authorization: authHeader } : undefined,
    });
  },

  deleteBlogPost: (id: number, authHeader?: string): Promise<BlogPostResponse> => {
    return apiClient.delete<BlogPostResponse>(`/blog-posts/${id}`, {
      headers: authHeader ? { Authorization: authHeader } : undefined,
    });
  },

  getBlogPostsByKeyword: (keyword_id: number): Promise<BlogPostResponse[]> => apiClient.get<BlogPostResponse[]>(`/blog-posts/keyword/${keyword_id}`),

  getBlogPostsByChannel: (blog_channel_id: number): Promise<BlogPostResponse[]> => apiClient.get<BlogPostResponse[]>(`/blog-posts/channel/${blog_channel_id}`),
};
