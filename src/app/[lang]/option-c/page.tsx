import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isEnabledLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getOptionProjects } from "@/components/options/data";
import { OptionC } from "@/components/options/OptionC";
import { cDisplay, cMono, cSerif } from "@/components/options/fonts";

export const metadata: Metadata = { title: "Option C", robots: { index: false, follow: false } };

export default async function OptionCPage({ params }: PageProps<"/[lang]/option-c">) {
  const { lang } = await params;
  if (!isEnabledLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const { hero, options, contact, common } = dict;

  return (
    <div className={`${cDisplay.variable} ${cSerif.variable} ${cMono.variable}`}>
      <OptionC
        name={`${hero.firstName} ${hero.lastName}`}
        projects={getOptionProjects(lang)}
        labels={{
          selectedWork: options.selectedWork,
          allProjects: options.allProjects,
          list: options.list,
          gallery: options.gallery,
          view: options.view,
          viewProject: options.viewProject,
          imagePending: options.imagePending,
          intro: hero.line.text,
          introDraft: hero.line.status === "draft",
          draft: common.draft,
          role: hero.role,
          contact: contact.title,
          contactLinks: contact.links.map((l) => l.label),
          pending: contact.pending,
        }}
      />
    </div>
  );
}
