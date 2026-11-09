# admin-dashboard rules



- **Editor Draft Preservation Across Context Re-renders:** When editing forms in administrative dashboards backed by broad application contexts (such as `ContentContext`), never blindly reset form inputs (`title`, `comments`, `enabled`) in `useEffect` on every reference change of the top-level context wrapper. Unrelated background fetches (such as news, picture, or header updates) or updates to other sections create fresh context objects on re-render, wiping out uncommitted user drafts. Track user dirty state using refs (`isTitleDirty`, `isCommentsDirty`, `isEnabledDirty`) and compare incoming records against the last synchronized document snapshot, updating only unedited fields and resetting dirty flags exclusively upon successful save or explicit section switching.
