// app/api/devlogs/[id]/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { devlogApi } from "@/lib/api/devlog";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      return NextResponse.json({ message: "유효하지 않은 ID입니다." }, { status: 400 });
    }

    const response = await devlogApi.getDevlogById(parsedId);

    if (!response) {
      return NextResponse.json({ message: "게시글을 찾을 수 없습니다." }, { status: 404 });
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("개발일지 조회 오류:", error);
    return NextResponse.json({ message: "개발일지 조회 중 오류가 발생했습니다." }, { status: 500 });
  }
}
