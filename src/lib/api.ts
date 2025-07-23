import type { Article } from "./types";

// Mock data - in a real app, this would come from a database or CMS
const articles: Article[] = [
  {
    id: "1",
    title: "The Future of Server-Side Rendering",
    body: "Server-Side Rendering (SSR) has seen a resurgence in recent years, thanks to frameworks like Next.js. By rendering pages on the server, applications can deliver faster initial load times, improved SEO, and a better user experience. This article explores the evolution of SSR, its benefits and drawbacks, and how modern tools are making it more accessible than ever. We'll dive into concepts like hydration, streaming, and partial pre-rendering, showing how they address common SSR challenges. The future looks bright, with server components and edge computing pushing the boundaries of what's possible.",
    tags: ["Next.js", "Web Dev", "SSR"],
    author: "Jane Dev",
  },
  {
    id: "2",
    title: "A Deep Dive into React Hooks",
    body: "React Hooks revolutionized how we write components, allowing us to use state and other React features without writing a class. This guide provides a comprehensive look at the most essential hooks, including useState, useEffect, useContext, and useReducer. We'll cover best practices, common pitfalls, and advanced patterns for creating custom hooks. By the end, you'll have a solid understanding of how to leverage hooks to write cleaner, more maintainable, and more powerful React applications. This is a fundamental skill for any modern React developer.",
    tags: ["React", "JavaScript", "Frontend"],
    author: "John Coder",
  },
  {
    id: "3",
    title: "Mastering TypeScript for Large-Scale Apps",
    body: "TypeScript adds a powerful type system on top of JavaScript, enabling developers to catch errors early and build more robust, scalable applications. This article is for developers who want to go beyond the basics. We'll cover advanced types, generics, decorators, and how to configure tsconfig.json for optimal performance and safety. We'll also discuss strategies for migrating a large JavaScript codebase to TypeScript and how to integrate it with popular libraries and frameworks. Adopting TypeScript is a strategic move for any team serious about code quality.",
    tags: ["TypeScript", "Best Practices", "Architecture"],
    author: "Alex Engineer",
  },
];

// Simulate network delay
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function getArticles(): Promise<Article[]> {
  const response = await fetch("http://localhost:5000/api/v1/articles");
  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }
  const data = await response.json();

  return data.data;
}

export async function getArticleById(id: string): Promise<Article | undefined> {
  const response = await fetch(`http://localhost:5000/api/v1/articles/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch article");
  }
  const data = await response.json();
  return data.data;
}
