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
