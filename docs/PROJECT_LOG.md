# Project log — Tal Lavie portfolio

Running list of decisions, open questions and next steps. Updated at each stage.

## Current stage

**Stage 3 — Homepage prototype.** Built in Next.js (`src/`). Waiting for Tal's review.

Stage 2 done: concept v3 "the playground board" (`design/visual-concept-v3.html`).

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

## Stage 2 decision: v3 "the playground board" (Tal delegated the choice, 2026-10-25)

- Idea: a FigJam-style board where scrapbook pieces and design-tool details live together
- From v2: warm paper #F6F0E6, card #FFFDF9, ink #2B1D22, plum #5E1A36, ink-2 #6A5A60 (paper/card only), blush #F5B8CC, sky #B9DAF3, butter #F2DC85; full-width color bands; collage hero (taped kea screens, portrait cut-out, sticky note, stamp); pill buttons; rounded photos
- From v1: dot-grid canvas in the hero, typewriter frame labels above project cards, selection handles on hover and keyboard focus, "Tal" collaborator cursor (#5A45E0), one redline
- Restraint: one torn edge (hero into work); other bands meet straight
- Type: Bricolage Grotesque (display, width axis), IBM Plex Sans (body), Courier Prime (labels, notes). Neither Bricolage nor Courier Prime has Hebrew; partners needed when Hebrew resumes
- Hover on projects: lift + straighten + selection box. Touch: no hover effects. Reduced motion: no movement
- Toolbar: cream pill, plum border, bottom center
- Layouts from Tal's extra references (2026-10-25):
  - Homepage work grid: three equal cards in one row (from "Explore styles"), replacing the staggered grid
  - A · Case-study opener: split layout, text + role pills + chip button left, large rounded image right, one soft pink glow (from the birthday hero). The only gradient on the site
  - B · Story chapters: image + text rows (from Nest "Installation / Removal"). Also used for AI playground entries
  - C · Mosaic wall: tight edge-to-edge mosaic (from Nest "Project gallery"). AI playground overview and in-case-study screen galleries
- Portrait used via `design/portrait-preview.webp` (resized, EXIF/GPS stripped). Original `IMG_2491.jpeg` still has GPS data

## Proposed decisions (Stage 1, approved)

- Stack: Next.js (App Router) + TypeScript, deployed to Vercel (Hobby tier, free)
- Styling: CSS Modules + CSS custom-property design tokens, using logical properties for RTL
- Motion: CSS first; the Motion library only for scrollytelling and page transitions, loaded only where it's used
- i18n: locale-prefixed routes `/en/...` and `/he/...`, typed dictionaries, `dir` set on `<html>`
- Content: one folder per project, with typed metadata plus per-locale MDX for the case-study text
- Two project types: `case-study` (A, B) and `collection` (C). A collection holds short entries, and any entry can later grow into a fuller write-up
- Each AI-project entry records what the AI did and what Tal did
- No analytics, no forms, and no CMS for now

## Stage 3 notes (2026-10-25)

- Next.js 16.4.3 with Cache Components and partial prefetching (scaffold defaults). Routes: `/` → `/en` (temporary redirect), `/en`, `/en/work/[slug]` (temporary "being written" pages so cards don't 404)
- All copy lives in `src/content`; unapproved copy is `draft()` and renders a visible "Draft copy" tag
- Contact links render as dashed "pending" pills, not links, until real URLs exist
- Known issue for Stage 7: an unknown project URL shows the not-found page with `noindex` but returns HTTP 200 (streamed page behavior in this Next version). Fix with a custom 404 and a proper status
- Not yet done: favicon and OG image, custom 404, Hebrew, case-study template

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
