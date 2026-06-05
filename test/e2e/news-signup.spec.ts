import { test, expect } from '@playwright/test';

// Guards the News-page email sign-up. We dropped the Constant Contact inline-form
// widget (an external script Firefox Enhanced Tracking Protection blocked, which
// also raced the SPA route mount) in favour of a plain link to Constant Contact's
// hosted opt-in page. This works in every browser with no script and no console
// errors. Runs on desktop + mobile (see playwright.config.ts projects).

const OPT_IN_URL = 'https://visitor.r20.constantcontact.com/manage/optin?v=001cd950f6ed99253e212302d6c939739';

test('shows a sign-up link to the hosted opt-in page', async ({ page }) => {
  await page.goto('/news', { waitUntil: 'domcontentloaded' });

  const link = page.getByRole('link', { name: 'Sign Up for Email Updates' });
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute('href', OPT_IN_URL);
  await expect(link).toHaveAttribute('target', '_blank');
  await expect(link).toHaveAttribute('rel', /noopener/);

  // The retired widget, its empty-form fallback, and the old reload button must
  // all be gone.
  await expect(page.locator('.ctct-inline-form')).toHaveCount(0);
  await expect(page.locator('.signup-unavailable')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Sign Up for Emails' })).toHaveCount(0);
});
