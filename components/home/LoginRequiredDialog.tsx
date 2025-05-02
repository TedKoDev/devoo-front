"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function LoginRequiredDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          위젯 위치 변경
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>로그인이 필요합니다</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>위젯 위치 변경 기능은 로그인 후 이용 가능합니다.</p>
          <p className="text-sm text-gray-500 mt-2">로그인하시면 위젯 배치를 자유롭게 변경하고 저장할 수 있습니다.</p>
        </div>
        <DialogFooter>
          <Button onClick={() => (window.location.href = "/login")}>로그인하기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
