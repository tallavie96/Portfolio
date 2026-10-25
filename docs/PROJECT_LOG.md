# Project log — Tal Lavie portfolio

Running list of decisions, open questions and next steps. Updated at each stage.

## Current stage

**Direction chosen: Option B, after moheim.com (2026-10-25).** It is now the real homepage at `/en`. Options A and C and the `/en/options` index were removed (git history has them, commit `f09e664`).

Homepage now:
- **Entrance (after Moheim's loader):** grey curtain (#555753) with the name small in the bottom corner; a thin ring draws itself closed (~1s); the curtain lifts (0.9s) and the ring fades out (the full stop after the name was removed at Tal's request; the name is now left-aligned, weight 300). About 2.2s total, once per visit (sessionStorage), skipped with reduced motion; without JavaScript the curtain still lifts by CSS
- **Header:** name (wide-tracked caps) and "Product designer" only. Work, About and Contact moved to the footer
- **Opening:** framed slide per project in pale tints with "TAL LAVIE." across it; caption `01 / 03` + thumbnail + kind + title linking to the project; auto-advance 6s, pause button
- **Below:** project rows and About with CSS scroll-driven reveals (static where unsupported or with reduced motion)
- **Footer:** Work · About | Contact + Email / LinkedIn / CV (pending) | name
- **Type:** Jost (no Hebrew; partner needed when Hebrew resumes)

Reference notes: Moheim uses TT Commons, a wide-tracked caps nav, a framed hero slider with a thumbnail caption, a custom smooth scroll, and a grey loader whose ring becomes the O of the logo as the curtain lifts.

**Real screens on the homepage (2026-10-25):**
- Slides: MuniBox and kea show three phones centred on the light tint, Hertz shows the portal dashboard in a minimal browser frame; screens sit 64px below the name. Caption is only `01 / 03`, project name and arrow (thumbnail and kind removed). Project rows below use the same images
- MuniBox: `munibox-share/home/manage.webp` (Tal's screens, Hebrew)
- kea: `kea-products-v2`, `kea-routine-v2` (Tal's updated screens); onboarding is still a cut-out from `kea.png` (`kea-onboarding-cut.webp`) because the new onboarding file Tal sent in chat wasn't saved to disk. Replace when re-sent
- Hertz: `hertz-dashboard/orders/stats.webp`, captured from Tal's interactive prototype (`Hertz_Agency_Portal_.html`, mock data). Later: video or clickable prototype inside the case study
- Boost wall graphics (`boost-wall-1/2.webp`, from the PDF) added to the AI playground gallery for its project page

Assets: `kea-onboarding.webp`, `kea-products.webp`, `kea-routine.webp` (crops of the three phone screens in `kea.png`), listed in the AI playground's `gallery`. Next: MuniBox and Hertz screens; project pages (still unstyled).

Stage 1 approved 2026-10-25.

## Asset inventory (repo root, uploaded in `f030356`)

| File | What it is | Size | Notes |
|---|---|---|---|
| `kea.png` | Skincare app "kea": onboarding, Products, My routine (Full / Minimal) | 1967×1388 | Presentation mockup on a pastel gradient background |
| `COD.png` | Hebrew RTL website, "City of David" accommodation booking, phone + tablet | 1967×1388 | Not one of the three featured projects. Whether it appears anywhere is still open |
| `Cinch.png` | "CINCH" freight / RFQ procurement dashboard, tablet | 1967×1388 | Not one of the three featured projects. Whether it appears anywhere is still open |
| `IMG_2491.jpeg` | Portrait photo | 4032×3024 | **Has GPS coordinates in its EXIF data.** Strip the metadata before publishing |

## Decided (Stage 1 answers, 2026-10-25)

- Featured projects:
  - **A — MuniBox**: mobile app + admin dashboard. Screens can be public
  - **B — Hertz portal**. Screens can be public
  - **C — AI playground**: a collection of smaller AI projects (kea, designers calendar, Boost booth wall design, and others). Screens can be public
- About is a homepage section, not a separate page
- Default language at `/` is English
- Hebrew paused (2026-10-25): keep the RTL-ready structure, but no Hebrew copy or Hebrew polish until Tal resumes it

## Proposed decisions (Stage 1, approved)

- Stack: Next.js (App Router) + TypeScript, deployed to Vercel (Hobby tier, free)
- Styling: CSS Modules + CSS custom-property design tokens, using logical properties for RTL
- Motion: CSS first; the Motion library only for scrollytelling and page transitions, loaded only where it's used
- i18n: locale-prefixed routes `/en/...` and `/he/...`, typed dictionaries, `dir` set on `<html>`
- Content: one folder per project, with typed metadata plus per-locale MDX for the case-study text
- Two project types: `case-study` (A, B) and `collection` (C). A collection holds short entries, and any entry can later grow into a fuller write-up
- Each AI-project entry records what the AI did and what Tal did
- No analytics, no forms, and no CMS for now

## What the reset kept (plumbing)

- Next.js 16.4.3 + TypeScript + CSS Modules, Cache Components and partial prefetching
- Routes: `/` → `/en` (temporary redirect), `/en` (homepage skeleton), `/en/work/[slug]` (case-study skeleton with previous / next project links, looping). Unknown locales 404
- i18n: locale-prefixed routes, `dir` on `<html>`, typed dictionaries in `src/content/dictionaries`, Hebrew paused but RTL-ready
- Content: `src/content/projects.ts` (order MuniBox, Hertz portal, AI playground) and the English dictionary; unapproved copy is `draft()` and shows a "Draft copy" tag; missing images use a labelled placeholder
- Assets: `src/assets/images/kea.webp` (full-resolution web copy of `kea.png`), `portrait.webp` (resized, GPS data removed)
- Accessibility basics: skip link, semantic sections, focus outline, reduced-motion-aware smooth scrolling
- Known issue: an unknown project URL shows the not-found page with `noindex` but returns HTTP 200 (streamed page behaviour in this Next version); fix with a custom 404 later

## What the reset removed

All visual design: design tokens, fonts, the concept previews in `design/`, the styled homepage, the gallery (`/en/gallery`) and showcase (`/en/showcase`) concepts, the floating toolbar, scroll reveals, marker styles and accent colours. Everything remains in git history (last styled commit: `61f27ea`).

Directions tried and rejected, for reference: "working canvas" (grey canvas, selection boxes), scrapbook / playground board (warm paper, collage, colour bands), calm editorial (serif headings, dotted canvas), photography gallery (large plates, scrolling), interactive showcase (one project per screen, white).

## Open questions


See the Stage 1 questions in the chat. Answers get recorded here.

## Missing information

- How Tal wants to be addressed in Hebrew copy (gendered forms); Hebrew spelling of the surname (draft uses טל לביא)

- Screens and materials for MuniBox, Hertz portal, designers calendar, Boost booth wall
- Full list of AI-playground projects, and which tools were used in each
- Tal's role, team, process and outcomes for each project
- Email, LinkedIn, CV file, other links
- Font licences (whether Tal owns any commercial Hebrew typefaces)
- Approved copy in English and Hebrew
