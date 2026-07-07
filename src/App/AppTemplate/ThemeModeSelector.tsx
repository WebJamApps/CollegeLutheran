import { FormControl, NativeSelect, Tooltip, useTheme } from '@mui/material';
import { ThemePreference, useThemePreference } from '../theme';

const options: { value: ThemePreference, label: string, title: string }[] = [
  { value: 'light', label: 'Light', title: 'Use light theme' },
  { value: 'system', label: 'System', title: 'Follow system theme' },
  { value: 'dark', label: 'Dark', title: 'Use dark theme' },
];

export function ThemeModeSelector() {
  const theme = useTheme();
  const { preference, setPreference } = useThemePreference();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPreference(event.target.value as ThemePreference);
  };

  const currentOption = options.find((opt) => opt.value === preference) || options[1];

  return (
    <Tooltip title={currentOption.title}>
      <FormControl
        size="small"
        sx={{
          position: 'absolute',
          right: { xs: 10, sm: 14 },
          bottom: { xs: 8, sm: 10 },
          zIndex: 60,
        }}
      >
        <NativeSelect
          value={preference}
          onChange={handleChange}
          inputProps={{
            'aria-label': 'Theme preference',
          }}
          sx={{
            minWidth: { xs: 85, sm: 105 },
            height: 32,
            borderRadius: '16px',
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(13, 26, 51, 0.72)' : 'rgba(255, 255, 255, 0.16)',
            color: theme.palette.primary.contrastText,
            fontSize: { xs: '0.75rem', sm: '0.8rem' },
            lineHeight: 1.4,
            border: `1px solid ${theme.palette.divider}`,
            px: 1,
            '&::before, &:after': {
              display: 'none', // Remove the default MUI underline
            },
            '& .MuiNativeSelect-select': {
              py: 0.5,
              pr: '24px !important', // Leave space for the dropdown arrow
              pl: 0.5,
              color: 'inherit',
              '&:focus': {
                backgroundColor: 'transparent',
              },
            },
            '& .MuiNativeSelect-icon': {
              color: theme.palette.primary.contrastText,
            },
          }}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              style={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
              }}
            >
              {option.label}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </Tooltip>
  );
}
