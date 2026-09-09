import { Language } from '../types';
import { enLocale } from './en';
import { hiLocale } from './hi';
import { mrLocale } from './mr';

export const locales = {
  en: enLocale,
  hi: hiLocale,
  mr: mrLocale
};

export function getLocale(lang: Language) {
  return locales[lang] || locales.en;
}
