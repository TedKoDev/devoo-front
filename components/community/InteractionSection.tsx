import { useInteractions } from "@/lib/hooks/useInteractions";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { TargetType } from "@/types/content";

interface InteractionSectionProps {
  target_type: TargetType;
  target_id: number;
}

export default function InteractionSection({ target_type, target_id }: InteractionSectionProps) {
  const { counts, userInteractions, isLoading, addLike, removeLike, addDislike, removeDislike } = useInteractions(target_type, target_id);

  console.log("InteractionSection - counts:", counts);

  const handleLike = async () => {
    try {
      if (userInteractions.hasLiked) {
        await removeLike({ target_type, target_id });
      } else {
        await addLike({ target_type, target_id });
      }
    } catch (error) {
      console.error("Like action failed:", error);
    }
  };

  const handleDislike = async () => {
    try {
      if (userInteractions.hasDisliked) {
        await removeDislike({ target_type, target_id });
      } else {
        await addDislike({ target_type, target_id });
      }
    } catch (error) {
      console.error("Dislike action failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4 my-6">
      <Button variant={userInteractions.hasLiked ? "default" : "outline"} size="sm" onClick={handleLike} disabled={isLoading} className="flex items-center space-x-2">
        <ThumbsUp className="h-4 w-4" />
        <span>{counts.likes}</span>
      </Button>
      <Button variant={userInteractions.hasDisliked ? "default" : "outline"} size="sm" onClick={handleDislike} disabled={isLoading} className="flex items-center space-x-2">
        <ThumbsDown className="h-4 w-4" />
        <span>{counts.dislikes}</span>
      </Button>
    </div>
  );
}
