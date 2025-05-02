import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authApi } from "@/lib/api/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("[Login API] Request body:", body);

    // 필수 필드 검증
    if (!body.username || !body.password) {
      return NextResponse.json({ message: "아이디와 비밀번호는 필수입니다." }, { status: 400 });
    }

    // 외부 API 호출
    console.log("[Login API] Calling external API...");
    const response = await authApi.login(body);
    console.log("[Login API] External API response:", response);

    // 응답 전달 (토큰을 그대로 전달)
    return NextResponse.json(response);
  } catch (error) {
    console.error("[Login API] Error details:", error);
    const errorMessage = error instanceof Error ? error.message : "로그인 중 오류가 발생했습니다.";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
