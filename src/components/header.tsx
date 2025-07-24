"use client"

import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"
import { Button } from "./ui/button"
import { BookOpen, LogIn, LogOut } from "lucide-react"

export function Header() {
  const { accessToken, logout } = useAuth()
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-5xl mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/articles" className="flex items-center gap-2 pl-2">
          <BookOpen className="h-6 w-6" />
          <span className="font-bold text-base sm:text-lg">Article Summarizer</span>
        </Link>
        <nav className="hidden sm:flex items-center">
          <Link
            href="/articles"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Articles
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          {accessToken ? (
            <Button onClick={logout} variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Log Out</span>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">
                  <span className="hidden sm:inline">Sign Up</span>
                  <span className="sm:hidden">Sign</span>
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
      {/* Mobile nav */}
      <nav className="flex sm:hidden justify-center border-t bg-background/95 py-2">
        <Link
          href="/articles"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Articles
        </Link>
      </nav>
    </header>
  )
}
