export const locales = ["en", "he"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/**
 * Locales that are built and linked. Hebrew is paused until its copy exists,
 * but the layout is direction-aware so turning it on is a content task.
 */
export const enabledLocales: readonly Locale[] = ["en"];

export const direction: Record<Locale, "ltr" | "rtl"> = { en: "ltr", he: "rtl" };

export function isEnabledLocale(value: string): value is Locale {
  return (enabledLocales as readonly string[]).includes(value);
}
