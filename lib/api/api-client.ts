import axios from "axios";

// API 클라이언트 설정
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api'  // 프로덕션에서는 상대 경로 사용 (nginx가 프록시)
  : "http://localhost:4000/api";  // 개발 환경에서는 localhost

// 서버사이드 여부 확인
const isServer = typeof window === "undefined";

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // 타임아웃 설정
  timeout: 5000,
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    // 서버사이드에서는 토큰 처리 스킵
    if (isServer) {
      return config;
    }

    // 클라이언트에서만 localStorage 접근
    try {
      const userStorage = localStorage.getItem("user-storage");
      if (userStorage) {
        const { state } = JSON.parse(userStorage);
        if (state.token) {
          config.headers.Authorization = `Bearer ${state.token}`;
        }
      }
    } catch (error) {
      console.error("토큰 처리 중 오류:", error);
    }
    return config;
  },
  (error) => {
    console.error("API 요청 준비 중 오류:", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("서버 연결 시간 초과");
      throw new Error("서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }

    if (!error.response) {
      console.error("서버 연결 실패:", error.message);
      throw new Error("서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.");
    }

    console.error("API Error Details:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
        data: error.config?.data,
      },
    });

    const errorMessage = error.response?.data?.message || error.response?.statusText || `API 요청 실패 (${error.response?.status || "알 수 없는 오류"})`;
    throw new Error(errorMessage);
  }
);

interface RequestOptions {
  headers?: Record<string, string>;
}

// API 클라이언트 객체
export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions): Promise<T> => axiosInstance.get<T, T>(endpoint, options),

  post: <T>(endpoint: string, data: any, options?: RequestOptions): Promise<T> => axiosInstance.post<T, T>(endpoint, data, options),

  put: <T>(endpoint: string, data: any, options?: RequestOptions): Promise<T> => axiosInstance.put<T, T>(endpoint, data, options),

  delete: <T>(endpoint: string, options?: RequestOptions): Promise<T> => axiosInstance.delete<T, T>(endpoint, options),
};
