"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  MoreHorizontal,
  Eye,
  CheckCircle,
  X,
  AlertTriangle,
  Clock,
  FileText,
  MessageCircle,
  User,
} from "lucide-react"

const reports = [
  {
    id: 1,
    type: "post",
    targetId: 123,
    targetTitle: "Chia sẻ về ca bệnh tim mạch...",
    reporter: {
      name: "BS. Trần Văn X",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    reason: "Thông tin y khoa không chính xác",
    description: "Bài viết có thông tin về liều dùng thuốc không đúng với hướng dẫn của WHO",
    status: "pending",
    priority: "high",
    createdAt: "2024-03-15 14:30",
    assignedTo: null,
  },
  {
    id: 2,
    type: "comment",
    targetId: 456,
    targetTitle: "Bình luận về phương pháp điều trị...",
    reporter: {
      name: "Y tá Nguyễn Thị Y",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    reason: "Ngôn từ không phù hợp",
    description: "Bình luận có từ ngữ thiếu tôn trọng đối với đồng nghiệp",
    status: "resolved",
    priority: "medium",
    createdAt: "2024-03-15 10:15",
    assignedTo: "Admin A",
  },
  {
    id: 3,
    type: "user",
    targetId: 789,
    targetTitle: "Tài khoản BS. Lê Văn Z",
    reporter: {
      name: "Dược sĩ Phạm Thị A",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    reason: "Giả mạo danh tính",
    description: "Nghi ngờ tài khoản này giả mạo là bác sĩ chuyên khoa",
    status: "investigating",
    priority: "high",
    createdAt: "2024-03-14 16:45",
    assignedTo: "Admin B",
  },
  {
    id: 4,
    type: "post",
    targetId: 101,
    targetTitle: "Hướng dẫn sử dụng thuốc...",
    reporter: {
      name: "BS. Hoàng Văn B",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    reason: "Spam",
    description: "Bài viết được đăng lại nhiều lần trong ngày",
    status: "rejected",
    priority: "low",
    createdAt: "2024-03-14 09:20",
    assignedTo: "Admin C",
  },
]

export function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [filteredReports, setFilteredReports] = useState(reports)

  const handleSearch = () => {
    let filtered = reports

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (report) =>
          report.targetTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.reporter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.reason.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((report) => report.status === statusFilter)
    }

    // Filter by type
    if (typeFilter !== "all") {
      filtered = filtered.filter((report) => report.type === typeFilter)
    }

    // Filter by priority
    if (priorityFilter !== "all") {
      filtered = filtered.filter((report) => report.priority === priorityFilter)
    }

    setFilteredReports(filtered)
  }

  const handleStatusChange = (reportId: number, newStatus: string) => {
    // Update report status logic here
    console.log(`Changing report ${reportId} status to ${newStatus}`)
  }

  // Auto-filter when search term or filters change
  useEffect(() => {
    handleSearch()
  }, [searchTerm, statusFilter, typeFilter, priorityFilter])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Chờ xử lý</Badge>
      case "investigating":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Đang xem xét</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Đã xử lý</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Từ chối</Badge>
      default:
        return <Badge variant="secondary">Không xác định</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="destructive" className="bg-red-500 hover:bg-red-500">
            Cao
          </Badge>
        )
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Trung bình</Badge>
      case "low":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Thấp</Badge>
      default:
        return <Badge variant="secondary">Không xác định</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "post":
        return <FileText className="w-4 h-4" />
      case "comment":
        return <MessageCircle className="w-4 h-4" />
      case "user":
        return <User className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  const pendingCount = reports.filter((r) => r.status === "pending").length
  const investigatingCount = reports.filter((r) => r.status === "investigating").length
  const highPriorityCount = reports.filter((r) => r.priority === "high").length

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý báo cáo</h1>
          <p className="text-gray-600 mt-2">Xem xét và xử lý các báo cáo từ người dùng</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-yellow-500" />
            <span className="text-lg font-semibold text-yellow-600">{pendingCount} chờ xử lý</span>
          </div>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span className="text-lg font-semibold text-red-600">{highPriorityCount} ưu tiên cao</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md rounded-3xl bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Chờ xử lý</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{pendingCount}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md rounded-3xl bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Đang xem xét</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{investigatingCount}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md rounded-3xl bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Đã xử lý</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {reports.filter((r) => r.status === "resolved").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md rounded-3xl bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ưu tiên cao</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{highPriorityCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-md rounded-3xl bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Tìm kiếm theo nội dung, người báo cáo..."
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
                <SelectItem value="pending">Chờ xử lý</SelectItem>
                <SelectItem value="investigating">Đang xem xét</SelectItem>
                <SelectItem value="resolved">Đã xử lý</SelectItem>
                <SelectItem value="rejected">Từ chối</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48 rounded-2xl">
                <SelectValue placeholder="Loại báo cáo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                <SelectItem value="post">Bài viết</SelectItem>
                <SelectItem value="comment">Bình luận</SelectItem>
                <SelectItem value="user">Người dùng</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full md:w-48 rounded-2xl">
                <SelectValue placeholder="Mức độ ưu tiên" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả mức độ</SelectItem>
                <SelectItem value="high">Cao</SelectItem>
                <SelectItem value="medium">Trung bình</SelectItem>
                <SelectItem value="low">Thấp</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports table */}
      <Card className="border-0 shadow-md rounded-3xl bg-white">
        <CardHeader>
          <CardTitle>Danh sách báo cáo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-2xl border border-gray-100 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Nội dung báo cáo</TableHead>
                  <TableHead className="font-semibold">Người báo cáo</TableHead>
                  <TableHead className="font-semibold">Loại</TableHead>
                  <TableHead className="font-semibold">Trạng thái</TableHead>
                  <TableHead className="font-semibold">Ưu tiên</TableHead>
                  <TableHead className="font-semibold">Thời gian</TableHead>
                  <TableHead className="font-semibold text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900 line-clamp-1">{report.targetTitle}</p>
                        <p className="text-sm text-gray-500 line-clamp-1">{report.reason}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={report.reporter.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-healthcare-primary text-white text-sm">
                            {report.reporter.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900">{report.reporter.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(report.type)}
                        <span className="capitalize">
                          {report.type === "post" ? "Bài viết" : report.type === "comment" ? "Bình luận" : "Người dùng"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(report.status)}</TableCell>
                    <TableCell>{getPriorityBadge(report.priority)}</TableCell>
                    <TableCell className="text-sm text-gray-600">{report.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="rounded-full">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl">
                          <DropdownMenuItem className="rounded-xl">
                            <Eye className="w-4 h-4 mr-2" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="rounded-xl"
                            onClick={() => handleStatusChange(report.id, "resolved")}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Đánh dấu đã xử lý
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="rounded-xl text-red-600"
                            onClick={() => handleStatusChange(report.id, "rejected")}
                          >
                            <X className="w-4 h-4 mr-2" />
                            Từ chối báo cáo
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-8">
              <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Không tìm thấy báo cáo nào phù hợp với bộ lọc</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
