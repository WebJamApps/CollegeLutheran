import { act, fireEvent, render, screen } from '@testing-library/react';
import {
  CollegeLutheranThemeProvider,
  getStoredThemePreference,
  resolveThemeMode,
  useThemePreference,
} from 'src/App/theme';
import { ThemeToggle } from 'src/App/AppTemplate/ThemeToggle';

function ThemeState() {
  const { preference, resolvedMode } = useThemePreference();
  return (
    <div>
      <span data-testid="preference">{preference}</span>
      <span data-testid="resolvedMode">{resolvedMode}</span>
      <ThemeToggle />
    </div>
  );
}

function installMatchMedia(matches: boolean) {
  let listener: ((event: MediaQueryListEvent) => void) | undefined;
  const media = {
    matches,
    media: '(prefers-color-scheme: dark)',
    onchange: null,
    addEventListener: vi.fn((_event: string, nextListener: (event: MediaQueryListEvent) => void) => {
      listener = nextListener;
    }),
    removeEventListener: vi.fn(),
    addListener: vi.fn((nextListener: (event: MediaQueryListEvent) => void) => {
      listener = nextListener;
    }),
    removeListener: vi.fn(),
    dispatch(nextMatches: boolean) {
      this.matches = nextMatches;
      listener?.({ matches: nextMatches } as MediaQueryListEvent);
    },
  };
  window.matchMedia = vi.fn().mockReturnValue(media);
  return media;
}

describe('CollegeLutheranThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('defaults to system and resolves from prefers-color-scheme', () => {
    installMatchMedia(true);
    render(<CollegeLutheranThemeProvider><ThemeState /></CollegeLutheranThemeProvider>);
    expect(screen.getByTestId('preference').textContent).toBe('system');
    expect(screen.getByTestId('resolvedMode').textContent).toBe('dark');
    expect(document.documentElement.dataset.themeMode).toBe('dark');
  });

  it('reads only valid stored preferences', () => {
    localStorage.setItem('clc-theme-preference', 'dark');
    expect(getStoredThemePreference()).toBe('dark');
    localStorage.setItem('clc-theme-preference', 'invalid');
    expect(getStoredThemePreference()).toBe('system');
  });

  it('keeps system mode live when the OS preference changes', () => {
    const media = installMatchMedia(false);
    render(<CollegeLutheranThemeProvider><ThemeState /></CollegeLutheranThemeProvider>);
    expect(screen.getByTestId('resolvedMode').textContent).toBe('light');
    act(() => { media.dispatch(true); });
    expect(screen.getByTestId('resolvedMode').textContent).toBe('dark');
  });

  it('toggles theme and persists choice on click and keyboard events', () => {
    installMatchMedia(false);
    render(<CollegeLutheranThemeProvider><ThemeState /></CollegeLutheranThemeProvider>);
    const toggle = screen.getByRole('switch', { name: 'Switch to dark mode' });
    expect(toggle.getAttribute('aria-checked')).toBe('false');

    fireEvent.click(toggle);
    expect(screen.getByTestId('preference').textContent).toBe('dark');
    expect(screen.getByTestId('resolvedMode').textContent).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem('clc-theme-preference')).toBe('dark');

    const toggleDark = screen.getByRole('switch', { name: 'Switch to light mode' });
    expect(toggleDark.getAttribute('aria-checked')).toBe('true');

    fireEvent.click(toggleDark);
    expect(screen.getByTestId('preference').textContent).toBe('light');
    expect(screen.getByTestId('resolvedMode').textContent).toBe('light');
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(localStorage.getItem('clc-theme-preference')).toBe('light');
  });
});

describe('resolveThemeMode', () => {
  it('resolves explicit and system preferences', () => {
    expect(resolveThemeMode('light', true)).toBe('light');
    expect(resolveThemeMode('dark', false)).toBe('dark');
    expect(resolveThemeMode('system', true)).toBe('dark');
    expect(resolveThemeMode('system', false)).toBe('light');
  });
});
