"use client"

import { X, Mail, Calendar, Award, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface UserDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: any
}

export function UserDetailModal({ open, onOpenChange, user }: UserDetailModalProps) {
  if (!user) return null

  const userStats = {
    totalPosts: user.posts || 0,
    totalLikes: Math.floor(Math.random() * 1000) + 100,
    totalComments: Math.floor(Math.random() * 500) + 50,
    followers: Math.floor(Math.random() * 2000) + 200,
    following: Math.floor(Math.random() * 1000) + 100,
  }

  const recentPosts = [
    {
      id: 1,
      content: "Chia sẻ kinh nghiệm điều trị bệnh nhân COVID-19 tại khoa cấp cứu...",
      timestamp: "2 giờ trước",
      likes: 45,
      comments: 12,
    },
    {
      id: 2,
      content: "Hướng dẫn sử dụng thiết bị y tế mới cho đồng nghiệp...",
      timestamp: "1 ngày trước",
      likes: 78,
      comments: 23,
    },
    {
      id: 3,
      content: "Tham gia hội thảo y khoa quốc tế về tim mạch...",
      timestamp: "3 ngày trước",
      likes: 156,
      comments: 34,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Hoạt động</Badge>
      case "banned":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Bị khóa</Badge>
      default:
        return <Badge variant="secondary">Không xác định</Badge>
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border-0 rounded-3xl p-0 shadow-2xl bg-white">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Chi tiết người dùng</DialogTitle>
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="rounded-full">
              
            </Button>
          </div>
        </DialogHeader>

        <div className="p-6 pt-4">
          {/* User Profile Header */}
          <Card className="border-0 shadow-sm rounded-3xl mb-6 bg-gradient-to-r from-healthcare-primary/5 to-healthcare-secondary/5">
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-healthcare-primary text-white text-2xl">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                    {user.verified && (
                      <div className="w-6 h-6 bg-healthcare-secondary rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                    )}
                    {getStatusBadge(user.status)}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4" />
                      <span>{user.role}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Tham gia: {user.joinDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4" />
                      <span>{user.posts} bài viết</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <Card className="border-0 shadow-sm rounded-2xl bg-white">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-healthcare-primary">{userStats.totalPosts}</div>
                <div className="text-sm text-gray-500">Bài viết</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm rounded-2xl bg-white">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-500">{userStats.totalLikes}</div>
                <div className="text-sm text-gray-500">Lượt thích</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm rounded-2xl bg-white">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-healthcare-secondary">{userStats.totalComments}</div>
                <div className="text-sm text-gray-500">Bình luận</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm rounded-2xl bg-white">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-500">{userStats.followers}</div>
                <div className="text-sm text-gray-500">Người theo dõi</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm rounded-2xl bg-white">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-500">{userStats.following}</div>
                <div className="text-sm text-gray-500">Đang theo dõi</div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information Tabs */}
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-50 rounded-2xl p-1 mb-6">
              <TabsTrigger
                value="posts"
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-healthcare-primary"
              >
                Bài viết gần đây
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-healthcare-primary"
              >
                Hoạt động
              </TabsTrigger>
              <TabsTrigger
                value="info"
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-healthcare-primary"
              >
                Thông tin
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-4">
              {recentPosts.map((post) => (
                <Card key={post.id} className="border-0 shadow-sm rounded-2xl bg-white">
                  <CardContent className="p-4">
                    <p className="text-gray-900 mb-3">{post.content}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{post.timestamp}</span>
                      <div className="flex items-center space-x-4">
                        <span>{post.likes} lượt thích</span>
                        <span>{post.comments} bình luận</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <Card className="border-0 shadow-sm rounded-2xl bg-white">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-green-50">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Đăng bài viết mới - 2 giờ trước</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-blue-50">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Bình luận trên bài viết - 4 giờ trước</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-purple-50">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Theo dõi người dùng mới - 1 ngày trước</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-orange-50">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">Cập nhật hồ sơ - 3 ngày trước</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="info" className="space-y-4">
              <Card className="border-0 shadow-sm rounded-2xl bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">Thông tin chi tiết</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Thông tin cá nhân</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-500">Họ tên:</span> {user.name}
                        </div>
                        <div>
                          <span className="text-gray-500">Email:</span> {user.email}
                        </div>
                        <div>
                          <span className="text-gray-500">Vai trò:</span> {user.role}
                        </div>
                        <div>
                          <span className="text-gray-500">Trạng thái:</span>{" "}
                          {user.status === "active" ? "Hoạt động" : "Bị khóa"}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Thống kê</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-500">Ngày tham gia:</span> {user.joinDate}
                        </div>
                        <div>
                          <span className="text-gray-500">Tổng bài viết:</span> {user.posts}
                        </div>
                        <div>
                          <span className="text-gray-500">Xác thực:</span>{" "}
                          {user.verified ? "Đã xác thực" : "Chưa xác thực"}
                        </div>
                        <div>
                          <span className="text-gray-500">Lần hoạt động cuối:</span> 2 giờ trước
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-100">
            <Button
              variant="outline"
              className="rounded-2xl border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
            >
              {user.status === "active" ? "Khóa tài khoản" : "Mở khóa tài khoản"}
            </Button>
            <Button
              variant="outline"
              className="rounded-2xl border-healthcare-primary text-healthcare-primary hover:bg-healthcare-primary hover:text-white bg-transparent"
            >
              Gửi tin nhắn
            </Button>
            <Button className="bg-healthcare-primary hover:bg-healthcare-primary/90 text-white rounded-2xl">
              Chỉnh sửa
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
