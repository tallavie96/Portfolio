"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import type { HomeProject } from "./data";
import { PhoneTrio } from "./PhoneTrio";
import styles from "./Home.module.css";

const tints = ["#e9eef2", "#f2eee0", "#f3e9ec"];

/**
 * Homepage opening (after Moheim): a large framed slide per project with the name
 * set thin and wide across it, and a small caption (counter, title, arrow) that
 * opens the project. Advances on its own; can be paused.
 */
export function HomeHero({
  name,
  projects,
  labels,
}: {
  name: string;
  projects: HomeProject[];
  labels: { imagePending: string; pause: string; play: string; slideshow: string };
}) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const total = projects.length;

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- respect the user's motion setting on load
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => setCurrent((c) => (c + 1) % total), 6000);
    return () => clearTimeout(id);
  }, [playing, current, total]);

  const active = projects[current];
  const image = (p: HomeProject) => p.cover ?? p.gallery[0] ?? null;

  return (
    <section className={styles.hero} aria-roledescription="carousel" aria-label={labels.slideshow}>
      <div className={styles.frame}>
        {projects.map((p, i) => {
          const img = image(p);
          return (
            <div
              key={p.slug}
              className={styles.slide}
              data-slide={i}
              data-active={i === current}
              aria-hidden={i !== current}
              style={{ "--tint": tints[i % tints.length] } as CSSProperties}
            >
              {p.phones.length > 0 ? (
                <div className={styles.slidePhones}>
                  <PhoneTrio phones={p.phones} sizes="(max-width: 760px) 30vw, 20vw" priority={i === 0} />
                </div>
              ) : p.desktop ? (
                <div className={styles.slideDesktop}>
                  <div className={styles.browser}>
                    <span className={styles.browserBar} aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>
                    <Image
                      src={p.desktop.src}
                      alt={p.desktop.alt}
                      sizes="(max-width: 760px) 90vw, 56vw"
                      priority={i === 0}
                      className={styles.browserShot}
                    />
                  </div>
                </div>
              ) : img ? (
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  className={styles.slideImage}
                />
              ) : (
                <span className={styles.slidePending}>
                  {labels.imagePending} · {p.title}
                </span>
              )}
            </div>
          );
        })}

        {/* The full stop is where the intro's loading ring lands */}
        <p className={styles.wordmark} aria-hidden="true">
          {name}
          <span className={styles.stop} data-stop />
        </p>

        <div className={styles.caption}>
          {projects.map((p, i) => {
            return (
              <div
                key={p.slug}
                className={styles.captionItem}
                data-cap={i}
                data-active={i === current}
                hidden={i !== current}
              >
                <span className={styles.counter}>
                  <bdi dir="ltr">
                    {p.number} <span>/</span> {String(total).padStart(2, "0")}
                  </bdi>
                </span>
                <Link href={p.href} className={styles.captionLink}>
                  <span className={styles.captionText}>
                    <span className={styles.captionTitle}>
                      {p.title}
                      <svg className={styles.arrow} viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </div>
            );
          })}
          <button
            type="button"
            className={styles.pauseBtn}
            onClick={() => setPlaying((v) => !v)}
            aria-label={playing ? labels.pause : labels.play}
            aria-pressed={!playing}
            data-pause
          >
            <span data-icon="pause" hidden={!playing}>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M5 3v10M11 3v10" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </span>
            <span data-icon="play" hidden={playing}>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M5 3l8 5-8 5z" fill="currentColor" />
              </svg>
            </span>
          </button>
        </div>
      </div>
      <p className="visually-hidden" aria-live="polite" data-live>
        {active.number} / {total}: {active.title}
      </p>
    </section>
  );
}
