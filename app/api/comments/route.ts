import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { commentApi } from "@/lib/api/comments";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Router 댓글 작성", body);

    // 필수 필드 검증
    if (!body.content) {
      return NextResponse.json({ message: "내용은 필수입니다." }, { status: 400 });
    }

    // Authorization 헤더 가져오기
    const authHeader = request.headers.get("authorization");

    console.log("authHeader", authHeader);
    if (!authHeader) {
      return NextResponse.json({ message: "인증이 필요합니다." }, { status: 401 });
    }

    // 외부 API 호출 시 헤더 전달
    const response = await commentApi.createComment(body, authHeader);
    return NextResponse.json(response);
  } catch (error) {
    console.error("개발일지 작성 오류:", error);
    const errorMessage = error instanceof Error ? error.message : "개발일지 작성 중 오류가 발생했습니다.";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const response = await commentApi.getComments(request.nextUrl.searchParams.get("target_type") || "", request.nextUrl.searchParams.get("target_id") || "");
  return NextResponse.json(response);
}
