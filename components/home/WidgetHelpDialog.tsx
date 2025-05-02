"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"

export default function WidgetHelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <HelpCircle className="h-4 w-4" />
          <span>위젯 도움말</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>위젯 도움말</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <p>Devooup Hub의 위젯 기능에 대한 도움말입니다.</p>

          <div className="space-y-2">
            <h3 className="font-medium">위젯이란?</h3>
            <p className="text-sm text-gray-600">
              위젯은 금융 정보, 검색 트렌드, 환율 등 다양한 정보를 한눈에 볼 수 있게 해주는 작은 정보 블록입니다.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">위젯 관리</h3>
            <p className="text-sm text-gray-600">
              로그인 후에는 '위젯 관리' 버튼을 통해 원하는 위젯만 표시하거나 숨길 수 있습니다.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">위젯 위치 변경</h3>
            <p className="text-sm text-gray-600">
              로그인 후에는 '위젯 위치 변경' 버튼을 클릭하여 위젯의 배치를 자유롭게 변경할 수 있습니다.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">위젯 설명</h3>
            <p className="text-sm text-gray-600">
              각 위젯 오른쪽 상단의 물음표(?) 아이콘에 마우스를 올리면 해당 위젯에 대한 설명을 볼 수 있습니다.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
