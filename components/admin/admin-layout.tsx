"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FileText,
  AlertTriangle,
  MessageSquare,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  LogOut,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface AdminLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: "Tổng quan", href: "/admin", icon: LayoutDashboard },
  { name: "Người dùng", href: "/admin/users", icon: Users },
  { name: "Bài viết", href: "/admin/posts", icon: FileText },
  { name: "Báo cáo", href: "/admin/reports", icon: AlertTriangle },
  { name: "Cài đặt", href: "/admin/settings", icon: Settings },
]

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:z-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-healthcare-primary rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MedSocial</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                onClick={() => {
                  router.push(item.href)
                  setSidebarOpen(false)
                }}
                className={cn(
                  "w-full justify-start h-12 text-left rounded-2xl transition-all duration-200",
                  pathname === item.href
                    ? "bg-healthcare-primary text-white hover:bg-healthcare-primary/90 shadow-md"
                    : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Button>
            ))}
          </nav>

          {/* Admin info */}
          <div className="p-4 border-t border-gray-100 flex-shrink-0">
            <div className="flex items-center space-x-3 p-3 rounded-2xl bg-gray-50">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-healthcare-secondary text-white">AD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@medsocial.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm..."
                  className="pl-10 w-80 bg-gray-50 border-0 rounded-2xl focus-visible:ring-healthcare-primary"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative rounded-full">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 rounded-2xl">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback className="bg-healthcare-secondary text-white text-sm">AD</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block text-sm font-medium">Admin</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-2xl shadow-lg">
                  <DropdownMenuItem className="rounded-xl">
                    <User className="w-4 h-4 mr-2" />
                    Hồ sơ
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl">
                    <Settings className="w-4 h-4 mr-2" />
                    Cài đặt
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="rounded-xl text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
