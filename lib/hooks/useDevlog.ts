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
  category: string;
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
      const response = await fetch("/api/devlogs", {
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
      const response = await fetch("/api/devlogs", {
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
    mutationFn: async (data: DevlogRequest) => {
      if (!token) {
        throw new Error("로그인이 필요합니다.");
      }

      const response = await fetch("/api/devlogs", {
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

      return response.json();
    },
  });

  // 개발일지 삭제 mutation
  const deleteDevlogMutation = useMutation({
    mutationFn: async (data: DevlogRequest) => {
      if (!token) {
        throw new Error("로그인이 필요합니다.");
      }

      const response = await fetch("/api/devlogs", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "개발일지 삭제에 실패했습니다.");
      }

      return response.json();
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
