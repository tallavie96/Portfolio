import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isEnabledLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProjects } from "@/content/projects";
import { CopyText } from "@/components/ui/DraftTag";
import { Showcase, type ShowcaseProject } from "@/components/showcase/Showcase";
import styles from "./page.module.css";

/**
 * Homepage concept: an interactive, one-project-per-screen showcase.
 * Isolated from the main homepage for comparison, and not indexed.
 */
export async function generateMetadata({ params }: PageProps<"/[lang]/showcase">): Promise<Metadata> {
  const { lang } = await params;
  if (!isEnabledLocale(lang)) return {};
  return { title: getDictionary(lang).showcase.metaTitle, robots: { index: false, follow: false } };
}

export default async function ShowcasePage({ params }: PageProps<"/[lang]/showcase">) {
  const { lang } = await params;
  if (!isEnabledLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const { showcase, hero, contact } = dict;

  const projects: ShowcaseProject[] = getProjects(lang).map((p) => ({
    slug: p.slug,
    number: p.number,
    title: p.title,
    descriptor: p.kindLabel,
    details: p.tags,
    summary: { text: p.summary.text, draft: p.summary.status === "draft" },
    color: p.color,
    image: p.galleryImage,
    alt: p.coverAlt ?? "",
    href: `/${lang}/work/${p.slug}`,
  }));

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.identity}>
          <Link href={`/${lang}/showcase`} className={styles.name}>
            {hero.firstName} {hero.lastName}
          </Link>
          <span className={styles.role}>{hero.role}</span>
        </div>
        <p className={styles.intro}>
          <CopyText copy={dict.gallery.intro} draftLabel={dict.common.draft} />
        </p>
        <nav className={styles.nav} aria-label={dict.nav.label}>
          <Link href={`/${lang}#about`}>{showcase.nav.about}</Link>
          <a href="#contact">{showcase.nav.contact}</a>
        </nav>
      </header>

      <main id="main" className={styles.main}>
        <h1 className="visually-hidden">
          {hero.firstName} {hero.lastName}, {hero.role}
        </h1>
        <Showcase
          projects={projects}
          labels={{
            carousel: showcase.carouselLabel,
            index: showcase.indexLabel,
            previous: showcase.previous,
            next: showcase.next,
            view: showcase.view,
            imagePending: showcase.imagePending,
            status: showcase.status,
            hint: showcase.hint,
            draft: dict.common.draft,
          }}
        />
      </main>

      <footer className={styles.footer} id="contact">
        <span className={styles.footerLabel}>{showcase.nav.contact}</span>
        <ul className={styles.links}>
          {contact.links.map((link) => (
            <li key={link.label}>
              {link.href ? (
                <a href={link.href}>{link.label}</a>
              ) : (
                <span className={styles.pending}>
                  {link.label} <small>({contact.pending})</small>
                </span>
              )}
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
}
