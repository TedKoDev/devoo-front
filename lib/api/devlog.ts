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

  getDevlogs: (): Promise<DevlogResponse[]> => apiClient.get<DevlogResponse[]>("/dev-logs"),

  updateDevlog: (id: string, data: DevlogRequest): Promise<DevlogResponse> => apiClient.put<DevlogResponse>(`/dev-logs/${id}`, data),

  deleteDevlog: (id: string): Promise<void> => apiClient.delete(`/dev-logs/${id}`),
};
