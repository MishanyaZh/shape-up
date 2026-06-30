'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme } from '@/styles/theme';
import { useMemo } from 'react';
import { useUiPreferences } from '@/providers/UiPreferencesProvider';

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const { colorMode } = useUiPreferences();
  const theme = useMemo(() => createAppTheme(colorMode), [colorMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
