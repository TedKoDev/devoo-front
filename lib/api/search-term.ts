import { apiClient } from "./api-client";

export interface CreateSearchTermDto {
  keyword: string;
  sourceId: number;
}

export interface SearchTermResponseDto {
  id: number;
  keyword: string;
  rank: number;
  collected_at: Date;
  source: {
    id: number;
    name: string;
  };
}

export const searchTermApi = {
  create: async (data: CreateSearchTermDto) => {
    return apiClient.post<SearchTermResponseDto>("/search-terms", data);
  },

  findAll: async () => {
    return apiClient.get<SearchTermResponseDto[]>("/search-terms");
  },
};
