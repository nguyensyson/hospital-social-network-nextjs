import { MainLayout } from "@/components/layout/main-layout"
import { PostDetailPage } from "@/components/pages/post-detail-page"

interface PostPageProps {
  params: {
    id: string
  }
}

export default function PostPage({ params }: PostPageProps) {
  return (
    <MainLayout>
      <PostDetailPage />
    </MainLayout>
  )
}
