import { google } from "googleapis";
import { useKeywordStore } from "@/store/useKeywordStore";

const SPREADSHEET_ID = "1D1BM4tC7xvpHJUlVJyQvFb1g3duMX7CS4YoEEY8d1v0";
const SHEET_ID = "0"; // gid=0
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${SHEET_ID}`;

export interface WeekKeywordMap {
  [week: string]: string[];
}

export async function getGoogleSheetData(): Promise<WeekKeywordMap> {
  try {
    const response = await fetch(CSV_URL);
    const csvText = await response.text();
    const rows = csvText.split("\n").map((row) => row.split(",").map((cell) => cell.trim()));

    if (!rows || rows.length < 2) return {};

    // 2번째 줄(인덱스 1): 주차명
    const weekLabels = rows[1].slice(1); // B2, C2, ...
    const result: WeekKeywordMap = {};

    weekLabels.forEach((label, colIdx) => {
      if (!label) return;
      result[label] = [];
      for (let rowIdx = 2; rowIdx < rows.length; rowIdx++) {
        const keyword = rows[rowIdx][colIdx + 1]; // B3, C3, ...
        if (keyword) result[label].push(keyword);
      }
    });

    return result;
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
