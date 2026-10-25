import type { StaticImageData } from "next/image";
import type { Locale } from "@/i18n/config";
import { draft, type Copy } from "./types";
import keaCover from "@/assets/images/kea.webp";
import keaOnboarding from "@/assets/images/kea-onboarding.webp";
import keaProducts from "@/assets/images/kea-products.webp";
import keaRoutine from "@/assets/images/kea-routine.webp";

export type ProjectType = "case-study" | "collection";

interface ProjectBase {
  slug: string;
  number: string;
  type: ProjectType;
  /** Real project imagery only; null until Tal provides screens. */
  cover: StaticImageData | null;
  /** More real screens, for layouts that show several images. Empty until provided. */
  gallery: { src: StaticImageData; alt: string }[];
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
  { slug: "munibox", number: "01", type: "case-study", cover: null, gallery: [] },
  { slug: "hertz-portal", number: "02", type: "case-study", cover: null, gallery: [] },
  {
    slug: "ai-playground",
    number: "03",
    type: "collection",
    cover: keaCover,
    gallery: [
      { src: keaOnboarding, alt: "kea onboarding screen: search or photograph your products to build a routine" },
      { src: keaProducts, alt: "kea product list grouped by step, with ingredients and a retinol warning" },
      { src: keaRoutine, alt: "kea routine screen with morning and evening steps and a full or minimal toggle" },
    ],
  },
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
