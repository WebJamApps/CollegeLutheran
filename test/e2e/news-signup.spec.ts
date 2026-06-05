import { test, expect } from '@playwright/test';

// Guards the News-page email sign-up fallback. The sign-up is a Constant Contact
// inline form injected by an external script (signup-form-widget.min.js). Firefox
// Enhanced Tracking Protection blocks that script, leaving the form empty — what
// Pastor David reported. We simulate the block by aborting the script request,
// which is deterministic across browsers, then assert the contact-the-office
// fallback appears and the old floating "Sign Up for Emails" reload button is
// gone. Runs on desktop + mobile (see playwright.config.ts projects).

test('shows the contact-the-office fallback when the sign-up form is blocked', async ({ page }) => {
  await page.route('**/signup-form-widget*', (route) => route.abort());
  await page.goto('/news', { waitUntil: 'domcontentloaded' });

  // Fallback appears after the component's empty-form detection timeout.
  // Scope to the fallback container — the office email/phone also appear in the
  // site sidebar, so page-wide selectors would be ambiguous.
  const fallback = page.locator('.signup-unavailable');
  await expect(fallback).toBeVisible({ timeout: 12_000 });
  await expect(fallback).toContainText(/contact the church office/i);
  await expect(fallback).toContainText('Sandi Roop');
  await expect(fallback.getByRole('link', { name: 'office1@collegelutheran.org' })).toBeVisible();
  await expect(fallback.getByRole('link', { name: '(540) 389-4963' })).toBeVisible();

  // The old reload button that floated over the News table must be gone.
  await expect(page.getByRole('button', { name: 'Sign Up for Emails' })).toHaveCount(0);
});

test('does not show the fallback when the form renders', async ({ page }) => {
  await page.goto('/news', { waitUntil: 'domcontentloaded' });

  // Simulate a successful Constant Contact injection: give the form div a child
  // before the detection timeout fires.
  // Scope to the React-rendered target (the real form GUID); index.html also
  // has a vestigial .ctct-inline-form, so the bare class is ambiguous.
  const formId = '99081bd2-b1a5-48cd-bb60-8c9aba82c2a4';
  await page.locator(`[data-form-id="${formId}"]`).waitFor({ state: 'attached' });
  await page.evaluate((id) => {
    const el = document.querySelector(`[data-form-id="${id}"]`);
    if (el) el.innerHTML = '<form data-stub="1"><input aria-label="email" /></form>';
  }, formId);

  // Wait past the detection window, then confirm no fallback rendered.
  await page.waitForTimeout(4500);
  await expect(page.getByText(/contact the church office/i)).toHaveCount(0);
});
