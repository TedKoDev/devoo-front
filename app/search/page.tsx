"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState("all");

  // Mock search results
  const [results, setResults] = useState({
    all: [] as any[],
    tools: [] as any[],
    sideHustles: [] as any[],
    devlogs: [] as any[],
    hotIssues: [] as any[],
  });

  useEffect(() => {
    if (searchQuery.trim()) {
      // Simulate search API call
      setTimeout(() => {
        setResults({
          all: [
            { id: 1, type: "tool", title: "VSCode", description: "가장 인기 있는 코드 에디터" },
            {
              id: 2,
              type: "sideHustle",
              title: "프리랜서 웹 개발",
              description: "React, Next.js 등을 활용한 웹 개발 프리랜서 일자리",
            },
            {
              id: 3,
              type: "devlog",
              title: "Next.js 앱 라우터 적용기",
              description: "Next.js 13의 앱 라우터를 적용하면서 겪은 문제와 해결 방법",
            },
            { id: 4, type: "hotIssue", title: "2023년 개발자 연봉 동향", description: "IT 업계 급여 상승세 지속" },
          ],
          tools: [
            { id: 1, title: "VSCode", description: "가장 인기 있는 코드 에디터" },
            { id: 2, title: "Figma", description: "협업 디자인 툴" },
          ],
          sideHustles: [
            { id: 1, title: "프리랜서 웹 개발", description: "React, Next.js 등을 활용한 웹 개발 프리랜서 일자리" },
            { id: 2, title: "주식 투자", description: "장기 투자를 통한 자산 증식 방법" },
          ],
          devlogs: [
            {
              id: 1,
              title: "Next.js 앱 라우터 적용기",
              description: "Next.js 13의 앱 라우터를 적용하면서 겪은 문제와 해결 방법",
            },
            {
              id: 2,
              title: "실시간 데이터 연동 구현",
              description: "금 시세, 환율 등 실시간 데이터 연동 방식 구현 과정",
            },
          ],
          hotIssues: [
            { id: 1, title: "2023년 개발자 연봉 동향", description: "IT 업계 급여 상승세 지속" },
            { id: 2, title: "부업으로 월 300만원 버는 프리랜서 개발자의 비법", description: "실제 사례와 팁 공유" },
          ],
        });
      }, 500);
    } else {
      setResults({
        all: [],
        tools: [],
        sideHustles: [],
        devlogs: [],
        hotIssues: [],
      });
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search query
    const url = new URL(window.location.href);
    url.searchParams.set("q", searchQuery);
    window.history.pushState({}, "", url.toString());
  };

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-6">검색</h1>

      {/* <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="검색어를 입력하세요"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form> */}

      {searchQuery.trim() && (
        <>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">전체 ({results.all.length})</TabsTrigger>
              <TabsTrigger value="tools">툴 ({results.tools.length})</TabsTrigger>
              <TabsTrigger value="sideHustles">부업 ({results.sideHustles.length})</TabsTrigger>
              <TabsTrigger value="devlogs">개발일지 ({results.devlogs.length})</TabsTrigger>
              <TabsTrigger value="hotIssues">핫이슈 ({results.hotIssues.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="space-y-4">
                {results.all.map((item) => (
                  <div key={item.id} className="section-card">
                    <div className="flex items-center mb-2">
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                        {item.type === "tool" && "툴"}
                        {item.type === "sideHustle" && "부업"}
                        {item.type === "devlog" && "개발일지"}
                        {item.type === "hotIssue" && "핫이슈"}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-600 mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tools">
              <div className="space-y-4">
                {results.tools.map((item) => (
                  <div key={item.id} className="section-card">
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-600 mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sideHustles">
              <div className="space-y-4">
                {results.sideHustles.map((item) => (
                  <div key={item.id} className="section-card">
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-600 mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="devlogs">
              <div className="space-y-4">
                {results.devlogs.map((item) => (
                  <div key={item.id} className="section-card">
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-600 mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hotIssues">
              <div className="space-y-4">
                {results.hotIssues.map((item) => (
                  <div key={item.id} className="section-card">
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-600 mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}

      {!searchQuery.trim() && (
        <div className="text-center py-12">
          <p className="text-gray-500">검색어를 입력하세요</p>
        </div>
      )}
    </div>
  );
}
