"use client"

import { useState } from "react"
import { Settings, MoreHorizontal, Heart, MessageCircle, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const userPosts = [
  {
    id: 1,
    content: "Hôm nay có ca phẫu thuật tim rất thành công. Cảm ơn cả team đã hỗ trợ tuyệt vời! 🏥❤️",
    image: "/placeholder.svg?height=200&width=300",
    timestamp: "2h",
    likes: 45,
    comments: 12,
    shares: 8,
  },
  {
    id: 2,
    content:
      "Chia sẻ một số kinh nghiệm về chẩn đoán sớm bệnh tim mạch. Việc phát hiện sớm rất quan trọng để điều trị hiệu quả.",
    timestamp: "1d",
    likes: 128,
    comments: 34,
    shares: 22,
  },
]

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts")

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Profile Header */}
      <Card className="border-0 shadow-lg rounded-3xl mb-6 bg-white">
        <CardContent className="p-0">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-healthcare-primary to-healthcare-secondary rounded-t-3xl shadow-inner"></div>

          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-16 mb-4">
              <Avatar className="w-32 h-32 border-4 border-white">
                <AvatarImage src="/placeholder.svg?height=128&width=128" />
                <AvatarFallback className="bg-healthcare-primary text-white text-3xl">BS</AvatarFallback>
              </Avatar>
              <div className="flex space-x-2 mt-16">
                <Button variant="outline" size="sm" className="rounded-2xl bg-transparent">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="rounded-2xl bg-transparent">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">BS. Nguyễn Văn Minh</h1>
                <div className="w-6 h-6 bg-healthcare-secondary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
              </div>
              <p className="text-gray-500 mb-3">@bsnguyenvanminh</p>
              <p className="text-gray-700 mb-4">
                Bác sĩ chuyên khoa Tim mạch - Bệnh viện Chợ Rẫy
                <br />
                15+ năm kinh nghiệm | Chuyên gia phẫu thuật tim
                <br />📧 bsminh@hospital.com
              </p>
            </div>

            <div className="flex items-center space-x-6 mb-6">
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">2.8k</p>
                <p className="text-sm text-gray-500">Người theo dõi</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">892</p>
                <p className="text-sm text-gray-500">Đang theo dõi</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">156</p>
                <p className="text-sm text-gray-500">Bài viết</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button className="flex-1 bg-healthcare-primary hover:bg-healthcare-primary/90 text-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200">
                Chỉnh sửa hồ sơ
              </Button>
              <Button
                variant="outline"
                className="flex-1 rounded-2xl border-healthcare-primary text-healthcare-primary hover:bg-healthcare-primary hover:text-white bg-transparent shadow-md hover:shadow-lg transition-all duration-200"
              >
                Chia sẻ hồ sơ
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-50 rounded-2xl p-1 shadow-md">
          <TabsTrigger
            value="posts"
            className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-healthcare-primary"
          >
            Bài viết
          </TabsTrigger>
          <TabsTrigger
            value="info"
            className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-healthcare-primary"
          >
            Thông tin
          </TabsTrigger>
          <TabsTrigger
            value="followers"
            className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-healthcare-primary"
          >
            Theo dõi
          </TabsTrigger>
          <TabsTrigger
            value="media"
            className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-healthcare-primary"
          >
            Media
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-6">
          <div className="space-y-6">
            {userPosts.map((post) => (
              <Card
                key={post.id}
                className="border-0 shadow-md rounded-3xl hover:shadow-lg transition-all duration-300 bg-white"
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback className="bg-healthcare-primary text-white">BS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">BS. Nguyễn Văn Minh</p>
                      <p className="text-sm text-gray-500">{post.timestamp}</p>
                    </div>
                  </div>

                  <p className="text-gray-900 mb-4">{post.content}</p>

                  {post.image && (
                    <div className="rounded-2xl overflow-hidden mb-4">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt="Post image"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}

                  <div className="flex items-center space-x-6 pt-4 border-t border-gray-50">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-2 text-gray-500 hover:text-red-500 rounded-xl"
                    >
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-2 text-gray-500 hover:text-healthcare-secondary rounded-xl"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-2 text-gray-500 hover:text-healthcare-primary rounded-xl"
                    >
                      <Share className="w-4 h-4" />
                      <span>{post.shares}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="info" className="mt-6">
          <Card className="border-0 shadow-sm rounded-3xl">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Thông tin chi tiết</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Chuyên khoa</p>
                  <p className="text-gray-900">Tim mạch</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nơi làm việc</p>
                  <p className="text-gray-900">Bệnh viện Chợ Rẫy</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Kinh nghiệm</p>
                  <p className="text-gray-900">15+ năm</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Học vấn</p>
                  <p className="text-gray-900">Tiến sĩ Y khoa - Đại học Y Hà Nội</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="followers" className="mt-6">
          <Card className="border-0 shadow-sm rounded-3xl">
            <CardContent className="p-6">
              <p className="text-center text-gray-500">Danh sách người theo dõi sẽ hiển thị ở đây</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="mt-6">
          <Card className="border-0 shadow-sm rounded-3xl">
            <CardContent className="p-6">
              <p className="text-center text-gray-500">Ảnh và video sẽ hiển thị ở đây</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
