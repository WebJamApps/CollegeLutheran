# tests rules



- **Async Testing:** When components have `await` calls that disable buttons (like during API calls), tests using `@testing-library/react` need to mock functions to return Promises (`vi.fn(() => Promise.resolve())`) and interactions should be wrapped in `await act(async () => { ... })` to properly flush React state.


- **Linting Script Names & Vitest Timezone Alignment:** `CollegeLutheran` uses `npm run test:lint` for linting (there is no `npm run lint` script). When updating Vitest snapshots for components with date or version strings, ensure updates are executed with `TZ=UTC npx vitest run -u` (or `npm test`) so snapshots match CircleCI's UTC container runner.


- **Server Spec Build Prerequisite:** `test/server.spec.ts` verifies asset cache-control headers directly from `dist/assets`. Running `npm run build` is required before executing the full test suite (`npm test`) in clean worktrees to ensure the build artifacts are present.


- **Playwright Absent Element Assertions:** When verifying conditional routes, redirects, or hidden elements in Playwright E2E tests, never use `expect(locator).not.toHaveText()` if the element is expected to be omitted from the DOM entirely. Playwright waits up to the timeout for the locator to match an element before evaluating its text. Use `expect(locator).toHaveCount(0)` instead.
