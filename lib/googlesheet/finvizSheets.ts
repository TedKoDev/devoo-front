const SPREADSHEET_ID = "1D1BM4tC7xvpHJUlVJyQvFb1g3duMX7CS4YoEEY8d1v0";
const SHEET_ID = "1327564334"; // gid from URL
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${SHEET_ID}`;

interface SheetRow {
  날짜: string;
  주소: string;
}

async function getLatestFinvizImage(): Promise<string> {
  try {
    const response = await fetch(CSV_URL);

    console.log("response", response);
    const csvText = await response.text();
    const rows = csvText.split("\n").map((row) => row.split(",").map((cell) => cell.trim()));

    if (!rows || rows.length < 2) {
      throw new Error("No data found in the spreadsheet");
    }

    // 첫 번째 줄은 헤더이므로 제외하고 첫 번째 데이터 행의 URL 반환
    const imageUrl = rows[1][1]; // 두 번째 열(B열)의 URL

    if (!imageUrl) {
      throw new Error("No image URL found in the latest row");
    }

    return imageUrl;
  } catch (error) {
    console.error("Error fetching image URL:", error);
    throw error;
  }
}

export default getLatestFinvizImage;
