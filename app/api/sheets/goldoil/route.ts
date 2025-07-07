import { NextResponse } from 'next/server';

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

export async function GET() {
  try {
    const response = await fetch(CSV_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NextJS Server)',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const csvText = await response.text();
    const rows = csvText.split("\n").map((row) => row.split(",").map((cell) => cell.trim()));

    if (!rows || rows.length < 2) {
      return NextResponse.json([], { status: 200 });
    }

    // 첫 번째 줄은 헤더이므로 제외하고 데이터 파싱
    const data: MarketData[] = rows.slice(1).map((row) => ({
      날짜: row[0] || "",
      항목: row[1] || "",
      가격: row[2] || "",
      단위: row[3] || "",
      출처: row[4] || "",
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching market data:", error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
} 