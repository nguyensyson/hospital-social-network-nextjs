"use client"

import { useState, useRef } from "react"
import { ArrowLeft, Heart, MessageCircle, Share, MoreHorizontal, Send, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

// Mock data for the post
const postData = {
  id: 1,
  user: {
    name: "BS. Nguyễn Văn A",
    username: "@bsnguyenvana",
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
    specialty: "Bác sĩ chuyên khoa Tim mạch",
    hospital: "Bệnh viện Chợ Rẫy",
  },
  content: `Hôm nay tôi muốn chia sẻ về một ca bệnh rất thú vị mà tôi vừa điều trị thành công. 

Bệnh nhân nam, 45 tuổi, đến khám với triệu chứng đau ngực kéo dài 2 tuần. Ban đầu, các triệu chứng không rõ ràng và có thể nhầm lẫn với nhiều bệnh lý khác.

Qua quá trình thăm khám kỹ lưỡng và thực hiện các xét nghiệm cần thiết bao gồm:
- Điện tim 12 chuyển đạo
- Siêu âm tim
- Xét nghiệm Troponin
- CT mạch vành

Kết quả cho thấy bệnh nhân bị hẹp mạch vành LAD 80%. Chúng tôi đã tiến hành can thiệp đặt stent thành công.

Sau 3 ngày theo dõi, bệnh nhân đã ổn định và được xuất viện với lời khuyên về chế độ ăn uống và tập luyện phù hợp.

Điều quan trọng là việc phát hiện sớm và điều trị kịp thời đã giúp bệnh nhân tránh được những biến chứng nghiêm trọng.

#cardiology #healthcare #medicine #success_story`,
  images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=300&width=400"],
  timestamp: "2 giờ trước",
  likes: 156,
  comments: 23,
  shares: 12,
  isLiked: false,
}

// Mock comments data
const commentsData = [
  {
    id: 1,
    user: {
      name: "BS. Trần Thị B",
      username: "@bstranthib",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    content:
      "Cảm ơn bác sĩ đã chia sẻ! Ca bệnh rất hay và bổ ích. Có thể cho biết thêm về chế độ theo dõi sau can thiệp không ạ?",
    timestamp: "1 giờ trước",
    likes: 12,
    replies: [
      {
        id: 11,
        user: {
          name: "BS. Nguyễn Văn A",
          username: "@bsnguyenvana",
          avatar: "/placeholder.svg?height=32&width=32",
          verified: true,
        },
        content:
          "Cảm ơn bác sĩ! Bệnh nhân được theo dõi định kỳ mỗi 3 tháng trong năm đầu, sau đó 6 tháng/lần. Quan trọng là tuân thủ thuốc chống kết tập tiểu cầu.",
        timestamp: "45 phút trước",
        likes: 8,
      },
    ],
  },
  {
    id: 2,
    user: {
      name: "Y tá Lê Văn C",
      username: "@ytalevanc",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    content:
      "Rất cảm ơn bác sĩ đã chia sẻ kinh nghiệm quý báu. Điều này giúp chúng em học hỏi thêm nhiều kiến thức trong chăm sóc bệnh nhân tim mạch.",
    timestamp: "30 phút trước",
    likes: 8,
    replies: [],
  },
  {
    id: 3,
    user: {
      name: "Dược sĩ Phạm Thị D",
      username: "@duocsiphamthid",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    content:
      "Xin hỏi về phác đồ thuốc sau can thiệp, bác sĩ có khuyến nghị gì đặc biệt không ạ? Đặc biệt là về thời gian dùng thuốc chống kết tập kép.",
    timestamp: "15 phút trước",
    likes: 5,
    replies: [],
  },
]

export function PostDetailPage() {
  const router = useRouter()
  const [post, setPost] = useState(postData)
  const [comments, setComments] = useState(commentsData)
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [showFullContent, setShowFullContent] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [replyLikes, setReplyLikes] = useState<{ [key: number]: { liked: boolean; count: number } }>({})
  const [commentLikes, setCommentLikes] = useState<{ [key: number]: { liked: boolean; count: number } }>({})

  const handleLike = () => {
    setPost((prev) => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
    }))
  }

  const handleComment = () => {
    if (!newComment.trim()) return

    const comment = {
      id: Date.now(),
      user: {
        name: "BS. Người dùng hiện tại",
        username: "@current_user",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: false,
      },
      content: newComment,
      timestamp: "Vừa xong",
      likes: 0,
      replies: [],
    }

    setComments((prev) => [...prev, comment])
    setNewComment("")
  }

  const handleReply = (commentId: number) => {
    if (!replyContent.trim()) return

    const reply = {
      id: Date.now(),
      user: {
        name: "BS. Người dùng hiện tại",
        username: "@current_user",
        avatar: "/placeholder.svg?height=32&width=32",
        verified: false,
      },
      content: replyContent,
      timestamp: "Vừa xong",
      likes: 0,
    }

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId ? { ...comment, replies: [...comment.replies, reply] } : comment,
      ),
    )
    setReplyContent("")
    setReplyingTo(null)
  }

  const handleReplyLike = (replyId: number, initialLikes: number) => {
    setReplyLikes((prev) => {
      const current = prev[replyId] || { liked: false, count: initialLikes }
      return {
        ...prev,
        [replyId]: {
          liked: !current.liked,
          count: current.liked ? current.count - 1 : current.count + 1,
        },
      }
    })
  }

  const handleCommentLike = (commentId: number, initialLikes: number) => {
    setCommentLikes((prev) => {
      const current = prev[commentId] || { liked: false, count: initialLikes }
      return {
        ...prev,
        [commentId]: {
          liked: !current.liked,
          count: current.liked ? current.count - 1 : current.count + 1,
        },
      }
    })
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 min-h-screen">
      {/* Header with back button */}
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-4 rounded-full hover:bg-gray-100">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-900">Bài viết</h1>
      </div>

      {/* Main Post */}
      <Card className="border-0 shadow-lg rounded-3xl mb-8 bg-white">
        <CardContent className="p-8">
          {/* Post Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-healthcare-primary text-white text-xl">
                  {post.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h2 className="text-xl font-bold text-gray-900">{post.user.name}</h2>
                  {post.user.verified && (
                    <div className="w-6 h-6 bg-healthcare-secondary rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-1">{post.user.username}</p>
                <p className="text-sm text-healthcare-primary font-medium mb-1">{post.user.specialty}</p>
                <p className="text-sm text-gray-600">{post.user.hospital}</p>
                <p className="text-sm text-gray-500 mt-2">{post.timestamp}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="rounded-full">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>

          {/* Post Content */}
          <div className="mb-8">
            <div className="prose prose-lg max-w-none mb-6">
              <div className="text-gray-900 leading-relaxed whitespace-pre-line text-lg space-y-4">
                {showFullContent ? (
                  post.content.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <>
                    <p className="mb-4">{post.content.split("\n\n").slice(0, 3).join("\n\n")}</p>
                    {post.content.split("\n\n").length > 3 && (
                      <Button
                        variant="ghost"
                        onClick={() => setShowFullContent(true)}
                        className="text-healthcare-primary hover:text-healthcare-primary/80 p-0 h-auto font-medium"
                      >
                        Hiển thị thêm
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Post Images Carousel */}
            {post.images && post.images.length > 0 && (
              <div className="relative">
                {post.images.length === 1 ? (
                  <div className="rounded-3xl overflow-hidden shadow-md">
                    <img
                      src={post.images[0] || "/placeholder.svg"}
                      alt="Post image"
                      className="w-full h-auto object-cover max-h-96"
                    />
                  </div>
                ) : (
                  <div className="relative rounded-3xl overflow-hidden shadow-md">
                    <div
                      ref={carouselRef}
                      className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                      onScroll={(e) => {
                        const scrollLeft = e.currentTarget.scrollLeft
                        const itemWidth = e.currentTarget.offsetWidth
                        const newIndex = Math.round(scrollLeft / itemWidth)
                        setCurrentImageIndex(newIndex)
                      }}
                    >
                      {post.images.map((image, index) => (
                        <div key={index} className="w-full flex-shrink-0 snap-center">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Post image ${index + 1}`}
                            className="w-full h-96 object-cover"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Navigation Arrows */}
                    {currentImageIndex > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                        onClick={() => {
                          const carousel = carouselRef.current
                          if (carousel) {
                            carousel.scrollTo({
                              left: (currentImageIndex - 1) * carousel.offsetWidth,
                              behavior: "smooth",
                            })
                          }
                        }}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                    )}

                    {currentImageIndex < post.images.length - 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                        onClick={() => {
                          const carousel = carouselRef.current
                          if (carousel) {
                            carousel.scrollTo({
                              left: (currentImageIndex + 1) * carousel.offsetWidth,
                              behavior: "smooth",
                            })
                          }
                        }}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    )}

                    {/* Dots Indicator */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {post.images.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            index === currentImageIndex ? "bg-white" : "bg-white/50"
                          }`}
                          onClick={() => {
                            const carousel = carouselRef.current
                            if (carousel) {
                              carousel.scrollTo({
                                left: index * carousel.offsetWidth,
                                behavior: "smooth",
                              })
                            }
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Post Actions */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-100">
            <div className="flex items-center space-x-8">
              <Button
                variant="ghost"
                size="lg"
                onClick={handleLike}
                className={`flex items-center space-x-3 rounded-2xl px-6 py-3 transition-all duration-200 ${
                  post.isLiked
                    ? "text-red-500 bg-red-50 hover:bg-red-100"
                    : "text-gray-500 hover:text-red-500 hover:bg-red-50"
                }`}
              >
                <Heart className={`w-6 h-6 ${post.isLiked ? "fill-current" : ""}`} />
                <span className="font-medium">{post.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="flex items-center space-x-3 text-gray-500 hover:text-healthcare-secondary hover:bg-healthcare-secondary/10 rounded-2xl px-6 py-3"
              >
                <MessageCircle className="w-6 h-6" />
                <span className="font-medium">{post.comments}</span>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="flex items-center space-x-3 text-gray-500 hover:text-healthcare-primary hover:bg-healthcare-primary/10 rounded-2xl px-6 py-3"
              >
                <Share className="w-6 h-6" />
                <span className="font-medium">{post.shares}</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Bình luận ({comments.length})</h3>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <Card key={comment.id} className="border-0 shadow-md rounded-3xl bg-white">
              <CardContent className="p-4">
                {/* Comment Header */}
                <div className="flex items-start space-x-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={comment.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-healthcare-primary text-white">
                      {comment.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{comment.user.name}</h4>
                      {comment.user.verified && (
                        <div className="w-5 h-5 bg-healthcare-secondary rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{comment.timestamp}</p>
                    <p className="text-gray-900 leading-relaxed">{comment.content}</p>

                    {/* Comment Actions */}
                    <div className="flex items-center space-x-4 mt-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCommentLike(comment.id, comment.likes)}
                        className={`rounded-xl px-3 py-1 transition-all duration-200 ${
                          commentLikes[comment.id]?.liked
                            ? "text-red-500 bg-red-50 hover:bg-red-100"
                            : "text-gray-500 hover:text-red-500 hover:bg-red-50"
                        }`}
                      >
                        <Heart className={`w-4 h-4 mr-1 ${commentLikes[comment.id]?.liked ? "fill-current" : ""}`} />
                        {commentLikes[comment.id]?.count ?? comment.likes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                        className="text-gray-500 hover:text-healthcare-secondary rounded-xl px-3 py-1"
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Trả lời
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="ml-16 space-y-4 mt-4 pt-4 border-t border-gray-50">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={reply.user.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-healthcare-primary text-white text-sm">
                            {reply.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h5 className="font-semibold text-gray-900 text-sm">{reply.user.name}</h5>
                            {reply.user.verified && (
                              <div className="w-4 h-4 bg-healthcare-secondary rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mb-2">{reply.timestamp}</p>
                          <p className="text-gray-900 text-sm leading-relaxed">{reply.content}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleReplyLike(reply.id, reply.likes)}
                            className={`rounded-xl px-2 py-1 mt-2 transition-all duration-200 ${
                              replyLikes[reply.id]?.liked
                                ? "text-red-500 bg-red-50 hover:bg-red-100"
                                : "text-gray-500 hover:text-red-500 hover:bg-red-50"
                            }`}
                          >
                            <Heart className={`w-3 h-3 mr-1 ${replyLikes[reply.id]?.liked ? "fill-current" : ""}`} />
                            {replyLikes[reply.id]?.count ?? reply.likes}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Input */}
                {replyingTo === comment.id && (
                  <div className="ml-16 mt-4 pt-4 border-t border-gray-50">
                    <div className="flex space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback className="bg-healthcare-primary text-white text-sm">U</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          placeholder="Viết trả lời..."
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          className="border-gray-200 rounded-2xl resize-none focus-visible:ring-healthcare-primary"
                          rows={3}
                        />
                        <div className="flex justify-end space-x-2 mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setReplyingTo(null)}
                            className="rounded-xl"
                          >
                            Hủy
                          </Button>
                          <Button
                            onClick={() => handleReply(comment.id)}
                            disabled={!replyContent.trim()}
                            className="bg-healthcare-primary hover:bg-healthcare-primary/90 text-white rounded-xl"
                          >
                            <Send className="w-4 h-4 mr-1" />
                            Gửi
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* New Comment Input */}
        <Card className="border-0 shadow-lg rounded-3xl bg-white sticky bottom-4">
          <CardContent className="p-6">
            <div className="flex space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/placeholder.svg?height=48&width=48" />
                <AvatarFallback className="bg-healthcare-primary text-white">U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Viết bình luận của bạn..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="border-gray-200 rounded-2xl resize-none focus-visible:ring-healthcare-primary text-lg"
                  rows={2}
                />
                <div className="flex justify-end mt-4">
                  <Button
                    onClick={handleComment}
                    disabled={!newComment.trim()}
                    className="bg-healthcare-primary hover:bg-healthcare-primary/90 text-white rounded-2xl px-8 shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Gửi bình luận
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
