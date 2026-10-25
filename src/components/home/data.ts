import type { StaticImageData } from "next/image";
import type { Locale } from "@/i18n/config";
import { getProjects } from "@/content/projects";

export interface HomeImage {
  src: StaticImageData;
  alt: string;
}

/** Plain, serialisable project data for the homepage. */
export interface HomeProject {
  slug: string;
  number: string;
  title: string;
  kind: string;
  tags: string[];
  summary: { text: string; draft: boolean };
  href: string;
  cover: HomeImage | null;
  gallery: HomeImage[];
  phones: HomeImage[];
  desktop: HomeImage | null;
  heroPhoto: (HomeImage & { position?: string; mobilePosition?: string }) | null;
}

export function getHomeProjects(lang: Locale): HomeProject[] {
  return getProjects(lang).map((p) => ({
    slug: p.slug,
    number: p.number,
    title: p.title,
    kind: p.kindLabel,
    tags: p.tags,
    summary: { text: p.summary.text, draft: p.summary.status === "draft" },
    href: `/${lang}/work/${p.slug}`,
    cover: p.cover ? { src: p.cover, alt: p.coverAlt ?? "" } : null,
    gallery: p.gallery,
    phones: p.phones,
    desktop: p.desktop,
    heroPhoto: p.heroPhoto ?? null,
  }));
}
