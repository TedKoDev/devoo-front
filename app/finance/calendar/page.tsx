"use client"

import { useState } from "react"
import { CalendarIcon, ArrowLeft, ArrowRight, List, CalendarIcon as CalendarView } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getMockMarketEvents } from "@/lib/api/mock-data"
import type { MarketEvent } from "@/types/market"

export default function MarketCalendarPage() {
  const allEvents = getMockMarketEvents()

  // 필터 상태
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedImportance, setSelectedImportance] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")

  // 현재 월 상태
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date()
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`
  })

  // 국가, 카테고리, 중요도 목록 추출
  const countries = Array.from(new Set(allEvents.map((event) => event.country)))
  const categories = Array.from(new Set(allEvents.map((event) => event.category)))
  const importanceLevels = ["high", "medium", "low"]

  // 필터링된 이벤트
  const filteredEvents = allEvents.filter((event) => {
    // 월 필터링
    if (!event.date.startsWith(currentMonth)) return false

    // 국가 필터링
    if (selectedCountries.length > 0 && !selectedCountries.includes(event.country)) return false

    // 카테고리 필터링
    if (selectedCategories.length > 0 && !selectedCategories.includes(event.category)) return false

    // 중요도 필터링
    if (selectedImportance.length > 0 && !selectedImportance.includes(event.importance)) return false

    return true
  })

  // 날짜별로 이벤트 그룹화
  const eventsByDate: Record<string, MarketEvent[]> = {}
  filteredEvents.forEach((event) => {
    if (!eventsByDate[event.date]) {
      eventsByDate[event.date] = []
    }
    eventsByDate[event.date].push(event)
  })

  // 날짜 목록 (정렬된)
  const dates = Object.keys(eventsByDate).sort()

  // 필터 토글 함수
  const toggleCountry = (country: string) => {
    setSelectedCountries((prev) => (prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]))
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleImportance = (importance: string) => {
    setSelectedImportance((prev) =>
      prev.includes(importance) ? prev.filter((i) => i !== importance) : [...prev, importance],
    )
  }

  // 월 변경 함수
  const changeMonth = (direction: "prev" | "next") => {
    const [year, month] = currentMonth.split("-").map(Number)

    let newYear = year
    let newMonth = month

    if (direction === "prev") {
      if (month === 1) {
        newYear = year - 1
        newMonth = 12
      } else {
        newMonth = month - 1
      }
    } else {
      if (month === 12) {
        newYear = year + 1
        newMonth = 1
      } else {
        newMonth = month + 1
      }
    }

    setCurrentMonth(`${newYear}-${String(newMonth).padStart(2, "0")}`)
  }

  // 날짜 포맷 변환 (YYYY-MM-DD -> YYYY년 MM월 DD일)
  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-")
    return `${year}년 ${Number.parseInt(month)}월 ${Number.parseInt(day)}일`
  }

  // 현재 월 표시 (YYYY-MM -> YYYY년 MM월)
  const formatMonth = (monthStr: string) => {
    const [year, month] = monthStr.split("-")
    return `${year}년 ${Number.parseInt(month)}월`
  }

  // 중요도에 따른 배지 스타일
  const getImportanceBadgeStyle = (importance: "high" | "medium" | "low") => {
    switch (importance) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-gray-100 text-gray-800"
    }
  }

  // 카테고리에 따른 텍스트
  const getCategoryText = (category: string) => {
    switch (category) {
      case "economic":
        return "경제지표"
      case "earnings":
        return "실적발표"
      case "ipo":
        return "IPO"
      case "dividend":
        return "배당"
      case "policy":
        return "정책"
      default:
        return category
    }
  }

  // 영향에 따른 배지 스타일
  const getImpactBadgeStyle = (impact?: "positive" | "negative" | "neutral") => {
    switch (impact) {
      case "positive":
        return "bg-green-100 text-green-800"
      case "negative":
        return "bg-red-100 text-red-800"
      case "neutral":
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 달력 생성 함수
  const generateCalendarDays = () => {
    const [year, month] = currentMonth.split("-").map(Number)
    const firstDay = new Date(year, month - 1, 1)
    const lastDay = new Date(year, month, 0)

    const daysInMonth = lastDay.getDate()
    const startDayOfWeek = firstDay.getDay() // 0: 일요일, 1: 월요일, ...

    // 달력에 표시할 날짜 배열 생성
    const days = []

    // 이전 달의 날짜 채우기
    for (let i = 0; i < startDayOfWeek; i++) {
      const prevMonthLastDay = new Date(year, month - 1, 0).getDate()
      const day = prevMonthLastDay - startDayOfWeek + i + 1
      days.push({
        date: new Date(year, month - 2, day),
        isCurrentMonth: false,
        events: [],
      })
    }

    // 현재 달의 날짜 채우기
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(i).padStart(2, "0")}`
      days.push({
        date: new Date(year, month - 1, i),
        isCurrentMonth: true,
        events: eventsByDate[dateStr] || [],
      })
    }

    // 다음 달의 날짜 채우기 (6주 채우기)
    const remainingDays = 42 - days.length // 6주 x 7일 = 42
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: false,
        events: [],
      })
    }

    return days
  }

  // 달력 날짜 배열
  const calendarDays = generateCalendarDays()

  // 주 단위로 달력 날짜 분할
  const calendarWeeks = []
  for (let i = 0; i < calendarDays.length; i += 7) {
    calendarWeeks.push(calendarDays.slice(i, i + 7))
  }

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">증시 이슈 캘린더</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="flex items-center"
          >
            <List className="h-4 w-4 mr-1" />
            목록
          </Button>
          <Button
            variant={viewMode === "calendar" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("calendar")}
            className="flex items-center"
          >
            <CalendarView className="h-4 w-4 mr-1" />
            달력
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* 필터 사이드바 */}
        <div className="w-full md:w-64 space-y-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">월 선택</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => changeMonth("prev")}>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">{formatMonth(currentMonth)}</span>
                  <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => changeMonth("next")}>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">국가</h3>
                  <div className="flex flex-wrap gap-2">
                    {countries.map((country) => (
                      <Badge
                        key={country}
                        variant={selectedCountries.includes(country) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleCountry(country)}
                      >
                        {country}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">카테고리</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge
                        key={category}
                        variant={selectedCategories.includes(category) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleCategory(category)}
                      >
                        {getCategoryText(category)}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">중요도</h3>
                  <div className="flex flex-wrap gap-2">
                    {importanceLevels.map((level) => (
                      <Badge
                        key={level}
                        variant={selectedImportance.includes(level) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleImportance(level)}
                      >
                        {level === "high" ? "높음" : level === "medium" ? "중간" : "낮음"}
                      </Badge>
                    ))}
                  </div>
                </div>

                {(selectedCountries.length > 0 || selectedCategories.length > 0 || selectedImportance.length > 0) && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => {
                      setSelectedCountries([])
                      setSelectedCategories([])
                      setSelectedImportance([])
                    }}
                  >
                    필터 초기화
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="flex-1">
          {viewMode === "list" ? (
            // 목록 보기
            dates.length > 0 ? (
              <div className="space-y-6">
                {dates.map((date) => (
                  <Card key={date}>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-lg mb-4 flex items-center">
                        <CalendarIcon className="h-5 w-5 mr-2" />
                        {formatDate(date)}
                      </h3>

                      <div className="space-y-4">
                        {eventsByDate[date].map((event) => (
                          <div key={event.id} className="border-b pb-4 last:border-0 last:pb-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium">{event.title}</div>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                  {event.time && (
                                    <>
                                      <span>{event.time}</span>
                                      <span className="mx-1">•</span>
                                    </>
                                  )}
                                  <span>{event.country}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={getImportanceBadgeStyle(event.importance)}>
                                  {getCategoryText(event.category)}
                                </Badge>
                                {event.impact && (
                                  <Badge className={getImpactBadgeStyle(event.impact)}>
                                    {event.impact === "positive"
                                      ? "긍정적"
                                      : event.impact === "negative"
                                        ? "부정적"
                                        : "중립적"}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            {event.description && <p className="text-sm text-gray-600 mt-2">{event.description}</p>}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border">
                <p className="text-gray-500">해당 기간에 예정된 이슈가 없습니다.</p>
              </div>
            )
          ) : (
            // 달력 보기
            <Card>
              <CardContent className="p-4">
                <div className="mb-4">
                  <div className="grid grid-cols-7 gap-1 text-center font-medium text-sm mb-2">
                    <div className="text-red-500">일</div>
                    <div>월</div>
                    <div>화</div>
                    <div>수</div>
                    <div>목</div>
                    <div>금</div>
                    <div className="text-blue-500">토</div>
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {calendarWeeks.map((week, weekIndex) =>
                      week.map((day, dayIndex) => {
                        const isToday = new Date().toDateString() === day.date.toDateString()
                        const dayOfMonth = day.date.getDate()
                        const dayOfWeek = day.date.getDay()
                        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

                        return (
                          <div
                            key={`${weekIndex}-${dayIndex}`}
                            className={`
                              min-h-[100px] p-1 border rounded-md relative
                              ${day.isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-400"}
                              ${isToday ? "border-primary" : "border-gray-200"}
                              ${isWeekend && day.isCurrentMonth ? (dayOfWeek === 0 ? "text-red-500" : "text-blue-500") : ""}
                            `}
                          >
                            <div className="text-right text-sm font-medium mb-1">{dayOfMonth}</div>
                            <div className="space-y-1 overflow-y-auto max-h-[80px]">
                              {day.events.map((event, eventIndex) => (
                                <div
                                  key={eventIndex}
                                  className={`
                                    text-xs p-1 rounded truncate
                                    ${
                                      event.importance === "high"
                                        ? "bg-red-100 text-red-800"
                                        : event.importance === "medium"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-gray-100 text-gray-800"
                                    }
                                  `}
                                  title={event.title}
                                >
                                  {event.time && `${event.time} `}
                                  {event.title}
                                </div>
                              ))}
                            </div>
                            {day.events.length > 2 && (
                              <div className="absolute bottom-1 right-1 text-xs text-gray-500">
                                +{day.events.length - 2}
                              </div>
                            )}
                          </div>
                        )
                      }),
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
