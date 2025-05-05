import { interactionApi } from "@/lib/api/interactions";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TargetType, TargetTypes } from "@/types/content";

function isValidTargetType(type: string): type is TargetType {
  return Object.values(TargetTypes).includes(type as any);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ message: "인증이 필요합니다." }, { status: 401 });
    }

    if (!body.target_type || !body.target_id) {
      return NextResponse.json({ message: "target_type과 target_id는 필수입니다." }, { status: 400 });
    }

    if (!isValidTargetType(body.target_type)) {
      return NextResponse.json({ message: "유효하지 않은 target_type입니다." }, { status: 400 });
    }

    const response = await interactionApi.addLike(
      {
        target_type: body.target_type,
        target_id: Number(body.target_id),
      },
      authHeader
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error("좋아요 추가 오류:", error);
    const errorMessage = error instanceof Error ? error.message : "좋아요 추가 중 오류가 발생했습니다.";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const target_type = searchParams.get("target_type");
    const target_id = searchParams.get("target_id");
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ message: "인증이 필요합니다." }, { status: 401 });
    }

    if (!target_type || !target_id) {
      return NextResponse.json({ message: "target_type과 target_id는 필수입니다." }, { status: 400 });
    }

    if (!isValidTargetType(target_type)) {
      return NextResponse.json({ message: "유효하지 않은 target_type입니다." }, { status: 400 });
    }

    const response = await interactionApi.removeLike(target_type, Number(target_id), authHeader);

    return NextResponse.json(response);
  } catch (error) {
    console.error("좋아요 제거 오류:", error);
    const errorMessage = error instanceof Error ? error.message : "좋아요 제거 중 오류가 발생했습니다.";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
