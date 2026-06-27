import {
  createContext, ReactNode, useContext, useEffect, useMemo, useState,
} from 'react';
import {
  createTheme, ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';

export type ThemePreference = 'light' | 'dark' | 'system';
export type ResolvedThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'clc-theme-preference';
const SYSTEM_DARK_QUERY = '(prefers-color-scheme: dark)';

const brand = {
  blue: '#244a8b',
  blueDark: '#14284d',
  blueNight: '#0d1a33',
  gold: '#f4c00e',
  plum: '#2a222a',
  linkBlue: '#88c1ff',
  paperWarm: '#f7f9fc',
};

interface ThemePreferenceContextValue {
  preference: ThemePreference;
  resolvedMode: ResolvedThemeMode;
  setPreference: (preference: ThemePreference) => void;
}

const ThemePreferenceContext = createContext<ThemePreferenceContextValue>({
  preference: 'system',
  resolvedMode: 'light',
  setPreference: () => undefined,
});

export function getStoredThemePreference(storage: Storage | undefined = window.localStorage): ThemePreference {
  try {
    const value = storage?.getItem(STORAGE_KEY);
    if (value === 'light' || value === 'dark' || value === 'system') return value;
  } catch {
    return 'system';
  }
  return 'system';
}

export function resolveThemeMode(preference: ThemePreference, systemPrefersDark: boolean): ResolvedThemeMode {
  if (preference === 'system') return systemPrefersDark ? 'dark' : 'light';
  return preference;
}

export function makeCollegeLutheranTheme(mode: ResolvedThemeMode) {
  const darkMode = mode === 'dark';
  return createTheme({
    palette: {
      mode,
      primary: {
        main: brand.blue,
        light: '#5478b7',
        dark: brand.blueDark,
        contrastText: '#ffffff',
      },
      secondary: {
        main: brand.gold,
        light: '#ffe27a',
        dark: '#9f7b00',
        contrastText: '#1e1a0a',
      },
      background: {
        default: darkMode ? brand.blueNight : '#ffffff',
        paper: darkMode ? '#182848' : brand.paperWarm,
      },
      text: {
        primary: darkMode ? '#eef4ff' : '#212529',
        secondary: darkMode ? '#c9d6eb' : '#4c5664',
      },
      divider: darkMode ? 'rgba(244, 192, 14, 0.26)' : 'rgba(36, 74, 139, 0.18)',
      error: {
        main: darkMode ? '#ff8a80' : '#c62828',
      },
      action: {
        hover: darkMode ? 'rgba(244, 192, 14, 0.12)' : 'rgba(36, 74, 139, 0.08)',
        selected: darkMode ? 'rgba(244, 192, 14, 0.18)' : 'rgba(36, 74, 139, 0.12)',
        focus: darkMode ? 'rgba(244, 192, 14, 0.34)' : 'rgba(36, 74, 139, 0.28)',
        disabledBackground: darkMode ? 'rgba(201, 214, 235, 0.16)' : 'rgba(0, 0, 0, 0.12)',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: darkMode ? brand.blueNight : '#ffffff',
            color: darkMode ? '#eef4ff' : '#212529',
          },
          'a, a:not([href]):not([tabindex])': {
            color: darkMode ? brand.linkBlue : '#23527c',
          },
          'a:hover, a:not([href]):not([tabindex]):hover': {
            color: darkMode ? '#cce0ff' : '#0056b3',
          },
          'button:focus-visible, a:focus-visible, [role="button"]:focus-visible': {
            outline: `3px solid ${darkMode ? brand.gold : brand.blue}`,
            outlineOffset: '2px',
          },
          '@media (prefers-reduced-motion: reduce)': {
            '*, *::before, *::after': {
              animationDuration: '0.01ms !important',
              animationIterationCount: '1 !important',
              scrollBehavior: 'auto !important',
              transitionDuration: '0.01ms !important',
            },
          },
        },
      },
    },
  });
}

function themeVariables(mode: ResolvedThemeMode) {
  const darkMode = mode === 'dark';
  return {
    ':root': {
      colorScheme: mode,
      '--clc-header-bg': darkMode ? brand.plum : brand.blue,
      '--clc-header-text': '#ffffff',
      '--clc-brand-gold': brand.gold,
      '--clc-page-bg': darkMode ? brand.blueNight : '#ffffff',
      '--clc-paper-bg': darkMode ? '#182848' : brand.paperWarm,
      '--clc-drawer-bg': darkMode ? '#111a2c' : '#c0c0c0',
      '--clc-drawer-hover': darkMode ? 'rgba(244, 192, 14, 0.12)' : '#ffffff',
      '--clc-text-primary': darkMode ? '#eef4ff' : '#212529',
      '--clc-text-secondary': darkMode ? '#c9d6eb' : '#4c5664',
      '--clc-link': darkMode ? brand.linkBlue : '#23527c',
      '--clc-link-hover': darkMode ? '#cce0ff' : '#0056b3',
      '--clc-border': darkMode ? 'rgba(244, 192, 14, 0.26)' : 'rgba(36, 74, 139, 0.18)',
      '--clc-caption-bg': darkMode ? '#22345d' : '#c0c0c0',
      '--clc-danger': darkMode ? '#ff8a80' : '#c62828',
    },
  };
}

export function CollegeLutheranThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>(() => getStoredThemePreference());
  const [systemPrefersDark, setSystemPrefersDark] = useState(() => (
    window.matchMedia?.(SYSTEM_DARK_QUERY).matches ?? false
  ));
  const resolvedMode = resolveThemeMode(preference, systemPrefersDark);
  const theme = useMemo(() => makeCollegeLutheranTheme(resolvedMode), [resolvedMode]);

  useEffect(() => {
    const media = window.matchMedia?.(SYSTEM_DARK_QUERY);
    if (!media) return undefined;
    const updateSystemMode = (event: MediaQueryListEvent | MediaQueryList) => setSystemPrefersDark(event.matches);
    updateSystemMode(media);
    media.addEventListener?.('change', updateSystemMode);
    media.addListener?.(updateSystemMode);
    return () => {
      media.removeEventListener?.('change', updateSystemMode);
      media.removeListener?.(updateSystemMode);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.themePreference = preference;
    document.documentElement.dataset.themeMode = resolvedMode;
  }, [preference, resolvedMode]);

  const setPreference = (nextPreference: ThemePreference) => {
    setPreferenceState(nextPreference);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextPreference);
    } catch {
      // Storage can be unavailable in private contexts; the in-memory choice still applies.
    }
  };

  const contextValue = useMemo(() => ({
    preference,
    resolvedMode,
    setPreference,
  }), [preference, resolvedMode]);

  return (
    <ThemePreferenceContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={themeVariables(resolvedMode)} />
        {children}
      </MuiThemeProvider>
    </ThemePreferenceContext.Provider>
  );
}

export function useThemePreference() {
  return useContext(ThemePreferenceContext);
}
