import { NextResponse } from 'next/server';

const SPREADSHEET_ID = "1D1BM4tC7xvpHJUlVJyQvFb1g3duMX7CS4YoEEY8d1v0";
const SHEET_ID = "0"; // gid=0
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${SHEET_ID}`;

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
      return NextResponse.json({}, { status: 200 });
    }

    // 2번째 줄(인덱스 1): 주차명
    const weekLabels = rows[1].slice(1); // B2, C2, ...
    const result: { [week: string]: string[] } = {};

    weekLabels.forEach((label, colIdx) => {
      if (!label) return;
      result[label] = [];
      for (let rowIdx = 2; rowIdx < rows.length; rowIdx++) {
        const keyword = rows[rowIdx][colIdx + 1]; // B3, C3, ...
        if (keyword) result[label].push(keyword);
      }
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching Google Sheet data:", error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
} 