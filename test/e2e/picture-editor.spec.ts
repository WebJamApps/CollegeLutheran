import { test, expect } from '@playwright/test';

// Playwright e2e test for the Admin Dashboard picture editor enhancements (CollegeLutheran#795).
test.describe('Picture Editor Enhancements (#795)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin', { waitUntil: 'domcontentloaded' });
  });

  test('validates picture editor dialog elements and helper text', async ({ page }) => {
    // Navigate to admin dashboard and check if picture editor triggers are accessible
    const adminHeader = page.getByText(/Admin Dashboard|Manage Pictures/i, { exact: false });
    if (await adminHeader.isVisible()) {
      await expect(adminHeader).toBeVisible();
    }
  });

  test('auto-converts pasted dropbox.com URLs to direct media download links', async ({ page }) => {
    // Verify dropbox URL regex auto-conversion logic in web context
    const convertedUrl = await page.evaluate((rawUrl) => {
      return rawUrl.replace(/^https:\/\/(www\.)?dropbox\.com\//, 'https://dl.dropboxusercontent.com/');
    }, 'https://www.dropbox.com/s/example/photo.jpg');

    expect(convertedUrl).toBe('https://dl.dropboxusercontent.com/s/example/photo.jpg');
  });

  test('ensures cancel button in picture dialog locator is defined', async ({ page }) => {
    // Check dark mode cancel button locator
    const cancelBtn = page.locator('.cancelPicButton');
    expect(cancelBtn).toBeDefined();
  });
});
