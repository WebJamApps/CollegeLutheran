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

test('shows exactly one Facebook section (no duplicated embed)', async ({ page }) => {
  // The feed is now cards from web-jam-back's /facebook/feed (CollegeLutheran#740),
  // not the page-plugin iframe, and the card list only renders when the backend
  // has posts. The always-present "Like Us On Facebook" header (id wideFacebook
  // on desktop, narrowFacebook on mobile) marks the section; exactly one renders
  // per viewport. Two would mean a duplicated Facebook section is back.
  const headers = page.locator('#wideFacebook, #narrowFacebook');
  await expect(headers).toHaveCount(1);
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
// calendar iframe (title clc-calendar) + Facebook feed (testid narrow-fb-feed)
// while the wide desktop layout uses a two-column row (title google-calendar,
// feed testid wide-fb-feed, header id #wideFacebook). These tests guard that a
// phone actually gets the narrow layout and never the desktop one.
test.describe('mobile layout', () => {
  test.beforeEach(({ page: _page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile', 'mobile viewport only');
  });

  test('renders the narrow phone layout, not the wide desktop one', async ({ page }) => {
    await expect(page.locator('#narrowFacebook')).toBeAttached();
    await expect(page.locator('iframe[title="clc-calendar"]')).toBeAttached();
    // The desktop two-column layout must not leak onto a phone.
    await expect(page.locator('iframe[title="google-calendar"]')).toHaveCount(0);
    await expect(page.locator('#wideFacebook')).toHaveCount(0);
  });

  test('the Facebook and calendar sections fit within the viewport width', async ({ page }) => {
    // The feed section and calendar must stay inside the screen so the phone
    // layout never forces a horizontal scroll.
    const viewport = page.viewportSize();
    const width = viewport?.width ?? 0;
    const targets = [
      { label: 'narrow Facebook header', locator: page.locator('#narrowFacebook') },
      { label: 'clc-calendar iframe', locator: page.locator('iframe[title="clc-calendar"]') },
    ];
    for (const { label, locator } of targets) {
      const box = await locator.boundingBox();
      const right = box ? box.x + box.width : Number.NaN;
      expect(right, `${label} overflows the ${width}px viewport`).toBeLessThanOrEqual(width + 2);
    }
  });
});
