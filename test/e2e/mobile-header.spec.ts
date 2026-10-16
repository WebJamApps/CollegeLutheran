import { test, expect } from '@playwright/test';

// Regression guard for CollegeLutheran#711 and #832:
// the theme selector is in the side nav drawer above the version number,
// while the header on mobile shows the hamburger without cramping the subtitle text.
test.use({ ignoreHTTPSErrors: true });

test.describe('mobile dark-mode header (#711, #832)', () => {
  test('hamburger shows on header and theme selector shows in side nav drawer above version', async ({ page }) => {
    test.skip(test.info().project.name !== 'mobile', 'phone-layout test (mobile project only)');
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('clc-theme-preference', 'dark'));
    await page.reload();

    const hamburger = page.locator('#mobilemenutoggle');
    await expect(hamburger).toBeVisible();

    // Theme selector has moved from header to side nav drawer (#832)
    await hamburger.click();
    const selector = page.locator('.theme-mode-selector');
    await expect(selector).toBeVisible();

    const version = page.getByText(/Version/i);
    await expect(version).toBeVisible();
    const sel = await selector.boundingBox();
    const ver = await version.boundingBox();
    expect(sel, 'theme selector should render').not.toBeNull();
    expect(ver, 'version should render').not.toBeNull();
    expect(sel!.y + sel!.height).toBeLessThanOrEqual(ver!.y);
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
