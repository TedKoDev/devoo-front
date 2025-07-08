"use client";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect, memo } from "react";

// 구글시트 JSON API URL (금/오일 데이터)
const GOOGLE_SHEETS_JSON_URL = "https://docs.google.com/spreadsheets/d/1D1BM4tC7xvpHJUlVJyQvFb1g3duMX7CS4YoEEY8d1v0/gviz/tq?tqx=out:json&gid=514392219";

interface MarketData {
  날짜: string;
  항목: string;
  가격: string;
  단위: string;
  출처: string;
}

function GoldOilWidget() {
  const [data, setData] = useState<MarketData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [goldAmount, setGoldAmount] = useState("");
  const [goldValue, setGoldValue] = useState("");

  useEffect(() => {
    const fetchMarketData = async () => {
      const today = new Date().toISOString().slice(0, 10);
      const cacheKey = `market_data_${today}`;
      
      // localStorage에서 오늘 데이터 확인
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        try {
          const parsed = JSON.parse(cachedData);
          console.log('Using cached market data:', parsed);
          setData(parsed.data || []);
          setIsLoading(false);
          return; // 캐시된 데이터가 있으면 API 호출 생략
        } catch (e) {
          console.log('Cache parse error, fetching fresh data');
        }
      }

      try {
        console.log('Fetching market data directly from Google Sheets...');
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
        console.log('Google Sheets market data:', data);
        
        if (data.table && data.table.rows && data.table.rows.length > 0) {
          // 모든 행을 MarketData 형태로 변환
          const marketData: MarketData[] = data.table.rows.map((row: any) => ({
            날짜: row.c[0]?.f || "",      // 첫 번째 컬럼: 날짜
            항목: row.c[1]?.v || "",      // 두 번째 컬럼: 항목
            가격: row.c[2]?.v?.toString() || "", // 세 번째 컬럼: 가격
            단위: row.c[3]?.v || "",      // 네 번째 컬럼: 단위
            출처: row.c[4]?.v || "",      // 다섯 번째 컬럼: 출처
          }));
          
          console.log('Parsed market data:', marketData);
          
          setData(marketData);
          
          // localStorage에 저장
          localStorage.setItem(cacheKey, JSON.stringify({
            data: marketData,
            timestamp: Date.now()
          }));
        } else {
          setError("데이터를 찾을 수 없습니다.");
        }
      } catch (err) {
        console.error('Market data fetch error:', err);
        setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    // 컴포넌트 마운트 시 한 번만 실행
    fetchMarketData();
  }, []); // 빈 배열로 마운트 시에만 실행

  if (isLoading) return <div className="widget-card">Loading...</div>;
  if (error) return <div className="widget-card">Error: {error}</div>;

  // 최신 날짜의 금, 유가 데이터 추출
  const latestData = data.reduce((acc, curr) => {
    if (!acc[curr.항목] || curr.날짜 > acc[curr.항목].날짜) {
      acc[curr.항목] = curr;
    }
    return acc;
  }, {} as Record<string, MarketData>);

  const gold = latestData["금"];
  const oil = latestData["WTI"];

  // 금 계산기 함수
  const handleGoldCalculation = () => {
    const amount = parseFloat(goldAmount);
    if (!isNaN(amount) && gold) {
      const price = parseFloat(gold.가격);
      const calculated = (amount * price).toLocaleString();
      setGoldValue(calculated);
    }
  };

  const PriceChangeIndicator = ({ change = 0, changePercent = 0 }) => (
    <div className={`flex items-center text-sm ${change >= 0 ? "text-red-500" : "text-blue-500"}`}>
      {change >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
      <span>{Math.abs(change).toLocaleString()}</span>
      <span className="ml-1">({Math.abs(changePercent).toFixed(2)}%)</span>
    </div>
  );

  return (
    <div className="widget-card">
      <Tabs defaultValue="prices">
        <TabsList className="w-full mb-3">
          <TabsTrigger value="prices">시세 정보</TabsTrigger>
          <TabsTrigger value="calculator">금 계산기</TabsTrigger>
        </TabsList>

        <TabsContent value="prices">
          <div className="space-y-4">
            {/* 금 시세 */}
            <div>
              <div className="text-sm text-gray-500 mb-1">금</div>
              <div className="text-lg font-bold">
                {parseFloat(gold?.가격 || "0").toLocaleString()} {gold?.단위}
              </div>
              {gold && <PriceChangeIndicator change={0} changePercent={0} />}
              <div className="text-xs text-gray-400 mt-1">업데이트: {gold?.날짜}</div>
            </div>

            {/* 유가 시세 */}
            <div>
              <div className="text-sm text-gray-500 mb-1">WTI(유가)</div>
              <div className="text-lg font-bold">
                {parseFloat(oil?.가격 || "0").toLocaleString()} {oil?.단위}
              </div>
              {oil && <PriceChangeIndicator change={0} changePercent={0} />}
              <div className="text-xs text-gray-400 mt-1">업데이트: {oil?.날짜}</div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="calculator">
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm">금 (g)</label>
              <Input type="number" value={goldAmount} onChange={(e) => setGoldAmount(e.target.value)} placeholder="금 무게 (g)" />
            </div>
            <div className="space-y-2">
              <label className="text-sm">원화 (₩)</label>
              <Input value={goldValue} readOnly placeholder="계산된 금액" />
            </div>
            <Button onClick={handleGoldCalculation} className="w-full">
              계산하기
            </Button>
            {gold && <div className="text-xs text-gray-500">현재 금 시세: {parseFloat(gold.가격).toLocaleString()}원/g</div>}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// React.memo로 컴포넌트를 감싸서 불필요한 리렌더링 방지
export default memo(GoldOilWidget);
