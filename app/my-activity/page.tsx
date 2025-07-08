"use client"

import { BookmarkIcon, MessageSquare, ThumbsUp, User, Clock, AlertCircle } from "lucide-react"

export default function MyActivityPage() {
  return (
    <div className="py-4 sm:py-6">
      <h1 className="text-2xl font-bold mb-4 px-2 sm:px-0">내 활동</h1>

      {/* 내활동 준비중 메인 화면 */}
      <div className="relative min-h-[60vh] flex items-center justify-center">
        {/* 배경 요소들 */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4">
            {/* 모의 활동 카드들 (배경용) */}
            {Array.from({ length: 8 }).map((_, index) => {
              const icons = [User, MessageSquare, ThumbsUp, BookmarkIcon];
              const IconComponent = icons[index % 4];
              return (
                <div
                  key={index}
                  className="bg-gray-100 rounded-xl p-4 border border-gray-200 opacity-50"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-3 rounded-lg bg-gray-200 flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                      <div className="flex items-center">
                        <span className="text-xs font-medium text-gray-400 bg-gray-200 px-2 py-1 rounded-full">
                          활동기록
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 중앙 준비중 메시지 */}
        <div className="relative z-10 bg-white rounded-xl p-8 shadow-lg border border-gray-200 mx-4 text-center max-w-md">
          <div className="mb-4">
            <div className="bg-orange-100 rounded-full p-4 inline-flex">
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">내활동 기능 준비중</h2>
          <p className="text-gray-600 mb-4">
            회원가입 및 로그인 시스템과 함께<br />
            활동 관리 기능을 개발 중입니다!
          </p>
          <div className="inline-flex items-center text-sm text-orange-600 bg-orange-50 px-3 py-2 rounded-full">
            <AlertCircle className="h-4 w-4 mr-2" />
            개발 진행중
          </div>
        </div>
      </div>

      {/* 예정 기능 안내 */}
      <div className="mt-8 mx-2 sm:mx-0 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
        <div className="flex items-start space-x-3">
          <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
            <User className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-purple-800 mb-1">👤 예정 기능</h3>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• 회원가입 및 로그인</li>
              <li>• 프로필 관리</li>
              <li>• 댓글 작성 및 관리</li>
              <li>• 좋아요 및 북마크 기능</li>
              <li>• 활동 히스토리 조회</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
