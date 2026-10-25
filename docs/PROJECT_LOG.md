# Project log — Tal Lavie portfolio

Running list of decisions, open questions and next steps. Updated at each stage.

## Current stage

**Stage 1 — Discovery and technical plan.** Waiting for Tal's approval before Stage 2.

## Asset inventory (repo root, uploaded in `f030356`)

| File | What it is | Size | Notes |
|---|---|---|---|
| `kea.png` | Skincare app "kea": onboarding, Products, My routine (Full / Minimal) | 1967×1388 | Presentation mockup on a pastel gradient background |
| `COD.png` | Hebrew RTL website, "City of David" accommodation booking, phone + tablet | 1967×1388 | Mockup on a warm off-white background. Possibly Project A or B (not confirmed) |
| `Cinch.png` | "CINCH" freight / RFQ procurement dashboard, tablet | 1967×1388 | Mockup on a light grey background. Possibly Project A or B (not confirmed) |
| `IMG_2491.jpeg` | Portrait photo | 4032×3024 | **Has GPS coordinates in its EXIF data.** Strip the metadata before publishing |

## Proposed decisions (not yet approved)

- Stack: Next.js (App Router) + TypeScript, deployed to Vercel (Hobby tier, free)
- Styling: CSS Modules + CSS custom-property design tokens, using logical properties for RTL
- Motion: CSS first; the Motion library only for scrollytelling and page transitions, loaded only where it's used
- i18n: locale-prefixed routes `/en/...` and `/he/...`, typed dictionaries, `dir` set on `<html>`
- Content: one folder per project, with typed metadata plus per-locale MDX for the case-study text
- No analytics, no forms, and no CMS for now

## Open questions

See the Stage 1 questions in the chat. Answers get recorded here.

## Missing information

- Real names and disclosure level for Professional Project A / B
- Tal's role, team, process and outcomes for each project
- Email, LinkedIn, CV file, other links
- Font licences (whether Tal owns any commercial Hebrew typefaces)
- Approved copy in English and Hebrew
