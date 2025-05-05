// types.ts
export const TargetTypes = {
  BLOG_POST: "BLOG_POST",
  HOT_ISSUE: "HOT_ISSUE",
  TOOL: "TOOL",
  SIDE_HUSTLE: "SIDE_HUSTLE",
  DEV_LOG: "DEV_LOG",
  COMMENT: "COMMENT",
} as const;

export type TargetType = (typeof TargetTypes)[keyof typeof TargetTypes];

export interface HotIssue {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  views: number;
  likes: number;
  comments: number;
}

export interface RecommendedTool {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  rating: number;
  reviews: number;
}

export interface PopularSideHustle {
  id: string;
  title: string;
  description: string;
  category: string;
  estimatedIncome: string;
  difficulty: string;
  timeRequired: string;
}

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

export interface ToolRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  votes: number;
  status: "requested" | "in_progress" | "completed";
  date: string;
}

export interface CreateInteractionDto {
  target_type: TargetType;
  target_id: number;
}

export interface InteractionResponseDto {
  id: number;
  user_id: number;
  target_type: TargetType;
  target_id: number;
  created_at: Date;
}

export interface InteractionCountsDto {
  likes: number;
  dislikes: number;
  comments: number;
}
