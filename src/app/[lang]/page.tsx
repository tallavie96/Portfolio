import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { isEnabledLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getHomeProjects } from "@/components/home/data";
import { HomeHero } from "@/components/home/HomeHero";
import { Intro } from "@/components/home/Intro";
import { PhoneTrio } from "@/components/home/PhoneTrio";
import { sans } from "@/styles/fonts";
import styles from "@/components/home/Home.module.css";

const tints = ["#e9eef2", "#f2eee0", "#f3e9ec"];

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isEnabledLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const { hero, home, about, contact, common } = dict;
  const projects = getHomeProjects(lang);
  const name = `${hero.firstName} ${hero.lastName}`;

  return (
    <div className={`${sans.variable} ${styles.page}`} id="top">
      <Intro name={name} />

      <header className={styles.header}>
        <Link href={`/${lang}`} className={styles.brand}>
          {name}
        </Link>
        <span className={styles.role}>{hero.role}</span>
      </header>

      <main id="main">
        <h1 className="visually-hidden">
          {name}, {hero.role}
        </h1>
        <HomeHero
          name={name}
          projects={projects}
          labels={{
            imagePending: home.imagePending,
            pause: home.pause,
            play: home.play,
            slideshow: home.slideshow,
          }}
        />

        <section className={styles.section} id="work" aria-labelledby="home-work">
          <h2 className={styles.sectionLabel} id="home-work">
            {home.selectedWork}
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
                    {p.phones.length > 0 ? (
                      <span className={styles.platePhones}>
                        <PhoneTrio phones={p.phones} sizes="(max-width: 760px) 30vw, 18vw" />
                      </span>
                    ) : img ? (
                      <Image src={img.src} alt="" fill sizes="(max-width: 760px) 100vw, 60vw" />
                    ) : (
                      <span className={styles.platePending}>
                        {home.imagePending} · {p.title}
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
                      {home.viewProject} <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <section className={`${styles.section} ${styles.reveal}`} id="about" aria-labelledby="home-about">
          <div className={styles.about}>
            <h2 className={styles.sectionLabel} id="home-about">
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
        <nav className={styles.footerNav} aria-label={dict.nav.label}>
          <a href="#work">{home.work}</a>
          <a href="#about">{home.about}</a>
        </nav>
        <div className={styles.footerContact}>
          <span>{home.contact}</span>
          <ul>
            {contact.links.map((l) =>
              l.href ? (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ) : (
                <li key={l.label} className={styles.pending}>
                  {l.label} ({contact.pending})
                </li>
              ),
            )}
          </ul>
        </div>
        <span className={styles.footerName}>{name}</span>
      </footer>
    </div>
  );
}
