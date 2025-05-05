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
  createComment: (data: CommentRequest, authHeader?: string): Promise<CommentResponse> => {
    console.log("Sending request with auth header:", authHeader);

    return apiClient.post<CommentResponse>("/comments", data, {
      headers: authHeader ? { Authorization: authHeader } : undefined,
    });
  },

  getComments: (target_type: string, target_id: string, authHeader?: string): Promise<CommentResponse[]> => {
    return apiClient.get<CommentResponse[]>(`/comments?target_type=${target_type}&target_id=${target_id}`, {
      headers: authHeader ? { Authorization: authHeader } : undefined,
    });
  },

  updateComment: (id: string, data: Partial<CommentRequest>, authToken: string): Promise<CommentResponse> => {
    return apiClient.put<CommentResponse>(`/comments/${id}`, data, {
      headers: { Authorization: authToken },
    });
  },

  deleteComment: (id: string, authToken: string): Promise<void> => {
    return apiClient.delete(`/comments/${id}`, {
      headers: { Authorization: authToken },
    });
  },
};
