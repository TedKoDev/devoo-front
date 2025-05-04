import { useState } from "react";
import axios from "axios";
import { TargetType } from "@/types/content";

interface CreateInteractionDto {
  target_type: TargetType;
  target_id: number;
}

interface InteractionResponseDto {
  id: number;
  user_id: number;
  target_type: TargetType;
  target_id: number;
  created_at: Date;
}

interface InteractionCountsDto {
  likes: number;
  dislikes: number;
  comments: number;
}

interface UserInteractions {
  hasLiked: boolean;
  hasDisliked: boolean;
}

export const useInteractions = (target_type: TargetType, target_id: number) => {
  const [counts, setCounts] = useState<InteractionCountsDto>({
    likes: 0,
    dislikes: 0,
    comments: 0,
  });
  const [userInteractions, setUserInteractions] = useState<UserInteractions>({
    hasLiked: false,
    hasDisliked: false,
  });
  const [loading, setLoading] = useState(false);

  const fetchCounts = async () => {
    try {
      const response = await axios.get<InteractionCountsDto>(`/api/interactions/counts`, {
        params: { target_type, target_id },
      });
      setCounts(response.data);
    } catch (error) {
      console.error("Error fetching interaction counts:", error);
    }
  };

  const fetchUserInteractions = async () => {
    try {
      const response = await axios.get<UserInteractions>(`/api/interactions/user`, {
        params: { target_type, target_id },
      });
      setUserInteractions(response.data);
    } catch (error) {
      console.error("Error fetching user interactions:", error);
    }
  };

  const addLike = async () => {
    setLoading(true);
    try {
      await axios.post<InteractionResponseDto>(`/api/interactions/like`, {
        target_type,
        target_id,
      } as CreateInteractionDto);
      await fetchCounts();
      await fetchUserInteractions();
    } catch (error) {
      console.error("Error adding like:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeLike = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/interactions/like`, {
        params: { target_type, target_id },
      });
      await fetchCounts();
      await fetchUserInteractions();
    } catch (error) {
      console.error("Error removing like:", error);
    } finally {
      setLoading(false);
    }
  };

  const addDislike = async () => {
    setLoading(true);
    try {
      await axios.post<InteractionResponseDto>(`/api/interactions/dislike`, {
        target_type,
        target_id,
      } as CreateInteractionDto);
      await fetchCounts();
      await fetchUserInteractions();
    } catch (error) {
      console.error("Error adding dislike:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeDislike = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/interactions/dislike`, {
        params: { target_type, target_id },
      });
      await fetchCounts();
      await fetchUserInteractions();
    } catch (error) {
      console.error("Error removing dislike:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    counts,
    userInteractions,
    loading,
    fetchCounts,
    fetchUserInteractions,
    addLike,
    removeLike,
    addDislike,
    removeDislike,
  };
};
