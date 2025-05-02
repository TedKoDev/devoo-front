import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { devlogApi } from "@/lib/api/devlog";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("글쓰기", body);

    // 필수 필드 검증
    if (!body.title || !body.content) {
      return NextResponse.json({ message: "제목과 내용은 필수입니다." }, { status: 400 });
    }

    // Authorization 헤더 가져오기
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "인증이 필요합니다." }, { status: 401 });
    }

    // 외부 API 호출 시 헤더 전달
    const response = await devlogApi.writeDevlog(body, authHeader);
    return NextResponse.json(response);
  } catch (error) {
    console.error("개발일지 작성 오류:", error);
    const errorMessage = error instanceof Error ? error.message : "개발일지 작성 중 오류가 발생했습니다.";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const response = await devlogApi.getDevlogs();
  return NextResponse.json(response);
}
