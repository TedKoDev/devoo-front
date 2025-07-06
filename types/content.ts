// types.ts
export enum TargetTypes {
  BLOG_POST = "BLOG_POST",
  DEV_LOG = "DEV_LOG",
  HOT_ISSUE = "HOT_ISSUE",
  SIDE_HUSTLE = "SIDE_HUSTLE",
  TOOL = "TOOL",
  COMMENT = "COMMENT",
}

export type TargetType = (typeof TargetTypes)[keyof typeof TargetTypes];

// enum PublishStatus {
//   PENDING
//   SUCCESS
//   FAILED
//   RETRYING
// }

export enum PublishStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  RETRYING = "RETRYING",
}

export interface HotIssue {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
  tags: string[];
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  rating: number;
}

export interface SideHustle {
  id: string;
  title: string;
  category: string;
  incomeRange: string;
  description: string;
  thumbnail: string;
}

export interface DevLog {
  id: string;
  title: string;
  date: string;
  summary: string;
}

// 블로그 타입 정의 (공통으로 사용)
export const BLOG_TYPES = [
  { id: "ALL", label: "전체", color: "default" },
  { id: "TECH", label: "기술", color: "blue" },
  { id: "LIFE", label: "일상", color: "green" },
  { id: "REVIEW", label: "리뷰", color: "purple" },
  { id: "PROJECT", label: "프로젝트", color: "orange" },
  { id: "JOB", label: "취업", color: "red" },
  { id: "TUTORIAL", label: "튜토리얼", color: "yellow" },
] as const;

export type BlogType = (typeof BLOG_TYPES)[number]["id"];

// 키워드 인터페이스
export interface Keyword {
  id: number;
  text: string;
  status?: string;
  priority?: number | null;
  prompt_id?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

// 블로그 채널 인터페이스
export interface BlogChannel {
  id: number;
  name: string;
  platform: string;
  base_url?: string;
  client_id?: string | null;
  client_secret?: string | null;
  access_token?: string | null;
  refresh_token?: string | null;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
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
