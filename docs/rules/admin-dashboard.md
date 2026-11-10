# admin-dashboard rules



- **Editor Draft Preservation Across Context Re-renders:** When editing forms in administrative dashboards backed by broad application contexts (such as `ContentContext`), never blindly reset form inputs (`title`, `comments`, `enabled`) in `useEffect` on every reference change of the top-level context wrapper. Unrelated background fetches (such as news, picture, or header updates) or updates to other sections create fresh context objects on re-render, wiping out uncommitted user drafts. Track user dirty state using refs (`isTitleDirty`, `isCommentsDirty`, `isEnabledDirty`) and compare incoming records against the last synchronized document snapshot, updating only unedited fields and resetting dirty flags exclusively upon successful save or explicit section switching.


- **News Flow:** Creating "News" is handled via the `ChangeNewsPage` component in `src/containers/AdminDashboard/AdminDashboardContent.tsx`. Updating and Deleting news happens through `src/containers/News/EditNewsDialog.tsx`.


- **Asynchronous Route Direct Visits & Loading State Retention:** When adding dynamic feature routes gated on async content fetch (such as `/event` enabled via admin toggle), never redirect immediately to home (`/`) when initial context state is `null` or uninitialized. Initial null state represents an in-flight fetch, not a disabled feature. Premature redirection during fresh direct navigation or browser page reloads replaces the route URL before the API response fulfills, breaking bookmarks and direct links. Always track loading state separately (`eventLoading`), retain the route with a placeholder container during in-flight requests, and only evaluate redirect logic once the fetch has completed. E2E tests must include direct navigation and reload assertions under simulated network latency alongside menu-click navigation.
