"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { CreatePostModal } from "@/components/modals/create-post-modal"
import { useRouter } from "next/navigation"

const posts = [
  {
    id: 1,
    user: {
      name: "BS. Nguyễn Văn A",
      username: "@bsnguyenvana",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    content:
      "Chia sẻ một ca bệnh thú vị hôm nay. Bệnh nhân 45 tuổi đến khám với triệu chứng đau ngực, sau khi thăm khám và làm các xét nghiệm cần thiết, chúng tôi đã chẩn đoán được bệnh và điều trị thành công. #y_khoa #cardiology",
    image: "/placeholder.svg?height=300&width=500",
    timestamp: "2h",
    likes: 24,
    comments: 8,
    shares: 3,
  },
  {
    id: 2,
    user: {
      name: "Y tá Trần Thị B",
      username: "@ytaB",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    content:
      "Hôm nay tham gia khóa đào tạo về chăm sóc bệnh nhân COVID-19. Rất nhiều kiến thức bổ ích và cập nhật. Cảm ơn bệnh viện đã tạo điều kiện cho chúng tôi học hỏi! 💪",
    timestamp: "4h",
    likes: 156,
    comments: 23,
    shares: 12,
  },
  {
    id: 3,
    user: {
      name: "Dược sĩ Lê Văn C",
      username: "@duocsiC",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    content:
      "Lưu ý quan trọng về tương tác thuốc: Không nên dùng Warfarin cùng với Aspirin mà không có sự giám sát của bác sĩ. Có thể gây nguy hiểm tính mạng! #duoc_hoc #patient_safety",
    timestamp: "6h",
    likes: 89,
    comments: 15,
    shares: 34,
  },
]

export function HomePage() {
  const [newPost, setNewPost] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [postLikes, setPostLikes] = useState<{ [key: number]: { liked: boolean; count: number } }>({})
  const router = useRouter()

  const handlePostLike = (postId: number, initialLikes: number) => {
    setPostLikes((prev) => {
      const current = prev[postId] || { liked: false, count: initialLikes }
      return {
        ...prev,
        [postId]: {
          liked: !current.liked,
          count: current.liked ? current.count - 1 : current.count + 1,
        },
      }
    })
  }

  return (
    <>
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Create Post Section */}
        <Card className="mb-6 border-0 shadow-lg rounded-3xl bg-white">
          <CardContent className="p-6">
            <div className="flex space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/placeholder.svg?height=48&width=48" />
                <AvatarFallback className="bg-healthcare-primary text-white">U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Chia sẻ kiến thức y khoa của bạn..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  onClick={() => setShowCreateModal(true)}
                  className="border-0 resize-none text-lg placeholder:text-gray-400 focus-visible:ring-0 p-0 cursor-pointer"
                  rows={3}
                  readOnly
                />
                <div className="flex justify-between items-center mt-4">
                  <div className="flex space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-healthcare-secondary hover:bg-healthcare-secondary/10 rounded-xl"
                      onClick={() => setShowCreateModal(true)}
                    >
                      📷 Ảnh
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-healthcare-secondary hover:bg-healthcare-secondary/10 rounded-xl"
                      onClick={() => setShowCreateModal(true)}
                    >
                      📹 Video
                    </Button>
                  </div>
                  <Button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-healthcare-primary hover:bg-healthcare-primary/90 text-white rounded-2xl px-6 shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Đăng bài
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="border-0 shadow-md rounded-3xl hover:shadow-lg transition-all duration-300 bg-white"
            >
              <CardContent className="p-6">
                {/* Post Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-healthcare-primary text-white">
                        {post.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
                        {post.user.verified && (
                          <div className="w-5 h-5 bg-healthcare-secondary rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {post.user.username} • {post.timestamp}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="rounded-full">
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </div>

                {/* Post Content */}
                <div className="mb-4 cursor-pointer" onClick={() => router.push(`/post/${post.id}`)}>
                  <p className="text-gray-900 leading-relaxed mb-4">{post.content}</p>
                  {post.image && (
                    <div className="rounded-2xl overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt="Post image"
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center space-x-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePostLike(post.id, post.likes)}
                      className={`flex items-center space-x-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ${
                        postLikes[post.id]?.liked
                          ? "text-red-500 bg-red-50 hover:bg-red-100"
                          : "text-gray-500 hover:text-red-500 hover:bg-red-50"
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${postLikes[post.id]?.liked ? "fill-current" : ""}`} />
                      <span>{postLikes[post.id]?.count ?? post.likes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-2 text-gray-500 hover:text-healthcare-secondary hover:bg-healthcare-secondary/10 rounded-xl"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.comments}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-2 text-gray-500 hover:text-healthcare-primary hover:bg-healthcare-primary/10 rounded-xl"
                    >
                      <Share className="w-5 h-5" />
                      <span>{post.shares}</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <CreatePostModal open={showCreateModal} onOpenChange={setShowCreateModal} />
    </>
  )
}
