import type { Article } from './types';
import type { LoginCredentials, SignupCredentials } from './types';
import axiosClient from './axios';

export async function getArticles(): Promise<Article[]> {
  const response = await axiosClient.get('articles');
  if (!response.data.success) {
    throw new Error('Failed to fetch articles');
  }
  const data = response.data.data;

  return data;
}

export async function getMyArticles(): Promise<Article[]> {
  const response = await axiosClient.get('articles/my-articles');
  if (!response.data.success) {
    throw new Error('Failed to fetch articles');
  }
  const data = response.data.data;
  return data;
}

export async function getArticleById(id: string): Promise<Article | undefined> {
  const response = await axiosClient.get(`articles/${id}`);
  if (!response.data.success) {
    throw new Error('Failed to fetch article');
  }
  const data = response.data.data;
  return data;
}

export async function createArticle(article: Partial<Article>): Promise<Article | undefined> {
  const response = await axiosClient.post('articles', article);
  if (!response.data.success) {
    throw new Error('Failed to create article');
  }
  const data = response.data.data;
  return data;
}

export async function updateArticle({
  id,
  article,
}: {
  id: string;
  article: Partial<Article>;
}): Promise<Article | undefined> {
  const response = await axiosClient.patch(`articles/${id}`, article);
  if (!response.data.success) {
    throw new Error('Failed to update article');
  }
  const data = response.data.data;
  return data;
}

export async function deleteArticle(id: string): Promise<Article | undefined> {
  const response = await axiosClient.delete(`articles/${id}`);
  if (!response.data.success) {
    throw new Error('Failed to delete article');
  }
  const data = response.data.data;
  return data;
}

export async function loginUser(credentials: LoginCredentials) {
  const response = await axiosClient.post('auth/login', credentials);
  if (!response.data.success) {
    throw new Error(response.data.message || 'Login failed');
  }
  return response.data.data;
}

export async function signupUser(credentials: SignupCredentials) {
  const response = await axiosClient.post('users', credentials);
  if (!response.data.success) {
    throw new Error(response.data.message || 'Signup failed');
  }
  return response.data.data;
}

export async function fetchSummary(articleId: string) {
  const response = await axiosClient.get(`articles/summarize/${articleId}`);
  if (!response.data.success) {
    throw new Error('Failed to fetch summary');
  }
  const data = response.data.data.result;
  return data;
}

export async function parseArticle(articleLink: string) {
  const response = await axiosClient.post(`articles/parse-from-link`, {
    articleLink,
  });
  if (!response.data.success) {
    throw new Error('Failed to parse article');
  }
  const data = response.data.data;
  return data;
}
