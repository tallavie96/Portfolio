import type { StaticImageData } from "next/image";
import type { Locale } from "@/i18n/config";
import { draft, type AccentColor, type Copy } from "./types";
import keaCover from "@/assets/images/kea.webp";
import keaLarge from "@/assets/images/kea-large.webp";

export type ProjectType = "case-study" | "collection";

interface ProjectBase {
  slug: string;
  number: string;
  type: ProjectType;
  color: AccentColor;
  cover: StaticImageData | null;
  /** Large image for the gallery homepage concept; null until real screens arrive. */
  galleryImage: StaticImageData | null;
}

interface ProjectText {
  title: string;
  kindLabel: string;
  summary: Copy;
  tags: string[];
  coverAlt?: string;
}

export type Project = ProjectBase & ProjectText;

const base: ProjectBase[] = [
  { slug: "munibox", number: "01", type: "case-study", color: "sky", cover: null, galleryImage: null },
  { slug: "hertz-portal", number: "02", type: "case-study", color: "butter", cover: null, galleryImage: null },
  { slug: "ai-playground", number: "03", type: "collection", color: "blush", cover: keaCover, galleryImage: keaLarge },
];

const text: Partial<Record<Locale, Record<string, ProjectText>>> = {
  en: {
    munibox: {
      title: "MuniBox",
      kindLabel: "Mobile + admin",
      summary: draft("Mobile app and admin dashboard. Description pending."),
      tags: ["Mobile app", "Admin dashboard"],
    },
    "hertz-portal": {
      title: "Hertz portal",
      kindLabel: "Portal",
      summary: draft("Description pending."),
      tags: ["Web portal"],
    },
    "ai-playground": {
      title: "AI playground",
      kindLabel: "Collection",
      summary: draft("kea, a designers' calendar, a Boost booth wall, and more experiments."),
      tags: ["AI", "Personal projects"],
      coverAlt: "Three screens from kea, a skincare routine app: onboarding, product list, and routine",
    },
  },
};

export function getProjects(locale: Locale): Project[] {
  const t = text[locale];
  if (!t) throw new Error(`No project text for locale "${locale}"`);
  return base.map((p) => ({ ...p, ...t[p.slug] }));
}

export function getProject(locale: Locale, slug: string): Project | undefined {
  return getProjects(locale).find((p) => p.slug === slug);
}

export const projectSlugs = base.map((p) => p.slug);

/** Previous and next project, wrapping around, for browsing between case studies. */
export function getAdjacentProjects(locale: Locale, slug: string) {
  const all = getProjects(locale);
  const i = all.findIndex((p) => p.slug === slug);
  return {
    previous: all[(i - 1 + all.length) % all.length],
    next: all[(i + 1) % all.length],
  };
}
