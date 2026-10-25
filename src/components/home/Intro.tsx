"use client";

import { useEffect, useRef } from "react";
import styles from "./Home.module.css";

/**
 * Entrance (after Moheim): a grey curtain with the name in the corner while a ring
 * draws itself closed; then the curtain lifts and the ring fades out. Plays once per
 * visit, never with reduced motion.
 * Without JavaScript the curtain still lifts on its own (CSS), so nothing stays hidden.
 */
export function Intro({ name }: { name: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    let seen = false;
    try {
      seen = sessionStorage.getItem("tl-intro") === "1";
      sessionStorage.setItem("tl-intro", "1");
    } catch {}
    if (seen || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.state = "done";
      return;
    }

    root.dataset.intro = "running";
    const reveal = setTimeout(() => {
      el.dataset.state = "revealing";
    }, 1150);
    const finish = setTimeout(() => {
      el.dataset.state = "done";
      delete root.dataset.intro;
    }, 2150);
    return () => {
      clearTimeout(reveal);
      clearTimeout(finish);
      delete root.dataset.intro;
    };
  }, []);

  return (
    <div ref={ref} className={styles.intro} data-state="loading" aria-hidden="true">
      <div className={styles.curtain}>
        <span className={styles.introMark}>{name}</span>
      </div>
      <svg className={styles.ring} data-ring viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="30" pathLength={100} />
      </svg>
    </div>
  );
}
