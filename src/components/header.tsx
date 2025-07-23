import Link from "next/link"
import { Button } from "./ui/button"
import { BookOpen, LogIn } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/articles" className="mr-6 flex items-center space-x-2">
          <BookOpen className="h-6 w-6" />
          <span className="font-bold">AI Article Summarizer</span>
        </Link>
        <nav className="flex flex-1 items-center space-x-4">
          <Link
            href="/articles"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Articles
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          <Button asChild variant="ghost">
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
