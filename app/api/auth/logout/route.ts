import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authApi } from "@/lib/api/auth";

export async function POST(request: NextRequest) {
  try {
    // 외부 API 호출
    await authApi.logout();
    return NextResponse.json({ message: "로그아웃 되었습니다." });
  } catch (error) {
    console.error("로그아웃 오류:", error);
    return NextResponse.json({ message: "로그아웃 중 오류가 발생했습니다." }, { status: 500 });
  }
}
