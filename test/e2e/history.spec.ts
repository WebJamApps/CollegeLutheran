import { test, expect } from '@playwright/test';

test.use({ ignoreHTTPSErrors: true });

test.beforeEach(async ({ page }) => {
  await page.goto('/history', { waitUntil: 'domcontentloaded' });
});

test('renders the History page heading, picture, four paragraphs, and no PDF links', async ({ page }) => {
  const heading = page.getByRole('heading', { level: 3, name: 'College Lutheran Church: From 1852 to Today' });
  await expect(heading).toBeVisible();

  const picture = page.locator('img.history-picture');
  await expect(picture).toBeVisible();
  await expect(picture).toHaveAttribute('alt', 'College Lutheran Church building, aerial view at sunset');

  const src = await picture.getAttribute('src');
  expect(src).toMatch(/\/clc-building-(light|dark)\.jpg$/);

  await expect(page.getByText(/College Lutheran Church, a member of the national Evangelical Lutheran Church in America/)).toBeVisible();
  await expect(page.getByText(/The church is built from medina sandstone quarried locally\./)).toBeVisible();
  await expect(page.getByText(/First served by temporary pastor, Christopher Baughman/)).toBeVisible();
  await expect(page.getByText(/Today’s congregational life features an active youth program/)).toBeVisible();

  const pdfLinks = page.locator('a[href$=".pdf"], a[href*=".pdf"]');
  await expect(pdfLinks).toHaveCount(0);
});

test('picture floats right on desktop (>= 700px)', async ({ page }) => {
  test.skip(test.info().project.name !== 'desktop', 'desktop project only');

  const picture = page.locator('img.history-picture');
  await expect(picture).toBeVisible();
  await expect(picture).toHaveCSS('float', 'right');
  await expect(picture).toHaveCSS('shape-outside', 'ellipse(48% 50% at 50% 50%)');
  await expect(picture).toHaveCSS('shape-margin', '7px');

  const pictureBox = await picture.boundingBox();
  const cardBox = await page.locator('.material-content').boundingBox();
  expect(pictureBox).not.toBeNull();
  expect(cardBox).not.toBeNull();

  expect(pictureBox!.x + pictureBox!.width).toBeGreaterThan(cardBox!.x + (cardBox!.width / 2));
});

test('picture sits above text and does not float on mobile (< 700px)', async ({ page }) => {
  test.skip(test.info().project.name !== 'mobile', 'mobile project only');

  const picture = page.locator('img.history-picture');
  await expect(picture).toBeVisible();
  await expect(picture).toHaveCSS('float', 'none');
  await expect(picture).toHaveCSS('shape-outside', 'none');

  const pictureBox = await picture.boundingBox();
  const firstParagraph = page.locator('.material-content p').first();
  const paraBox = await firstParagraph.boundingBox();
  expect(pictureBox).not.toBeNull();
  expect(paraBox).not.toBeNull();

  expect(pictureBox!.y + pictureBox!.height).toBeLessThanOrEqual(paraBox!.y + 2);

  const cardBox = await page.locator('.material-content').boundingBox();
  expect(cardBox).not.toBeNull();
  const pictureCenter = pictureBox!.x + (pictureBox!.width / 2);
  const cardCenter = cardBox!.x + (cardBox!.width / 2);
  expect(Math.abs(pictureCenter - cardCenter)).toBeLessThanOrEqual(5);
});
