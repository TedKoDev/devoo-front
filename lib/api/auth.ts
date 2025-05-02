import type { User } from "@/types/user";
import { apiClient } from "./api-client";

export interface AuthRequest {
  username: string;
  password: string;
  email?: string;
}

export interface AuthResponse {
  status: "success" | "error";
  user: User;
  token?: string;
  message?: string;
}

// Auth API 요청 함수들 (서버 사이드 전용)
export const authApi = {
  // 로그인 API
  login: (data: AuthRequest): Promise<AuthResponse> => apiClient.post<AuthResponse>("/auth/login", data),

  // 회원가입 API
  register: (data: AuthRequest): Promise<AuthResponse> => apiClient.post<AuthResponse>("/auth/register", data),

  // 로그아웃 API
  logout: (): Promise<void> => apiClient.post("/auth/logout", {}),
};
