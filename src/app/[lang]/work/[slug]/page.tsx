import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { enabledLocales, isEnabledLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAdjacentProjects, getProject, projectSlugs } from "@/content/projects";
import { Placeholder } from "@/components/ui/Placeholder";
import { DraftTag } from "@/components/ui/DraftTag";
import { SiteFooter } from "@/components/site/SiteFooter";

export function generateStaticParams() {
  return enabledLocales.flatMap((lang) => projectSlugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isEnabledLocale(lang)) return {};
  const project = getProject(lang, slug);
  return project ? { title: project.title } : {};
}

/** Case-study content skeleton. The template and visual design come later. */
export default async function CaseStudyPage({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { lang, slug } = await params;
  if (!isEnabledLocale(lang)) notFound();
  const project = getProject(lang, slug);
  if (!project) notFound();
  const dict = getDictionary(lang);
  const { previous, next } = getAdjacentProjects(lang, project.slug);

  return (
    <>
      <header id="top">
        <Link href={`/${lang}`}>
          {dict.hero.firstName} {dict.hero.lastName}
        </Link>
      </header>

      <main id="main">
        <p>
          {dict.caseStudy.eyebrow} · {project.number}
        </p>
        <h1>{project.title}</h1>
        <p>
          {dict.caseStudy.inProgress} <DraftTag label={dict.common.placeholder} />
        </p>
        <p>{dict.caseStudy.inProgressBody}</p>
        <Placeholder label={dict.common.screensPending} />
        <p>
          <Link href={`/${lang}#work`}>{dict.caseStudy.back}</Link>
        </p>

        <nav aria-label={`${dict.caseStudy.previous} / ${dict.caseStudy.next}`}>
          <Link href={`/${lang}/work/${previous.slug}`} rel="prev">
            {dict.caseStudy.previous}: {previous.title}
          </Link>{" "}
          <Link href={`/${lang}/work/${next.slug}`} rel="next">
            {dict.caseStudy.next}: {next.title}
          </Link>
        </nav>
      </main>

      <SiteFooter dict={dict} />
    </>
  );
}
