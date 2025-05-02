"use client";

import { useState } from "react";
import { Calendar, ArrowRight, List, CalendarIcon as CalendarView } from "lucide-react";
import Link from "next/link";
import type { MarketEvent } from "@/types/market";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MarketCalendarWidgetProps {
  data?: MarketEvent[];
}

export default function MarketCalendarWidget({ data = [] }: MarketCalendarWidgetProps) {
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    // 오늘 날짜를 기본값으로 설정
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  });

  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  // 날짜별로 이벤트 그룹화
  const eventsByDate: Record<string, MarketEvent[]> = {};
  data.forEach((event) => {
    if (!eventsByDate[event.date]) {
      eventsByDate[event.date] = [];
    }
    eventsByDate[event.date].push(event);
  });

  // 날짜 목록 (정렬된)
  const dates = Object.keys(eventsByDate).sort();

  // 선택된 날짜가 없거나 해당 날짜에 이벤트가 없으면 첫 번째 날짜 선택
  if (!selectedDate || !eventsByDate[selectedDate]) {
    if (dates.length > 0) {
      setSelectedDate(dates[0]);
    }
  }

  // 선택된 날짜의 이벤트
  const selectedEvents = eventsByDate[selectedDate] || [];

  // 날짜 포맷 변환 (YYYY-MM-DD -> MM월 DD일)
  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    return `${Number.parseInt(month)}월 ${Number.parseInt(day)}일`;
  };

  // 중요도에 따른 배지 스타일
  const getImportanceBadgeStyle = (importance: "high" | "medium" | "low") => {
    switch (importance) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-gray-100 text-gray-800";
    }
  };

  // 카테고리에 따른 텍스트
  const getCategoryText = (category: string) => {
    switch (category) {
      case "economic":
        return "경제지표";
      case "earnings":
        return "실적발표";
      case "ipo":
        return "IPO";
      case "dividend":
        return "배당";
      case "policy":
        return "정책";
      default:
        return category;
    }
  };

  // 달력 생성 함수
  const generateCalendarDays = () => {
    // 현재 월 추출
    const [year, month] = selectedDate.split("-").map(Number);
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);

    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay(); // 0: 일요일, 1: 월요일, ...

    // 달력에 표시할 날짜 배열 생성
    const days = [];

    // 이전 달의 날짜 채우기
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }

    // 현재 달의 날짜 채우기
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      days.push({
        day: i,
        date: dateStr,
        events: eventsByDate[dateStr] || [],
      });
    }

    return days;
  };

  // 달력 날짜 배열
  const calendarDays = generateCalendarDays();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>증시 이슈 캘린더</CardTitle>
        <div className="flex items-center space-x-2">
          <button onClick={() => setViewMode("list")} className={`p-1 rounded-md ${viewMode === "list" ? "bg-primary text-white" : "text-gray-500 hover:bg-gray-100"}`}>
            <List className="h-3 w-3" />
          </button>
          <button onClick={() => setViewMode("calendar")} className={`p-1 rounded-md ${viewMode === "calendar" ? "bg-primary text-white" : "text-gray-500 hover:bg-gray-100"}`}>
            <CalendarView className="h-3 w-3" />
          </button>
          <Link href="/finance/calendar" className="text-xs text-primary flex items-center ml-1">
            더보기 <ArrowRight className="h-3 w-3 ml-1" />
          </Link>
        </div>
      </CardHeader>

      <CardContent>
        {data.length === 0 ? (
          <div className="text-center text-gray-500 py-4">데이터가 없습니다</div>
        ) : viewMode === "list" ? (
          <>
            <div className="flex space-x-2 mb-3 overflow-x-auto pb-1">
              {dates.map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`px-2 py-1 text-xs rounded-md whitespace-nowrap ${selectedDate === date ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                  {formatDate(date)}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {selectedEvents.length > 0 ? (
                selectedEvents.map((event) => (
                  <div key={event.id} className="p-2 hover:bg-gray-50 rounded-md -mx-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-sm">{event.title}</div>
                        <div className="flex items-center text-xs text-gray-500 mt-0.5">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {event.time ? `${formatDate(event.date)} ${event.time}` : formatDate(event.date)}
                          </span>
                          <span className="mx-1">•</span>
                          <span>{event.country}</span>
                        </div>
                      </div>
                      <div className={`text-xs px-1.5 py-0.5 rounded ${getImportanceBadgeStyle(event.importance)}`}>{getCategoryText(event.category)}</div>
                    </div>
                    {event.description && <p className="text-xs text-gray-600 mt-1">{event.description}</p>}
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-sm text-gray-500">해당 날짜에 예정된 이슈가 없습니다.</div>
              )}
            </div>
          </>
        ) : (
          // 달력 보기
          <div className="mt-2">
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium mb-2">
              <div className="text-red-500">일</div>
              <div>월</div>
              <div>화</div>
              <div>수</div>
              <div>목</div>
              <div>금</div>
              <div className="text-blue-500">토</div>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                if (!day) {
                  return <div key={`empty-${index}`} className="h-8 bg-gray-50 rounded-md"></div>;
                }

                const hasEvents = day.events.length > 0;

                return (
                  <div
                    key={day.date}
                    className={`
                      h-8 flex flex-col items-center justify-center rounded-md text-xs cursor-pointer
                      ${hasEvents ? "bg-primary/10 font-medium" : "hover:bg-gray-100"}
                      ${selectedDate === day.date ? "ring-2 ring-primary" : ""}
                    `}
                    onClick={() => setSelectedDate(day.date)}
                  >
                    <span>{day.day}</span>
                    {hasEvents && <span className="w-1.5 h-1.5 rounded-full bg-primary mt-0.5"></span>}
                  </div>
                );
              })}
            </div>

            <div className="mt-3 space-y-2">
              <div className="text-xs font-medium">{formatDate(selectedDate)} 이슈</div>
              {selectedEvents.length > 0 ? (
                selectedEvents.slice(0, 2).map((event) => (
                  <div key={event.id} className="p-2 hover:bg-gray-50 rounded-md -mx-2">
                    <div className="font-medium text-xs">{event.title}</div>
                    <div className="flex items-center text-xs text-gray-500 mt-0.5">
                      {event.time && <span className="mr-1">{event.time}</span>}
                      <span>{event.country}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-2 text-xs text-gray-500">예정된 이슈가 없습니다.</div>
              )}
              {selectedEvents.length > 2 && <div className="text-xs text-right text-primary">+{selectedEvents.length - 2}개 더보기</div>}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
