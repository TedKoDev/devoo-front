import { useQuery } from "@tanstack/react-query";
import { fetchHotIssues, fetchRecommendedTools, fetchPopularSideHustles, fetchDevLogs } from "@/lib/api/content";

// 핫이슈 데이터 가져오기
export function useHotIssues() {
  return useQuery({
    queryKey: ["hotIssues"],
    queryFn: fetchHotIssues,
  });
}

// 추천 도구 데이터 가져오기
export function useRecommendedTools() {
  return useQuery({
    queryKey: ["recommendedTools"],
    queryFn: fetchRecommendedTools,
  });
}

// 인기 부업 데이터 가져오기
export function usePopularSideHustles() {
  return useQuery({
    queryKey: ["popularSideHustles"],
    queryFn: fetchPopularSideHustles,
  });
}

// 개발 로그 데이터 가져오기
export function useDevLogs() {
  return useQuery({
    queryKey: ["devLogs"],
    queryFn: fetchDevLogs,
  });
}

// 모든 콘텐츠 데이터 한 번에 가져오기
export function useAllContent() {
  const hotIssues = useHotIssues();
  const recommendedTools = useRecommendedTools();
  const popularSideHustles = usePopularSideHustles();
  const devLogs = useDevLogs();

  return {
    hotIssues,
    recommendedTools,
    popularSideHustles,
    devLogs,
    isLoading: hotIssues.isLoading || recommendedTools.isLoading || popularSideHustles.isLoading || devLogs.isLoading,
    isError: hotIssues.isError || recommendedTools.isError || popularSideHustles.isError || devLogs.isError,
  };
}
