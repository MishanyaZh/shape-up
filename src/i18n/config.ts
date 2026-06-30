import i18next from 'i18next';
import en from '@/i18n/messages/en.json';
import uk from '@/i18n/messages/uk.json';
import pl from '@/i18n/messages/pl.json';

export type I18nLocale = 'en' | 'uk' | 'pl';
export type LocaleMessages = typeof en;

const i18nResources = {
  en: { translation: en },
  uk: { translation: uk },
  pl: { translation: pl },
} as const;

if (!i18next.isInitialized) {
  void i18next.init({
    resources: i18nResources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
  });
}

export function getLocaleMessages(locale: I18nLocale): LocaleMessages {
  return i18nResources[locale].translation;
}

export function setI18nLanguage(locale: I18nLocale) {
  return i18next.changeLanguage(locale);
}

export type TranslationVars = Record<string, string | number>;

export function translate(
  locale: I18nLocale,
  key: string,
  vars?: TranslationVars,
): string {
  return i18next.t(key, {
    lng: locale,
    ...vars,
  }) as string;
}
