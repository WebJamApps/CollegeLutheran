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

test('does not show the fallback when the form renders', async ({ page }) => {
  // Block the real Constant Contact widget so this test never depends on its racy
  // network timing (the source of the original flake), then simulate a successful
  // injection deterministically ourselves — our stub is then the ONLY thing that
  // ever fills the form div. The component CLEARS that div on mount
  // (formRef.innerHTML = '' in NewsContent.tsx) to re-run the widget, so keep a
  // PERSISTENT observer that refills whenever the div is emptied (including by
  // that clear); the div is then guaranteed non-empty when the ~3.5s empty-div
  // detection runs, so the fallback never shows.
  await page.route('**/signup-form-widget*', (route) => route.abort());
  const formId = '99081bd2-b1a5-48cd-bb60-8c9aba82c2a4';
  await page.addInitScript((id) => {
    const fill = () => {
      const el = document.querySelector(`[data-form-id="${id}"]`);
      // Refilling sets childElementCount > 0, so this is a no-op once filled and
      // won't loop on its own mutation.
      if (el && el.childElementCount === 0) {
        el.innerHTML = '<form data-stub="1"><input aria-label="email" /></form>';
      }
    };
    new MutationObserver(fill).observe(document.documentElement, { childList: true, subtree: true });
  }, formId);

  await page.goto('/news', { waitUntil: 'domcontentloaded' });
  // Precondition: our stub actually got injected (so a silent stub failure can't
  // make this pass for the wrong reason). toBeAttached, not toBeVisible — we only
  // care that the div is non-empty, not how the bare stub lays out.
  await expect(page.locator(`[data-form-id="${formId}"] form[data-stub="1"]`)).toBeAttached();
  // Past the detection window, the fallback must never have rendered.
  await page.waitForTimeout(4500);
  await expect(page.locator('.signup-unavailable')).toHaveCount(0);
});
