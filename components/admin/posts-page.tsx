"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Eye, Trash2, EyeOff, FileText, AlertTriangle } from "lucide-react"
import { PostDetailModal } from "./post-detail-modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const posts = [
  {
    id: 1,
    author: {
      name: "BS. Nguyễn Văn A",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content: "Chia sẻ một ca bệnh thú vị hôm nay. Bệnh nhân 45 tuổi đến khám với triệu chứng đau ngực...",
    status: "normal",
    reports: 0,
    likes: 24,
    comments: 8,
    createdAt: "2024-03-15 14:30",
  },
  {
    id: 2,
    author: {
      name: "Y tá Trần Thị B",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content: "Hôm nay tham gia khóa đào tạo về chăm sóc bệnh nhân COVID-19. Rất nhiều kiến thức bổ ích...",
    status: "normal",
    reports: 0,
    likes: 156,
    comments: 23,
    createdAt: "2024-03-15 10:15",
  },
  {
    id: 3,
    author: {
      name: "Dược sĩ Lê Văn C",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content: "Lưu ý quan trọng về tương tác thuốc: Không nên dùng Warfarin cùng với Aspirin...",
    status: "reported",
    reports: 3,
    likes: 89,
    comments: 15,
    createdAt: "2024-03-14 16:45",
  },
  {
    id: 4,
    author: {
      name: "BS. Phạm Thị D",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content: "Kỹ thuật mới trong phẫu thuật nội soi đã giúp giảm thời gian hồi phục cho bệnh nhân...",
    status: "hidden",
    reports: 1,
    likes: 67,
    comments: 12,
    createdAt: "2024-03-14 09:20",
  },
]

export function PostsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [showPostDetail, setShowPostDetail] = useState(false)
  const [filteredPosts, setFilteredPosts] = useState(posts)
  const [statusFilter, setStatusFilter] = useState("all")
  const [timeFilter, setTimeFilter] = useState("all")

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

  const handleSearch = () => {
    let filtered = posts

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (post) =>
          post.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((post) => post.status === statusFilter)
    }

    // Filter by time
    if (timeFilter !== "all") {
      const today = new Date().toISOString().split("T")[0]
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
      const yearAgo = new Date(new Date().getFullYear() - 1, 0, 1).toISOString().split("T")[0]

      switch (timeFilter) {
        case "today":
          filtered = filtered.filter((post) => post.createdAt.split(" ")[0] === today)
          break
        case "week":
          filtered = filtered.filter((post) => post.createdAt.split(" ")[0] >= weekAgo)
          break
        case "month":
          filtered = filtered.filter((post) => post.createdAt.split(" ")[0] >= monthAgo)
          break
        case "year":
          filtered = filtered.filter((post) => post.createdAt.split(" ")[0] >= yearAgo)
          break
        default:
          break
      }
    }

    setFilteredPosts(filtered)
  }

  const handleViewPost = (post: any) => {
    setSelectedPost(post)
    setShowPostDetail(true)
  }

  useEffect(() => {
    handleSearch()
  }, [searchTerm, statusFilter, timeFilter])

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý bài viết</h1>
          <p className="text-gray-600 mt-2">Theo dõi và kiểm duyệt nội dung bài viết</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-healthcare-primary" />
            <span className="text-lg font-semibold text-gray-900">{posts.length} bài viết</span>
          </div>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <span className="text-lg font-semibold text-orange-600">
              {posts.filter((p) => p.status === "reported").length} báo cáo
            </span>
          </div>
        </div>
      </div>

      {/* Search */}
      <Card className="border-0 shadow-md rounded-3xl bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Tìm kiếm theo tác giả, nội dung hoặc ID bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-2xl border-gray-200 focus-visible:ring-healthcare-primary"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 rounded-2xl">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="normal">Bình thường</SelectItem>
                <SelectItem value="reported">Bị báo cáo</SelectItem>
                <SelectItem value="hidden">Đã ẩn</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-full md:w-48 rounded-2xl">
                <SelectValue placeholder="Thời gian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả thời gian</SelectItem>
                <SelectItem value="today">Hôm nay</SelectItem>
                <SelectItem value="week">7 ngày qua</SelectItem>
                <SelectItem value="month">30 ngày qua</SelectItem>
                <SelectItem value="year">Năm nay</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Posts table */}
      <Card className="border-0 shadow-md rounded-3xl bg-white">
        <CardHeader>
          <CardTitle>Danh sách bài viết</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredPosts.length === 0 && (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Không tìm thấy bài viết nào phù hợp với bộ lọc</p>
            </div>
          )}
          <div className="rounded-2xl border border-gray-100 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Tác giả</TableHead>
                  <TableHead className="font-semibold">Nội dung</TableHead>
                  <TableHead className="font-semibold">Trạng thái</TableHead>
                  <TableHead className="font-semibold">Tương tác</TableHead>
                  <TableHead className="font-semibold">Thời gian</TableHead>
                  <TableHead className="font-semibold text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post) => (
                  <TableRow key={post.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-healthcare-primary text-white text-sm">
                            {post.author.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900">{post.author.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-900 line-clamp-2 max-w-md">{post.content}</p>
                    </TableCell>
                    <TableCell>{getStatusBadge(post.status, post.reports)}</TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600">
                        <div>{post.likes} lượt thích</div>
                        <div>{post.comments} bình luận</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{post.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="rounded-full">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl">
                          <DropdownMenuItem className="rounded-xl" onClick={() => handleViewPost(post)}>
                            <Eye className="w-4 h-4 mr-2" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl">
                            <EyeOff className="w-4 h-4 mr-2" />
                            {post.status === "hidden" ? "Hiện bài" : "Ẩn bài"}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Xóa bài viết
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Post Detail Modal */}
      <PostDetailModal open={showPostDetail} onOpenChange={setShowPostDetail} post={selectedPost} />
    </div>
  )
}
