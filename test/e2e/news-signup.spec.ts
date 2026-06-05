import { test, expect } from '@playwright/test';

// Guards the News-page email sign-up. There is no working online form: the old
// Constant Contact inline-form widget never rendered (Firefox blocked the script,
// it raced the SPA mount, and there is no usable hosted form/URL), so the page
// just asks people to contact the church office. Runs on desktop + mobile (see
// playwright.config.ts projects).

test('shows the contact-the-office email sign-up info', async ({ page }) => {
  await page.goto('/news', { waitUntil: 'domcontentloaded' });

  const info = page.locator('.signup-info');
  await expect(info).toBeVisible();
  await expect(info).toContainText(/contact the church office/i);
  await expect(info).toContainText('Sandi Roop');
  await expect(info.getByRole('link', { name: 'office1@collegelutheran.org' })).toBeVisible();
  await expect(info.getByRole('link', { name: '(540) 389-4963' })).toBeVisible();

  // The retired Constant Contact widget and its old reload button must be gone.
  await expect(page.locator('.ctct-inline-form')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Sign Up for Emails' })).toHaveCount(0);
});
