"use client";

import Link from "next/link"
import { Code, Briefcase, TrendingUp, BookOpen, PenToolIcon as Tool, Calendar, Users, HelpCircle, Edit, CheckCircle, Clock } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function CategoriesPage() {
  const handleComingSoon = (title: string) => {
    toast({
      title: "준비중입니다",
      description: `${title} 기능은 현재 개발 중입니다. 조금만 기다려주세요!`,
    });
  };

  const categories = [
    // 활성화된 카테고리 (위에 배치)
    {
      title: "개발일지",
      icon: Calendar,
      description: "Devooup_hub 개발 과정 공유",
      href: "/devlogs",
      color: "bg-red-100 text-red-800",
      isActive: true,
    },
    {
      title: "블로그",
      icon: Edit,
      description: "개발과 부업에 관한 다양한 이야기",
      href: "/blog",
      color: "bg-emerald-100 text-emerald-800",
      isActive: true,
    },
    // 준비중인 카테고리들
    {
      title: "개발 도구",
      icon: Tool,
      description: "개발자를 위한 유용한 도구 모음",
      href: "/tools",
      color: "bg-blue-100 text-blue-800",
      isActive: false,
    },
    {
      title: "부업 정보",
      icon: Briefcase,
      description: "부수입을 올릴 수 있는 다양한 방법",
      href: "/side-hustles",
      color: "bg-green-100 text-green-800",
      isActive: false,
    },
    {
      title: "투자 정보",
      icon: TrendingUp,
      description: "주식, 부동산 등 투자 관련 정보",
      href: "/investments",
      color: "bg-purple-100 text-purple-800",
      isActive: false,
    },
    {
      title: "개발 지식",
      icon: Code,
      description: "프로그래밍 및 개발 관련 지식",
      href: "/dev-knowledge",
      color: "bg-yellow-100 text-yellow-800",
      isActive: false,
    },
    {
      title: "핫이슈",
      icon: TrendingUp,
      description: "최신 개발/부업 관련 소식",
      href: "/hot-issues",
      color: "bg-indigo-100 text-indigo-800",
      isActive: false,
    },
    {
      title: "커뮤니티",
      icon: Users,
      description: "개발자와 부업자를 위한 커뮤니티",
      href: "/community",
      color: "bg-pink-100 text-pink-800",
      isActive: false,
    },
    {
      title: "튜토리얼",
      icon: BookOpen,
      description: "단계별 학습 가이드",
      href: "/tutorials",
      color: "bg-orange-100 text-orange-800",
      isActive: false,
    },
    {
      title: "FAQ",
      icon: HelpCircle,
      description: "자주 묻는 질문",
      href: "/faq",
      color: "bg-teal-100 text-teal-800",
      isActive: false,
    },
  ]

  const activeCategories = categories.filter(cat => cat.isActive);
  const comingSoonCategories = categories.filter(cat => !cat.isActive);

  const CategoryCard = ({ category, index }: { category: any; index: number }) => {
    if (category.isActive) {
      return (
        <Link href={category.href} key={index}>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md hover:border-green-300 transition-all duration-200 transform hover:scale-[1.02]">
            <div className="flex items-start space-x-3">
              <div className={`p-3 rounded-lg ${category.color} flex-shrink-0`}>
                <category.icon className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="font-semibold text-gray-900 truncate">{category.title}</h2>
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{category.description}</p>
                <div className="mt-2 flex items-center">
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    이용가능
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    }

    return (
      <div 
        key={index} 
        className="bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-100 transition-all duration-200"
        onClick={() => handleComingSoon(category.title)}
      >
        <div className="flex items-start space-x-3">
          <div className={`p-3 rounded-lg ${category.color} opacity-50 flex-shrink-0`}>
            <category.icon className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-semibold text-gray-500 truncate">{category.title}</h2>
              <Clock className="h-5 w-5 text-orange-500 flex-shrink-0" />
            </div>
            <p className="text-sm text-gray-400 line-clamp-2">{category.description}</p>
            <div className="mt-2 flex items-center">
              <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                준비중
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="py-4 sm:py-6">
      <h1 className="text-2xl font-bold mb-4 px-2 sm:px-0">카테고리</h1>
      
      {/* 알림 박스 */}
      <div className="mb-6 mx-2 sm:mx-0 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
            <CheckCircle className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="font-semibold text-blue-800 mb-1">📢 서비스 현황</h2>
            <p className="text-sm text-blue-700">
              현재 <strong>개발일지</strong>와 <strong>블로그</strong>만 이용 가능합니다. 
              다른 기능들은 순차적으로 업데이트될 예정입니다.
            </p>
          </div>
        </div>
      </div>

      {/* 이용 가능한 카테고리 */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 px-2 sm:px-0 flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          이용 가능한 서비스
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 px-2 sm:px-0">
          {activeCategories.map((category, index) => (
            <CategoryCard key={index} category={category} index={index} />
          ))}
        </div>
      </div>

      {/* 준비중인 카테고리 */}
      <div>
        <h2 className="text-lg font-semibold text-gray-600 mb-3 px-2 sm:px-0 flex items-center">
          <Clock className="h-5 w-5 text-orange-500 mr-2" />
          준비중인 서비스
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 px-2 sm:px-0">
          {comingSoonCategories.map((category, index) => (
            <CategoryCard key={index} category={category} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
