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
import { Search, Filter, MoreHorizontal, Eye, Ban, CheckCircle, Users } from "lucide-react"
import { UserDetailModal } from "./user-detail-modal"

const users = [
  {
    id: 1,
    name: "BS. Nguyễn Văn A",
    email: "bsnguyenvana@hospital.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Bác sĩ",
    status: "active",
    joinDate: "2024-01-15",
    posts: 23,
    verified: true,
  },
  {
    id: 2,
    name: "Y tá Trần Thị B",
    email: "ytaB@hospital.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Y tá",
    status: "active",
    joinDate: "2024-02-20",
    posts: 15,
    verified: false,
  },
  {
    id: 3,
    name: "Dược sĩ Lê Văn C",
    email: "duocsiC@pharmacy.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Dược sĩ",
    status: "banned",
    joinDate: "2024-01-10",
    posts: 8,
    verified: true,
  },
  {
    id: 4,
    name: "BS. Phạm Thị D",
    email: "bsphamthid@clinic.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Bác sĩ",
    status: "active",
    joinDate: "2024-03-05",
    posts: 31,
    verified: true,
  },
]

export function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [showUserDetail, setShowUserDetail] = useState(false)
  const [filteredUsers, setFilteredUsers] = useState(users)

  const handleSearch = () => {
    let filtered = users

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((user) => user.status === statusFilter)
    }

    // Filter by role
    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter)
    }

    setFilteredUsers(filtered)
  }

  const handleViewUser = (user: any) => {
    setSelectedUser(user)
    setShowUserDetail(true)
  }

  const handleToggleUserStatus = (userId: number) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, status: user.status === "active" ? "banned" : "active" } : user,
    )
    // Update filtered users based on current filters
    handleSearch()
  }

  // Auto-filter when search term or filters change
  useEffect(() => {
    handleSearch()
  }, [searchTerm, statusFilter, roleFilter])

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
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý người dùng</h1>
          <p className="text-gray-600 mt-2">Quản lý tài khoản và quyền hạn người dùng</p>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-healthcare-primary" />
          <span className="text-lg font-semibold text-gray-900">{filteredUsers.length} người dùng</span>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-md rounded-3xl bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Tìm kiếm theo tên hoặc email..."
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
                <SelectItem value="active">Hoạt động</SelectItem>
                <SelectItem value="banned">Bị khóa</SelectItem>
              </SelectContent>
            </Select>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-48 rounded-2xl">
                <SelectValue placeholder="Vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả vai trò</SelectItem>
                <SelectItem value="Bác sĩ">Bác sĩ</SelectItem>
                <SelectItem value="Y tá">Y tá</SelectItem>
                <SelectItem value="Dược sĩ">Dược sĩ</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSearch} className="bg-healthcare-primary hover:bg-healthcare-primary/90 rounded-2xl">
              <Filter className="w-4 h-4 mr-2" />
              Lọc
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users table */}
      <Card className="border-0 shadow-md rounded-3xl bg-white">
        <CardHeader>
          <CardTitle>Danh sách người dùng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-2xl border border-gray-100 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Người dùng</TableHead>
                  <TableHead className="font-semibold">Vai trò</TableHead>
                  <TableHead className="font-semibold">Trạng thái</TableHead>
                  <TableHead className="font-semibold">Ngày tham gia</TableHead>
                  <TableHead className="font-semibold">Bài viết</TableHead>
                  <TableHead className="font-semibold text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-healthcare-primary text-white">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-gray-900">{user.name}</p>
                            {user.verified && <CheckCircle className="w-4 h-4 text-healthcare-secondary" />}
                          </div>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="rounded-xl">
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="text-gray-600">{user.joinDate}</TableCell>
                    <TableCell>
                      <span className="font-medium">{user.posts}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="rounded-full">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl">
                          <DropdownMenuItem className="rounded-xl" onClick={() => handleViewUser(user)}>
                            <Eye className="w-4 h-4 mr-2" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl" onClick={() => handleToggleUserStatus(user.id)}>
                            {user.status === "active" ? (
                              <>
                                <Ban className="w-4 h-4 mr-2" />
                                Khóa tài khoản
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Mở khóa
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Không tìm thấy người dùng nào phù hợp với bộ lọc</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Detail Modal */}
      <UserDetailModal open={showUserDetail} onOpenChange={setShowUserDetail} user={selectedUser} />
    </div>
  )
}
