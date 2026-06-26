import { Button, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ThemePreference, useThemePreference } from '../theme';

const options: { value: ThemePreference, label: string, title: string }[] = [
  { value: 'light', label: 'Light', title: 'Use light theme' },
  { value: 'system', label: 'System', title: 'Follow system theme' },
  { value: 'dark', label: 'Dark', title: 'Use dark theme' },
];

export function ThemeModeSelector() {
  const theme = useTheme();
  const { preference, setPreference } = useThemePreference();
  return (
    <div
      className="theme-mode-selector"
      aria-label="Theme preference"
      role="group"
      style={{
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(13, 26, 51, 0.72)' : 'rgba(255, 255, 255, 0.16)',
      }}
    >
      {options.map((option) => {
        const selected = preference === option.value;
        return (
          <Tooltip key={option.value} title={option.title}>
            <Button
              size="small"
              type="button"
              aria-pressed={selected}
              onClick={() => setPreference(option.value)}
              className={selected ? 'theme-mode-option selected' : 'theme-mode-option'}
              sx={{
                minWidth: { xs: 28, sm: 54 },
                px: { xs: 0.75, sm: 1 },
                py: 0.25,
                borderRadius: 0,
                color: selected ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText,
                backgroundColor: selected ? theme.palette.secondary.main : 'transparent',
                fontSize: { xs: '0.68rem', sm: '0.72rem' },
                lineHeight: 1.4,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: selected ? theme.palette.secondary.light : theme.palette.action.hover,
                },
                '&:focus-visible': {
                  outline: `2px solid ${theme.palette.secondary.light}`,
                  outlineOffset: '-2px',
                },
              }}
            >
              {option.label}
            </Button>
          </Tooltip>
        );
      })}
    </div>
  );
}
