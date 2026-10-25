"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Toolbar.module.css";

export interface ToolbarItem {
  id: string;
  label: string;
}

/**
 * Floating bottom toolbar. On the homepage it links to sections and marks
 * the one in view; elsewhere the same links lead back to the homepage sections.
 */
export function Toolbar({
  homeHref,
  homeLabel,
  items,
  label,
  onHome,
}: {
  homeHref: string;
  homeLabel: string;
  items: ToolbarItem[];
  label: string;
  onHome: boolean;
}) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    if (!onHome) return;
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setCurrent(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items, onHome]);

  const hrefFor = (id: string) => (onHome ? `#${id}` : `${homeHref}#${id}`);

  return (
    <nav className={styles.toolbar} aria-label={label}>
      <Link className={styles.mark} href={onHome ? "#top" : homeHref} aria-label={homeLabel}>
        TL
      </Link>
      <ul className={styles.items}>
        {items.map((item) => (
          <li key={item.id}>
            <Link href={hrefFor(item.id)} aria-current={current === item.id ? "location" : undefined}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
