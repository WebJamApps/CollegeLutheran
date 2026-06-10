# GEMINI.md — CollegeLutheran

Guidance for gemini-cli when working in this repo. (Global rules live in
`~/.gemini/GEMINI.md`; this file adds CollegeLutheran specifics.)

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

## Memory
- **News Flow:** Creating "News" is handled via the `ChangeNewsPage` component in `src/containers/AdminDashboard/AdminDashboardContent.tsx`. Updating and Deleting news happens through `src/containers/News/EditNewsDialog.tsx`.
- **Async Testing:** When components have `await` calls that disable buttons (like during API calls), tests using `@testing-library/react` need to mock functions to return Promises (`vi.fn(() => Promise.resolve())`) and interactions should be wrapped in `await act(async () => { ... })` to properly flush React state.
