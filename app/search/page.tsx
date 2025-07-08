"use client";

import type React from "react";
import { Search, Clock, AlertCircle } from "lucide-react";

export default function SearchPage() {
  return (
    <div className="py-4 sm:py-6">
      <h1 className="text-2xl font-bold mb-4 px-2 sm:px-0">검색</h1>
      
      {/* 검색 준비중 메인 화면 */}
      <div className="relative min-h-[60vh] flex items-center justify-center">
        {/* 배경 요소들 */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
            {/* 모의 검색 결과 카드들 (배경용) */}
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-xl p-4 border border-gray-200 opacity-50"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-3 rounded-lg bg-gray-200 flex-shrink-0">
                    <Search className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                    <div className="flex items-center">
                      <span className="text-xs font-medium text-gray-400 bg-gray-200 px-2 py-1 rounded-full">
                        검색결과
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 중앙 준비중 메시지 */}
        <div className="relative z-10 bg-white rounded-xl p-8 shadow-lg border border-gray-200 mx-4 text-center max-w-md">
          <div className="mb-4">
            <div className="bg-orange-100 rounded-full p-4 inline-flex">
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">검색 기능 준비중</h2>
          <p className="text-gray-600 mb-4">
            통합 검색 기능을 개발 중입니다.<br />
            곧 만나보실 수 있습니다!
          </p>
          <div className="inline-flex items-center text-sm text-orange-600 bg-orange-50 px-3 py-2 rounded-full">
            <AlertCircle className="h-4 w-4 mr-2" />
            개발 진행중
          </div>
        </div>
      </div>

      {/* 예정 기능 안내 */}
      <div className="mt-8 mx-2 sm:mx-0 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
            <Search className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-800 mb-1">🔍 예정 기능</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 통합 검색 (툴, 부업, 개발일지, 핫이슈 등)</li>
              <li>• 카테고리별 필터 검색</li>
              <li>• 태그 기반 검색</li>
              <li>• 실시간 검색어 자동완성</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
