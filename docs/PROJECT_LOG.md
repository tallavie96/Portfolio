# Project log — Tal Lavie portfolio

Running list of decisions, open questions and next steps. Updated at each stage.

## Current stage

**Stage 1 — Discovery and technical plan.** Questions answered. Waiting for go-ahead on Stage 2.

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

## Proposed decisions (not yet approved)

- Stack: Next.js (App Router) + TypeScript, deployed to Vercel (Hobby tier, free)
- Styling: CSS Modules + CSS custom-property design tokens, using logical properties for RTL
- Motion: CSS first; the Motion library only for scrollytelling and page transitions, loaded only where it's used
- i18n: locale-prefixed routes `/en/...` and `/he/...`, typed dictionaries, `dir` set on `<html>`
- Content: one folder per project, with typed metadata plus per-locale MDX for the case-study text
- Two project types: `case-study` (A, B) and `collection` (C). A collection holds short entries, and any entry can later grow into a fuller write-up
- Each AI-project entry records what the AI did and what Tal did
- No analytics, no forms, and no CMS for now

## Open questions

See the Stage 1 questions in the chat. Answers get recorded here.

## Missing information

- Screens and materials for MuniBox, Hertz portal, designers calendar, Boost booth wall
- Full list of AI-playground projects, and which tools were used in each
- Tal's role, team, process and outcomes for each project
- Email, LinkedIn, CV file, other links
- Font licences (whether Tal owns any commercial Hebrew typefaces)
- Approved copy in English and Hebrew
