"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, MessageCircle, AlertTriangle, TrendingUp, Activity } from "lucide-react"

const stats = [
  {
    title: "Tổng người dùng",
    value: "2,847",
    change: "+12%",
    changeType: "increase",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Bài viết",
    value: "1,234",
    change: "+8%",
    changeType: "increase",
    icon: FileText,
    color: "bg-healthcare-primary",
  },
  {
    title: "Bình luận",
    value: "5,678",
    change: "+15%",
    changeType: "increase",
    icon: MessageCircle,
    color: "bg-healthcare-secondary",
  },
  {
    title: "Báo cáo",
    value: "23",
    change: "-5%",
    changeType: "decrease",
    icon: AlertTriangle,
    color: "bg-orange-500",
  },
]

const recentActivities = [
  {
    id: 1,
    type: "user_register",
    message: "BS. Nguyễn Văn A đã đăng ký tài khoản",
    time: "5 phút trước",
    icon: Users,
    color: "text-blue-500",
  },
  {
    id: 2,
    type: "post_reported",
    message: "Bài viết #1234 bị báo cáo vi phạm",
    time: "15 phút trước",
    icon: AlertTriangle,
    color: "text-orange-500",
  },
  {
    id: 3,
    type: "post_created",
    message: "Y tá Trần Thị B đã đăng bài viết mới",
    time: "30 phút trước",
    icon: FileText,
    color: "text-healthcare-primary",
  },
  {
    id: 4,
    type: "feedback",
    message: "Phản hồi mới từ người dùng",
    time: "1 giờ trước",
    icon: MessageCircle,
    color: "text-healthcare-secondary",
  },
]

export function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tổng quan</h1>
        <p className="text-gray-600 mt-2">Chào mừng trở lại! Đây là tổng quan về hệ thống của bạn.</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="border-0 shadow-md rounded-3xl bg-white hover:shadow-lg transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp
                      className={`w-4 h-4 mr-1 ${stat.changeType === "increase" ? "text-green-500" : "text-red-500"}`}
                    />
                    <span
                      className={`text-sm font-medium ${stat.changeType === "increase" ? "text-green-600" : "text-red-600"}`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">so với tháng trước</span>
                  </div>
                </div>
                <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Chart */}
        <Card className="lg:col-span-2 border-0 shadow-md rounded-3xl bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-healthcare-primary" />
              <span>Hoạt động 7 ngày qua</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded-2xl">
              <div className="text-center">
                <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Biểu đồ hoạt động sẽ hiển thị ở đây</p>
                <p className="text-sm text-gray-400 mt-2">Tích hợp với thư viện biểu đồ như Chart.js hoặc Recharts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="border-0 shadow-md rounded-3xl bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-healthcare-secondary" />
              <span>Hoạt động gần đây</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center`}>
                    <activity.icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 leading-relaxed">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card className="border-0 shadow-md rounded-3xl bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-green-500" />
            <span>Trạng thái hệ thống</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-2xl bg-green-50">
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium text-gray-900">Server</p>
              <p className="text-xs text-green-600">Hoạt động bình thường</p>
            </div>
            <div className="text-center p-4 rounded-2xl bg-green-50">
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium text-gray-900">Database</p>
              <p className="text-xs text-green-600">Kết nối ổn định</p>
            </div>
            <div className="text-center p-4 rounded-2xl bg-yellow-50">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium text-gray-900">API</p>
              <p className="text-xs text-yellow-600">Tải cao</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
