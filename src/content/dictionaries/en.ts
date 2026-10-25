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
    title: "Contact",
    note: "Email, LinkedIn and CV go here once Tal sends them. None of these are links yet.",
    links: [
      { label: "Email", href: null },
      { label: "LinkedIn", href: null },
      { label: "CV (PDF)", href: null },
    ] as { label: string; href: string | null }[],
    pending: "pending",
  },
  options: {
    imagePending: "Image pending",
    work: "Work",
    info: "Info",
    close: "Close",
    view: "View",
    viewProject: "View project",
    selectedWork: "Selected work",
    allProjects: "All projects",
    list: "List",
    gallery: "Gallery",
    previous: "Previous project",
    next: "Next project",
    pause: "Pause slideshow",
    play: "Play slideshow",
    about: "About",
    contact: "Contact",
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
    screensPending: "Placeholder: screens pending",
    backToTop: "Back to top",
  },
};
