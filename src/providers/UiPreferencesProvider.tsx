'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { PaletteMode } from '@mui/material';
import {
  getLocaleMessages,
  I18nLocale,
  LocaleMessages,
  setI18nLanguage,
  translate,
  TranslationVars,
} from '@/i18n/config';

export type AppLocale = I18nLocale;

interface UiPreferencesContextValue {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
  colorMode: PaletteMode;
  toggleColorMode: () => void;
  messages: LocaleMessages;
  t: (key: string, vars?: TranslationVars) => string;
}

const STORAGE_KEYS = {
  locale: 'shapeup.locale.v1',
  colorMode: 'shapeup.color-mode.v1',
} as const;

function normalizeStoredLocale(locale: string | null): AppLocale | null {
  if (locale === 'ua') {
    return 'uk';
  }

  if (locale === 'en' || locale === 'uk' || locale === 'pl') {
    return locale;
  }

  return null;
}

const UiPreferencesContext = createContext<UiPreferencesContextValue | null>(
  null,
);

export default function UiPreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<AppLocale>('en');
  const [colorMode, setColorMode] = useState<PaletteMode>('light');

  useEffect(() => {
    const storedLocale = localStorage.getItem(STORAGE_KEYS.locale);
    const normalizedLocale = normalizeStoredLocale(storedLocale);
    if (normalizedLocale) {
      setLocaleState(normalizedLocale);
      if (storedLocale !== normalizedLocale) {
        localStorage.setItem(STORAGE_KEYS.locale, normalizedLocale);
      }
    }

    const storedMode = localStorage.getItem(STORAGE_KEYS.colorMode);
    if (storedMode === 'light' || storedMode === 'dark') {
      setColorMode(storedMode);
    }
  }, []);

  useEffect(() => {
    void setI18nLanguage(locale);

    document.documentElement.setAttribute('lang', locale);
  }, [locale]);

  const setLocale = (nextLocale: AppLocale) => {
    setLocaleState(nextLocale);
    localStorage.setItem(STORAGE_KEYS.locale, nextLocale);
  };

  const toggleColorMode = () => {
    setColorMode((current) => {
      const next = current === 'light' ? 'dark' : 'light';
      localStorage.setItem(STORAGE_KEYS.colorMode, next);
      return next;
    });
  };

  const messages = useMemo(() => getLocaleMessages(locale), [locale]);
  const t = useMemo(
    () => (key: string, vars?: TranslationVars) => translate(locale, key, vars),
    [locale],
  );

  const value = useMemo<UiPreferencesContextValue>(
    () => ({
      locale,
      setLocale,
      colorMode,
      toggleColorMode,
      messages,
      t,
    }),
    [colorMode, locale, messages, t],
  );

  return (
    <UiPreferencesContext.Provider value={value}>
      {children}
    </UiPreferencesContext.Provider>
  );
}

export function useUiPreferences() {
  const context = useContext(UiPreferencesContext);

  if (!context) {
    throw new Error(
      'useUiPreferences must be used within UiPreferencesProvider',
    );
  }

  return context;
}
