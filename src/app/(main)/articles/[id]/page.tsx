import { ArticleView } from "@/components/articles/article-view"
import { getArticleById } from "@/lib/api"
import { notFound } from "next/navigation"

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const article = await getArticleById(id)

  if (!article) {
    notFound()
  }

  return <ArticleView article={article} />
}
