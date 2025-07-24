import { test, expect } from '@playwright/test';

test('homepage has correct title', async ({ page }) => {
  await page.goto('http://localhost:3000/articles');
  await expect(page).toHaveTitle(/Article Summarizer/i);
});

test('login page renders and has form', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await expect(page.getByText('Welcome Back')).toBeVisible();
  await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /log in|sign in|login/i })).toBeVisible();
});

test('signup page renders and has form', async ({ page }) => {
  await page.goto('http://localhost:3000/signup');
  await expect(page.getByText('Create an Account')).toBeVisible();
  await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /sign up|register|create/i })).toBeVisible();
});
