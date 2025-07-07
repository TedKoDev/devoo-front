import { useKeywordStore } from "@/store/useKeywordStore";

export interface WeekKeywordMap {
  [week: string]: string[];
}

export async function getGoogleSheetData(): Promise<WeekKeywordMap> {
  try {
    const response = await fetch('/api/sheets/keywords');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Google Sheet data:", error);
    throw error;
  }
}

// 데이터를 가져오는 훅
export function useGoogleSheetData() {
  const { keywords, isLoading, error, fetchKeywords } = useKeywordStore();

  return {
    keywords,
    isLoading,
    error,
    fetchKeywords,
  };
}
