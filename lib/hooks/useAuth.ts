import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/useUserStore";
import type { AuthRequest } from "@/lib/api/auth";

export function useAuth() {
  const router = useRouter();
  const { toast } = useToast();
  const { login: setUser, logout } = useUserStore();

  // 로그인 mutation
  const loginMutation = useMutation({
    mutationFn: async (data: AuthRequest) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("로그인에 실패했습니다.");
      }

      return response.json();
    },
    onSuccess: (response) => {
      console.log("Login success response:", response);
      if (!response.user || !response.token) {
        console.error("Invalid login response:", response);
        toast({
          title: "로그인 실패",
          description: "서버 응답이 올바르지 않습니다.",
          variant: "destructive",
        });
        return;
      }

      // JWT 토큰과 유저 정보 저장
      setUser(response.user, response.token);

      toast({
        title: "로그인 성공",
        description: "환영합니다!",
      });

      router.push("/");
    },
    onError: (error: Error) => {
      toast({
        title: "로그인 실패",
        description: "아이디 또는 비밀번호가 올바르지 않습니다.",
        variant: "destructive",
      });
    },
  });

  // 회원가입 mutation
  const registerMutation = useMutation({
    mutationFn: async (data: AuthRequest) => {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (response) => {
      toast({
        title: "회원가입 성공",
        description: "회원가입이 완료되었습니다. 로그인해주세요.",
      });

      router.push("/login");
    },
    onError: (error: Error) => {
      toast({
        title: "회원가입 실패",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // 로그아웃 mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("로그아웃에 실패했습니다.");
      }
    },
    onSuccess: () => {
      // 로그아웃 시 유저 정보 초기화
      logout();
      router.push("/login");
    },
  });

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    isLoading: loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending,
  };
}
