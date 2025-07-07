export interface MarketData {
  날짜: string;
  항목: string;
  가격: string;
  단위: string;
  출처: string;
}

async function getSheetData(): Promise<MarketData[]> {
  try {
    const response = await fetch('/api/sheets/goldoil');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching market data:", error);
    throw error;
  }
}

export default getSheetData;
