"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { X, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

import { createArticle, parseArticle, updateArticle } from "@/lib/api"
import { Article } from "@/lib/types"
import { toast } from "sonner"



interface ArticleModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    mode: "create" | "edit"
    article?: Article
}

export function ArticleModal({ open, onOpenChange, mode, article }: ArticleModalProps) {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [articleLink, setArticleLink] = useState("")
    const [tagInput, setTagInput] = useState("")
    const [tags, setTags] = useState<string[]>([])
    const queryClient = useQueryClient()

    useEffect(() => {
        if (mode === "edit" && article) {
            setTitle(article.title)
            setBody(article.body)
            setTags(article.tags)
        } else {
            resetForm()
        }
    }, [mode, article, open])

    const resetForm = () => {
        setTitle("")
        setBody("")
        setTagInput("")
        setTags([])
        setArticleLink("")
    }

    const createMutation = useMutation({
        mutationFn: createArticle,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["articles"] })
            toast("Article created", {
                description: "Your article has been created successfully.",
            })
            onOpenChange(false)
            resetForm()
        },
        onError: () => {
            toast("Error", {
                description: "Failed to create article. Please try again.",
            })
        },
    })

    const updateMutation = useMutation({
        mutationFn: updateArticle,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["articles"] })
            toast("Article updated", {
                description: "Your article has been updated successfully.",
            })
            onOpenChange(false)
        },
        onError: () => {
            toast("Error", {
                description: "Failed to update article. Please try again.",
            })
        },
    })

    const parseArticleMutation = useMutation({
        mutationFn: parseArticle,
        onSuccess: (data) => {
            toast("Article parsed", {
                description: "Your article has been parsed successfully.",
            })
            setBody(data.body)
            setTitle(data.title)
            setTags(data.tags)
        },
        onError: () => {
            toast("Error", {
                description: "Failed to parse article. Please try again.",
            })
        },
    })

    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()])
            setTagInput("")
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!title.trim() || !body.trim()) {
            toast("Validation error", {
                description: "Title and body are required.",
            })
            return
        }

        const articleData = {
            title,
            body,
            tags,
        }

        if (mode === "create") {
            createMutation.mutate(articleData)
        } else if (mode === "edit" && article) {
            updateMutation.mutate({
                id: article.id,
                article: articleData,
            })
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && tagInput) {
            e.preventDefault()
            handleAddTag()
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{mode === "create" ? "Create Article" : "Edit Article"}</DialogTitle>
                        <DialogDescription>
                            {mode === "create" ? "Add a new article to your collection." : "Make changes to your article here."}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {
                            mode === "create" && (
                                <div className="grid gap-2">
                                    <Label htmlFor="articleLink">Article Link (Optional)</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="articleLink"
                                            value={articleLink}
                                            onChange={(e) => setArticleLink(e.target.value)}
                                            placeholder="Enter article link"
                                        />
                                        <Button
                                            type="button"
                                            onClick={() => parseArticleMutation.mutate(articleLink)}
                                        >
                                            Parse Article
                                        </Button>
                                    </div>
                                </div>
                            )}
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter article title"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="body">Body</Label>
                            <Textarea
                                id="body"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                placeholder="Enter article content"
                                className="min-h-[150px]"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="tags">Tags</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="tags"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Add a tag and press Enter"
                                />
                                <Button type="button" variant="outline" size="icon" onClick={handleAddTag}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="gap-1">
                                        {tag}
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-4 w-4 p-0 hover:bg-transparent"
                                            onClick={() => handleRemoveTag(tag)}
                                        >
                                            <X className="h-3 w-3" />
                                            <span className="sr-only">Remove {tag} tag</span>
                                        </Button>
                                    </Badge>
                                ))}
                                {tags.length === 0 && <span className="text-sm text-muted-foreground">No tags added yet</span>}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                            {createMutation.isPending || updateMutation.isPending
                                ? "Saving..."
                                : mode === "create"
                                    ? "Create Article"
                                    : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
