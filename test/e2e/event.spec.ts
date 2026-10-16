import { test, expect } from '@playwright/test';

test.use({ ignoreHTTPSErrors: true });

test.describe('event page and navigation link', () => {
  test('desktop: when switch is on, shows event link under News & Events and renders /event page', async ({ page }) => {
    test.skip(test.info().project.name !== 'desktop', 'desktop project only');

    await page.route(/\/book\/one\?type=eventPageContent(?:&|$)/, (route) => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        title: 'Blood Drive',
        comments: '<p>Donate blood this Saturday in the fellowship hall.</p>',
        enabled: true,
        type: 'eventPageContent',
        _id: 'event-active-1',
      }),
    }));

    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Open News & Events group
    const newsEventsButton = page.getByRole('button', { name: 'News & Events' });
    await expect(newsEventsButton).toBeVisible();
    await newsEventsButton.click();

    // Link appears under configured name
    const eventLink = page.getByRole('link', { name: /Blood Drive/i });
    await expect(eventLink).toBeVisible();
    await expect(eventLink).toHaveAttribute('href', '/event');

    // Clicking navigates to /event
    await eventLink.click();
    await expect(page).toHaveURL(/\/event/);

    // Page shows name as heading and content below it
    const heading = page.locator('.material-content h3');
    await expect(heading).toHaveText('Blood Drive');
    await expect(page.locator('.material-content')).toContainText('Donate blood this Saturday in the fellowship hall.');
  });

  test('desktop: direct visit and reload on /event waits for active event response and renders page without redirect', async ({ page }) => {
    test.skip(test.info().project.name !== 'desktop', 'desktop project only');

    await page.route(/\/book\/one\?type=eventPageContent(?:&|$)/, async (route) => {
      // Simulate network latency so direct navigation exercises the loading retention state
      await new Promise((resolve) => setTimeout(resolve, 200));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          title: 'Blood Drive',
          comments: '<p>Direct visit blood drive event body.</p>',
          enabled: true,
          type: 'eventPageContent',
          _id: 'event-active-direct-1',
        }),
      });
    });

    // Fresh direct visit to /event
    await page.goto('/event', { waitUntil: 'domcontentloaded' });

    // Page must remain on /event and display heading and content
    const heading = page.locator('.material-content h3');
    await expect(heading).toHaveText('Blood Drive');
    await expect(page.locator('.material-content')).toContainText('Direct visit blood drive event body.');
    await expect(page).toHaveURL(/\/event/);

    // Browser reload at /event also remains on /event and displays content
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(heading).toHaveText('Blood Drive');
    await expect(page.locator('.material-content')).toContainText('Direct visit blood drive event body.');
    await expect(page).toHaveURL(/\/event/);
  });

  test('desktop: when switch is off, redirects /event to home and hides menu link', async ({ page }) => {
    test.skip(test.info().project.name !== 'desktop', 'desktop project only');

    await page.route(/\/book\/one\?type=eventPageContent(?:&|$)/, (route) => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        title: 'Blood Drive',
        comments: '<p>Donate blood this Saturday in the fellowship hall.</p>',
        enabled: false,
        type: 'eventPageContent',
        _id: 'event-inactive-1',
      }),
    }));

    // Visiting /event redirects to home
    await page.goto('/event', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/(#.*)?$/);
    await expect(page.getByRole('heading', { name: 'Blood Drive' })).toHaveCount(0);

    // Open News & Events group
    const newsEventsButton = page.getByRole('button', { name: 'News & Events' });
    await expect(newsEventsButton).toBeVisible();
    await newsEventsButton.click();

    // Menu link does not appear
    await expect(page.getByRole('link', { name: /Blood Drive/i })).toHaveCount(0);
    await expect(page.locator('a[href="/event"]')).toHaveCount(0);
  });

  test('mobile: when switch is on, drawer shows event link and navigates to /event', async ({ page }) => {
    test.skip(test.info().project.name !== 'mobile', 'mobile project only');

    await page.route(/\/book\/one\?type=eventPageContent(?:&|$)/, (route) => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        title: 'Blood Drive',
        comments: '<p>Mobile event content</p>',
        enabled: true,
        type: 'eventPageContent',
        _id: 'event-active-2',
      }),
    }));

    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Open mobile drawer
    const hamburger = page.locator('#mobilemenutoggle');
    await hamburger.click();

    // Open News & Events
    const newsEventsButton = page.getByRole('button', { name: 'News & Events' });
    await newsEventsButton.click();

    const eventLink = page.getByRole('link', { name: /Blood Drive/i });
    await expect(eventLink).toBeVisible();
    await expect(eventLink).toHaveAttribute('href', '/event');

    // Tap link to navigate; drawer closes
    await eventLink.click();
    await expect(page).toHaveURL(/\/event/);
    await expect(page.locator('#sidebar')).toHaveClass(/close/);

    await expect(page.locator('.material-content h3')).toHaveText('Blood Drive');
    await expect(page.locator('.material-content')).toContainText('Mobile event content');
  });

  test('mobile: when switch is off, redirects /event to home and drawer hides link', async ({ page }) => {
    test.skip(test.info().project.name !== 'mobile', 'mobile project only');

    await page.route(/\/book\/one\?type=eventPageContent(?:&|$)/, (route) => route.fulfill({
      status: 400,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'not found' }),
    }));

    // Visiting /event redirects to home
    await page.goto('/event', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/(#.*)?$/);

    // Open drawer and News & Events
    await page.locator('#mobilemenutoggle').click();
    await page.getByRole('button', { name: 'News & Events' }).click();

    await expect(page.getByRole('link', { name: /Blood Drive/i })).toHaveCount(0);
    await expect(page.locator('a[href="/event"]')).toHaveCount(0);
  });
});
