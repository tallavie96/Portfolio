import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { enabledLocales, isEnabledLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAdjacentProjects, getProject, projectSlugs } from "@/content/projects";
import { Placeholder } from "@/components/ui/Placeholder";
import { DraftTag } from "@/components/ui/DraftTag";
import { Toolbar } from "@/components/site/Toolbar";
import { SiteFooter } from "@/components/site/SiteFooter";
import { RevealObserver } from "@/components/site/RevealObserver";
import styles from "./page.module.css";

export function generateStaticParams() {
  return enabledLocales.flatMap((lang) => projectSlugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isEnabledLocale(lang)) return {};
  const project = getProject(lang, slug);
  return project ? { title: project.title } : {};
}

/** Temporary case-study page (Stage 3). The full template arrives in Stage 5. */
export default async function CaseStudyPage({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { lang, slug } = await params;
  if (!isEnabledLocale(lang)) notFound();
  const project = getProject(lang, slug);
  if (!project) notFound();
  const dict = getDictionary(lang);
  const { previous, next } = getAdjacentProjects(lang, project.slug);

  return (
    <>
      <main id="main">
        <section className={styles.opener} id="top" aria-labelledby="cs-title">
          <div className={`inner ${styles.split}`}>
            <div className={styles.copy}>
              <span className={styles.eyebrow}>
                {dict.caseStudy.eyebrow} · {project.number}
              </span>
              <h1 id="cs-title">{project.title}</h1>
              <p>
                {dict.caseStudy.inProgress} <DraftTag label={dict.common.placeholder} />
              </p>
              <p className={styles.muted}>{dict.caseStudy.inProgressBody}</p>
              <Link className={styles.back} href={`/${lang}#work`}>
                {dict.caseStudy.back}
              </Link>
            </div>
            <div className={styles.image}>
              <Placeholder label={dict.common.screensPending} color={project.color} />
            </div>
          </div>
        </section>

        <nav className={styles.pager} aria-label={`${dict.caseStudy.previous} / ${dict.caseStudy.next}`}>
          <Link href={`/${lang}/work/${previous.slug}`} className={styles.prev} rel="prev">
            <span className={styles.pagerLabel}>
              <Arrow back /> {dict.caseStudy.previous}
            </span>
            <span className={styles.pagerTitle}>{previous.title}</span>
          </Link>
          <Link href={`/${lang}/work/${next.slug}`} className={styles.next} rel="next">
            <span className={styles.pagerLabel}>
              {dict.caseStudy.next} <Arrow />
            </span>
            <span className={styles.pagerTitle}>{next.title}</span>
          </Link>
        </nav>
      </main>
      <SiteFooter dict={dict} />
      <RevealObserver />
      <Toolbar
        onHome={false}
        homeHref={`/${lang}`}
        homeLabel={dict.nav.home}
        label={dict.nav.label}
        items={[
          { id: "top", label: dict.nav.home },
          { id: "work", label: dict.nav.work },
          { id: "about", label: dict.nav.about },
          { id: "contact", label: dict.nav.contact },
        ]}
      />
    </>
  );
}

function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg className={`${styles.arrow} ${back ? styles.arrowBack : ""}`} viewBox="0 0 14 14" aria-hidden="true">
      <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
