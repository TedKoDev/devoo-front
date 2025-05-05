import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { interactionApi } from "@/lib/api/interactions";
import { TargetType, TargetTypes } from "@/types/content";

function isValidTargetType(type: string): type is TargetType {
  return Object.values(TargetTypes).includes(type as any);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("상호작용 카운트 업데이트", body);

    // 필수 필드 검증
    if (!body.contentId || !body.type) {
      return NextResponse.json({ message: "컨텐츠 ID와 상호작용 타입은 필수입니다." }, { status: 400 });
    }

    // Authorization 헤더 가져오기
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "인증이 필요합니다." }, { status: 401 });
    }

    // TODO: 실제 상호작용 카운트 업데이트 로직 구현
    // const response = await interactionApi.updateCount(body, authHeader);

    // 임시 응답
    return NextResponse.json({
      message: "상호작용이 성공적으로 기록되었습니다.",
      contentId: body.contentId,
      type: body.type,
    });
  } catch (error) {
    console.error("상호작용 카운트 업데이트 오류:", error);
    const errorMessage = error instanceof Error ? error.message : "상호작용 처리 중 오류가 발생했습니다.";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

// GET /api/interactions/counts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const target_type = searchParams.get("target_type");
    const target_id = searchParams.get("target_id");

    if (!target_type || !target_id) {
      return NextResponse.json({ message: "target_type과 target_id는 필수입니다." }, { status: 400 });
    }

    if (!isValidTargetType(target_type)) {
      return NextResponse.json({ message: "유효하지 않은 target_type입니다." }, { status: 400 });
    }

    const response = await interactionApi.getCounts(target_type, Number(target_id));
    return NextResponse.json(response);
  } catch (error) {
    console.error("상호작용 수 조회 오류:", error);
    const errorMessage = error instanceof Error ? error.message : "상호작용 수 조회 중 오류가 발생했습니다.";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
