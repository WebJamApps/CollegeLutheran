# styles rules



- **Mobile CSS Cascade Specificity for Drawer Menu Items:** In `styles.scss`, `@use 'mobile'` is loaded after `@use 'menu'`. A single class `.menu-sub-item { padding-left: 24px; }` has specificity (0, 1, 0), so a mobile media query targeting `.menu-item { padding-left: 10px; }` (also (0, 1, 0)) overrides it due to later source order. Raising specificity with a compound selector (e.g. `.menu-item.menu-sub-item` with specificity (0, 2, 0)) in `_menu.scss` ensures the indentation wins over mobile media queries without duplicating rules into `_mobile.scss`.


- **Dark Reader Chrome Extension Testing Gotcha:** When testing light/dark mode theme transitions locally or in Chrome, ensure the Chrome extension 'Dark Reader' is disabled. Having Dark Reader active forces inverted or grayed styling onto elements (e.g. side nav), masking native CSS theme transitions and making it appear as if theme switching is broken.
