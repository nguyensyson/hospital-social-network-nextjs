"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  Shield,
  Bell,
  Database,
  Users,
  FileText,
  Globe,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

export function SettingsPage() {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "MedSocial",
    siteDescription: "Mạng xã hội dành cho cộng đồng y tế",
    maintenanceMode: false,
    registrationEnabled: true,

    // Security Settings
    requireEmailVerification: true,
    enableTwoFactor: false,
    passwordMinLength: 8,
    sessionTimeout: 30,
    maxLoginAttempts: 5,

    // Content Settings
    autoModeration: true,
    requirePostApproval: false,
    maxPostLength: 5000,
    allowImageUploads: true,
    maxImageSize: 10,

    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    adminAlerts: true,
    reportNotifications: true,

    // Privacy Settings
    defaultProfileVisibility: "public",
    allowDataExport: true,
    dataRetentionDays: 365,
  })

  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLastSaved(new Date())
    setIsSaving(false)
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cài đặt hệ thống</h1>
          <p className="text-gray-600 mt-2">Quản lý cấu hình và tùy chọn hệ thống</p>
        </div>
        <div className="flex items-center space-x-4">
          {lastSaved && (
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Lưu lần cuối: {lastSaved.toLocaleTimeString()}</span>
            </div>
          )}
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-healthcare-primary hover:bg-healthcare-primary/90 text-white rounded-2xl"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Đang lưu...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Lưu cài đặt
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-gray-50 rounded-2xl p-1 mb-8">
          <TabsTrigger
            value="general"
            className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-healthcare-primary"
          >
            <Settings className="w-4 h-4 mr-2" />
            Chung
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-healthcare-primary"
          >
            <Shield className="w-4 h-4 mr-2" />
            Bảo mật
          </TabsTrigger>
          <TabsTrigger
            value="content"
            className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-healthcare-primary"
          >
            <FileText className="w-4 h-4 mr-2" />
            Nội dung
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-healthcare-primary"
          >
            <Bell className="w-4 h-4 mr-2" />
            Thông báo
          </TabsTrigger>
          <TabsTrigger
            value="privacy"
            className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-healthcare-primary"
          >
            <Users className="w-4 h-4 mr-2" />
            Quyền riêng tư
          </TabsTrigger>
          <TabsTrigger
            value="system"
            className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-healthcare-primary"
          >
            <Database className="w-4 h-4 mr-2" />
            Hệ thống
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="border-0 shadow-md rounded-3xl bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-healthcare-primary" />
                <span>Cài đặt chung</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Tên trang web</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => handleSettingChange("siteName", e.target.value)}
                    className="rounded-2xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Mô tả trang web</Label>
                  <Input
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => handleSettingChange("siteDescription", e.target.value)}
                    className="rounded-2xl"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                  <div>
                    <h4 className="font-medium text-gray-900">Chế độ bảo trì</h4>
                    <p className="text-sm text-gray-500">Tạm thời tắt trang web để bảo trì</p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                  <div>
                    <h4 className="font-medium text-gray-900">Cho phép đăng ký</h4>
                    <p className="text-sm text-gray-500">Người dùng mới có thể tạo tài khoản</p>
                  </div>
                  <Switch
                    checked={settings.registrationEnabled}
                    onCheckedChange={(checked) => handleSettingChange("registrationEnabled", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="border-0 shadow-md rounded-3xl bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-healthcare-primary" />
                <span>Cài đặt bảo mật</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">Độ dài mật khẩu tối thiểu</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={settings.passwordMinLength}
                    onChange={(e) => handleSettingChange("passwordMinLength", Number.parseInt(e.target.value))}
                    className="rounded-2xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Thời gian hết hạn phiên (phút)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange("sessionTimeout", Number.parseInt(e.target.value))}
                    className="rounded-2xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Số lần đăng nhập tối đa</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={settings.maxLoginAttempts}
                    onChange={(e) => handleSettingChange("maxLoginAttempts", Number.parseInt(e.target.value))}
                    className="rounded-2xl"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                  <div>
                    <h4 className="font-medium text-gray-900">Yêu cầu xác thực email</h4>
                    <p className="text-sm text-gray-500">Người dùng phải xác thực email trước khi sử dụng</p>
                  </div>
                  <Switch
                    checked={settings.requireEmailVerification}
                    onCheckedChange={(checked) => handleSettingChange("requireEmailVerification", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                  <div>
                    <h4 className="font-medium text-gray-900">Xác thực hai yếu tố</h4>
                    <p className="text-sm text-gray-500">Bật xác thực 2FA cho tất cả người dùng</p>
                  </div>
                  <Switch
                    checked={settings.enableTwoFactor}
                    onCheckedChange={(checked) => handleSettingChange("enableTwoFactor", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Settings */}
        <TabsContent value="content" className="space-y-6">
          <Card className="border-0 shadow-md rounded-3xl bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-healthcare-primary" />
                <span>Cài đặt nội dung</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="maxPostLength">Độ dài bài viết tối đa (ký tự)</Label>
                  <Input
                    id="maxPostLength"
                    type="number"
                    value={settings.maxPostLength}
                    onChange={(e) => handleSettingChange("maxPostLength", Number.parseInt(e.target.value))}
                    className="rounded-2xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxImageSize">Kích thước ảnh tối đa (MB)</Label>
                  <Input
                    id="maxImageSize"
                    type="number"
                    value={settings.maxImageSize}
                    onChange={(e) => handleSettingChange("maxImageSize", Number.parseInt(e.target.value))}
                    className="rounded-2xl"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                  <div>
                    <h4 className="font-medium text-gray-900">Kiểm duyệt tự động</h4>
                    <p className="text-sm text-gray-500">Tự động kiểm tra nội dung không phù hợp</p>
                  </div>
                  <Switch
                    checked={settings.autoModeration}
                    onCheckedChange={(checked) => handleSettingChange("autoModeration", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                  <div>
                    <h4 className="font-medium text-gray-900">Yêu cầu duyệt bài viết</h4>
                    <p className="text-sm text-gray-500">Bài viết cần được admin duyệt trước khi hiển thị</p>
                  </div>
                  <Switch
                    checked={settings.requirePostApproval}
                    onCheckedChange={(checked) => handleSettingChange("requirePostApproval", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                  <div>
                    <h4 className="font-medium text-gray-900">Cho phép tải ảnh lên</h4>
                    <p className="text-sm text-gray-500">Người dùng có thể đăng ảnh trong bài viết</p>
                  </div>
                  <Switch
                    checked={settings.allowImageUploads}
                    onCheckedChange={(checked) => handleSettingChange("allowImageUploads", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-0 shadow-md rounded-3xl bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-healthcare-primary" />
                <span>Cài đặt thông báo</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                <div>
                  <h4 className="font-medium text-gray-900">Thông báo email</h4>
                  <p className="text-sm text-gray-500">Gửi thông báo qua email cho người dùng</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                <div>
                  <h4 className="font-medium text-gray-900">Thông báo đẩy</h4>
                  <p className="text-sm text-gray-500">Gửi push notification cho ứng dụng mobile</p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                <div>
                  <h4 className="font-medium text-gray-900">Cảnh báo admin</h4>
                  <p className="text-sm text-gray-500">Thông báo cho admin khi có sự cố hệ thống</p>
                </div>
                <Switch
                  checked={settings.adminAlerts}
                  onCheckedChange={(checked) => handleSettingChange("adminAlerts", checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                <div>
                  <h4 className="font-medium text-gray-900">Thông báo báo cáo</h4>
                  <p className="text-sm text-gray-500">Thông báo khi có báo cáo mới từ người dùng</p>
                </div>
                <Switch
                  checked={settings.reportNotifications}
                  onCheckedChange={(checked) => handleSettingChange("reportNotifications", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy" className="space-y-6">
          <Card className="border-0 shadow-md rounded-3xl bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-healthcare-primary" />
                <span>Cài đặt quyền riêng tư</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultProfileVisibility">Hiển thị hồ sơ mặc định</Label>
                  <Select
                    value={settings.defaultProfileVisibility}
                    onValueChange={(value) => handleSettingChange("defaultProfileVisibility", value)}
                  >
                    <SelectTrigger className="rounded-2xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Công khai</SelectItem>
                      <SelectItem value="private">Riêng tư</SelectItem>
                      <SelectItem value="friends">Chỉ bạn bè</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataRetentionDays">Thời gian lưu trữ dữ liệu (ngày)</Label>
                  <Input
                    id="dataRetentionDays"
                    type="number"
                    value={settings.dataRetentionDays}
                    onChange={(e) => handleSettingChange("dataRetentionDays", Number.parseInt(e.target.value))}
                    className="rounded-2xl"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                <div>
                  <h4 className="font-medium text-gray-900">Cho phép xuất dữ liệu</h4>
                  <p className="text-sm text-gray-500">Người dùng có thể tải xuất dữ liệu cá nhân</p>
                </div>
                <Switch
                  checked={settings.allowDataExport}
                  onCheckedChange={(checked) => handleSettingChange("allowDataExport", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <Card className="border-0 shadow-md rounded-3xl bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-healthcare-primary" />
                <span>Thông tin hệ thống</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-green-50">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h4 className="font-medium text-green-900">Trạng thái server</h4>
                    </div>
                    <p className="text-sm text-green-700">Hoạt động bình thường</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-blue-50">
                    <div className="flex items-center space-x-2 mb-2">
                      <Database className="w-5 h-5 text-blue-600" />
                      <h4 className="font-medium text-blue-900">Database</h4>
                    </div>
                    <p className="text-sm text-blue-700">Kết nối ổn định - 99.9% uptime</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-purple-50">
                    <div className="flex items-center space-x-2 mb-2">
                      <Globe className="w-5 h-5 text-purple-600" />
                      <h4 className="font-medium text-purple-900">Phiên bản</h4>
                    </div>
                    <p className="text-sm text-purple-700">MedSocial v2.1.0</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-orange-50">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                      <h4 className="font-medium text-orange-900">Cập nhật</h4>
                    </div>
                    <p className="text-sm text-orange-700">Có bản cập nhật mới v2.1.1</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" className="rounded-2xl bg-transparent">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Kiểm tra cập nhật
                </Button>
                <Button variant="outline" className="rounded-2xl bg-transparent">
                  <Database className="w-4 h-4 mr-2" />
                  Sao lưu dữ liệu
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
