"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-healthcare-primary/10 to-healthcare-secondary/10 flex items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại</span>
        </Button>
      </div>

      <Card className="w-full max-w-md border-0 shadow-2xl rounded-3xl bg-white">
        <CardHeader className="text-center pb-2">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-healthcare-primary rounded-2xl flex items-center justify-center">
              <span className="text-white text-2xl font-bold">M</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">MedSocial</CardTitle>
          </div>
          <p className="text-gray-600">Đăng nhập vào tài khoản của bạn</p>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email hoặc số điện thoại"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-2xl border-gray-200 focus-visible:ring-healthcare-primary shadow-sm focus:shadow-md transition-all duration-200"
                  required
                />
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-2xl border-gray-200 focus-visible:ring-healthcare-primary pr-12"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-healthcare-primary hover:bg-healthcare-primary/90 text-white rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
            >
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>

            <div className="text-center">
              <Button variant="link" className="text-healthcare-secondary hover:text-healthcare-secondary/80">
                Quên mật khẩu?
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Hoặc</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 rounded-2xl border-gray-200 hover:bg-gray-50 bg-transparent shadow-md hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
                <span>Tiếp tục với Google</span>
              </div>
            </Button>

            <div className="text-center pt-4">
              <p className="text-gray-600">
                Chưa có tài khoản?{" "}
                <Button
                  variant="link"
                  onClick={() => router.push("/register")}
                  className="p-0 h-auto text-healthcare-primary hover:text-healthcare-primary/80 font-semibold"
                >
                  Đăng ký ngay
                </Button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
