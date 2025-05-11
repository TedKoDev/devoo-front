"use client";
import { devlogApi, type DevlogRequest } from "@/lib/api/devlog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/store/useUserStore";
import { searchTermApi } from "@/lib/api/search-term";

export interface SourceResponseDto {
  id: number;
  name: string;
}

export interface SearchTermResponseDto {
  id: number;
  keyword: string;
  rank: number;
  collected_at: Date;
  source: SourceResponseDto;
}

export function useSearchTerm() {
  const { token } = useUserStore();

  const getSearchTerms = useQuery({
    queryKey: ["searchTerms"],
    queryFn: async () => {
      return searchTermApi.findAll();
    },
    refetchInterval: 30000, // Refetch every 30 seconds
    refetchIntervalInBackground: true, // Continue refetching even when tab is not active
  });

  return {
    searchTerms: getSearchTerms.data,
    isLoading: getSearchTerms.isPending,
    error: getSearchTerms.error,
  };
}
