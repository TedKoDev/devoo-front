const SPREADSHEET_ID = "1D1BM4tC7xvpHJUlVJyQvFb1g3duMX7CS4YoEEY8d1v0";
const SHEET_ID = "514392219"; // gid=514392219
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${SHEET_ID}`;

export interface MarketData {
  날짜: string;
  항목: string;
  가격: string;
  단위: string;
  출처: string;
}

async function getSheetData(): Promise<MarketData[]> {
  try {
    const response = await fetch(CSV_URL);
    const csvText = await response.text();
    const rows = csvText.split("\n").map((row) => row.split(",").map((cell) => cell.trim()));

    if (!rows || rows.length < 2) return [];

    // 첫 번째 줄은 헤더이므로 제외하고 데이터 파싱
    const data = rows.slice(1).map((row) => ({
      날짜: row[0] || "",
      항목: row[1] || "",
      가격: row[2] || "",
      단위: row[3] || "",
      출처: row[4] || "",
    }));

    return data;
  } catch (error) {
    console.error("Error fetching market data:", error);
    throw error;
  }
}

export default getSheetData;
