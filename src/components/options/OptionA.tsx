"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { OptionImage, OptionProject } from "./data";
import styles from "./OptionA.module.css";

interface Labels {
  work: string;
  info: string;
  close: string;
  role: string;
  intro: string;
  draft: string;
  introDraft: boolean;
  contactTitle: string;
  contactLinks: string[];
  pending: string;
  imagePending: string;
}

/**
 * Option A (after Hervé Baillargeon): the name set as a letter grid that fills
 * one screen, with real screens rotating in two of the cells. "Work +" opens the
 * project list, "+ Info" the introduction. No scrolling, no hover effects.
 */
export function OptionA({
  firstName,
  lastName,
  projects,
  images,
  labels,
}: {
  firstName: string;
  lastName: string;
  projects: OptionProject[];
  images: (OptionImage & { project: string })[];
  labels: Labels;
}) {
  const [panel, setPanel] = useState<"none" | "work" | "info">("none");
  const [tick, setTick] = useState(0);

  // Rotate the images in the two picture cells (paused for reduced motion).
  useEffect(() => {
    if (images.length < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setTick((t) => t + 1), 3200);
    return () => clearInterval(id);
  }, [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPanel("none");
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggle = (p: "work" | "info") => setPanel((cur) => (cur === p ? "none" : p));
  const letters = (firstName + lastName).toUpperCase().split("");
  // Letter cells and picture cells, in reading order (layout comes from CSS areas).
  const cells: ({ kind: "letter"; char: string } | { kind: "picture"; slot: 0 | 1 } | { kind: "blank" })[] = [
    { kind: "letter", char: letters[0] },
    { kind: "letter", char: letters[1] },
    { kind: "blank" },
    { kind: "picture", slot: 0 },
    { kind: "letter", char: letters[2] },
    { kind: "letter", char: letters[3] },
    { kind: "letter", char: letters[4] },
    { kind: "letter", char: letters[5] },
    { kind: "picture", slot: 1 },
    { kind: "letter", char: letters[6] },
    { kind: "letter", char: letters[7] },
  ];

  return (
    <div className={styles.screen} data-panel={panel} data-option="a">
      <div className={styles.grid} aria-hidden={panel !== "none"}>
        <h1 className="visually-hidden">
          {firstName} {lastName}, {labels.role}
        </h1>
        {cells.map((cell, i) => {
          const area = { gridArea: `c${i}` };
          const row = i >= 5 ? styles.bottom : styles.top;
          if (cell.kind === "letter")
            return (
              <span key={i} className={`${styles.letter} ${row}`} style={area} aria-hidden="true">
                {cell.char}
              </span>
            );
          if (cell.kind === "blank") return <span key={i} className={styles.blank} style={area} aria-hidden="true" />;
          return (
            <figure key={i} className={`${styles.picture} ${row}`} style={area}>
              {images.length === 0 ? (
                <span className={styles.pending}>{labels.imagePending}</span>
              ) : (
                images.map((img, k) => {
                  const active = (tick + cell.slot * Math.ceil(images.length / 2)) % images.length === k;
                  return (
                    <Image
                      key={k}
                      src={img.src}
                      alt={`${img.alt} (${img.project})`}
                      data-on={active}
                      data-slot={cell.slot}
                      data-k={k}
                      fill
                      sizes="(max-width: 760px) 100vw, 34vw"
                      priority={k < 2}
                    />
                  );
                })
              )}
            </figure>
          );
        })}
      </div>

      <div className={styles.band}>
        <button
          type="button"
          className={styles.toggle}
          onClick={() => toggle("work")}
          aria-expanded={panel === "work"}
          data-toggle="work"
        >
          {panel === "work" ? labels.close : labels.work} <span aria-hidden="true">{panel === "work" ? "×" : "+"}</span>
        </button>
        <p className={styles.center}>
          {firstName.toUpperCase()} {lastName.toUpperCase()}
          <br />
          {labels.role.toUpperCase()}
        </p>
        <button
          type="button"
          className={styles.toggle}
          onClick={() => toggle("info")}
          aria-expanded={panel === "info"}
          data-toggle="info"
        >
          <span aria-hidden="true">{panel === "info" ? "×" : "+"}</span> {panel === "info" ? labels.close : labels.info}
        </button>
      </div>

      <nav className={styles.panel} aria-label={labels.work} hidden={panel !== "work"} data-panel-id="work">
        <ol className={styles.workList}>
          {projects.map((p) => (
            <li key={p.slug}>
              <Link href={p.href}>
                <span className={styles.num}>{p.number}</span>
                {p.title.toUpperCase()}
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      <section className={styles.panel} aria-label={labels.info} hidden={panel !== "info"} data-panel-id="info">
        <div className={styles.info}>
          <p className={styles.intro}>
            {labels.intro}
            {labels.introDraft && <span className={styles.draft}> {labels.draft}</span>}
          </p>
          <p className={styles.contact}>
            {labels.contactTitle}:{" "}
            {labels.contactLinks.map((l, i) => (
              <span key={l}>
                {i > 0 && " · "}
                {l} ({labels.pending})
              </span>
            ))}
          </p>
        </div>
      </section>
    </div>
  );
}
