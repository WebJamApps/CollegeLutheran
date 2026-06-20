import { render, fireEvent, act } from '@testing-library/react';
import { vi } from 'vitest';
import { SignUpForEmails } from 'src/containers/News/NewsContent';

// The email sign-up shows a "contact the office" fallback when the Constant
// Contact form div is still empty ~3.5s after mount (e.g. Firefox ETP blocked
// the widget script). That's timer + DOM-count logic, tested deterministically
// here with fake timers — the equivalent real-browser e2e was inherently racy
// (the component clears the div on mount, re-renders on height, and the 3.5s
// timer races the widget), so it lived in news-signup.spec.ts only for the
// blocked-script path; the positive path is covered here instead.
describe('SignUpForEmails fallback detection', () => {
  beforeEach(() => {
    // The shared setup fakes only Date; also fake setTimeout so we can fast-
    // forward the component's 3.5s empty-div detection.
    vi.useFakeTimers({ now: 1483228800000, toFake: ['Date', 'setTimeout', 'clearTimeout'] });
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows the contact-the-office fallback when the form div stays empty', () => {
    const { container } = render(<SignUpForEmails height={800} />);
    expect(container.querySelector('.signup-unavailable')).toBeNull();
    act(() => { vi.advanceTimersByTime(3500); });
    const fallback = container.querySelector('.signup-unavailable');
    expect(fallback).not.toBeNull();
    expect(fallback!.textContent).toMatch(/contact the church office/i);
  });

  it('does not show the fallback when the form renders into the div', () => {
    const { container } = render(<SignUpForEmails height={800} />);
    // Simulate the Constant Contact widget injecting the form before detection.
    const formDiv = container.querySelector('[data-form-id]') as HTMLElement;
    formDiv.innerHTML = '<form><input aria-label="email" /></form>';
    act(() => { vi.advanceTimersByTime(3500); });
    expect(container.querySelector('.signup-unavailable')).toBeNull();
  });

  it('offers a reload button that reloads the page on short (phone) viewports', () => {
    const reload = vi.fn();
    Object.defineProperty(window, 'location', {
      configurable: true, writable: true, value: { ...window.location, reload },
    });
    const { getByRole } = render(<SignUpForEmails height={500} />);
    fireEvent.click(getByRole('button', { name: /sign up for emails/i }));
    expect(reload).toHaveBeenCalled();
  });

  it('has no reload button on tall (desktop) viewports', () => {
    const { queryByRole } = render(<SignUpForEmails height={800} />);
    expect(queryByRole('button', { name: /sign up for emails/i })).toBeNull();
  });
});
