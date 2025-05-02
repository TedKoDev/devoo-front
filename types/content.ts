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

export interface DevLog {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  likes: number;
  comments: number;
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
