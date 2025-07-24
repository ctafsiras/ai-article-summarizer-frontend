"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { PlusCircle, Search, Filter, Eye, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { getMyArticles } from "@/lib/api"
import { Article } from "@/lib/types"
import { ArticleModal } from "@/components/dashboard/article-modal"
import { ViewArticleDialog } from "@/components/dashboard/view-article-dialog"
import { DeleteConfirmDialog } from "@/components/dashboard/delete-confirm-dialog"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { accessToken } = useAuth()
  const router = useRouter()
  if (!accessToken) {
    router.push("/login")
  }
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null)

  const { data: articles, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: getMyArticles,
  })

  // Get all unique tags from articles
  const allTags = articles ? [...new Set(articles.flatMap((article) => article.tags))] : []

  // Filter articles based on search query and selected tags
  const filteredArticles = articles
    ? articles.filter((article) => {
      const matchesSearch =
        searchQuery === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.body.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => article.tags.includes(tag))

      return matchesSearch && matchesTags
    })
    : []

  const handleOpenViewDialog = (article: Article) => {
    setCurrentArticle(article)
    setIsViewDialogOpen(true)
  }

  const handleOpenEditModal = (article: Article) => {
    setCurrentArticle(article)
    setIsEditModalOpen(true)
  }

  const handleOpenDeleteDialog = (article: Article) => {
    setCurrentArticle(article)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Articles Dashboard</h1>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Article
          </Button>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles by title or content..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto bg-transparent">
                <Filter className="mr-2 h-4 w-4" />
                Filter by Tags
                {selectedTags.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedTags.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {allTags.map((tag) => (
                <DropdownMenuCheckboxItem
                  key={tag}
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedTags([...selectedTags, tag])
                    } else {
                      setSelectedTags(selectedTags.filter((t) => t !== tag))
                    }
                  }}
                >
                  {tag}
                </DropdownMenuCheckboxItem>
              ))}
              {allTags.length === 0 && <div className="px-2 py-1.5 text-sm text-muted-foreground">No tags found</div>}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Title</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-6 w-[250px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-[150px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-[100px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-[100px] ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredArticles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No articles found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredArticles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {article.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(article.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost" onClick={() => handleOpenViewDialog(article)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => handleOpenEditModal(article)}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleOpenDeleteDialog(article)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <ArticleModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} mode="create" />

      {currentArticle && (
        <>
          <ArticleModal open={isEditModalOpen} onOpenChange={setIsEditModalOpen} mode="edit" article={currentArticle} />

          <ViewArticleDialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen} article={currentArticle} />

          <DeleteConfirmDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            articleId={currentArticle.id}
            articleTitle={currentArticle.title}
          />
        </>
      )}
    </div>
  )
}
