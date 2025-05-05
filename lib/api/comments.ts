import { apiClient } from "./api-client";

export interface CommentRequest {
  content: string;
  target_type: string;
  target_id: string;
  parentId?: string;
}

export interface CommentResponse {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  target_type: string;
  target_id: string;
  parentId?: string;
}

export const commentApi = {
  createComment: (data: CommentRequest, authToken: string): Promise<CommentResponse> => {
    return apiClient.post<CommentResponse>("/api/comments", data, {
      headers: { Authorization: authToken },
    });
  },

  getComments: (target_type: string, target_id: string): Promise<CommentResponse[]> => {
    return apiClient.get<CommentResponse[]>(`/api/comments?target_type=${target_type}&target_id=${target_id}`);
  },

  updateComment: (id: string, data: Partial<CommentRequest>, authToken: string): Promise<CommentResponse> => {
    return apiClient.put<CommentResponse>(`/api/comments/${id}`, data, {
      headers: { Authorization: authToken },
    });
  },

  deleteComment: (id: string, authToken: string): Promise<void> => {
    return apiClient.delete(`/api/comments/${id}`, {
      headers: { Authorization: authToken },
    });
  },
};
