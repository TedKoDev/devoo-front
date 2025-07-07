import { NextResponse } from 'next/server';

const SPREADSHEET_ID = "1D1BM4tC7xvpHJUlVJyQvFb1g3duMX7CS4YoEEY8d1v0";
const SHEET_ID = "1327564334"; // Finviz 시트의 gid
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${SHEET_ID}`;

export async function GET() {
  try {
    console.log('=== Finviz API Debug Start ===');
    console.log('Fetching Finviz data from:', CSV_URL);
    console.log('SPREADSHEET_ID:', SPREADSHEET_ID);
    console.log('SHEET_ID:', SHEET_ID);
    
    const response = await fetch(CSV_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/csv,application/csv,text/plain,*/*',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.8',
        'Cache-Control': 'no-cache',
      },
      redirect: 'follow',
    });

    console.log('Response status:', response.status);
    console.log('Response statusText:', response.statusText);
    console.log('Response URL:', response.url);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log('Raw response length:', responseText.length);
    console.log('Raw response (first 500 chars):', responseText.substring(0, 500));

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}, statusText: ${response.statusText}`);
      console.error('Full response:', responseText);
      return NextResponse.json({ 
        error: `HTTP error! status: ${response.status}, statusText: ${response.statusText}`,
        imageUrl: null, 
        date: null,
        debug: { responseText: responseText.substring(0, 1000) }
      }, { status: 200 });
    }

    const csvText = responseText;
    console.log('CSV data length:', csvText.length);
    console.log('CSV first 200 chars:', csvText.substring(0, 200));
    
    const rows = csvText.split("\n").map((row) => 
      row.split(",").map((cell) => cell.replace(/"/g, '').trim())
    );

    console.log('Parsed rows count:', rows.length);
    console.log('First few rows:', rows.slice(0, 3));

    if (!rows || rows.length < 3) {
      console.log('Not enough rows, returning null');
      return NextResponse.json({ imageUrl: null, date: null }, { status: 200 });
    }

    // 헤더 제외하고 데이터 부분만 추출
    const dataRows = rows.slice(1).filter(row => row[0] && row[1]);
    
    console.log('Data rows count:', dataRows.length);
    console.log('Data rows:', dataRows);

    if (dataRows.length === 0) {
      console.log('No data rows found, returning null');
      return NextResponse.json({ imageUrl: null, date: null }, { status: 200 });
    }

    // 마지막 행(최신 데이터) 가져오기
    const latestRow = dataRows[dataRows.length - 1];
    const imageUrl = latestRow[1]; // 두 번째 컬럼이 이미지 URL
    const date = latestRow[0]; // 첫 번째 컬럼이 날짜

    console.log('Latest row:', latestRow);
    console.log('Returning data:', { imageUrl, date });

    return NextResponse.json({ imageUrl, date });
  } catch (error) {
    console.error("Error fetching Finviz data:", error);
    return NextResponse.json({ 
      error: `Failed to fetch data: ${error instanceof Error ? error.message : 'Unknown error'}`,
      imageUrl: null, 
      date: null 
    }, { status: 200 });
  }
} 