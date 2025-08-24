"use client"

import { Heart, MessageCircle, UserPlus, Share } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const notifications = [
  {
    id: 1,
    type: "like",
    user: {
      name: "BS. Nguyễn Văn A",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "đã thích bài viết của bạn",
    time: "5 phút trước",
    read: false,
  },
  {
    id: 2,
    type: "comment",
    user: {
      name: "Y tá Trần Thị B",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: 'đã bình luận về bài viết của bạn: "Rất hữu ích, cảm ơn bạn đã chia sẻ!"',
    time: "15 phút trước",
    read: false,
  },
  {
    id: 3,
    type: "follow",
    user: {
      name: "Dược sĩ Lê Văn C",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "đã bắt đầu theo dõi bạn",
    time: "1 giờ trước",
    read: true,
  },
  {
    id: 4,
    type: "share",
    user: {
      name: "BS. Phạm Văn D",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "đã chia sẻ bài viết của bạn",
    time: "2 giờ trước",
    read: true,
  },
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "like":
      return <Heart className="w-5 h-5 text-red-500" />
    case "comment":
      return <MessageCircle className="w-5 h-5 text-healthcare-secondary" />
    case "follow":
      return <UserPlus className="w-5 h-5 text-healthcare-primary" />
    case "share":
      return <Share className="w-5 h-5 text-healthcare-primary" />
    default:
      return <Heart className="w-5 h-5 text-gray-500" />
  }
}

export function NotificationsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Thông báo</h1>
      </div>

      <div className="space-y-1">
        {/* Today Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Hôm nay</h2>
          {notifications.slice(0, 2).map((notification) => (
            <Card
              key={notification.id}
              className={`border-0 shadow-md rounded-3xl mb-2 hover:shadow-lg transition-all duration-300 bg-white ${
                !notification.read ? "bg-healthcare-primary/5 shadow-lg" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={notification.user.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-healthcare-primary text-white">
                        {notification.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900">
                      <span className="font-semibold">{notification.user.name}</span> {notification.content}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                  </div>
                  {notification.type === "follow" && (
                    <Button
                      size="sm"
                      className="bg-healthcare-primary hover:bg-healthcare-primary/90 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      Theo dõi lại
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Earlier Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Trước đó</h2>
          {notifications.slice(2).map((notification) => (
            <Card
              key={notification.id}
              className="border-0 shadow-md rounded-3xl mb-2 hover:shadow-lg transition-all duration-300 bg-white"
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={notification.user.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-healthcare-primary text-white">
                        {notification.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900">
                      <span className="font-semibold">{notification.user.name}</span> {notification.content}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
