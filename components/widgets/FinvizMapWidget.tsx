"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useFinviz } from "@/lib/hooks/useFinviz";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useFinvizStore } from "@/store/useFinvizStore";

export default function FinvizMapWidget() {
  const { imageUrl, isLoading, error } = useFinviz();
  const { lastFetched } = useFinvizStore();

  // 현재 날짜의 오전 6시 15분으로 설정
  const formattedDate = lastFetched
    ? (() => {
        const date = new Date(lastFetched);
        date.setHours(6, 15);
        return (
          date.toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }) + " 오전 6시 15분"
        );
      })()
    : null;

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          Finviz 히트맵
          {formattedDate && <span className="text-sm font-normal text-muted-foreground ml-2">({formattedDate})</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : imageUrl ? (
          <Dialog>
            <DialogTrigger asChild>
              <div className="relative h-[400px] w-full cursor-pointer hover:opacity-90 transition-opacity">
                <Image src={imageUrl} alt="Finviz Market Map" fill className="object-contain" unoptimized />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] max-h-[90vh] w-fit h-fit">
              <div className="flex flex-col gap-2">
                {formattedDate && <div className="text-sm text-muted-foreground">업데이트: {formattedDate}</div>}
                <div className="relative w-[80vw] h-[80vh]">
                  <Image src={imageUrl} alt="Finviz Market Map" fill className="object-contain" unoptimized priority />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <div className="flex items-center justify-center h-[400px] text-muted-foreground">{error ? `에러: ${error.message}` : "이미지를 불러올 수 없습니다."}</div>
        )}
      </CardContent>
    </Card>
  );
}
