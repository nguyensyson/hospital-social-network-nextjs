"use client"

import { useState } from "react"
import { MainLayout } from "./components/layout/main-layout"
import { HomePage } from "./components/pages/home-page"
import { SearchPage } from "./components/pages/search-page"
import { NotificationsPage } from "./components/pages/notifications-page"
import { ProfilePage } from "./components/pages/profile-page"
import { AuthPage } from "./components/pages/auth-page"
import { CreatePostModal } from "./components/modals/create-post-modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showAuth, setShowAuth] = useState(false)

  if (showAuth) {
    return <AuthPage />
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />
      case "search":
        return <SearchPage />
      case "notifications":
        return <NotificationsPage />
      case "profile":
        return <ProfilePage />
      default:
        return <HomePage />
    }
  }

  return (
    <>
      <MainLayout currentPage={currentPage} onShowAuth={() => setShowAuth(true)}>
        <Tabs value={currentPage} onValueChange={setCurrentPage} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-50 rounded-2xl p-1 mb-6 shadow-lg max-w-2xl mx-auto">
            <TabsTrigger
              value="home"
              className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-healthcare-primary"
            >
              Trang chủ
            </TabsTrigger>
            <TabsTrigger
              value="search"
              className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-healthcare-primary"
            >
              Tìm kiếm
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-healthcare-primary"
            >
              Thông báo
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-healthcare-primary"
            >
              Hồ sơ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home">
            <HomePage />
          </TabsContent>
          <TabsContent value="search">
            <SearchPage />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationsPage />
          </TabsContent>
          <TabsContent value="profile">
            <ProfilePage />
          </TabsContent>
        </Tabs>
      </MainLayout>

      <CreatePostModal open={showCreateModal} onOpenChange={setShowCreateModal} />
    </>
  )
}
