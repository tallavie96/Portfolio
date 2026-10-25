"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import styles from "./Showcase.module.css";

export interface ShowcaseProject {
  slug: string;
  number: string;
  title: string;
  descriptor: string;
  details: string[];
  summary: { text: string; draft: boolean };
  color: "blush" | "sky" | "butter";
  image: StaticImageData | null;
  alt: string;
  href: string;
}

export interface ShowcaseLabels {
  carousel: string;
  index: string;
  previous: string;
  next: string;
  view: string;
  imagePending: string;
  status: string;
  hint: string;
  draft: string;
}

type SlideState = "active" | "after" | "before";

/** Position of slide i relative to the current one, so looping always moves "forward". */
function stateOf(i: number, current: number, total: number): SlideState {
  const offset = (i - current + total) % total;
  if (offset === 0) return "active";
  return offset === 1 ? "after" : "before";
}

/**
 * One project per screen. Previous / next with buttons, arrow keys, swipe, or the
 * title index. Arrow keys and swipe follow the reading direction (flipped in RTL).
 */
export function Showcase({ projects, labels }: { projects: ShowcaseProject[]; labels: ShowcaseLabels }) {
  const total = projects.length;
  const [current, setCurrent] = useState(0);
  const pointer = useRef<{ x: number; y: number } | null>(null);

  const go = useCallback(
    (index: number) => {
      const next = (index + total) % total;
      setCurrent(next);
      history.replaceState(null, "", `#${projects[next].slug}`);
    },
    [projects, total],
  );

  // Open the project named in the URL hash, if any.
  useEffect(() => {
    const fromHash = projects.findIndex((p) => `#${p.slug}` === location.hash);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL after hydration
    if (fromHash > 0) setCurrent(fromHash);
  }, [projects]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      const rtl = document.documentElement.dir === "rtl";
      if (e.key === "ArrowRight") go(current + (rtl ? -1 : 1));
      else if (e.key === "ArrowLeft") go(current + (rtl ? 1 : -1));
      else return;
      e.preventDefault();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, go]);

  // Swipe (touch and pen only; mouse users have buttons and keys).
  function onPointerDown(e: PointerEvent) {
    if (e.pointerType === "mouse") return;
    pointer.current = { x: e.clientX, y: e.clientY };
  }
  function onPointerUp(e: PointerEvent) {
    const start = pointer.current;
    pointer.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    const rtl = document.documentElement.dir === "rtl";
    // Swiping against the reading direction reveals the next project.
    go(current + ((dx < 0) !== rtl ? 1 : -1));
  }

  const active = projects[current];
  const status = labels.status
    .replace("{n}", String(current + 1))
    .replace("{total}", String(total))
    .replace("{title}", active.title);

  return (
    <section
      className={styles.showcase}
      aria-roledescription="carousel"
      aria-label={labels.carousel}
      style={{ "--accent": `var(--${active.color})` } as CSSProperties}
    >
      <p className="visually-hidden" aria-live="polite">
        {status}
      </p>

      <div className={styles.info}>
        <p className={styles.counter} aria-hidden="true">
          <bdi dir="ltr">
            {active.number}
            <span className={styles.total}> / {String(total).padStart(2, "0")}</span>
          </bdi>
        </p>

        <div className={styles.captions}>
          {projects.map((p, i) => {
            const state = stateOf(i, current, total);
            return (
              <div key={p.slug} className={styles.caption} data-state={state} aria-hidden={state !== "active"}>
                <span className={styles.descriptor} style={{ "--marker": `var(--${p.color})` } as CSSProperties}>
                  {p.descriptor}
                </span>
                <h2 className={styles.title}>{p.title}</h2>
                <p className={styles.summary}>
                  {p.summary.text}
                  {p.summary.draft && (
                    <>
                      {" "}
                      <span className={styles.draft}>{labels.draft}</span>
                    </>
                  )}
                </p>
                {p.details.length > 0 && <p className={styles.details}>{p.details.join(" · ")}</p>}
                <Link href={p.href} className={styles.view} tabIndex={state === "active" ? 0 : -1}>
                  {labels.view}
                  <Arrow />
                </Link>
              </div>
            );
          })}
        </div>

        <div className={styles.controls}>
          <div className={styles.arrows}>
            <button type="button" className={styles.arrowBtn} onClick={() => go(current - 1)} aria-label={labels.previous}>
              <Arrow back />
            </button>
            <button type="button" className={styles.arrowBtn} onClick={() => go(current + 1)} aria-label={labels.next}>
              <Arrow />
            </button>
          </div>
          <ol className={styles.index} aria-label={labels.index}>
            {projects.map((p, i) => (
              <li key={p.slug}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={i === current ? "true" : undefined}
                  style={{ "--dot-color": `var(--${p.color})` } as CSSProperties}
                >
                  <span className={styles.indexNum}>{p.number}</span> {p.title}
                </button>
              </li>
            ))}
          </ol>
          <p className={styles.hint}>{labels.hint}</p>
        </div>
      </div>

      <div className={styles.wall} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => (pointer.current = null)}>
        {projects.map((p, i) => {
          const state = stateOf(i, current, total);
          return (
            <figure
              key={p.slug}
              className={styles.slide}
              data-state={state}
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${total}`}
              aria-hidden={state !== "active"}
            >
              <Link href={p.href} className={styles.slideLink} tabIndex={state === "active" ? 0 : -1} draggable={false}>
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 760px) 100vw, 64vw"
                    priority={i === 0}
                    draggable={false}
                  />
                ) : (
                  <span className={styles.pending}>
                    {labels.imagePending} · {p.title}
                  </span>
                )}
              </Link>
            </figure>
          );
        })}
      </div>
    </section>
  );
}

function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg className={`${styles.arrow} ${back ? styles.back : ""}`} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
