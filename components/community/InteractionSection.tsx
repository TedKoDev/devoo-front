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

  const handleLike = async () => {
    try {
      if (userInteractions.has_liked) {
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
      if (userInteractions.has_disliked) {
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
      <Button
        onClick={handleLike}
        disabled={isLoading}
        size="sm"
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm
    ${userInteractions.has_liked ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"}`}
      >
        <ThumbsUp className="h-4 w-4" />
        <span>{counts.likes}</span>
      </Button>

      <Button
        onClick={handleDislike}
        disabled={isLoading}
        size="sm"
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm
    ${userInteractions.has_disliked ? "bg-red-600 text-white hover:bg-red-700" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"}`}
      >
        <ThumbsDown className="h-4 w-4" />
        <span>{counts.dislikes}</span>
      </Button>
    </div>
  );
}
