'use client';

import Link from 'next/link';
import {
  AppBar,
  Box,
  Container,
  Drawer,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useMemo, useState } from 'react';
import { AppLocale, useUiPreferences } from '@/providers/UiPreferencesProvider';
import Button from '@/shared/ui/Button';

interface NavItem {
  href: string;
  label: string;
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { locale, setLocale, colorMode, toggleColorMode, messages } =
    useUiPreferences();

  const navItems = useMemo<NavItem[]>(
    () => [
      { href: '/', label: messages.nav.home },
      { href: '/calculators', label: messages.nav.calculators },
      { href: '/nutrition', label: messages.nav.nutrition },
      { href: '/progress', label: messages.nav.progress },
    ],
    [messages.nav],
  );

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor:
            colorMode === 'dark'
              ? 'rgba(11, 18, 32, 0.72)'
              : 'rgba(255, 255, 255, 0.78)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{ px: { xs: 0, md: 0 }, justifyContent: 'space-between' }}
          >
            <Typography
              variant="h6"
              component={Link}
              href="/"
              sx={{
                fontWeight: 700,
                letterSpacing: 0.3,
                textDecoration: 'none',
                color: 'text.primary',
                mr: 2,
              }}
            >
              ShapeUp
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1 }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  component={Link}
                  href={item.href}
                  color="inherit"
                  variant="text"
                  sx={{ color: 'text.primary' }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <FormControl size="small" sx={{ minWidth: 96 }}>
                <Select
                  value={locale}
                  onChange={(event) =>
                    setLocale(event.target.value as AppLocale)
                  }
                  displayEmpty
                  MenuProps={{ disableScrollLock: true }}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                  }}
                >
                  <MenuItem value="en">EN</MenuItem>
                  <MenuItem value="uk">UA</MenuItem>
                  <MenuItem value="pl">PL</MenuItem>
                </Select>
              </FormControl>

              <IconButton
                onClick={toggleColorMode}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                }}
                aria-label={messages.controls.theme}
              >
                {colorMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>

              <IconButton
                sx={{ display: { xs: 'inline-flex', md: 'none' } }}
                onClick={() => setIsDrawerOpen(true)}
                aria-label={messages.nav.menu}
              >
                <MenuIcon />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box sx={{ width: 280, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {messages.nav.menu}
          </Typography>
          <Stack spacing={1}>
            {navItems.map((item) => (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                variant="outlined"
                onClick={() => setIsDrawerOpen(false)}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Box>
      </Drawer>

      <Box component="main" sx={{ pt: 3, pb: 6 }}>
        {children}
      </Box>
    </Box>
  );
}
