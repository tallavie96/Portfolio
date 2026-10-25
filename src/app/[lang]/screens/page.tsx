import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isEnabledLocale } from "@/i18n/config";
import { HomeView } from "@/components/home/HomeView";

// Alternative homepage for comparison: screens instead of photos. Not for search engines.
export const metadata: Metadata = { robots: { index: false } };

export default async function ScreensHomePage({ params }: PageProps<"/[lang]/screens">) {
  const { lang } = await params;
  if (!isEnabledLocale(lang)) notFound();
  return <HomeView lang={lang} variant="screens" />;
}
