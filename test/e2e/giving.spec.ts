import { test, expect } from '@playwright/test';

// Regression tests for the Giving page. Runs on both desktop and mobile
// (see playwright.config.ts projects). Guards the bug Maria reported on her
// phone: the Breeze give form iframe was pinned to a fixed 800px width in CSS
// (.giving-iframe in styles.scss), so on a ~393px phone it rendered 800px wide
// and got clipped to a centered slice — the form ran off both edges and was
// unusable. The fix makes the iframe fluid (width:100%, max-width:800px), so it
// fills the phone viewport and caps at 800px on desktop. The Breeze form is a
// cross-origin iframe, so we assert on its box/fit, not its contents.

test.beforeEach(async ({ page }) => {
  await page.goto('/giving', { waitUntil: 'domcontentloaded' });
});

test('renders the Giving page with its heading and the Breeze form', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Giving' })).toBeVisible();
  // The Breeze give form embed is always present.
  await expect(page.locator('iframe.giving-iframe')).toBeAttached();
  await expect(page.locator('iframe[src*="breezechms.com"]')).toBeAttached();
});

test('has no horizontal overflow', async ({ page }) => {
  // The clipped 800px iframe used to push content off-screen on a phone.
  const overflow = await page.evaluate(() => {
    const el = document.scrollingElement || document.documentElement;
    return el.scrollWidth - el.clientWidth;
  });
  expect(overflow, `unexpected horizontal overflow of ${overflow}px`).toBeLessThanOrEqual(2);
});

test('the give form iframe fits within the viewport width', async ({ page }) => {
  // Core regression guard: the iframe must never be wider than the screen, and
  // its right edge must stay inside the viewport (it used to start at a negative
  // x and overflow on the right, clipping the form on both sides).
  const viewport = page.viewportSize();
  const width = viewport?.width ?? 0;
  const box = await page.locator('iframe.giving-iframe').boundingBox();
  expect(box, 'giving iframe has no layout box').not.toBeNull();
  const left = box?.x ?? Number.NaN;
  const right = box ? box.x + box.width : Number.NaN;
  expect(left, 'giving iframe starts off the left edge').toBeGreaterThanOrEqual(-2);
  expect(right, `giving iframe (width ${Math.round(box?.width ?? 0)}) overflows the ${width}px viewport`)
    .toBeLessThanOrEqual(width + 2);
});
