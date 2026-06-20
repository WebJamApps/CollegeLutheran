import { test, expect } from '@playwright/test';

// Guards the News-page email sign-up fallback. The sign-up is a Constant Contact
// inline form injected by an external script (signup-form-widget.min.js) loaded
// in index.html. Firefox Enhanced Tracking Protection blocks that script, leaving
// the form empty — what Pastor David reported. We simulate the block by aborting
// the script request, which is deterministic across browsers, then assert the
// contact-the-office fallback appears. Runs on desktop + mobile (see
// playwright.config.ts projects).

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
});

// The positive path ("form renders → no fallback") used to live here but was
// inherently flaky in a real browser — it raced the component's mount-time div
// clear, height-driven re-renders, and the 3.5s detection timer. It's now
// covered deterministically with fake timers in
// test/containers/News/SignUpForEmails.spec.tsx.
