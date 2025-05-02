import Link from "next/link"
import { Code, Briefcase, TrendingUp, BookOpen, PenToolIcon as Tool, Calendar, Users, HelpCircle } from "lucide-react"

export default function CategoriesPage() {
  const categories = [
    {
      title: "개발 도구",
      icon: Tool,
      description: "개발자를 위한 유용한 도구 모음",
      href: "/tools",
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: "부업 정보",
      icon: Briefcase,
      description: "부수입을 올릴 수 있는 다양한 방법",
      href: "/side-hustles",
      color: "bg-green-100 text-green-800",
    },
    {
      title: "투자 정보",
      icon: TrendingUp,
      description: "주식, 부동산 등 투자 관련 정보",
      href: "/investments",
      color: "bg-purple-100 text-purple-800",
    },
    {
      title: "개발 지식",
      icon: Code,
      description: "프로그래밍 및 개발 관련 지식",
      href: "/dev-knowledge",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      title: "개발일지",
      icon: Calendar,
      description: "Devooup_hub 개발 과정 공유",
      href: "/devlogs",
      color: "bg-red-100 text-red-800",
    },
    {
      title: "핫이슈",
      icon: TrendingUp,
      description: "최신 개발/부업 관련 소식",
      href: "/hot-issues",
      color: "bg-indigo-100 text-indigo-800",
    },
    {
      title: "커뮤니티",
      icon: Users,
      description: "개발자와 부업자를 위한 커뮤니티",
      href: "/community",
      color: "bg-pink-100 text-pink-800",
    },
    {
      title: "튜토리얼",
      icon: BookOpen,
      description: "단계별 학습 가이드",
      href: "/tutorials",
      color: "bg-orange-100 text-orange-800",
    },
    {
      title: "FAQ",
      icon: HelpCircle,
      description: "자주 묻는 질문",
      href: "/faq",
      color: "bg-teal-100 text-teal-800",
    },
  ]

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-6">카테고리</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <Link href={category.href} key={index}>
            <div className="section-card hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-lg ${category.color}`}>
                  <category.icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-semibold">{category.title}</h2>
                  <p className="text-sm text-gray-500">{category.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
