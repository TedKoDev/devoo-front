import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { blogPostApi } from "@/lib/api/blog";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("블로그 포스트 작성", body);

    if (!body.title || !body.content) {
      return NextResponse.json({ message: "제목과 내용은 필수입니다." }, { status: 400 });
    }

    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "인증이 필요합니다." }, { status: 401 });
    }

    const response = await blogPostApi.createBlogPost(body, authHeader);
    return NextResponse.json(response);
  } catch (error) {
    console.error("블로그 포스트 작성 오류:", error);
    const errorMessage = error instanceof Error ? error.message : "블로그 포스트 작성 중 오류가 발생했습니다.";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const response = await blogPostApi.getAllBlogPosts();
  return NextResponse.json(response);
}
