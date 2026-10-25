import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { isEnabledLocale, type Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import { getProjects, type Project } from "@/content/projects";
import { CopyText } from "@/components/ui/DraftTag";
import { RevealObserver } from "@/components/site/RevealObserver";
import styles from "./page.module.css";

/**
 * Alternative homepage concept: a curated, photography-style gallery.
 * Kept separate from the main homepage (/[lang]) for comparison, and not indexed.
 */
export async function generateMetadata({ params }: PageProps<"/[lang]/gallery">): Promise<Metadata> {
  const { lang } = await params;
  if (!isEnabledLocale(lang)) return {};
  return { title: getDictionary(lang).gallery.metaTitle, robots: { index: false, follow: false } };
}

// Each plate has its own place and proportion in the composition.
const plates = [
  { slot: "a", ratio: "4 / 5", sizes: "(max-width: 760px) 100vw, 56vw" },
  { slot: "b", ratio: "5 / 4", sizes: "(max-width: 760px) 88vw, 40vw" },
  { slot: "c", ratio: "1967 / 1388", sizes: "100vw" },
] as const;

export default async function GalleryHomePage({ params }: PageProps<"/[lang]/gallery">) {
  const { lang } = await params;
  if (!isEnabledLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const { gallery, hero } = dict;
  const projects = getProjects(lang);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.bar}>
          <Link href={`/${lang}/gallery`} className={styles.name}>
            {hero.firstName} {hero.lastName}
          </Link>
          <span className={styles.role}>{hero.role}</span>
          <nav className={styles.nav} aria-label={dict.nav.label}>
            <a href="#work">{gallery.nav.work}</a>
            <a href="#contact">{gallery.nav.contact}</a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className={styles.intro} aria-label={hero.role}>
          <p className={styles.introText}>
            <CopyText copy={gallery.intro} draftLabel={dict.common.draft} />
          </p>
        </section>

        <section id="work" aria-label={dict.work.title}>
          <h2 className="visually-hidden">{dict.work.title}</h2>
          <ol className={styles.gallery}>
            {projects.map((project, i) => (
              <Plate key={project.slug} project={project} plate={plates[i % plates.length]} lang={lang} dict={dict} />
            ))}
          </ol>
        </section>
      </main>

      <footer className={styles.footer} id="contact">
        <div className={styles.footerInner}>
          <h2 className={styles.footerTitle}>{gallery.contactTitle}</h2>
          <ul className={styles.links}>
            {dict.contact.links.map((link) => (
              <li key={link.label}>
                {link.href ? (
                  <a href={link.href}>{link.label}</a>
                ) : (
                  <span className={styles.pending}>
                    {link.label} <small>({dict.contact.pending})</small>
                  </span>
                )}
              </li>
            ))}
          </ul>
          <p className={styles.footerNote}>{gallery.contactNote}</p>
        </div>
      </footer>

      <RevealObserver />
    </div>
  );
}

function Plate({
  project,
  plate,
  lang,
  dict,
}: {
  project: Project;
  plate: (typeof plates)[number];
  lang: Locale;
  dict: Dictionary;
}) {
  const image = project.galleryImage;
  return (
    <li className={`${styles.plate} ${styles[plate.slot]}`} data-reveal="plate">
      <Link href={`/${lang}/work/${project.slug}`} className={styles.link}>
        <div className={styles.image} style={{ aspectRatio: plate.ratio } as CSSProperties}>
          {image ? (
            <Image src={image} alt={project.coverAlt ?? ""} fill sizes={plate.sizes} />
          ) : (
            <div className={styles.pending}>
              <span>
                {dict.gallery.imagePending} · {project.title}
              </span>
            </div>
          )}
        </div>
        <div className={styles.caption}>
          <span className={styles.index}>{project.number}</span>
          <span className={styles.title}>{project.title}</span>
          <span className={styles.label}>{project.tags.join(" · ")}</span>
          <span className="visually-hidden">{dict.gallery.view}</span>
        </div>
      </Link>
    </li>
  );
}
