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

// Mobile-only assertions. The Homepage swaps layouts at 900px
// (src/containers/Homepage/index.tsx): the narrow phone layout has its own
// calendar + Facebook column (titles clc-calendar / clc-facebook) while the
// wide desktop layout uses a two-column row (titles google-calendar /
// "facebook ticker", header id #wideFacebook). These tests guard that a phone
// actually gets the narrow layout and never the desktop one.
test.describe('mobile layout', () => {
  test.beforeEach(({ page: _page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile', 'mobile viewport only');
  });

  test('renders the narrow phone layout, not the wide desktop one', async ({ page }) => {
    await expect(page.locator('iframe[title="clc-facebook"]')).toBeAttached();
    await expect(page.locator('iframe[title="clc-calendar"]')).toBeAttached();
    // The desktop two-column layout must not leak onto a phone.
    await expect(page.locator('iframe[title="facebook ticker"]')).toHaveCount(0);
    await expect(page.locator('iframe[title="google-calendar"]')).toHaveCount(0);
    await expect(page.locator('#wideFacebook')).toHaveCount(0);
  });

  test('the Facebook and calendar embeds fit within the viewport width', async ({ page }) => {
    // Each embed (and its cropping wrapper) must stay inside the screen so the
    // phone layout never forces a horizontal scroll.
    const viewport = page.viewportSize();
    const width = viewport?.width ?? 0;
    for (const title of ['clc-facebook', 'clc-calendar']) {
      const box = await page.locator(`iframe[title="${title}"]`).boundingBox();
      const right = box ? box.x + box.width : Number.NaN;
      expect(right, `${title} iframe overflows the ${width}px viewport`).toBeLessThanOrEqual(width + 2);
    }
  });
});
