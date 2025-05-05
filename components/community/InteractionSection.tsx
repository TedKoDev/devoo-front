"use client";

import { useInteractions } from "@/lib/hooks/useInteractions";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { TargetType } from "@/types/content";

interface InteractionSectionProps {
  target_type: TargetType;
  target_id: number;
}

export default function InteractionSection({ target_type, target_id }: InteractionSectionProps) {
  const { handleLike, handleDislike, counts, userInteractions, isLoading } = useInteractions(target_type, target_id);

  console.log("userInteractions", userInteractions);

  return (
    <div className="flex items-center justify-center space-x-4 my-6">
      <Button
        onClick={handleLike}
        disabled={isLoading}
        size="sm"
        variant="outline"
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm
    ${userInteractions.has_liked ? "bg-blue-600 text-white hover:bg-blue-700 border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
      >
        <ThumbsUp className={`h-4 w-4 ${userInteractions.has_liked ? "text-white" : "text-gray-700"}`} />
        <span>{counts.likes}</span>
      </Button>

      <Button
        onClick={handleDislike}
        disabled={isLoading}
        size="sm"
        variant="outline"
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm
    ${userInteractions.has_disliked ? "bg-red-600 text-white hover:bg-red-700 border-red-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
      >
        <ThumbsDown className={`h-4 w-4 ${userInteractions.has_disliked ? "text-white" : "text-gray-700"}`} />
        <span>{counts.dislikes}</span>
      </Button>
    </div>
  );
}
