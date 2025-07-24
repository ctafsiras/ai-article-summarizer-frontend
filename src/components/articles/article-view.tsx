"use client"

import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useSummarize } from "@/hooks/use-articles"
import type { Article } from "@/lib/types"
import { ArrowLeft, Loader2, Sparkles } from "lucide-react"

export function ArticleView({ article }: { article: Article }) {
  const { summarize, summary, isSummarizing, error } = useSummarize(article.id)
  const router = useRouter()

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Button variant="outline" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" />Back
      </Button>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{article.title}</h1>
        {/* <p className="text-lg text-muted-foreground">{article.author}</p> */}
      </div>

      <div className="mt-8">
        <Button onClick={() => summarize()} disabled={isSummarizing}>
          {isSummarizing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
          {isSummarizing ? "Generating..." : "Summarize this article"}
        </Button>

        {isSummarizing && (
          <p className="mt-4 text-muted-foreground">Our AI is reading the article and preparing your summary...</p>
        )}

        {error && <p className="mt-4 text-red-500">Sorry, we couldn&apos;t generate a summary. Please try again.</p>}

        {summary && (
          <Card className="mt-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <CardContent className="p-6">
              <p className="text-muted-foreground">{summary}</p>
            </CardContent>
          </Card>
        )}
      </div>
      <div className="prose prose-lg dark:prose-invert mt-8 max-w-none">
        <p>{article.body}</p>
      </div>

    </div>
  )
}
