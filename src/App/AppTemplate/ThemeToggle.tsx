import { useThemePreference } from '../theme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemePreference();
  const isDark = theme === 'dark';
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleTheme();
  };
  return (
    <div className="menu-item theme-toggle theme-mode-selector">
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className={`theme-switch ${isDark ? 'is-dark' : 'is-light'}`}
        onClick={handleClick}
      >
        <span className="theme-switch-side theme-switch-light">
          <i className="fas fa-sun" aria-hidden="true" />
          <span className="theme-switch-side-label">Light</span>
        </span>
        <span className="theme-switch-side theme-switch-dark">
          <i className="fas fa-moon" aria-hidden="true" />
          <span className="theme-switch-side-label">Dark</span>
        </span>
        <span className="theme-switch-thumb" aria-hidden="true" />
      </button>
    </div>
  );
}

export default ThemeToggle;
