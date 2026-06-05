import { test, expect } from '@playwright/test';

// Smoke test for the homepage. Runs on both a desktop and a mobile viewport
// (see playwright.config.ts projects) so it guards the recent Maria-review
// fixes: the calendar/Facebook mobile overflow and the duplicate Facebook feed.
// The Facebook page plugin loads slowly and unreliably in CI, so we wait for
// the DOM, not full network idle, and assert on structure rather than its
// cross-origin contents.

test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
});

test('renders the homepage with its key sections', async ({ page }) => {
  await expect(page).toHaveTitle(/College Lutheran/i);
  await expect(page.getByText('College Lutheran Church is located', { exact: false })).toBeVisible();

  // The events calendar embed is always present.
  await expect(page.locator('iframe[src*="calendar.google.com"]').first()).toBeAttached();
});

test('shows exactly one Facebook feed (no duplicated embed)', async ({ page }) => {
  // Only one embed renders per viewport (wide OR narrow). Two would mean a
  // duplicated Facebook section is back.
  const feeds = page.locator('iframe[src*="plugins/page.php"]');
  await expect(feeds).toHaveCount(1);
});

test('has no horizontal overflow', async ({ page }) => {
  // Guards the mobile calendar/Facebook/giving overflow Maria reported.
  const overflow = await page.evaluate(() => {
    const el = document.scrollingElement || document.documentElement;
    return el.scrollWidth - el.clientWidth;
  });
  expect(overflow, `unexpected horizontal overflow of ${overflow}px`).toBeLessThanOrEqual(2);
});
