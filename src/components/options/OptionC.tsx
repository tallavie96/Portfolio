"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { OptionProject } from "./data";
import styles from "./OptionC.module.css";

interface Labels {
  selectedWork: string;
  allProjects: string;
  list: string;
  gallery: string;
  view: string;
  viewProject: string;
  imagePending: string;
  intro: string;
  introDraft: boolean;
  draft: string;
  role: string;
  contact: string;
  contactLinks: string[];
  pending: string;
}

/**
 * Option C (after Almond + Drive Capital): an exposed hairline grid with two views
 * of the same three projects. List: names in a column, selecting one shows its
 * image and description (Almond's client list). Gallery: the title runs large
 * behind the image, with thumbnails to pick from (Drive's gallery view).
 */
export function OptionC({ name, projects, labels }: { name: string; projects: OptionProject[]; labels: Labels }) {
  const [view, setView] = useState<"list" | "gallery">("gallery");
  const [current, setCurrent] = useState(0);
  const total = projects.length;
  const active = projects[current];
  const image = (p: OptionProject) => p.cover ?? p.gallery[0] ?? null;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const rtl = document.documentElement.dir === "rtl";
      const fwd = rtl ? "ArrowLeft" : "ArrowRight";
      const back = rtl ? "ArrowRight" : "ArrowLeft";
      if (e.key === fwd || e.key === "ArrowDown") setCurrent((c) => (c + 1) % total);
      else if (e.key === back || e.key === "ArrowUp") setCurrent((c) => (c - 1 + total) % total);
      else return;
      e.preventDefault();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  return (
    <div className={styles.page} data-option="c">
      <header className={styles.header}>
        <span className={styles.brand}>{name}</span>
        <nav className={styles.nav} aria-label="Main">
          <a href="#work" aria-current="page">
            <span className={styles.dot} aria-hidden="true" /> {labels.selectedWork}
          </a>
          <a href="#contact">{labels.contact}</a>
        </nav>
      </header>

      <main id="main" className={styles.main}>
        <h1 className="visually-hidden">
          {name}, {labels.role}
        </h1>
        <div className={styles.bar} id="work">
          <h2 className={styles.label}>{labels.selectedWork}</h2>
          <div className={styles.switch} role="group" aria-label="View">
            <button type="button" aria-pressed={view === "list"} onClick={() => setView("list")} data-view-btn="list">
              {labels.list}
            </button>
            <button
              type="button"
              aria-pressed={view === "gallery"}
              onClick={() => setView("gallery")}
              data-view-btn="gallery"
            >
              {labels.gallery}
            </button>
          </div>
        </div>

        <div className={styles.list} data-view="list" hidden={view !== "list"}>
          <div className={styles.side}>
            <p className={styles.mono}>
              <span className={styles.dot} aria-hidden="true" /> {labels.allProjects} ({total})
            </p>
            <p className={styles.intro}>
              {labels.intro}
              {labels.introDraft && <span className={styles.draft}>{labels.draft}</span>}
            </p>
          </div>
          <ol className={styles.names}>
            {projects.map((p, i) => (
              <li key={p.slug} className={styles.nameRow} data-for={i} data-active={i === current}>
                <button type="button" onClick={() => setCurrent(i)} aria-pressed={i === current} data-pick={i}>
                  {p.title}
                </button>
                <span className={styles.chip}>{p.kind}</span>
              </li>
            ))}
          </ol>
          <div className={styles.preview}>
            {projects.map((p, i) => {
              const img = image(p);
              return (
                <div
                  key={p.slug}
                  className={styles.previewItem}
                  data-for={i}
                  data-active={i === current}
                  hidden={i !== current}
                >
                  <Link href={p.href} className={styles.previewImage} aria-label={`${labels.viewProject}: ${p.title}`}>
                    {img ? (
                      <Image src={img.src} alt={img.alt} fill sizes="(max-width: 760px) 100vw, 36vw" />
                    ) : (
                      <span className={styles.pending}>
                        {labels.imagePending} · {p.title}
                      </span>
                    )}
                  </Link>
                  <div className={styles.ticker} aria-hidden="true">
                    <div className={styles.tickerTrack}>
                      <span>
                        {p.summary.text} · {p.tags.join(" · ")} ·{" "}
                      </span>
                      <span>
                        {p.summary.text} · {p.tags.join(" · ")} ·{" "}
                      </span>
                    </div>
                  </div>
                  <p className="visually-hidden">{p.summary.text}</p>
                  <Link href={p.href} className={styles.viewLink}>
                    {labels.viewProject} →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.gallery} data-view="gallery" hidden={view !== "gallery"}>
          {projects.map((p, i) => {
            const img = image(p);
            return (
              <div
                key={p.slug}
                className={styles.slide}
                data-for={i}
                data-active={i === current}
                hidden={i !== current}
              >
                <div className={styles.marquee} aria-hidden="true">
                  <div className={styles.marqueeTrack}>
                    <span>{p.title} </span>
                    <span>{p.title} </span>
                    <span>{p.title} </span>
                    <span>{p.title} </span>
                  </div>
                </div>
                <div className={styles.stage}>
                  <Link href={p.href} className={styles.card}>
                    {img ? (
                      <Image src={img.src} alt={img.alt} fill sizes="(max-width: 760px) 80vw, 34vw" />
                    ) : (
                      <span className={styles.pending}>
                        {labels.imagePending} · {p.title}
                      </span>
                    )}
                    <span className={styles.viewBtn}>{labels.view}</span>
                  </Link>
                </div>
                <p className={styles.caption}>
                  {p.title.toUpperCase()} • {p.kind.toUpperCase()}
                </p>
              </div>
            );
          })}
          <ol className={styles.strip} aria-label={labels.allProjects}>
            {projects.map((p, i) => {
              const t = image(p);
              return (
                <li key={p.slug}>
                  <button
                    type="button"
                    onClick={() => setCurrent(i)}
                    aria-pressed={i === current}
                    aria-label={p.title}
                    data-pick={i}
                  >
                    {t ? (
                      <Image src={t.src} alt="" fill sizes="96px" />
                    ) : (
                      <span className={styles.thumbPending}>{p.number}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
        <p className="visually-hidden" aria-live="polite" data-live>
          {current + 1} / {total}: {active.title}
        </p>
      </main>

      <footer className={styles.footer} id="contact">
        <span>
          {labels.contact}:{" "}
          {labels.contactLinks.map((l, i) => (
            <span key={l}>
              {i > 0 && " · "}
              {l} ({labels.pending})
            </span>
          ))}
        </span>
        <span>
          {name} — {labels.role}
        </span>
      </footer>
    </div>
  );
}
