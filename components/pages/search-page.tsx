"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const searchResults = [
  {
    id: 1,
    name: "BS. Phạm Văn D",
    username: "@bsphamvand",
    bio: "Bác sĩ chuyên khoa Tim mạch - Bệnh viện Chợ Rẫy",
    avatar: "/placeholder.svg?height=60&width=60",
    followers: "2.3k",
    verified: true,
    following: false,
  },
  {
    id: 2,
    name: "Y tá Nguyễn Thị E",
    username: "@ytaE",
    bio: "Y tá trưởng khoa Nhi - Bệnh viện Nhi đồng 1",
    avatar: "/placeholder.svg?height=60&width=60",
    followers: "1.8k",
    verified: false,
    following: true,
  },
  {
    id: 3,
    name: "Dược sĩ Hoàng Văn F",
    username: "@duocsiF",
    bio: "Dược sĩ lâm sàng - Chuyên gia tư vấn thuốc",
    avatar: "/placeholder.svg?height=60&width=60",
    followers: "956",
    verified: true,
    following: false,
  },
]

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [followingStates, setFollowingStates] = useState<{ [key: number]: boolean }>({})

  const handleFollow = (userId: number) => {
    setFollowingStates((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }))
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Search Header */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Tìm kiếm bác sĩ, y tá, dược sĩ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 text-lg border-0 bg-gray-50 rounded-2xl focus-visible:ring-2 focus-visible:ring-healthcare-primary shadow-md focus:shadow-lg transition-all duration-200"
          />
        </div>
      </div>

      {/* Search Results */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Gợi ý theo dõi</h2>

        {searchResults.map((user) => (
          <Card
            key={user.id}
            className="border-0 shadow-md rounded-3xl hover:shadow-lg transition-all duration-300 bg-white"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-healthcare-primary text-white text-lg">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      {user.verified && (
                        <div className="w-5 h-5 bg-healthcare-secondary rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{user.username}</p>
                    <p className="text-sm text-gray-700 mb-2">{user.bio}</p>
                    <p className="text-sm text-gray-500">{user.followers} người theo dõi</p>
                  </div>
                </div>
                <Button
                  onClick={() => handleFollow(user.id)}
                  variant={followingStates[user.id] || user.following ? "outline" : "default"}
                  className={`rounded-2xl px-6 shadow-md hover:shadow-lg transition-all duration-200 ${
                    followingStates[user.id] || user.following
                      ? "border-healthcare-primary text-healthcare-primary hover:bg-healthcare-primary hover:text-white"
                      : "bg-healthcare-primary hover:bg-healthcare-primary/90 text-white"
                  }`}
                >
                  {followingStates[user.id] || user.following ? "Đang theo dõi" : "Theo dõi"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
