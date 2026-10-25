import type { StaticImageData } from "next/image";
import type { Locale } from "@/i18n/config";
import { draft, type Copy } from "./types";
import keaCover from "@/assets/images/kea.webp";
import keaOnboarding from "@/assets/images/kea-onboarding.webp";
import keaOnboardingCut from "@/assets/images/kea-onboarding-cut.webp";
import keaProductsV2 from "@/assets/images/kea-products-v2.webp";
import keaRoutineV2 from "@/assets/images/kea-routine-v2.webp";
import muniboxShare from "@/assets/images/munibox-share.webp";
import muniboxHome from "@/assets/images/munibox-home.webp";
import muniboxManage from "@/assets/images/munibox-manage.webp";
import hertzDashboard from "@/assets/images/hertz-dashboard.webp";
import hertzOrders from "@/assets/images/hertz-orders.webp";
import hertzStats from "@/assets/images/hertz-stats.webp";
import boostWall1 from "@/assets/images/boost-wall-1.webp";
import boostWall2 from "@/assets/images/boost-wall-2.webp";
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
  /** Three phone screens on transparent backgrounds, shown side by side. Empty until provided. */
  phones: { src: StaticImageData; alt: string }[];
  /** Desktop screen shown in a browser frame (portals, dashboards). */
  desktop: { src: StaticImageData; alt: string } | null;
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
  {
    slug: "munibox",
    number: "01",
    type: "case-study",
    cover: null,
    gallery: [],
    desktop: null,
    phones: [
      {
        src: muniboxShare,
        alt: "MuniBox screen in Hebrew inviting residents to share household bills and pay them together",
      },
      {
        src: muniboxHome,
        alt: "MuniBox home screen for the Tel Aviv municipality: payment categories, a bill-sharing banner and a pending sharing request",
      },
      {
        src: muniboxManage,
        alt: "MuniBox screen for managing bill sharing: requests to approve or decline and existing shares",
      },
    ],
  },
  {
    slug: "hertz-portal",
    number: "02",
    type: "case-study",
    cover: null,
    // Screens from Tal's interactive prototype; all names and bookings are mock data
    gallery: [
      { src: hertzOrders, alt: "Hertz agency portal orders table with status chips and filters (mock data)" },
      { src: hertzStats, alt: "Hertz agency portal statistics screen (mock data)" },
    ],
    phones: [],
    desktop: {
      src: hertzDashboard,
      alt: "Hertz agency portal dashboard in Hebrew: summary cards, recent orders and agent alerts (mock data)",
    },
  },
  {
    slug: "ai-playground",
    number: "03",
    type: "collection",
    cover: keaCover,
    desktop: null,
    gallery: [
      { src: keaOnboarding, alt: "kea onboarding screen: search or photograph your products to build a routine" },
      { src: keaProducts, alt: "kea product list grouped by step, with ingredients and a retinol warning" },
      { src: keaRoutine, alt: "kea routine screen with morning and evening steps and a full or minimal toggle" },
      { src: boostWall1, alt: "Boost × monday.com booth wall: 'What if your next hire was an AI colleague?'" },
      { src: boostWall2, alt: "Boost booth wall, second panel" },
    ],
    phones: [
      // Stand-in cut from kea.png until the new onboarding screen file arrives
      { src: keaOnboardingCut, alt: "kea onboarding screen: search or photograph your products to build a routine" },
      {
        src: keaProductsV2,
        alt: "kea product list grouped by step, with highlighted ingredients and retinol warnings",
      },
      {
        src: keaRoutineV2,
        alt: "kea evening routine with numbered steps, a 'Feeling lazy?' option and a product recommendation",
      },
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
