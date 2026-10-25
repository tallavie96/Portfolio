import type { Locale } from "./config";
import { en } from "@/content/dictionaries/en";

export type Dictionary = typeof en;

const dictionaries: Partial<Record<Locale, Dictionary>> = { en };

export function getDictionary(locale: Locale): Dictionary {
  const dict = dictionaries[locale];
  if (!dict) throw new Error(`No dictionary for locale "${locale}"`);
  return dict;
}
