import { ArticleView } from "@/components/articles/article-view"
import { getArticleById } from "@/lib/api"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = await getArticleById(id)
  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    }
  }
  return {
    title: article.title,
    description: article.body.slice(0, 150) + (article.body.length > 150 ? "..." : ""),
  }
}


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
