import type { Article } from "./types";

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

export async function createArticle(
  article: Partial<Article>
): Promise<Article | undefined> {
  const response = await fetch(`http://localhost:5000/api/v1/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(article),
  });
  if (!response.ok) {
    throw new Error("Failed to create article");
  }
  const data = await response.json();
  return data.data;
}

export async function updateArticle(
  article: Partial<Article>
): Promise<Article | undefined> {
  const response = await fetch(
    `http://localhost:5000/api/v1/articles/${article.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(article),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update article");
  }
  const data = await response.json();
  return data.data;
}

export async function deleteArticle(id: string): Promise<Article | undefined> {
  const response = await fetch(`http://localhost:5000/api/v1/articles/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete article");
  }
  const data = await response.json();
  return data.data;
}
