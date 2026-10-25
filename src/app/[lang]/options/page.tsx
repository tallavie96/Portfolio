import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isEnabledLocale } from "@/i18n/config";

export const metadata: Metadata = { title: "Homepage options", robots: { index: false, follow: false } };

/** Index of the three homepage options, for comparing them. */
export default async function OptionsIndex({ params }: PageProps<"/[lang]/options">) {
  const { lang } = await params;
  if (!isEnabledLocale(lang)) notFound();
  return (
    <main id="main" style={{ padding: "48px 24px", maxWidth: 640 }}>
      <h1>Homepage options</h1>
      <ul>
        <li>
          <Link href={`/${lang}/option-a`}>Option A</Link>: letter grid after Hervé Baillargeon
        </li>
        <li>
          <Link href={`/${lang}/option-b`}>Option B</Link>: typography and slideshow opening after Moheim
        </li>
        <li>
          <Link href={`/${lang}/option-c`}>Option C</Link>: exposed grid, list and gallery views after Almond and
          Drive Capital
        </li>
      </ul>
    </main>
  );
}
