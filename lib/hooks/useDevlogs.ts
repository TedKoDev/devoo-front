"use client";
import { devlogApi, type DevlogRequest } from "@/lib/api/devlog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/store/useUserStore";

export interface Devlog {
  id: string;
  title: string;
  date: Date;
  summary: string;
  content: string;
  author: {
    id: number;
    username: string;
  };
  category: string;
  interactions: {
    likes: number;
    dislikes: number;
    comments: number;
  };
}

export function useDevlog() {
  const { token } = useUserStore();
  const queryClient = useQueryClient();

  //개발일지 작성 mutation
  const writeDevlogMutation = useMutation({
    mutationFn: async (data: DevlogRequest) => {
      if (!token) {
        throw new Error("로그인이 필요합니다.");
      }

      console.log("Submitting devlog with token:", token);
      const response = await fetch("/api/dev-logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `개발일지 작성에 실패했습니다. (${response.status})`);
      }

      return response.json();
    },
    onSuccess: (response) => {
      console.log("Devlog submitted successfully:", response);
      queryClient.invalidateQueries({ queryKey: ["devlogs"] });
    },
    onError: (error) => {
      console.error("Devlog submission error:", error);
    },
  });

  //개발일지 목록 조회 query
  const getDevlogs = useQuery({
    queryKey: ["devlogs"],
    queryFn: async () => {
      const response = await fetch("/api/dev-logs", {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "개발일지 목록 조회에 실패했습니다.");
      }

      return response.json();
    },
  });

  // 개발일지 수정 mutation
  const updateDevlogMutation = useMutation({
    mutationFn: async ({ id, ...data }: DevlogRequest & { id: string }) => {
      if (!token) {
        throw new Error("로그인이 필요합니다.");
      }

      const response = await fetch(`/api/dev-logs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "개발일지 수정에 실패했습니다.");
      }

      return { ...response.json(), id };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["devlogs"] });
      queryClient.invalidateQueries({ queryKey: ["devlog", data.id] });
    },
  });

  // 개발일지 삭제 mutation
  const deleteDevlogMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!token) {
        throw new Error("로그인이 필요합니다.");
      }

      const response = await fetch(`/api/dev-logs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "개발일지 삭제에 실패했습니다.");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devlogs"] });
    },
  });

  return {
    writeDevlog: writeDevlogMutation.mutateAsync,
    devlogs: getDevlogs.data,
    updateDevlog: updateDevlogMutation.mutateAsync,
    deleteDevlog: deleteDevlogMutation.mutateAsync,
    isLoading: writeDevlogMutation.isPending || getDevlogs.isPending || updateDevlogMutation.isPending || deleteDevlogMutation.isPending,
    error: getDevlogs.error,
  };
}

// 단일 게시글 조회 query
export function useSingleDevlog(id: string) {
  const { token } = useUserStore();

  const getSingleDevlog = useQuery({
    queryKey: ["devlog", id],
    queryFn: async () => {
      const response = await fetch(`/api/dev-logs/${id}`, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "개발일지 조회에 실패했습니다.");
      }

      return response.json();
    },
  });
  return {
    devlog: getSingleDevlog.data,
    isLoading: getSingleDevlog.isPending,
    error: getSingleDevlog.error,
  };
}
