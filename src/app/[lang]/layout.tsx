import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { direction, enabledLocales, isEnabledLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { bodyFont, displayFont, typeFont } from "@/styles/fonts";
import "@/styles/globals.css";
import styles from "./layout.module.css";

export function generateStaticParams() {
  return enabledLocales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isEnabledLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  return {
    title: { default: meta.title, template: `%s · ${meta.title}` },
    description: meta.description,
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isEnabledLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html
      lang={lang}
      dir={direction[lang]}
      className={`${displayFont.variable} ${bodyFont.variable} ${typeFont.variable}`}
    >
      <body>
        <a className={styles.skip} href="#main">
          {dict.skipLink}
        </a>
        {children}
      </body>
    </html>
  );
}
