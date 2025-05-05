import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { interactionApi } from "@/lib/api/interactions";
import { TargetType, TargetTypes } from "@/types/content";

function isValidTargetType(type: string): type is TargetType {
  return Object.values(TargetTypes).includes(type as any);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const target_type = searchParams.get("target_type");
    const target_id = searchParams.get("target_id");
    const authHeader = request.headers.get("authorization");

    if (!target_type || !target_id) {
      return NextResponse.json({ message: "target_type과 target_id는 필수입니다." }, { status: 400 });
    }

    if (!isValidTargetType(target_type)) {
      return NextResponse.json({ message: "유효하지 않은 target_type입니다." }, { status: 400 });
    }

    const response = await interactionApi.getUserInteractions(target_type, Number(target_id), authHeader || undefined);
    return NextResponse.json(response);
  } catch (error) {
    console.error("사용자 상호작용 조회 오류:", error);
    const errorMessage = error instanceof Error ? error.message : "사용자 상호작용 조회 중 오류가 발생했습니다.";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
