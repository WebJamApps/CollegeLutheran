import { test, expect } from '@playwright/test';

test.use({ ignoreHTTPSErrors: true });

test.beforeEach(async ({ page }) => {
  await page.route(/\/book\/one\?type=headerLineContent(?:&|$)/, (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({
      title: 'Worship Service Every Sunday at 10 am',
      type: 'headerLineContent',
      _id: 'header-line-test',
    }),
  }));
  await page.goto('/', { waitUntil: 'domcontentloaded' });
});

test('shows the header line in gold on the wide header row', async ({ page }) => {
  test.skip(test.info().project.name !== 'desktop', 'wide-header test (desktop project only)');

  const line = page.locator('.header-line');
  await expect(line).toHaveText('Worship Service Every Sunday at 10 am');
  const subtitle = await page.locator('.subTitle').boundingBox();
  const lineBox = await line.boundingBox();
  expect(subtitle).not.toBeNull();
  expect(lineBox).not.toBeNull();
  expect(lineBox!.y + lineBox!.height).toBeLessThan(subtitle!.y);
  await expect(line).toHaveCSS('font-weight', '700');
  await expect(line).toHaveCSS('color', 'rgb(244, 192, 14)');
  await expect(line).toHaveCSS('font-size', '15px');
  await expect(page.locator('.subTitle')).toHaveCSS('font-style', 'italic');
  await expect(page.locator('.subTitle')).toHaveCSS('font-size', '16px');
});

test('moves a longer line under the subtitle before a shorter line at the same desktop width', async ({ page }) => {
  test.skip(test.info().project.name !== 'desktop', 'wide-header test (desktop project only)');
  await page.setViewportSize({ width: 900, height: 720 });
  await page.unroute(/\/book\/one\?type=headerLineContent(?:&|$)/);
  await page.route(/\/book\/one\?type=headerLineContent(?:&|$)/, (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ title: 'W'.repeat(80), type: 'headerLineContent', _id: 'long-header-line' }),
  }));
  await page.reload({ waitUntil: 'domcontentloaded' });

  const subtitle = await page.locator('.subTitle').boundingBox();
  const lineBox = await page.locator('.header-line').boundingBox();
  expect(subtitle).not.toBeNull();
  expect(lineBox).not.toBeNull();
  expect(lineBox!.y).toBeGreaterThanOrEqual(subtitle!.y + subtitle!.height);

  await page.unroute(/\/book\/one\?type=headerLineContent(?:&|$)/);
  await page.route(/\/book\/one\?type=headerLineContent(?:&|$)/, (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({
      title: 'Worship Service Every Sunday at 10 am',
      type: 'headerLineContent',
      _id: 'short-header-line',
    }),
  }));
  await page.reload({ waitUntil: 'domcontentloaded' });
  const shortSubtitle = await page.locator('.subTitle').boundingBox();
  const shortLine = await page.locator('.header-line').boundingBox();
  expect(shortSubtitle).not.toBeNull();
  expect(shortLine).not.toBeNull();
  expect(shortLine!.y + shortLine!.height).toBeLessThan(shortSubtitle!.y);
});

test('places the header line after the subtitle on phones', async ({ page }) => {
  test.skip(test.info().project.name !== 'mobile', 'phone-header test (mobile project only)');

  const subtitle = await page.locator('.subTitle').boundingBox();
  const line = page.locator('.header-line');
  const lineBox = await line.boundingBox();
  expect(subtitle).not.toBeNull();
  expect(lineBox).not.toBeNull();
  expect(lineBox!.y).toBeGreaterThanOrEqual(subtitle!.y + subtitle!.height);
  await expect(page.locator('.subTitle')).toHaveCSS('font-size', '13px');
  await expect(line).toHaveCSS('font-size', '12px');
});
