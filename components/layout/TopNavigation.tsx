"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopNavigation() {
  const pathname = usePathname();

  const navItems = [
    { label: "홈", href: "/" },
    // { label: "금융정보", href: "/finance" },
    // { label: "개발도구", href: "/tools" },
    // { label: "부업정보", href: "/side-hustles" },
    { label: "개발일지", href: "/devlogs" },
    // { label: "커뮤니티", href: "/community" },
    // { label: "블로그", href: "/blog" },
    // { label: "툴 요청", href: "/tool-requests" },
  ];

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4">
        <nav className="flex space-x-1 overflow-x-auto py-2">
          {navItems.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link key={item.href} href={item.href} className={`top-nav-item ${isActive ? "active" : ""}`}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
