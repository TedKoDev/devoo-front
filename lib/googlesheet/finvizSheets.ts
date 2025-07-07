const SPREADSHEET_ID = "1D1BM4tC7xvpHJUlVJyQvFb1g3duMX7CS4YoEEY8d1v0";
const SHEET_ID = "1327564334"; // gid from URL
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${SHEET_ID}`;

interface SheetRow {
  날짜: string;
  주소: string;
}

async function getFinvizImageUrl(): Promise<{ imageUrl: string | null; date: string | null }> {
  try {
    console.log('Fetching Finviz data from API route');
    
    const response = await fetch('/api/sheets/finviz');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Finviz data received:', data);
    
    return data;
  } catch (error) {
    console.error("Error fetching Finviz data:", error);
    return { imageUrl: null, date: null };
  }
}

export default getFinvizImageUrl;
