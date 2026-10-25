import { approved, draft } from "../types";

export const en = {
  meta: {
    title: "Tal Lavie, Product Designer",
    description:
      "Portfolio of Tal Lavie, a product designer working on mobile apps, dashboards and AI experiments.",
  },
  skipLink: "Skip to content",
  nav: {
    label: "Main",
    home: "Home",
    work: "Work",
    about: "About",
    contact: "Contact",
  },
  hero: {
    firstName: "Tal",
    lastName: "Lavie",
    role: "Product designer",
    line: draft("Mobile apps, dashboards and AI experiments."),
    facts: approved("Shenkar, Visual Communication, 2023"),
    ctaWork: "See selected work",
    ctaContact: "Get in touch",
    featuredCaption: "kea, from the AI playground",
    featuredAlt:
      "Three screens from kea, a skincare routine app: onboarding, product list, and morning and evening routine",
    portraitAlt: "Tal Lavie sitting on the grass in a park, smiling and looking to the side",
  },
  work: {
    title: "Selected work",
    count: "3 projects",
    openCaseStudy: "Open case study",
    openCollection: "Open collection",
  },
  about: {
    title: "About",
    intro: draft(
      "Placeholder for your intro. We'll write it together; it will say how you work, not just what you've worked on.",
    ),
    facts: [
      { label: "Studied", value: "Visual Communication, Shenkar, 2023" },
      { label: "Experience", value: "3+ years in product design" },
      { label: "Into", value: "Storytelling, experiments, AI" },
    ],
  },
  contact: {
    title: "Let's make something.",
    note: "Email, LinkedIn and CV go here once Tal sends them. None of these are links yet.",
    links: [
      { label: "Email", href: null },
      { label: "LinkedIn", href: null },
      { label: "CV (PDF)", href: null },
    ] as { label: string; href: string | null }[],
    pending: "pending",
  },
  gallery: {
    metaTitle: "Gallery concept",
    nav: { work: "Work", contact: "Contact" },
    intro: draft(
      "I design mobile apps, dashboards and small AI experiments. Visual Communication, Shenkar, 2023.",
    ),
    imagePending: "Image pending",
    view: "View project",
    contactTitle: "Contact",
    contactNote: "Links will be added once they're ready.",
  },
  showcase: {
    metaTitle: "Showcase concept",
    nav: { about: "About", contact: "Contact" },
    carouselLabel: "Selected projects",
    indexLabel: "All projects",
    previous: "Previous project",
    next: "Next project",
    view: "View project",
    imagePending: "Image pending",
    status: "Project {n} of {total}: {title}",
    hint: "Arrow keys or swipe to browse",
  },
  caseStudy: {
    eyebrow: "Case study",
    inProgress: "This case study is being written.",
    inProgressBody:
      "The screens and story for this project haven't been added yet. Everything on this page is a placeholder.",
    back: "Back to all work",
    previous: "Previous project",
    next: "Next project",
    role: "Role",
    team: "Team",
  },
  common: {
    draft: "Draft copy",
    placeholder: "Placeholder",
    screensPending: "placeholder · screens pending",
    backToTop: "Back to top",
  },
};
