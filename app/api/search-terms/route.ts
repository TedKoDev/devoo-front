import { NextResponse } from "next/server";
import { searchTermApi } from "@/lib/api/search-term";

export async function GET() {
  try {
    const searchTerms = await searchTermApi.findAll();
    return NextResponse.json(searchTerms);
  } catch (error) {
    console.error("Failed to fetch search terms:", error);
    return NextResponse.json({ message: "검색어 목록 조회에 실패했습니다." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const searchTerm = await searchTermApi.create(body);
    return NextResponse.json(searchTerm);
  } catch (error) {
    console.error("Failed to create search term:", error);
    return NextResponse.json({ message: "검색어 생성에 실패했습니다." }, { status: 500 });
  }
}
