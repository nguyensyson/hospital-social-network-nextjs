"use client"

import type React from "react"

import { useState, useRef } from "react"
import { X, ImageIcon, Video, Smile, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface CreatePostModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreatePostModal({ open, onOpenChange }: CreatePostModalProps) {
  const [postContent, setPostContent] = useState("")
  const [selectedImages, setSelectedImages] = useState<string[]>([])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages: string[] = []
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string)
            if (newImages.length === files.length) {
              setSelectedImages((prev) => [...prev, ...newImages])
            }
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handlePost = () => {
    // Handle post creation logic here
    console.log("Creating post:", postContent)
    setPostContent("")
    setSelectedImages([])
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl border-0 rounded-3xl p-0 shadow-2xl bg-white">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Tạo bài viết mới</DialogTitle>
          </div>
        </DialogHeader>

        <div className="p-6 pt-4">
          <div className="flex space-x-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/placeholder.svg?height=48&width=48" />
              <AvatarFallback className="bg-healthcare-primary text-white">U</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="mb-4">
                <p className="font-semibold text-gray-900 mb-1">BS. Nguyễn Văn Minh</p>
                <p className="text-sm text-gray-500">Đăng công khai</p>
              </div>

              <Textarea
                placeholder="Chia sẻ kiến thức y khoa, kinh nghiệm hoặc câu chuyện của bạn..."
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="border-0 resize-none text-lg placeholder:text-gray-400 focus-visible:ring-0 p-0 min-h-[120px]"
              />

              {selectedImages.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative rounded-2xl overflow-hidden">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Selected ${index + 1}`}
                        className="w-full h-32 object-cover"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1"
                        onClick={() => setSelectedImages((prev) => prev.filter((_, i) => i !== index))}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleImageSelect}
                    className="text-healthcare-secondary hover:bg-healthcare-secondary/10 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <ImageIcon className="w-5 h-5 mr-2" />
                    Ảnh
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-healthcare-secondary hover:bg-healthcare-secondary/10 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <Video className="w-5 h-5 mr-2" />
                    Video
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-healthcare-secondary hover:bg-healthcare-secondary/10 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <Smile className="w-5 h-5 mr-2" />
                    Cảm xúc
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-healthcare-secondary hover:bg-healthcare-secondary/10 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    Vị trí
                  </Button>
                </div>

                <Button
                  onClick={handlePost}
                  disabled={!postContent.trim()}
                  className="bg-healthcare-primary hover:bg-healthcare-primary/90 text-white rounded-2xl px-8 disabled:opacity-50 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Đăng bài
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
