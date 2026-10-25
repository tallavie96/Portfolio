import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isEnabledLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getOptionProjects } from "@/components/options/data";
import { OptionA } from "@/components/options/OptionA";
import { aDisplay, aMono } from "@/components/options/fonts";

export const metadata: Metadata = { title: "Option A", robots: { index: false, follow: false } };

export default async function OptionAPage({ params }: PageProps<"/[lang]/option-a">) {
  const { lang } = await params;
  if (!isEnabledLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const projects = getOptionProjects(lang);
  // Every real screen we have, for the rotating picture cells.
  const images = projects.flatMap((p) =>
    [...(p.cover ? [p.cover] : []), ...p.gallery].map((img) => ({ ...img, project: p.title })),
  );

  return (
    <div className={`${aDisplay.variable} ${aMono.variable}`}>
      <main id="main">
        <OptionA
          firstName={dict.hero.firstName}
          lastName={dict.hero.lastName}
          projects={projects}
          images={images}
          labels={{
            work: dict.options.work,
            info: dict.options.info,
            close: dict.options.close,
            role: dict.hero.role,
            intro: dict.hero.line.text,
            introDraft: dict.hero.line.status === "draft",
            draft: dict.common.draft,
            contactTitle: dict.contact.title,
            contactLinks: dict.contact.links.map((l) => l.label),
            pending: dict.contact.pending,
            imagePending: dict.options.imagePending,
          }}
        />
      </main>
    </div>
  );
}
