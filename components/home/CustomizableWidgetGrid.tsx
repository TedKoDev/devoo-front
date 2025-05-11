"use client";

import { DialogTrigger } from "@/components/ui/dialog";

import { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Settings, Eye, EyeOff, Save, RotateCcw, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/useUserStore";
import StockMarketWidget from "@/components/widgets/StockMarketWidget";
import SearchTrendsWidget from "@/components/widgets/SearchTrendsWidget";
import GoldOilWidget from "@/components/widgets/GoldOilWidget";
import ExchangeRatesWidget from "@/components/widgets/ExchangeRatesWidget";
import GlobalIssuesWidget from "@/components/widgets/GlobalIssuesWidget";
import RecommendedStocksWidget from "@/components/widgets/RecommendedStocksWidget";
import MarketCalendarWidget from "@/components/widgets/MarketCalendarWidget";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import WidgetHelpDialog from "./WidgetHelpDialog";
import WidgetTypesDialog from "./WidgetTypesDialog";
import LoginRequiredDialog from "./LoginRequiredDialog";

// 반응형 그리드 레이아웃 설정
const ResponsiveGridLayout = WidthProvider(Responsive);

// 위젯 정의
const widgetDefinitions = [
  {
    id: "searchTrends",
    name: "실시간 검색어",
    defaultVisible: true,
    description: "주요 포털 사이트의 실시간 검색어 순위를 확인할 수 있습니다.",
    category: "트렌드",
  },
  {
    id: "goldOil",
    name: "금/유가 시세",
    defaultVisible: true,
    description: "금과 국제 유가 정보와 변동률을 제공합니다.",
    category: "원자재",
  },
  {
    id: "exchangeRates",
    name: "환율",
    defaultVisible: true,
    description: "주요 통화의 환율 정보를 제공합니다.",
    category: "금융",
  },
  {
    id: "stockMarket",
    name: "주요 증시",
    defaultVisible: true,
    description: "국내외 주요 증시 지수와 등락률을 실시간으로 제공합니다.",
    category: "금융",
  },
  {
    id: "recommendedStocks",
    name: "추천 종목",
    defaultVisible: true,
    description: "국내외 추천 주식 종목 정보를 제공합니다.",
    category: "투자",
  },
  {
    id: "globalIssues",
    name: "글로벌 이슈",
    defaultVisible: true,
    description: "글로벌 금융 시장에 영향을 미치는 주요 이슈를 제공합니다.",
    category: "뉴스",
  },
  {
    id: "marketCalendar",
    name: "증시 이슈 캘린더",
    defaultVisible: true,
    description: "주요 경제 지표 발표, 실적 발표 등 증시 관련 일정을 제공합니다.",
    category: "금융",
  },
];

// 기본 레이아웃 설정
const defaultLayouts = {
  lg: [
    { i: "searchTrends", x: 0, y: 0, w: 1, h: 1 },
    { i: "goldOil", x: 1, y: 0, w: 1, h: 1 },
    { i: "exchangeRates", x: 2, y: 0, w: 1, h: 1 },

    { i: "stockMarket", x: 0, y: 1, w: 1, h: 1 },
    { i: "recommendedStocks", x: 1, y: 1, w: 1, h: 1 },
    { i: "globalIssues", x: 2, y: 1, w: 1, h: 1 },
    { i: "marketCalendar", x: 0, y: 2, w: 1, h: 1 },
  ],
  md: [
    { i: "searchTrends", x: 0, y: 0, w: 1, h: 1 },
    { i: "goldOil", x: 1, y: 0, w: 1, h: 1 },
    { i: "exchangeRates", x: 0, y: 1, w: 1, h: 1 },

    { i: "stockMarket", x: 1, y: 1, w: 1, h: 1 },
    { i: "recommendedStocks", x: 0, y: 2, w: 1, h: 1 },
    { i: "globalIssues", x: 1, y: 2, w: 1, h: 1 },
    { i: "marketCalendar", x: 0, y: 3, w: 2, h: 1 },
  ],
  sm: [
    { i: "searchTrends", x: 0, y: 0, w: 1, h: 1 },
    { i: "goldOil", x: 0, y: 1, w: 1, h: 1 },
    { i: "exchangeRates", x: 0, y: 2, w: 1, h: 1 },

    { i: "stockMarket", x: 0, y: 3, w: 1, h: 1 },
    { i: "recommendedStocks", x: 0, y: 4, w: 1, h: 1 },
    { i: "globalIssues", x: 0, y: 5, w: 1, h: 1 },
    { i: "marketCalendar", x: 0, y: 6, w: 1, h: 1 },
  ],
};

interface CustomizableWidgetGridProps {
  searchTrends: any;
  stockMarkets: any;
  recommendedStocks: any;
  globalIssues: any;
  marketEvents: any;
  goldOil: any;
  exchangeRates: any;
}

export default function CustomizableWidgetGrid({ searchTrends, stockMarkets, recommendedStocks, globalIssues, marketEvents, goldOil, exchangeRates }: CustomizableWidgetGridProps) {
  const { isLoggedIn, user } = useUserStore();
  const { toast } = useToast();

  // 위젯 표시 여부 상태
  const [visibleWidgets, setVisibleWidgets] = useState<Record<string, boolean>>(() => {
    // 기본적으로 모든 위젯 표시
    return widgetDefinitions.reduce((acc, widget) => {
      acc[widget.id] = widget.defaultVisible;
      return acc;
    }, {} as Record<string, boolean>);
  });

  // 레이아웃 상태
  const [layouts, setLayouts] = useState(defaultLayouts);

  // 편집 모드 상태
  const [isEditMode, setIsEditMode] = useState(false);

  // 위젯 관리 다이얼로그 상태
  const [isWidgetManageOpen, setIsWidgetManageOpen] = useState(false);

  // 사용자 설정 로드
  useEffect(() => {
    if (isLoggedIn && user) {
      // 로컬 스토리지에서 사용자별 설정 로드
      const savedLayouts = localStorage.getItem(`widget-layouts-${user.id}`);
      const savedVisibility = localStorage.getItem(`widget-visibility-${user.id}`);

      if (savedLayouts) {
        try {
          setLayouts(JSON.parse(savedLayouts));
        } catch (e) {
          console.error("Failed to parse saved layouts", e);
        }
      }

      if (savedVisibility) {
        try {
          setVisibleWidgets(JSON.parse(savedVisibility));
        } catch (e) {
          console.error("Failed to parse saved visibility", e);
        }
      }
    }
  }, [isLoggedIn, user]);

  // 레이아웃 변경 핸들러
  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    if (isEditMode) {
      setLayouts(allLayouts);
    }
  };

  // 위젯 표시 여부 토글 핸들러
  const toggleWidgetVisibility = (widgetId: string) => {
    setVisibleWidgets((prev) => ({
      ...prev,
      [widgetId]: !prev[widgetId],
    }));
  };

  // 설정 저장 핸들러
  const saveSettings = () => {
    if (isLoggedIn && user) {
      localStorage.setItem(`widget-layouts-${user.id}`, JSON.stringify(layouts));
      localStorage.setItem(`widget-visibility-${user.id}`, JSON.stringify(visibleWidgets));

      toast({
        title: "설정 저장 완료",
        description: "위젯 설정이 저장되었습니다.",
      });

      setIsEditMode(false);
    }
  };

  // 설정 초기화 핸들러
  const resetSettings = () => {
    setLayouts(defaultLayouts);
    setVisibleWidgets(
      widgetDefinitions.reduce((acc, widget) => {
        acc[widget.id] = widget.defaultVisible;
        return acc;
      }, {} as Record<string, boolean>)
    );

    toast({
      title: "설정 초기화",
      description: "위젯 설정이 기본값으로 초기화되었습니다.",
    });
  };

  // 위젯 렌더링 함수
  const renderWidget = (widgetId: string) => {
    switch (widgetId) {
      case "searchTrends":
        return <SearchTrendsWidget data={searchTrends} />;
      case "stockMarket":
        return <StockMarketWidget data={stockMarkets} />;
      case "goldOil":
        return <GoldOilWidget />;
      case "exchangeRates":
        return <ExchangeRatesWidget />;
      case "recommendedStocks":
        return <RecommendedStocksWidget data={recommendedStocks} />;
      case "globalIssues":
        return <GlobalIssuesWidget data={globalIssues} />;
      case "marketCalendar":
        return <MarketCalendarWidget data={marketEvents} />;
      default:
        return null;
    }
  };

  // 비로그인 사용자를 위한 기본 그리드
  if (!isLoggedIn) {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <WidgetHelpDialog />

          <div className="flex gap-2">
            <WidgetTypesDialog />
            <LoginRequiredDialog />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {widgetDefinitions
            .filter((widget) => widget.defaultVisible)
            .map((widget) => (
              <div key={widget.id} className="relative">
                <div className="relative h-full">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white/80 hover:bg-white">
                          <HelpCircle className="h-4 w-4 text-gray-500" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">{widget.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {renderWidget(widget.id)}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      {/* 위젯 관리 툴바 */}
      <div className="flex justify-between items-center mb-4">
        <WidgetHelpDialog />

        <div className="flex gap-2">
          <WidgetTypesDialog />

          <Dialog open={isWidgetManageOpen} onOpenChange={setIsWidgetManageOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                <span>위젯 관리</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>위젯 표시 설정</DialogTitle>
              </DialogHeader>
              <div className="py-4 space-y-4">
                {widgetDefinitions.map((widget) => (
                  <div key={widget.id} className="flex items-center justify-between">
                    <Label htmlFor={`widget-${widget.id}`} className="flex items-center gap-2">
                      {visibleWidgets[widget.id] ? <Eye className="h-4 w-4 text-primary" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                      {widget.name}
                    </Label>
                    <Switch id={`widget-${widget.id}`} checked={visibleWidgets[widget.id]} onCheckedChange={() => toggleWidgetVisibility(widget.id)} />
                  </div>
                ))}
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" onClick={resetSettings} className="flex items-center gap-1">
                    <RotateCcw className="h-4 w-4" />
                    초기화
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={saveSettings} className="flex items-center gap-1">
                    <Save className="h-4 w-4" />
                    저장
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant={isEditMode ? "default" : "outline"} size="sm" onClick={() => setIsEditMode(!isEditMode)}>
            {isEditMode ? "편집 완료" : "위젯 위치 변경"}
          </Button>

          {isEditMode && (
            <Button variant="default" size="sm" onClick={saveSettings} className="flex items-center gap-1">
              <Save className="h-4 w-4" />
              저장
            </Button>
          )}
        </div>
      </div>

      {/* 위젯 그리드 */}
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 768, sm: 480 }}
        cols={{ lg: 3, md: 2, sm: 1 }}
        rowHeight={450}
        margin={[16, 16]}
        containerPadding={[0, 0]}
        isDraggable={isEditMode}
        isResizable={false}
        onLayoutChange={handleLayoutChange}
        autoSize={true}
      >
        {widgetDefinitions.map(
          (widget) =>
            visibleWidgets[widget.id] && (
              <div key={widget.id} className={`${isEditMode ? "border-2 border-dashed border-blue-300" : ""}`}>
                <div className="h-full">
                  {!isEditMode && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white/80 hover:bg-white">
                            <HelpCircle className="h-4 w-4 text-gray-500" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{widget.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {renderWidget(widget.id)}
                </div>
              </div>
            )
        )}
      </ResponsiveGridLayout>

      {/* 편집 모드 안내 */}
      {isEditMode && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
          <p>위젯을 드래그하여 위치를 변경할 수 있습니다. 변경 후 저장 버튼을 클릭하세요.</p>
        </div>
      )}
    </div>
  );
}
