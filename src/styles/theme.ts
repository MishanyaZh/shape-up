import { createTheme, PaletteMode } from '@mui/material/styles';

export function createAppTheme(mode: PaletteMode) {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#22d3ee' : '#0f766e',
      },
      secondary: {
        main: isDark ? '#fb923c' : '#ea580c',
      },
      background: {
        default: isDark ? '#0b1220' : '#f4f8ff',
        paper: isDark ? '#111b2f' : '#ffffff',
      },
      text: {
        primary: isDark ? '#e6edf9' : '#0f172a',
        secondary: isDark ? '#9fb0cc' : '#334155',
      },
      divider: isDark ? 'rgba(159, 176, 204, 0.24)' : 'rgba(15, 23, 42, 0.12)',
    },
    shape: {
      borderRadius: 16,
    },
    typography: {
      fontFamily:
        'var(--font-geist-sans), "Avenir Next", "Trebuchet MS", sans-serif',
      h1: {
        fontWeight: 800,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontWeight: 800,
        letterSpacing: '-0.02em',
      },
      h3: {
        fontWeight: 700,
      },
      button: {
        textTransform: 'none',
        fontWeight: 700,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundImage: isDark
              ? 'radial-gradient(circle at 10% 0%, rgba(34, 211, 238, 0.18), transparent 40%), radial-gradient(circle at 90% 10%, rgba(249, 115, 22, 0.16), transparent 45%)'
              : 'radial-gradient(circle at 5% 0%, rgba(15, 118, 110, 0.12), transparent 42%), radial-gradient(circle at 98% 10%, rgba(234, 88, 12, 0.14), transparent 40%)',
            backgroundAttachment: 'fixed',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: '1px solid',
            borderColor: isDark
              ? 'rgba(159, 176, 204, 0.2)'
              : 'rgba(15, 23, 42, 0.08)',
            boxShadow: isDark
              ? '0 12px 32px rgba(0, 0, 0, 0.34)'
              : '0 10px 28px rgba(15, 23, 42, 0.1)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            paddingInline: 18,
          },
        },
      },
    },
  });
}
