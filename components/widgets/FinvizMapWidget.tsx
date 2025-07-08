"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState, useEffect, memo } from "react";

// 구글시트 JSON API URL
const GOOGLE_SHEETS_JSON_URL = "https://docs.google.com/spreadsheets/d/1D1BM4tC7xvpHJUlVJyQvFb1g3duMX7CS4YoEEY8d1v0/gviz/tq?tqx=out:json&sheet=Finviz";

function FinvizMapWidget() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<string | null>(null);

  useEffect(() => {
    const fetchFinvizData = async () => {
      const today = new Date().toISOString().slice(0, 10);
      const cacheKey = `finviz_data_${today}`;
      
      // localStorage에서 오늘 데이터 확인
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        try {
          const parsed = JSON.parse(cachedData);
          console.log('Using cached finviz data:', parsed);
          setImageUrl(parsed.imageUrl || "");
          setLastFetched(parsed.date || today);
          setIsLoading(false);
          return; // 캐시된 데이터가 있으면 API 호출 생략
        } catch (e) {
          console.log('Cache parse error, fetching fresh data');
        }
      }

      try {
        console.log('Fetching finviz data directly from Google Sheets...');
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(GOOGLE_SHEETS_JSON_URL, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const responseText = await response.text();
        
        // 구글시트 JSON 응답에서 실제 JSON 부분만 추출
        const jsonMatch = responseText.match(/google\.visualization\.Query\.setResponse\((.*)\);/);
        if (!jsonMatch) {
          throw new Error('Invalid Google Sheets response format');
        }
        
        const data = JSON.parse(jsonMatch[1]);
        console.log('Google Sheets data:', data);
        
        if (data.table && data.table.rows && data.table.rows.length > 0) {
          // 마지막 행(최신 데이터) 가져오기
          const lastRow = data.table.rows[data.table.rows.length - 1];
          const imageUrl = lastRow.c[1]?.v || ""; // 두 번째 컬럼이 이미지 URL
          const dateValue = lastRow.c[0]?.f || today; // 첫 번째 컬럼이 날짜 (formatted)
          
          console.log('Latest finviz data:', { imageUrl, date: dateValue });
          
          setImageUrl(imageUrl);
          setLastFetched(dateValue);
          
          // localStorage에 저장
          localStorage.setItem(cacheKey, JSON.stringify({
            imageUrl,
            date: dateValue,
            timestamp: Date.now()
          }));
        } else {
          setError("데이터를 찾을 수 없습니다.");
        }
      } catch (err) {
        console.error('Finviz fetch error:', err);
        setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    // 컴포넌트 마운트 시 한 번만 실행
    fetchFinvizData();
  }, []); // 빈 배열로 마운트 시에만 실행

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
          <div className="flex items-center justify-center h-[400px] text-muted-foreground">
            {error ? `에러: ${error}` : "이미지를 불러올 수 없습니다."}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// React.memo로 컴포넌트를 감싸서 불필요한 리렌더링 방지
export default memo(FinvizMapWidget);
