# tests rules



- **Async Testing:** When components have `await` calls that disable buttons (like during API calls), tests using `@testing-library/react` need to mock functions to return Promises (`vi.fn(() => Promise.resolve())`) and interactions should be wrapped in `await act(async () => { ... })` to properly flush React state.


- **Linting Script Names & Vitest Timezone Alignment:** `CollegeLutheran` uses `npm run test:lint` for linting (there is no `npm run lint` script). When updating Vitest snapshots for components with date or version strings, ensure updates are executed with `TZ=UTC npx vitest run -u` (or `npm test`) so snapshots match CircleCI's UTC container runner.


- **Server Spec Build Prerequisite:** `test/server.spec.ts` verifies asset cache-control headers directly from `dist/assets`. Running `npm run build` is required before executing the full test suite (`npm test`) in clean worktrees to ensure the build artifacts are present.


- **Playwright Absent Element Assertions:** When verifying conditional routes, redirects, or hidden elements in Playwright E2E tests, never use `expect(locator).not.toHaveText()` if the element is expected to be omitted from the DOM entirely. Playwright waits up to the timeout for the locator to match an element before evaluating its text. Use `expect(locator).toHaveCount(0)` instead.


- **MUI Imports & Testing Mocks:** `useTheme` must always be imported from `@mui/material/styles` instead of `@mui/material`. The testing environment uses a custom manual mock (`__mocks__/@mui/material.tsx`) that does not mock or export `useTheme`. When introducing new MUI components (like `NativeSelect`), ensure they are added to `__mocks__/@mui/material.tsx` and correctly destructure and spread nested `inputProps` on native inputs (e.g. `<select {...rest} {...inputProps}>`) to preserve testing-library query support (like `aria-label`).


- **E2E Test Class Preservation:** When refactoring page layouts (especially in core templates like `HeaderSection.tsx`, `ThemeModeSelector.tsx`), check if existing DOM classes (e.g., `.theme-mode-selector`) or IDs are targeted by Playwright tests under `test/e2e/`, and ensure they are preserved on the outer-most container of the new layout to prevent E2E selector timeouts on CI/CD pipelines.


- **Snyk Failures & Resolution via `npm audit fix`**: PR checks may report failure on `security/snyk` due to transitive dependency vulnerabilities (such as `brace-expansion`). Running `npm audit fix` updates `package-lock.json` with non-breaking patches to resolve these vulnerabilities. Always run `npm test` and `npm run test:lint` afterwards to verify the test suite remains 100% green before committing and pushing the updated `package-lock.json` to the PR branch.


- **Native Button Keyboard Activation Redundancy:** Native HTML `<button>` elements automatically synthesize and dispatch `click` events when focused and activated via `Enter` or `Space` keys. Do not attach redundant `onKeyDown` or `onKeyPress` handlers to buttons that call action callbacks (such as `toggleTheme()`), as doing so executes the action twice in immediate succession (once on key event, once on native synthesized click), causing toggles to immediately undo themselves. Rely solely on `onClick` for button activation. To verify keyboard behavior, write Playwright E2E tests using real keyboard input (`locator.focus()` then `page.keyboard.press('Enter')` / `page.keyboard.press('Space')`), as synthetic unit event dispatches like `fireEvent.keyPress()` in jsdom do not trigger native browser click synthesis and miss double-trigger regressions.


- **Vitest Unit Test DOM Matchers & Optional Chaining Defense:** In component test suites rendering full route trees (such as `<App />`), always import `@testing-library/jest-dom` if asserting with DOM matchers like `toBeInTheDocument()`. In theme and environment providers inspecting browser APIs (such as `window.matchMedia`), use complete optional chaining (`window.matchMedia?.(QUERY)?.matches ?? false`) so tests or environments where `matchMedia` returns `undefined` fail gracefully rather than throwing `TypeError: Cannot read properties of undefined (reading 'matches')`.


- **Production Build JSX Runtime Environment Gating:** In Vite builds with `@vitejs/plugin-react`, if local `.env` defines `NODE_ENV=development`, the react plugin can compile JSX files using `jsxDEV`, which does not exist in production React bundles and throws `TypeError: (0, z.jsxDEV) is not a function` at runtime in production preview. Ensure `NODE_ENV=production` is enforced during production builds (`npm run build`).


- **Full-Stack Local Testing Prerequisite (`web-jam-back`):** When testing the UI locally or opening pages in Chrome for approval, start `web-jam-back` alongside the frontend as described in **Local Dev / Full-Stack Testing** under `## Commands`; otherwise `ContentContext` receives empty responses and components depending on backend data (such as the homepage photo slideshow) will not render.
