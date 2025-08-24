"use client"

import type React from "react"
import { usePathname, useRouter } from "next/navigation"
import { Home, Search, Bell, User, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileNav } from "./mobile-nav"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { CreatePostModal } from "@/components/modals/create-post-modal"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()

  const [showCreateModal, setShowCreateModal] = useState(false)

  const navigation = [
    { name: "Trang chủ", icon: Home, href: "/", key: "/" },
    { name: "Tìm kiếm", icon: Search, href: "/search", key: "/search" },
    { name: "Thông báo", icon: Bell, href: "/notifications", key: "/notifications" },
    { name: "Hồ sơ", icon: User, href: "/profile", key: "/profile" },
  ]

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <div className="min-h-screen bg-healthcare-white font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
        <div className="flex flex-col flex-grow pt-8 pb-4 overflow-y-auto bg-healthcare-white border-r border-gray-100 shadow-lg">
          <div className="flex items-center flex-shrink-0 px-6">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => router.push("/")}>
              <div className="w-10 h-10 bg-healthcare-primary rounded-2xl flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">MedSocial</h1>
            </div>
          </div>

          <nav className="mt-8 flex-1 px-4 space-y-2">
            {navigation.map((item) => (
              <Button
                key={item.key}
                variant="ghost"
                onClick={() => handleNavigation(item.href)}
                className={cn(
                  "w-full justify-start h-14 text-lg rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md",
                  pathname === item.key
                    ? "bg-healthcare-primary text-white hover:bg-healthcare-primary/90 shadow-md"
                    : "text-gray-700 hover:bg-gray-50",
                )}
              >
                <item.icon className="w-6 h-6 mr-4" />
                {item.name}
              </Button>
            ))}
          </nav>

          <div className="px-4 mt-8">
            <Button
              onClick={() => setShowCreateModal(true)}
              className="w-full h-14 bg-healthcare-secondary hover:bg-healthcare-secondary/90 text-white rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 mb-3"
            >
              <Plus className="w-5 h-5 mr-2" />
              Tạo bài viết
            </Button>
            <Button
              onClick={() => router.push("/login")}
              variant="outline"
              className="w-full h-12 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 border-healthcare-primary text-healthcare-primary hover:bg-healthcare-primary hover:text-white bg-transparent"
            >
              Đăng nhập
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />

      {/* Main Content */}
      <div className="md:pl-72">
        <main className="pb-20 md:pb-0 min-h-screen">{children}</main>
      </div>
      <CreatePostModal open={showCreateModal} onOpenChange={setShowCreateModal} />
    </div>
  )
}
