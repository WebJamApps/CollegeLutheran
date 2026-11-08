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

> **Moved to the Obsidian vault (2026-11-05):** Coding lessons from the former Memory section now live word for word in `~/Dropbox/web-jam-llms/rules-vault/CollegeLutheran-AGENTS.md`. Read it before working in that area.
Before changing anything under `test/`, read `docs/rules/tests.md`.
Before changing anything under `src/containers/AdminDashboard/`, read `docs/rules/admin-dashboard.md`.
Before changing anything under `src/styles/`, read `docs/rules/styles.md`.

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
- **Attribution**: `--author` names the model actually doing the work. Antigravity/agy sessions use the exact `displayName` of the model running, as listed in `ALLOWED_AGY_MODELS` in web-jam-tools `hooks/lib/check_agy_model.ts` (for example `agy — Gemini 3.8 Flash (High)`) — never any other model name (models misremember their own identity; copy the exact string).
