import { tr } from './tr';
import { en } from './en';
import type { Dictionary } from './types';

export type Locale = 'tr' | 'en';

const dictionaries: Record<Locale, Dictionary> = { tr, en };

export function t(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
