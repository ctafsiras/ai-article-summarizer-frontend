import { test, expect } from '@playwright/test';

test('homepage has correct title', async ({ page }) => {
  await page.goto('http://localhost:3000/articles');
  await expect(page).toHaveTitle(/Article Summarizer/i);
});
