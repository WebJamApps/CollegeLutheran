# AGENTS.md — CollegeLutheran

Guidance for AI coding agents (agy/Antigravity, etc.) working in this repo.
(Global rules live in `~/.agents/AGENTS.md`; this file adds CollegeLutheran
specifics.)


## Cross-AI hard rules

The cross-AI hard rules that bind every agent on every surface are NOT duplicated here. They live
in exactly one file: `docs/cross-ai-rules.md` in the **`web-jam-tools` repository**, which normally
sits alongside this repository — `../web-jam-tools/docs/cross-ai-rules.md`, and on Josh's laptop
`/home/joshua/WebJamApps/web-jam-tools/docs/cross-ai-rules.md`.

Read that file before acting. If you cannot find it, STOP and say so — do not proceed without the
rules and do not reconstruct them from memory or from this file.

## What this is
A React + TypeScript + Vite front-end for College Lutheran Church. State via
React context providers and Redux; UI components from **MUI v9** (`@mui/material`,
`@mui/icons-material`, `@mui/x-data-grid`). Use existing MUI components rather
than adding a UI library — e.g. a loading spinner is `<CircularProgress />` from
`@mui/material`.

## Commands (get both green before declaring done)
- **Lint:** `npm run test:lint` (stylelint on `src/styles/**/*.scss` + eslint).
  Auto-fix with `npm run test:lint-fix`. There is **no** `npm run lint` script.
- **Unit tests:** `npm run test:unit` (vitest, run mode).
- **Both at once:** `npm test` runs lint then unit — the single check to confirm
  you're green.
- Type-check only: `npm run typecheck`.
- **Local Dev / Full-Stack Testing:** To test the full stack with live MongoDB data (photos, slideshows, news, and page content), run the backend (`web-jam-back`) locally alongside the front-end:
  - Start backend: `cd /home/joshua/WebJamApps/web-jam-back && npm start` (runs on `http://localhost:7000`).
  - Start frontend: `npm run dev` or `npm run build && npx vite preview --port 7777`.
  - Without `web-jam-back` running, API calls to `process.env.BackendUrl` fail, causing empty picture arrays and missing dynamic content.

## Layout
- App code in `src/`: `components/`, `containers/`, `lib/`, `providers/`,
  `redux/`, `styles/`. News lives in `src/containers/News/`.
- Tests in `test/`, mirroring `src/` (`test/**/*.{test,spec}.{ts,tsx}`). Add or
  update specs alongside the file you change; keep coverage from regressing.
- SCSS in `src/styles/` (stylelint-checked).

## Don't touch
- `dist/`, `coverage/`, `node_modules/`, `public/` build artifacts.
- Do not add, upgrade, or remove dependencies — ask first.
- Do not edit CI config or anything under `.github/` unless the task is about it.
- e2e tests (`npm run test:e2e`, Playwright) need a browser install and a running
  app; you don't need to run them — unit tests + lint are the gate.

## Branch & memory hygiene

- One branch per task: never create or push any branch other than the one
  created for the current task.
- Once your PR is merged or closed, its branch is DEAD — never commit to it or
  push it again. Follow-up work (including afterthoughts like docs or lessons
  learned) starts on a NEW branch off the latest `dev`, with its own PR.
- Save lessons BEFORE the merge, not after: anything you learned during the task
  worth keeping (build quirks, selector gotchas, testing patterns — e.g. the
  output of a `/learn`-style memory pass) gets committed to this file's Memory
  section on the SAME task branch while the PR is still open, so it ships inside
  the PR. A post-merge push to the old branch strands the lesson and forces
  manual cleanup.

## Memory
- **News Flow:** Creating "News" is handled via the `ChangeNewsPage` component in `src/containers/AdminDashboard/AdminDashboardContent.tsx`. Updating and Deleting news happens through `src/containers/News/EditNewsDialog.tsx`.
- **Async Testing:** When components have `await` calls that disable buttons (like during API calls), tests using `@testing-library/react` need to mock functions to return Promises (`vi.fn(() => Promise.resolve())`) and interactions should be wrapped in `await act(async () => { ... })` to properly flush React state.
- **MUI Imports & Testing Mocks:** `useTheme` must always be imported from `@mui/material/styles` instead of `@mui/material`. The testing environment uses a custom manual mock (`__mocks__/@mui/material.tsx`) that does not mock or export `useTheme`. When introducing new MUI components (like `NativeSelect`), ensure they are added to `__mocks__/@mui/material.tsx` and correctly destructure and spread nested `inputProps` on native inputs (e.g. `<select {...rest} {...inputProps}>`) to preserve testing-library query support (like `aria-label`).
- **E2E Test Class Preservation:** When refactoring page layouts (especially in core templates like `HeaderSection.tsx`, `ThemeModeSelector.tsx`), check if existing DOM classes (e.g., `.theme-mode-selector`) or IDs are targeted by Playwright tests under `test/e2e/`, and ensure they are preserved on the outer-most container of the new layout to prevent E2E selector timeouts on CI/CD pipelines.
- **Linting Script Names & Vitest Timezone Alignment:** `CollegeLutheran` uses `npm run test:lint` for linting (there is no `npm run lint` script). When updating Vitest snapshots for components with date or version strings, ensure updates are executed with `TZ=UTC npx vitest run -u` (or `npm test`) so snapshots match CircleCI's UTC container runner.
- **Snyk Failures & Resolution via `npm audit fix`**: PR checks may report failure on `security/snyk` due to transitive dependency vulnerabilities (such as `brace-expansion`). Running `npm audit fix` updates `package-lock.json` with non-breaking patches to resolve these vulnerabilities. Always run `npm test` and `npm run test:lint` afterwards to verify the test suite remains 100% green before committing and pushing the updated `package-lock.json` to the PR branch.
- **Server Spec Build Prerequisite:** `test/server.spec.ts` verifies asset cache-control headers directly from `dist/assets`. Running `npm run build` is required before executing the full test suite (`npm test`) in clean worktrees to ensure the build artifacts are present.
- **Dark Reader Chrome Extension Testing Gotcha:** When testing light/dark mode theme transitions locally or in Chrome, ensure the Chrome extension 'Dark Reader' is disabled. Having Dark Reader active forces inverted or grayed styling onto elements (e.g. side nav), masking native CSS theme transitions and making it appear as if theme switching is broken.
- **Native Button Keyboard Activation Redundancy:** Native HTML `<button>` elements automatically synthesize and dispatch `click` events when focused and activated via `Enter` or `Space` keys. Do not attach redundant `onKeyDown` or `onKeyPress` handlers to buttons that call action callbacks (such as `toggleTheme()`), as doing so executes the action twice in immediate succession (once on key event, once on native synthesized click), causing toggles to immediately undo themselves. Rely solely on `onClick` for button activation. To verify keyboard behavior, write Playwright E2E tests using real keyboard input (`locator.focus()` then `page.keyboard.press('Enter')` / `page.keyboard.press('Space')`), as synthetic unit event dispatches like `fireEvent.keyPress()` in jsdom do not trigger native browser click synthesis and miss double-trigger regressions.
- **Playwright Absent Element Assertions:** When verifying conditional routes, redirects, or hidden elements in Playwright E2E tests, never use `expect(locator).not.toHaveText()` if the element is expected to be omitted from the DOM entirely. Playwright waits up to the timeout for the locator to match an element before evaluating its text. Use `expect(locator).toHaveCount(0)` instead.
- **Asynchronous Route Direct Visits & Loading State Retention:** When adding dynamic feature routes gated on async content fetch (such as `/event` enabled via admin toggle), never redirect immediately to home (`/`) when initial context state is `null` or uninitialized. Initial null state represents an in-flight fetch, not a disabled feature. Premature redirection during fresh direct navigation or browser page reloads replaces the route URL before the API response fulfills, breaking bookmarks and direct links. Always track loading state separately (`eventLoading`), retain the route with a placeholder container during in-flight requests, and only evaluate redirect logic once the fetch has completed. E2E tests must include direct navigation and reload assertions under simulated network latency alongside menu-click navigation.
- **Editor Draft Preservation Across Context Re-renders:** When editing forms in administrative dashboards backed by broad application contexts (such as `ContentContext`), never blindly reset form inputs (`title`, `comments`, `enabled`) in `useEffect` on every reference change of the top-level context wrapper. Unrelated background fetches (such as news, picture, or header updates) or updates to other sections create fresh context objects on re-render, wiping out uncommitted user drafts. Track user dirty state using refs (`isTitleDirty`, `isCommentsDirty`, `isEnabledDirty`) and compare incoming records against the last synchronized document snapshot, updating only unedited fields and resetting dirty flags exclusively upon successful save or explicit section switching.
- **Vitest Unit Test DOM Matchers & Optional Chaining Defense:** In component test suites rendering full route trees (such as `<App />`), always import `@testing-library/jest-dom` if asserting with DOM matchers like `toBeInTheDocument()`. In theme and environment providers inspecting browser APIs (such as `window.matchMedia`), use complete optional chaining (`window.matchMedia?.(QUERY)?.matches ?? false`) so tests or environments where `matchMedia` returns `undefined` fail gracefully rather than throwing `TypeError: Cannot read properties of undefined (reading 'matches')`.
- **Mobile CSS Cascade Specificity for Drawer Menu Items:** In `styles.scss`, `@use 'mobile'` is loaded after `@use 'menu'`. A single class `.menu-sub-item { padding-left: 24px; }` has specificity (0, 1, 0), so a mobile media query targeting `.menu-item { padding-left: 10px; }` (also (0, 1, 0)) overrides it due to later source order. Raising specificity with a compound selector (e.g. `.menu-item.menu-sub-item` with specificity (0, 2, 0)) in `_menu.scss` ensures the indentation wins over mobile media queries without duplicating rules into `_mobile.scss`.
- **Production Build JSX Runtime Environment Gating:** In Vite builds with `@vitejs/plugin-react`, if local `.env` defines `NODE_ENV=development`, the react plugin can compile JSX files using `jsxDEV`, which does not exist in production React bundles and throws `TypeError: (0, z.jsxDEV) is not a function` at runtime in production preview. Ensure `NODE_ENV=production` is enforced during production builds (`npm run build`).
- **Full-Stack Local Testing Prerequisite (`web-jam-back`):** When testing the UI locally or opening pages in Chrome for approval, start `web-jam-back` alongside the frontend as described in **Local Dev / Full-Stack Testing** under `## Commands`; otherwise `ContentContext` receives empty responses and components depending on backend data (such as the homepage photo slideshow) will not render.

## Quota & Token Hygiene
- **Sliding Window Quota Preservation:** Google Antigravity (`agy`) tracks model token usage on a rolling 5-hour sliding window. To preserve quota and avoid 3+ hour lockouts during heavy or multi-repo tasks:
  - Keep command outputs compact: avoid printing thousands of lines of raw test logs directly into main turn outputs.
  - Redirect large multi-line summaries, test plans, and evidence to scratch files (`--summary-file`, `--test-plan-file`, `--test-evidence-file`) when calling `create-draft-pr.sh`.
  - **Automatic Flash Med Subagent Handoff on "Go":** Once requirements and implementation steps are aligned interactively on `Flash High`, automatically delegate contained execution work (coding, running test suites, branch/PR creation) down to a `Flash Med` subagent without waiting for Josh to explicitly request delegation.

## Pull requests

### PR body conventions (violations may be machine-rejected)

- **Summary**: markdown bullet points, one change per bullet — never a run-on paragraph.
- **Test evidence**: paste the REAL runner output verbatim (the lines showing pass/fail and test counts), inside a ``` fence — never a description like "all tests passed". If the output has scrolled out of view, re-run the test command and paste what it prints.
- **Test plan**: exact commands and manual steps that exercise the change (start command, route/page, what to click, expected visible result) — a green test suite alone is not a plan.
- **Attribution**: `--author` names the model actually doing the work. Antigravity/agy sessions are ALWAYS `agy — Gemini 3.5 Flash (Medium)` or `(High)` — never write any other Gemini model name (models misremember their own identity; use this exact string).
