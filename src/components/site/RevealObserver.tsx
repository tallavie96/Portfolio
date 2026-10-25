"use client";

import { useEffect } from "react";

/**
 * Reveals [data-reveal] elements as they scroll into view. Anything already on
 * screen when the page loads is shown immediately, so nothing flickers.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    for (const el of elements) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) el.setAttribute("data-revealed", "");
      else observer.observe(el);
    }
    root.classList.add("reveal-ready");

    return () => observer.disconnect();
  }, []);

  return null;
}
