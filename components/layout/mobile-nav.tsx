"use client"

import { usePathname, useRouter } from "next/navigation"
import { Home, Search, Bell, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Trang chủ", icon: Home, href: "/", key: "/" },
  { name: "Tìm kiếm", icon: Search, href: "/search", key: "/search" },
  { name: "Thông báo", icon: Bell, href: "/notifications", key: "/notifications" },
  { name: "Hồ sơ", icon: User, href: "/profile", key: "/profile" },
]

export function MobileNav() {
  const pathname = usePathname()
  const router = useRouter()

  const handleNavigation = (href: string) => {
    // Add a small delay to ensure the click is registered
    setTimeout(() => {
      router.push(href)
    }, 50)
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-[100] shadow-2xl mobile-nav">
      <div className="grid grid-cols-4 gap-1 py-2 px-2 safe-area-bottom">
        {navigation.map((item) => (
          <button
            key={item.key}
            onClick={() => handleNavigation(item.href)}
            className={cn(
              "flex flex-col items-center justify-center h-16 rounded-2xl transition-all duration-200 active:scale-95 touch-manipulation",
              pathname === item.key
                ? "text-healthcare-primary bg-healthcare-primary/10"
                : "text-gray-500 hover:text-healthcare-primary hover:bg-gray-50",
            )}
            type="button"
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
