import { useState, useEffect } from "react";
import { useInteractions } from "@/lib/hooks/useInteractions";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { TargetType } from "@/types/content";

interface InteractionSectionProps {
  target_type: TargetType;
  target_id: number;
}

export default function InteractionSection({ target_type, target_id }: InteractionSectionProps) {
  const { counts, userInteractions, loading, fetchCounts, fetchUserInteractions, addLike, removeLike, addDislike, removeDislike } = useInteractions(target_type, target_id);

  useEffect(() => {
    fetchCounts();
    fetchUserInteractions();
  }, []);

  const handleLike = async () => {
    if (userInteractions.hasLiked) {
      await removeLike();
    } else {
      await addLike();
    }
  };

  const handleDislike = async () => {
    if (userInteractions.hasDisliked) {
      await removeDislike();
    } else {
      await addDislike();
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4 my-6">
      <Button variant={userInteractions.hasLiked ? "default" : "outline"} size="sm" onClick={handleLike} disabled={loading} className="flex items-center space-x-2">
        <ThumbsUp className="h-4 w-4" />
        <span>{counts.likes}</span>
      </Button>
      <Button variant={userInteractions.hasDisliked ? "default" : "outline"} size="sm" onClick={handleDislike} disabled={loading} className="flex items-center space-x-2">
        <ThumbsDown className="h-4 w-4" />
        <span>{counts.dislikes}</span>
      </Button>
    </div>
  );
}
