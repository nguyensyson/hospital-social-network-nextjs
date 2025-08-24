"use client"

import { X, Heart, MessageCircle, Share, Flag, Eye, Trash2, User, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface PostDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: any
}

export function PostDetailModal({ open, onOpenChange, post }: PostDetailModalProps) {
  const [adminNote, setAdminNote] = useState("")

  if (!post) return null

  const reports = [
    {
      id: 1,
      reporter: "BS. Trần Văn X",
      reason: "Thông tin y khoa không chính xác",
      timestamp: "2 giờ trước",
      description: "Bài viết có thông tin về liều dùng thuốc không đúng với hướng dẫn của WHO",
    },
    {
      id: 2,
      reporter: "Y tá Nguyễn Thị Y",
      reason: "Nội dung không phù hợp",
      timestamp: "4 giờ trước",
      description: "Hình ảnh trong bài viết có thể gây khó chịu cho một số người xem",
    },
  ]

  const comments = [
    {
      id: 1,
      user: "BS. Lê Văn Z",
      content: "Cảm ơn bác sĩ đã chia sẻ kinh nghiệm quý báu!",
      timestamp: "1 giờ trước",
      likes: 5,
    },
    {
      id: 2,
      user: "Dược sĩ Phạm Thị A",
      content: "Có thể bổ sung thêm thông tin về tác dụng phụ không ạ?",
      timestamp: "3 giờ trước",
      likes: 2,
    },
  ]

  const getStatusBadge = (status: string, reports: number) => {
    switch (status) {
      case "normal":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Bình thường</Badge>
      case "reported":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Bị báo cáo ({reports})</Badge>
      case "hidden":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Đã ẩn</Badge>
      default:
        return <Badge variant="secondary">Không xác định</Badge>
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto border-0 rounded-3xl p-0 shadow-2xl bg-white">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Chi tiết bài viết</DialogTitle>
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="rounded-full">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-6 pt-4">
          {/* Post Header */}
          <Card className="border-0 shadow-sm rounded-3xl mb-6 bg-gradient-to-r from-healthcare-primary/5 to-healthcare-secondary/5">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-healthcare-primary text-white text-xl">
                      {post.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{post.author.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.createdAt}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>ID: {post.id}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {getStatusBadge(post.status, post.reports)}
              </div>

              {/* Post Stats */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center p-3 rounded-2xl bg-white">
                  <div className="flex items-center justify-center space-x-2 text-red-500">
                    <Heart className="w-5 h-5" />
                    <span className="text-2xl font-bold">{post.likes}</span>
                  </div>
                  <div className="text-sm text-gray-500">Lượt thích</div>
                </div>
                <div className="text-center p-3 rounded-2xl bg-white">
                  <div className="flex items-center justify-center space-x-2 text-healthcare-secondary">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-2xl font-bold">{post.comments}</span>
                  </div>
                  <div className="text-sm text-gray-500">Bình luận</div>
                </div>
                <div className="text-center p-3 rounded-2xl bg-white">
                  <div className="flex items-center justify-center space-x-2 text-healthcare-primary">
                    <Share className="w-5 h-5" />
                    <span className="text-2xl font-bold">{Math.floor(Math.random() * 50) + 10}</span>
                  </div>
                  <div className="text-sm text-gray-500">Chia sẻ</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Post Content and Details */}
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-50 rounded-2xl p-1 mb-6">
              <TabsTrigger
                value="content"
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-healthcare-primary"
              >
                Nội dung
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-healthcare-primary"
              >
                Báo cáo ({post.reports})
              </TabsTrigger>
              <TabsTrigger
                value="comments"
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-healthcare-primary"
              >
                Bình luận
              </TabsTrigger>
              <TabsTrigger
                value="admin"
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-healthcare-primary"
              >
                Quản trị
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <Card className="border-0 shadow-sm rounded-2xl bg-white">
                <CardContent className="p-6">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-900 leading-relaxed whitespace-pre-line">{post.content}</p>
                  </div>
                  {post.image && (
                    <div className="mt-6 rounded-2xl overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt="Post image"
                        className="w-full h-auto object-cover max-h-96"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              {reports.map((report) => (
                <Card key={report.id} className="border-0 shadow-sm rounded-2xl bg-white">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{report.reporter}</h4>
                        <p className="text-sm text-gray-500">{report.timestamp}</p>
                      </div>
                      <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                        {report.reason}
                      </Badge>
                    </div>
                    <p className="text-gray-700">{report.description}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="comments" className="space-y-4">
              {comments.map((comment) => (
                <Card key={comment.id} className="border-0 shadow-sm rounded-2xl bg-white">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{comment.user}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Heart className="w-4 h-4" />
                        <span>{comment.likes}</span>
                        <span>•</span>
                        <span>{comment.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="admin" className="space-y-4">
              <Card className="border-0 shadow-sm rounded-2xl bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">Ghi chú quản trị</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Thêm ghi chú về bài viết này..."
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    className="border-gray-200 rounded-2xl resize-none focus-visible:ring-healthcare-primary"
                    rows={4}
                  />
                  <Button className="bg-healthcare-primary hover:bg-healthcare-primary/90 text-white rounded-2xl">
                    Lưu ghi chú
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm rounded-2xl bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">Lịch sử thao tác</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-green-50">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Bài viết được tạo - {post.createdAt}</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-orange-50">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">Nhận báo cáo đầu tiên - 4 giờ trước</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-blue-50">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Admin xem xét - 1 giờ trước</span>
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
              className="rounded-2xl border-gray-200 text-gray-600 hover:bg-gray-50 bg-transparent"
            >
              <Eye className="w-4 h-4 mr-2" />
              {post.status === "hidden" ? "Hiện bài" : "Ẩn bài"}
            </Button>
            <Button
              variant="outline"
              className="rounded-2xl border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Xóa bài viết
            </Button>
            <Button className="bg-healthcare-primary hover:bg-healthcare-primary/90 text-white rounded-2xl">
              <Flag className="w-4 h-4 mr-2" />
              Đánh dấu đã xử lý
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
