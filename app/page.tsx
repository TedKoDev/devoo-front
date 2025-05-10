"use client";

import { Suspense } from "react";
import CustomizableWidgetGrid from "@/components/home/CustomizableWidgetGrid";
import MainSections from "@/components/home/MainSections";
import WidgetSkeleton from "@/components/widgets/WidgetSkeleton";
import SectionSkeleton from "@/components/sections/SectionSkeleton";
import { Button } from "@/components/ui/button";
import { useAllMarketData } from "@/hooks/use-market-data";
import { useAllContent } from "@/hooks/use-content";
import { useToast } from "@/hooks/use-toast";
import { useOverlay } from "@toss/use-overlay";
import { ConfirmDialog } from "@/components/ads/Confirmdialog";

export default function Home() {
  const { toast } = useToast();
  const overlay = useOverlay();

  const handleOpenDialog = async () => {
    const confirmed = await new Promise<boolean>((resolve) => {
      overlay.open(({ isOpen, close }) => (
        <ConfirmDialog
          open={isOpen}
          onClose={() => {
            resolve(false);
            close();
          }}
          onConfirm={() => {
            resolve(true);
            close();
          }}
        />
      ));
    });

    if (confirmed) {
      alert("사용자가 확인을 눌렀습니다.");
    } else {
      alert("사용자가 취소를 눌렀습니다.");
    }
  };
  // React Query를 사용하여 데이터 가져오기
  const {
    searchTrends,
    stockMarkets,
    goldPrice,
    oilPrice,
    exchangeRates,
    globalIssues,
    marketEvents,
    // recommendedStocks,
    isLoading: isMarketDataLoading,
    isError: isMarketDataError,
  } = useAllMarketData();

  const { hotIssues, recommendedTools, popularSideHustles, isLoading: isContentLoading, isError: isContentError } = useAllContent();

  // 로딩 상태 확인
  const isLoading = isMarketDataLoading || isContentLoading;

  // 에러 상태 확인
  const hasError = isMarketDataError || isContentError;

  // 데이터가 로드되지 않았으면 로딩 상태 표시
  if (isLoading) {
    return (
      <div className="py-6">
        <WidgetSkeleton />
        <div className="mt-12">
          <SectionSkeleton />
        </div>
      </div>
    );
  }

  // 에러 발생 시 에러 메시지 표시
  if (hasError) {
    return (
      <div className="py-6">
        <div className="bg-red-50 border border-red-200 p-4 rounded-md mb-6 text-red-700">
          <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
          <Button variant="outline" className="mt-2" onClick={() => window.location.reload()}>
            새로고침
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <CustomizableWidgetGrid
        searchTrends={searchTrends.data}
        stockMarkets={stockMarkets.data}
        recommendedStocks={[]} // TODO: API 구현 후 recommendedStocks.data로 변경
        globalIssues={globalIssues.data}
        marketEvents={marketEvents.data}
        oilPrice={oilPrice.data}
        goldPrice={goldPrice.data}
        exchangeRates={exchangeRates.data}
      />

      <div className="mt-12">
        <Suspense fallback={<SectionSkeleton />}>
          {/* <Button onClick={handleOpenDialog}>Open Confirm Dialog</Button> */}
          <MainSections hotIssues={hotIssues.data} recommendedTools={recommendedTools.data} popularSideHustles={popularSideHustles.data} />
        </Suspense>
      </div>
    </div>
  );
}
