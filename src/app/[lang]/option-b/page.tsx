import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { isEnabledLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getOptionProjects } from "@/components/options/data";
import { OptionBHero } from "@/components/options/OptionBHero";
import { bSans } from "@/components/options/fonts";
import styles from "@/components/options/OptionB.module.css";

export const metadata: Metadata = { title: "Option B", robots: { index: false, follow: false } };

const tints = ["#e9eef2", "#f2eee0", "#f3e9ec"];

export default async function OptionBPage({ params }: PageProps<"/[lang]/option-b">) {
  const { lang } = await params;
  if (!isEnabledLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const { hero, options, about, contact, common } = dict;
  const projects = getOptionProjects(lang);
  const name = `${hero.firstName} ${hero.lastName}`;

  return (
    <div className={`${bSans.variable} ${styles.page}`}>
      <header className={styles.header}>
        <Link href={`/${lang}/option-b`} className={styles.brand}>
          {name}
        </Link>
        <nav className={styles.nav} aria-label={dict.nav.label}>
          <a href="#work">{options.work}</a>
          <a href="#about">{options.about}</a>
          <a href="#contact">{options.contact}</a>
        </nav>
        <span className={styles.navEnd}>{hero.role}</span>
      </header>

      <main id="main">
        <h1 className="visually-hidden">
          {name}, {hero.role}
        </h1>
        <OptionBHero
          name={name}
          projects={projects}
          labels={{
            imagePending: options.imagePending,
            pause: options.pause,
            play: options.play,
            viewProject: options.viewProject,
          }}
        />

        <section className={styles.section} id="work" aria-labelledby="b-work">
          <h2 className={styles.sectionLabel} id="b-work">
            {options.selectedWork}
          </h2>
          <ol className={styles.rows}>
            {projects.map((p, i) => {
              const img = p.cover ?? p.gallery[0] ?? null;
              return (
                <li key={p.slug} className={`${styles.row} ${styles.reveal}`}>
                  <Link
                    href={p.href}
                    className={styles.plate}
                    style={{ "--tint": tints[i % tints.length] } as CSSProperties}
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    {img ? (
                      <Image src={img.src} alt="" fill sizes="(max-width: 760px) 100vw, 60vw" />
                    ) : (
                      <span className={styles.platePending}>
                        {options.imagePending} · {p.title}
                      </span>
                    )}
                  </Link>
                  <div className={styles.rowText}>
                    <span className={styles.rowMeta}>
                      {p.number} — {p.kind}
                    </span>
                    <h3 className={styles.rowTitle}>{p.title}</h3>
                    <p className={styles.rowSummary}>
                      {p.summary.text}
                      {p.summary.draft && <span className={styles.draft}>{common.draft}</span>}
                    </p>
                    <Link href={p.href} className={styles.viewLink}>
                      {options.viewProject} <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <section className={`${styles.section} ${styles.reveal}`} id="about" aria-labelledby="b-about">
          <div className={styles.about}>
            <h2 className={styles.sectionLabel} id="b-about">
              {about.title}
            </h2>
            <div>
              <p className={styles.aboutText}>
                {about.intro.text}
                {about.intro.status === "draft" && <span className={styles.draft}>{common.draft}</span>}
              </p>
              <dl className={styles.facts}>
                {about.facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer} id="contact">
        <span>{contact.title}</span>
        <ul>
          {contact.links.map((l) => (
            <li key={l.label} className={styles.pending}>
              {l.label} ({contact.pending})
            </li>
          ))}
        </ul>
        <span>{name}</span>
      </footer>
    </div>
  );
}
