import { apiClient } from "./api-client";

//개발일지 작성 API

export interface DevlogRequest {
  title: string;
  content: string;
  date: Date;
  summary: string;
  category: string;
}

export interface DevlogResponse {
  id: string;
  title: string;
  content: string;
  date: Date;
  summary: string;
  category: string;
}

export const devlogApi = {
  writeDevlog: (data: DevlogRequest, authHeader?: string): Promise<DevlogResponse> => {
    console.log("Sending request with auth header:", authHeader);
    return apiClient.post<DevlogResponse>("/dev-logs", data, {
      headers: authHeader ? { Authorization: authHeader } : undefined,
    });
  },

  getDevlogs: (authHeader?: string): Promise<DevlogResponse[]> =>
    apiClient.get<DevlogResponse[]>("/dev-logs", {
      headers: authHeader ? { Authorization: authHeader } : undefined,
    }),

  updateDevlog: (id: string, data: DevlogRequest, authHeader?: string): Promise<DevlogResponse> =>
    apiClient.put<DevlogResponse>(`/dev-logs/${id}`, data, {
      headers: authHeader ? { Authorization: authHeader } : undefined,
    }),

  deleteDevlog: (id: string, authHeader?: string): Promise<void> =>
    apiClient.delete(`/dev-logs/${id}`, {
      headers: authHeader ? { Authorization: authHeader } : undefined,
    }),

  getDevlogById: (id: number, authHeader?: string): Promise<DevlogResponse> =>
    apiClient.get<DevlogResponse>(`/dev-logs/${id}`, {
      headers: authHeader ? { Authorization: authHeader } : undefined,
    }),
};
