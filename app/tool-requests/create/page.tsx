"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useToast } from "@/hooks/use-toast";
import TiptapEditor from "@/components/editor/TiptapEditor";

export default function CreateToolRequestPage() {
  const { isLoggedIn } = useUserStore();
  const { toast } = useToast();
  const router = useRouter();

  const [toolName, setToolName] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: "development", label: "개발 도구" },
    { value: "design", label: "디자인 도구" },
    { value: "productivity", label: "생산성 도구" },
    { value: "finance", label: "금융/투자 도구" },
    { value: "analysis", label: "분석 도구" },
    { value: "automation", label: "자동화 도구" },
    { value: "communication", label: "커뮤니케이션 도구" },
    { value: "other", label: "기타" },
  ];

  const priorities = [
    { value: "low", label: "낮음" },
    { value: "medium", label: "보통" },
    { value: "high", label: "높음" },
    { value: "urgent", label: "긴급" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast({
        title: "로그인이 필요합니다",
        description: "툴 요청을 작성하려면 로그인해 주세요.",
        variant: "destructive",
      });
      return;
    }

    if (!toolName.trim() || !description.trim() || !content.trim()) {
      toast({
        title: "입력 오류",
        description: "모든 필수 필드를 입력해 주세요.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // 실제로는 API 호출을 여기서 수행
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 시뮬레이션

      toast({
        title: "툴 요청이 등록되었습니다",
        description: "관리자 검토 후 목록에 추가됩니다.",
      });

      router.push("/tool-requests");
    } catch (error) {
      toast({
        title: "오류가 발생했습니다",
        description: "다시 시도해 주세요.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/tool-requests");
  };

  return (
    <div className="py-6">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={handleCancel}
            className="flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            목록으로 돌아가기
          </Button>
          <h1 className="text-3xl font-bold">새 툴 요청하기</h1>
          <p className="text-gray-600 mt-2">
            개발자들이 만들어주길 원하는 툴을 자세히 설명해주세요.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 메인 콘텐츠 */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>기본 정보</CardTitle>
                  <CardDescription>
                    툴의 기본적인 정보를 입력해주세요.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="tool-name" className="text-sm font-medium">
                      툴 이름 <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="tool-name"
                      placeholder="예: AI 코드 리뷰 도구"
                      value={toolName}
                      onChange={(e) => setToolName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="description"
                      className="text-sm font-medium"
                    >
                      요약 설명 <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="description"
                      placeholder="한 줄로 간단히 설명해주세요"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">카테고리</label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="카테고리 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">우선순위</label>
                      <Select value={priority} onValueChange={setPriority}>
                        <SelectTrigger>
                          <SelectValue placeholder="우선순위 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {priorities.map((pri) => (
                            <SelectItem key={pri.value} value={pri.value}>
                              {pri.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>상세 설명</CardTitle>
                  <CardDescription>
                    툴의 기능, 필요성, 기대 효과 등을 자세히 설명해주세요.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      상세 내용 <span className="text-red-500">*</span>
                    </label>
                    <div className="border rounded-lg">
                      <TiptapEditor
                        content={content}
                        onChange={setContent}
                        placeholder="툴에 대해 자세히 설명해주세요...

• 어떤 문제를 해결하나요?
• 주요 기능은 무엇인가요?
• 어떤 기술이 필요한가요?
• 기대하는 효과는 무엇인가요?"
                        className="min-h-[400px]"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 사이드바 */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>작성 가이드</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-medium mb-1">📝 좋은 요청서 작성법</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• 구체적이고 명확한 설명</li>
                      <li>• 실제 사용 사례 포함</li>
                      <li>• 기대 효과 명시</li>
                      <li>• 유사 도구와의 차이점</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-1">🚀 개발 우선순위</h4>
                    <p className="text-gray-600">
                      투표수가 많고 구체적인 요청일수록 빠르게 개발됩니다.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-1">💡 참고사항</h4>
                    <p className="text-gray-600">
                      기술적 난이도와 개발 리소스를 고려하여 개발 여부가
                      결정됩니다.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          등록 중...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          요청 등록하기
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={handleCancel}
                      disabled={isSubmitting}
                    >
                      취소
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
