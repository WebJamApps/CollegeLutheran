import { test, expect } from '@playwright/test';

// Regression guard for CollegeLutheran#711 (dark-mode header on phones):
// the theme selector must stay visible alongside the hamburger and must NOT
// overlap the subtitle text. Mobile-only; needs the dark-mode feature served
// (run against a local dev/preview via BASE_URL until it ships to production).
test.use({ ignoreHTTPSErrors: true });

test.describe('mobile dark-mode header (#711)', () => {
  test('hamburger + theme selector show and the selector does not overlap the subtitle', async ({ page }) => {
    test.skip(test.info().project.name !== 'mobile', 'phone-layout test (mobile project only)');
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('clc-theme-preference', 'dark'));
    await page.reload();

    const hamburger = page.locator('#mobilemenutoggle');
    const selector = page.locator('.theme-mode-selector');
    const subtitle = page.locator('.subTitle');

    await expect(hamburger).toBeVisible();
    await expect(selector).toBeVisible();

    const sel = await selector.boundingBox();
    const sub = await subtitle.boundingBox();
    expect(sel, 'theme selector should render').not.toBeNull();
    expect(sub, 'subtitle should render').not.toBeNull();

    const overlaps = sel!.x < sub!.x + sub!.width
      && sel!.x + sel!.width > sub!.x
      && sel!.y < sub!.y + sub!.height
      && sel!.y + sel!.height > sub!.y;
    expect(overlaps, 'theme selector must not overlap the subtitle text').toBe(false);
  });

  test('subtitle stays inside the header (no overflow) on a narrow 320px phone', async ({ page }) => {
    test.skip(test.info().project.name !== 'mobile', 'phone-layout test (mobile project only)');
    await page.setViewportSize({ width: 320, height: 740 });
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('clc-theme-preference', 'dark'));
    await page.reload();

    const header = await page.locator('.home-header').boundingBox();
    const subtitle = await page.locator('.subTitle').boundingBox();
    expect(header, 'header should render').not.toBeNull();
    expect(subtitle, 'subtitle should render').not.toBeNull();

    expect(
      subtitle!.y + subtitle!.height,
      'subtitle must not spill below the header',
    ).toBeLessThanOrEqual(header!.y + header!.height + 1);
  });
});
