import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authApi } from "@/lib/api/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 필수 필드 검증
    if (!body.username || !body.password) {
      return NextResponse.json({ message: "아이디와 비밀번호는 필수입니다." }, { status: 400 });
    }

    // 외부 API 호출
    const response = await authApi.register(body);
    return NextResponse.json(response);
  } catch (error) {
    console.error("회원가입 오류:", error);

    // 에러 메시지 처리
    const errorMessage = error instanceof Error ? error.message : "회원가입 중 오류가 발생했습니다.";

    // 409 상태 코드인 경우 (이미 존재하는 사용자)
    if (errorMessage.includes("이미 존재하는")) {
      return NextResponse.json({ message: errorMessage }, { status: 409 });
    }

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
