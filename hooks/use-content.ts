import { useQuery } from "@tanstack/react-query"
import { contentAPI } from "@/lib/api/api-client"
import {
  fetchHotIssues,
  fetchRecommendedTools,
  fetchPopularSideHustles,
  fetchDevLogs,
  fetchToolRequests,
} from "@/lib/api/content"

// 핫이슈 데이터 가져오기
export function useHotIssues() {
  return useQuery({
    queryKey: ["hotIssues"],
    queryFn: async () => {
      try {
        return await contentAPI.getHotIssues()
      } catch (error) {
        console.error("핫이슈 데이터 가져오기 실패:", error)
        return fetchHotIssues() // 실패 시 모의 데이터 사용
      }
    },
  })
}

// 추천 도구 데이터 가져오기
export function useRecommendedTools() {
  return useQuery({
    queryKey: ["recommendedTools"],
    queryFn: async () => {
      try {
        return await contentAPI.getRecommendedTools()
      } catch (error) {
        console.error("추천 도구 데이터 가져오기 실패:", error)
        return fetchRecommendedTools() // 실패 시 모의 데이터 사용
      }
    },
  })
}

// 인기 부업 데이터 가져오기
export function usePopularSideHustles() {
  return useQuery({
    queryKey: ["popularSideHustles"],
    queryFn: async () => {
      try {
        return await contentAPI.getPopularSideHustles()
      } catch (error) {
        console.error("인기 부업 데이터 가져오기 실패:", error)
        return fetchPopularSideHustles() // 실패 시 모의 데이터 사용
      }
    },
  })
}

// 개발 로그 데이터 가져오기
export function useDevLogs() {
  return useQuery({
    queryKey: ["devLogs"],
    queryFn: async () => {
      try {
        return await contentAPI.getDevLogs()
      } catch (error) {
        console.error("개발 로그 데이터 가져오기 실패:", error)
        return fetchDevLogs() // 실패 시 모의 데이터 사용
      }
    },
  })
}

// 도구 요청 데이터 가져오기
export function useToolRequests() {
  return useQuery({
    queryKey: ["toolRequests"],
    queryFn: async () => {
      try {
        return await contentAPI.getToolRequests()
      } catch (error) {
        console.error("도구 요청 데이터 가져오기 실패:", error)
        return fetchToolRequests() // 실패 시 모의 데이터 사용
      }
    },
  })
}

// 모든 콘텐츠 데이터 한 번에 가져오기
export function useAllContent() {
  const hotIssues = useHotIssues()
  const recommendedTools = useRecommendedTools()
  const popularSideHustles = usePopularSideHustles()
  const devLogs = useDevLogs()
  const toolRequests = useToolRequests()

  return {
    hotIssues,
    recommendedTools,
    popularSideHustles,
    devLogs,
    toolRequests,
    isLoading:
      hotIssues.isLoading ||
      recommendedTools.isLoading ||
      popularSideHustles.isLoading ||
      devLogs.isLoading ||
      toolRequests.isLoading,
    isError:
      hotIssues.isError ||
      recommendedTools.isError ||
      popularSideHustles.isError ||
      devLogs.isError ||
      toolRequests.isError,
  }
}
