import type { StaticImageData } from "next/image";
import type { Locale } from "@/i18n/config";
import { getProjects } from "@/content/projects";

export interface OptionImage {
  src: StaticImageData;
  alt: string;
}

/** Plain, serialisable project data shared by the three homepage options. */
export interface OptionProject {
  slug: string;
  number: string;
  title: string;
  kind: string;
  tags: string[];
  summary: { text: string; draft: boolean };
  href: string;
  cover: OptionImage | null;
  gallery: OptionImage[];
}

export function getOptionProjects(lang: Locale): OptionProject[] {
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
  }));
}
