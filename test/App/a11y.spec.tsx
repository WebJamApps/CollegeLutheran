/**
 * Runtime accessibility checks (CollegeLutheran#773).
 *
 * Renders the app's main routes through the real AppTemplate + theme provider
 * and asserts zero axe-core violations in BOTH theme modes (dark mode applies
 * via document.documentElement.dataset.themeMode — see src/App/theme.tsx).
 *
 * Limitation: jsdom performs no layout and `css: false` keeps stylesheets out
 * of the test DOM, so axe's color-contrast rule cannot run meaningfully here
 * (vitest-axe disables it by default in jsdom). These tests cover the
 * structural/ARIA rules; contrast stays a manual/e2e concern.
 */
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { act, render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { App } from 'src/App';
import store from 'src/redux/store';
import { CollegeLutheranThemeProvider, ResolvedThemeMode } from 'src/App/theme';

const mainRoutes = [
  '/',
  '/music',
  '/belief',
  '/family',
  '/giving',
  '/staff',
  '/youth',
  '/news',
  '/calendar',
  '/livestream',
];

function installMatchMedia() {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

async function renderRoute(route: string, mode: ResolvedThemeMode) {
  localStorage.setItem('clc-theme-preference', mode);
  const view = render(
    <GoogleOAuthProvider clientId="test-client-id">
      <Provider store={store.store}>
        <CollegeLutheranThemeProvider>
          <MemoryRouter initialEntries={[route]}>
            <App />
          </MemoryRouter>
        </CollegeLutheranThemeProvider>
      </Provider>
    </GoogleOAuthProvider>,
  );
  // Flush the data-fetching effects (stubbed fetch) so state settles inside act.
  await act(async () => { await Promise.resolve(); });
  expect(document.documentElement.dataset.themeMode).toBe(mode);
  return view;
}

describe('axe accessibility (runtime)', () => {
  beforeEach(() => {
    localStorage.clear();
    installMatchMedia();
    // Pages fetch backend content on mount; keep the suite offline and let the
    // components take their error/empty-content paths.
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
      json: () => Promise.resolve({}),
    }) as unknown as typeof fetch;
  });

  (['light', 'dark'] as ResolvedThemeMode[]).forEach((mode) => {
    describe(`${mode} mode`, () => {
      mainRoutes.forEach((route) => {
        it(`has no axe violations on ${route}`, async () => {
          const { container } = await renderRoute(route, mode);
          // jsdom cannot post messages into embedded iframes (Calendar,
          // LiveStream, Giving embeds), so keep axe out of frame contents.
          const results = await axe(container, { iframes: false });
          expect(results).toHaveNoViolations();
        });
      });
    });
  });
});
