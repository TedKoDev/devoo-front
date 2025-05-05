import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/useUserStore";
import { TargetType } from "@/types/content";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

export interface InteractionCountsDto {
  likes: number;
  dislikes: number;
  comments: number;
}

export interface UserInteractions {
  has_liked: boolean;
  has_disliked: boolean;
}

export interface InteractionRequest {
  target_type: TargetType;
  target_id: number;
}

export const useInteractions = (target_type: TargetType, target_id: number) => {
  const { token } = useUserStore();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: counts = { likes: 0, dislikes: 0, comments: 0 } } = useQuery({
    queryKey: ["interactions", "counts", target_type, target_id],
    queryFn: async () => {
      const response = await fetch(`/api/interactions/counts?target_type=${target_type}&target_id=${target_id}`);
      if (!response.ok) throw new Error("상호작용 수 조회에 실패했습니다.");
      return response.json();
    },
  });

  const { data: userInteractions = { has_liked: false, has_disliked: false } } = useQuery({
    queryKey: ["interactions", "user", target_type, target_id],
    queryFn: async () => {
      const response = await fetch(`/api/interactions/user?target_type=${target_type}&target_id=${target_id}`, {
        ...(token && { headers: { Authorization: `Bearer ${token}` } }),
      });
      if (!response.ok) throw new Error("사용자 상호작용 조회에 실패했습니다.");
      return response.json();
    },
    enabled: !!token,
  });

  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: ["interactions", "counts", target_type, target_id] });
    queryClient.invalidateQueries({ queryKey: ["interactions", "user", target_type, target_id] });
    // 개발일지 목록 쿼리 무효화
    queryClient.invalidateQueries({ queryKey: ["devlogs"] });
    // 단일 개발일지 쿼리 무효화
    queryClient.invalidateQueries({ queryKey: ["devlog"] });
  };

  const likeMutation = useMutation({
    mutationFn: async (data: InteractionRequest) => {
      if (!token) throw new Error("로그인이 필요합니다.");
      const response = await fetch("/api/interactions/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          target_type: data.target_type,
          target_id: data.target_id,
        }),
      });
      if (!response.ok) throw new Error("좋아요 추가에 실패했습니다.");
      return response.json();
    },
    onSuccess: () => {
      invalidateQueries();
    },
    onError: (error) => {
      toast({
        title: "좋아요 실패",
        description: error instanceof Error ? error.message : "잠시 후 다시 시도해주세요.",
        variant: "destructive",
      });
    },
  });

  const removeLikeMutation = useMutation({
    mutationFn: async (data: InteractionRequest) => {
      if (!token) throw new Error("로그인이 필요합니다.");
      const response = await fetch(`/api/interactions/like?target_type=${data.target_type}&target_id=${data.target_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("좋아요 취소에 실패했습니다.");
      return response.json();
    },
    onSuccess: () => {
      invalidateQueries();
    },
    onError: (error) => {
      toast({
        title: "좋아요 취소 실패",
        description: error instanceof Error ? error.message : "잠시 후 다시 시도해주세요.",
        variant: "destructive",
      });
    },
  });

  const dislikeMutation = useMutation({
    mutationFn: async (data: InteractionRequest) => {
      if (!token) throw new Error("로그인이 필요합니다.");
      const response = await fetch("/api/interactions/dislike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          target_type: data.target_type,
          target_id: data.target_id,
        }),
      });
      if (!response.ok) throw new Error("싫어요 추가에 실패했습니다.");
      return response.json();
    },
    onSuccess: () => {
      invalidateQueries();
    },
    onError: (error) => {
      toast({
        title: "싫어요 실패",
        description: error instanceof Error ? error.message : "잠시 후 다시 시도해주세요.",
        variant: "destructive",
      });
    },
  });

  const removeDislikeMutation = useMutation({
    mutationFn: async (data: InteractionRequest) => {
      if (!token) throw new Error("로그인이 필요합니다.");
      const response = await fetch(`/api/interactions/dislike?target_type=${data.target_type}&target_id=${data.target_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("싫어요 취소에 실패했습니다.");
      return response.json();
    },
    onSuccess: () => {
      invalidateQueries();
    },
    onError: (error) => {
      toast({
        title: "싫어요 취소 실패",
        description: error instanceof Error ? error.message : "잠시 후 다시 시도해주세요.",
        variant: "destructive",
      });
    },
  });

  const handleLike = async () => {
    if (!token) {
      toast({
        title: "로그인 필요",
        description: "좋아요를 하려면 로그인이 필요합니다.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (userInteractions.has_liked) {
        await removeLikeMutation.mutateAsync({ target_type, target_id });
      } else {
        if (userInteractions.has_disliked) {
          await removeDislikeMutation.mutateAsync({ target_type, target_id });
        }
        await likeMutation.mutateAsync({ target_type, target_id });
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
    }
  };

  const handleDislike = async () => {
    if (!token) {
      toast({
        title: "로그인 필요",
        description: "싫어요를 하려면 로그인이 필요합니다.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (userInteractions.has_disliked) {
        await removeDislikeMutation.mutateAsync({ target_type, target_id });
      } else {
        if (userInteractions.has_liked) {
          await removeLikeMutation.mutateAsync({ target_type, target_id });
        }
        await dislikeMutation.mutateAsync({ target_type, target_id });
      }
    } catch (error) {
      console.error("싫어요 처리 중 오류 발생:", error);
    }
  };

  return {
    counts,
    userInteractions,
    handleLike,
    handleDislike,
    isLoading: likeMutation.isPending || removeLikeMutation.isPending || dislikeMutation.isPending || removeDislikeMutation.isPending,
    error: likeMutation.error || removeLikeMutation.error || dislikeMutation.error || removeDislikeMutation.error,
  };
};
