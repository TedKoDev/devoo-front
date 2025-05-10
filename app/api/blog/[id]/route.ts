import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { blogPostApi } from "@/lib/api/blog";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      return NextResponse.json({ message: "유효하지 않은 ID입니다." }, { status: 400 });
    }

    const response = await blogPostApi.getBlogPostById(parsedId);

    if (!response) {
      return NextResponse.json({ message: "게시글을 찾을 수 없습니다." }, { status: 404 });
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("블로그 포스트 조회 오류:", error);
    return NextResponse.json({ message: "블로그 포스트 조회 중 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const parsedId = parseInt(id, 10);
    const body = await request.json();

    if (isNaN(parsedId)) {
      return NextResponse.json({ message: "유효하지 않은 ID입니다." }, { status: 400 });
    }

    // 필수 필드 검증
    if (!body.title || !body.content) {
      return NextResponse.json({ message: "제목과 내용은 필수입니다." }, { status: 400 });
    }

    // Authorization 헤더 가져오기
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "인증이 필요합니다." }, { status: 401 });
    }

    const response = await blogPostApi.updateBlogPost(parsedId, body, authHeader);
    return NextResponse.json(response);
  } catch (error) {
    console.error("블로그 포스트 수정 오류:", error);
    const errorMessage = error instanceof Error ? error.message : "블로그 포스트 수정 중 오류가 발생했습니다.";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      return NextResponse.json({ message: "유효하지 않은 ID입니다." }, { status: 400 });
    }

    // Authorization 헤더 가져오기
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "인증이 필요합니다." }, { status: 401 });
    }

    await blogPostApi.deleteBlogPost(parsedId, authHeader);
    return NextResponse.json({ message: "블로그 포스트가 삭제되었습니다." });
  } catch (error) {
    console.error("블로그 포스트 삭제 오류:", error);
    const errorMessage = error instanceof Error ? error.message : "블로그 포스트 삭제 중 오류가 발생했습니다.";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
