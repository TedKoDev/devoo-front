"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useMobile } from "@/hooks/use-mobile"
import TopNavigation from "./TopNavigation"
import { useUserStore } from "@/store/useUserStore"

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const isMobile = useMobile()
  const { isLoggedIn, user, logout } = useUserStore()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">Devooup_hub</span>
        </Link>

        {!isMobile && (
          <form onSubmit={handleSearch} className="flex-1 mx-4 max-w-md">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="검색어를 입력하세요"
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        )}

        <div className="flex items-center space-x-2">
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium hidden md:inline">{user?.username}</span>
              <Button variant="outline" size={isMobile ? "sm" : "default"} onClick={logout}>
                로그아웃
              </Button>
            </div>
          ) : (
            <>
              <Button variant="outline" size={isMobile ? "sm" : "default"} onClick={() => router.push("/login")}>
                로그인
              </Button>
              <Button size={isMobile ? "sm" : "default"} onClick={() => router.push("/register")}>
                회원가입
              </Button>
            </>
          )}
        </div>
      </div>

      {!isMobile && <TopNavigation />}
    </header>
  )
}
