import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import ThemeRegistry from '../providers/ThemeRegistry';
import AppStateProvider from '@/providers/AppStateProvider';
import UiPreferencesProvider from '@/providers/UiPreferencesProvider';
import AppShell from '@/shared/ui/AppShell';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'ShapeUp',
    template: '%s | ShapeUp',
  },
  description:
    'Flexible nutrition planning with BMR/TDEE calculations, food tracking, and daily compliance insights.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <UiPreferencesProvider>
          <ThemeRegistry>
            <AppStateProvider>
              <AppShell>{children}</AppShell>
            </AppStateProvider>
          </ThemeRegistry>
        </UiPreferencesProvider>
      </body>
    </html>
  );
}
