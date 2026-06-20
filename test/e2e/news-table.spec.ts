import { test, expect } from '@playwright/test';

// Real-API integration test for the News table. In CI the frontend is built with
// BackendUrl pointing at a live web-jam-back running on the test MongoDB, which
// has been seeded with several "Forum" rows (test/e2e/seed-news.mjs). Here we
// assert those real rows render in the table and that the table fits the
// viewport (no horizontal overflow) on both desktop and mobile — exercising the
// scrolling/overflow behaviour with a full table.
//
// Only runs in the seeded integration context (E2E_SEEDED=1). Skipped for plain
// runs against prod/other backends, which won't have the seeded rows.

// This run's first seeded title. Must match seededTitle() in seed-news.mjs — the
// per-run E2E_SEED_TAG isolates this build from concurrent ones sharing the test
// DB. Defaults to the `local` tag for manual runs.
const TAG = process.env.E2E_SEED_TAG || 'local';
const firstSeededTitle = `E2E ${TAG} News Item 01`;

test.describe('News table (real API + seeded test DB)', () => {
  test.skip(process.env.E2E_SEEDED !== '1', 'requires the seeded test-DB backend (CI e2e job)');

  test.beforeEach(async ({ page }) => {
    await page.goto('/news', { waitUntil: 'domcontentloaded' });
  });

  test('renders seeded news rows from the API', async ({ page }) => {
    // A specific seeded row proves the data round-tripped through the real API.
    await expect(page.getByRole('link', { name: firstSeededTitle })).toBeVisible({ timeout: 15_000 });
    const rows = page.locator('table.newsTable tbody tr');
    expect(await rows.count()).toBeGreaterThanOrEqual(10);
  });

  test('the news table does not overflow the viewport', async ({ page }) => {
    await expect(page.getByRole('link', { name: firstSeededTitle })).toBeVisible({ timeout: 15_000 });
    const overflow = await page.evaluate(() => {
      const el = document.scrollingElement || document.documentElement;
      return el.scrollWidth - el.clientWidth;
    });
    expect(overflow, `unexpected horizontal overflow of ${overflow}px`).toBeLessThanOrEqual(2);
  });
});
