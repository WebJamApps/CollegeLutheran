import { FormControl, MenuItem, Select, SelectChangeEvent, Tooltip } from '@mui/material';
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

  const handleChange = (event: SelectChangeEvent<ThemePreference>) => {
    setPreference(event.target.value as ThemePreference);
  };

  const currentOption = options.find((opt) => opt.value === preference) || options[1];

  return (
    <Tooltip title={currentOption.title}>
      <FormControl
        size="small"
        className="theme-mode-selector-container"
        sx={{
          position: 'absolute',
          right: { xs: 10, sm: 14 },
          bottom: { xs: 8, sm: 10 },
          zIndex: 60,
        }}
      >
        <Select
          value={preference}
          onChange={handleChange}
          aria-label="Theme preference"
          variant="outlined"
          sx={{
            minWidth: { xs: 85, sm: 105 },
            height: 32,
            borderRadius: '16px',
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(13, 26, 51, 0.72)' : 'rgba(255, 255, 255, 0.16)',
            color: theme.palette.primary.contrastText,
            fontSize: { xs: '0.75rem', sm: '0.8rem' },
            lineHeight: 1.4,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.divider,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.secondary.light,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.secondary.light,
            },
            '& .MuiSvgIcon-root': {
              color: theme.palette.primary.contrastText,
            },
            '& .MuiSelect-select': {
              py: 0.5,
              px: 1.5,
              display: 'flex',
              alignItems: 'center',
            },
          }}
          MenuProps={{
            slotProps: {
              paper: {
                sx: {
                  bgcolor: theme.palette.background.paper,
                  backgroundImage: 'none',
                  boxShadow: theme.shadows[3],
                  border: `1px solid ${theme.palette.divider}`,
                },
              },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{
                fontSize: '0.85rem',
                py: 0.75,
                color: theme.palette.text.primary,
                '&.Mui-selected': {
                  bgcolor: theme.palette.action.selected,
                  color: theme.palette.text.primary,
                  '&:hover': {
                    bgcolor: theme.palette.action.selected,
                  },
                },
                '&:hover': {
                  bgcolor: theme.palette.action.hover,
                },
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Tooltip>
  );
}
