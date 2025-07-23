import { ArticleCard } from "@/components/articles/article-card"
import { getArticles } from "@/lib/api"
import type { Article } from "@/lib/types"

export default async function ArticlesPage() {
  const articles = await getArticles()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">All Articles</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article: Article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}
