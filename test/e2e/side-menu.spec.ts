import { test, expect } from '@playwright/test';

test.use({ ignoreHTTPSErrors: true });

test.describe('side menu groups and interactions', () => {
  test('desktop: opens and folds a group and shows indented child links', async ({ page }) => {
    test.skip(test.info().project.name !== 'desktop', 'desktop project only');
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // On home page, About Us group is initially collapsed
    const aboutUsButton = page.getByRole('button', { name: 'About Us' });
    await expect(aboutUsButton).toBeVisible();
    await expect(aboutUsButton).toHaveAttribute('aria-expanded', 'false');

    const aboutUsList = page.locator('#menu-group-about-us');
    await expect(aboutUsList).toBeHidden();

    // Click to open group
    await aboutUsButton.click();
    await expect(aboutUsButton).toHaveAttribute('aria-expanded', 'true');
    await expect(aboutUsList).toBeVisible();

    const beliefsLink = page.getByRole('link', { name: /Our Lutheran Beliefs/i });
    const historyLink = page.getByRole('link', { name: /History/i });
    await expect(beliefsLink).toBeVisible();
    await expect(historyLink).toBeVisible();
    await expect(historyLink).toHaveAttribute('href', '/history');

    // Click to fold group
    await aboutUsButton.click();
    await expect(aboutUsButton).toHaveAttribute('aria-expanded', 'false');
    await expect(aboutUsList).toBeHidden();
  });

  test('desktop: auto-opens the group containing the current route', async ({ page }) => {
    test.skip(test.info().project.name !== 'desktop', 'desktop project only');
    await page.goto('/calendar', { waitUntil: 'domcontentloaded' });

    // Visiting /calendar auto-opens News & Events
    const newsEventsButton = page.getByRole('button', { name: 'News & Events' });
    await expect(newsEventsButton).toBeVisible();
    await expect(newsEventsButton).toHaveAttribute('aria-expanded', 'true');

    const calendarLink = page.getByRole('link', { name: /Calendar/i });
    await expect(calendarLink).toBeVisible();
    await expect(calendarLink).toHaveAttribute('href', '/calendar');
  });

  test('mobile: opens drawer, group tap leaves drawer open, and page link tap closes drawer', async ({ page }) => {
    test.skip(test.info().project.name !== 'mobile', 'mobile project only');
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const hamburger = page.locator('#mobilemenutoggle');
    await expect(hamburger).toBeVisible();

    const sidebar = page.locator('#sidebar');
    await expect(sidebar).toHaveClass(/close/);

    // Open mobile menu
    await hamburger.click();
    await expect(sidebar).toHaveClass(/open/);

    // Tap a group line (e.g. About Us)
    const aboutUsButton = page.getByRole('button', { name: 'About Us' });
    await expect(aboutUsButton).toBeVisible();
    await expect(aboutUsButton).toHaveAttribute('aria-expanded', 'false');

    // Tapping group line opens group and leaves drawer open
    await aboutUsButton.click();
    await expect(aboutUsButton).toHaveAttribute('aria-expanded', 'true');
    await expect(sidebar, 'drawer must remain open after tapping a group line').toHaveClass(/open/);

    const historyLink = page.getByRole('link', { name: /History/i });
    await expect(historyLink).toBeVisible();

    // Tapping group line again folds group and still leaves drawer open
    await aboutUsButton.click();
    await expect(aboutUsButton).toHaveAttribute('aria-expanded', 'false');
    await expect(sidebar, 'drawer must remain open after folding a group line').toHaveClass(/open/);

    // Open group again and click a page link
    await aboutUsButton.click();
    await expect(historyLink).toBeVisible();

    // Tapping page link closes drawer
    await historyLink.click();
    await expect(sidebar, 'drawer must close after tapping a page link').toHaveClass(/close/);
    await expect(page).toHaveURL(/\/history$/);
  });
});
