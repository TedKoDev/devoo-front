import { apiClient } from "./api-client";
import { TargetType } from "@/types/content";

export interface CreateInteractionDto {
  target_type: TargetType;
  target_id: number;
}

export interface InteractionResponse {
  success: boolean;
  message?: string;
}

export interface InteractionCountsDto {
  likes: number;
  dislikes: number;
  comments: number;
}

export interface UserInteractions {
  has_liked: boolean;
  has_disliked: boolean;
}

export const interactionApi = {
  getCounts: (target_type: TargetType, target_id: number): Promise<InteractionCountsDto> => {
    console.log("target_type:", target_type, "target_id:", target_id);
    return apiClient.get<InteractionCountsDto>(`/interactions/counts?target_type=${target_type}&target_id=${target_id}`);
  },

  getUserInteractions: (target_type: TargetType, target_id: number, authHeader?: string): Promise<UserInteractions> => {
    return apiClient.get<UserInteractions>(`/interactions/user?target_type=${target_type}&target_id=${target_id}`, {
      headers: authHeader ? { Authorization: authHeader } : undefined,
    });
  },

  addLike: (data: CreateInteractionDto, authHeader?: string): Promise<InteractionResponse> => {
    return apiClient.post<InteractionResponse>("/interactions/like", data, {
      headers: authHeader ? { Authorization: authHeader } : undefined,
    });
  },

  removeLike: (target_type: TargetType, target_id: number, authHeader?: string): Promise<InteractionResponse> => {
    return apiClient.delete<InteractionResponse>(`/interactions/like?target_type=${target_type}&target_id=${target_id}`, {
      headers: authHeader ? { Authorization: authHeader } : undefined,
    });
  },

  addDislike: (data: CreateInteractionDto, authHeader?: string): Promise<InteractionResponse> => {
    return apiClient.post<InteractionResponse>("/interactions/dislike", data, {
      headers: authHeader ? { Authorization: authHeader } : undefined,
    });
  },

  removeDislike: (target_type: TargetType, target_id: number, authHeader?: string): Promise<InteractionResponse> => {
    return apiClient.delete<InteractionResponse>(`/interactions/dislike?target_type=${target_type}&target_id=${target_id}`, {
      headers: authHeader ? { Authorization: authHeader } : undefined,
    });
  },
};
