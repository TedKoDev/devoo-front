"use client"

import { Home, Grid, Search, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMobile } from "@/hooks/use-mobile"

export default function BottomNavigation() {
  const pathname = usePathname()
  const isMobile = useMobile()

  if (!isMobile) return null

  const navItems = [
    { icon: Home, label: "홈", href: "/" },
    { icon: Grid, label: "카테고리", href: "/categories" },
    { icon: Search, label: "검색", href: "/search" },
    { icon: User, label: "내 활동", href: "/my-activity" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t">
      <div className="flex justify-around items-center h-14">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full ${
                isActive ? "text-primary" : "text-gray-500"
              }`}
            >
              <item.icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
