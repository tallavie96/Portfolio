# Tal Lavie — portfolio

Product design portfolio built with Next.js (App Router), TypeScript and CSS Modules.

Status: **Stage 3, homepage prototype.** Copy marked "Draft copy" and hatched "placeholder" images are not final.

## Run it locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000 (redirects to /en)
```

## Checks before pushing

```bash
npm run lint
npm run build      # also runs the TypeScript check
npm start          # serve the production build
```

## Where things live

| What | Where |
|---|---|
| English copy (homepage, nav, contact) | `src/content/dictionaries/en.ts` |
| Projects (titles, summaries, tags, cover images) | `src/content/projects.ts` |
| Images | `src/assets/images/` (imported, so Next sizes and optimizes them) |
| Design tokens (colors, type, spacing, motion) | `src/styles/tokens.css` |
| Fonts | `src/styles/fonts.ts` |
| Languages and text direction | `src/i18n/config.ts` |
| Pages | `src/app/[lang]/` |
| Visual concept previews (Stage 2) | `design/` |
| Decisions, open questions, missing info | `docs/PROJECT_LOG.md` |

### Editing copy

Each paragraph that still needs approval is written as `draft("...")` and shows a "Draft copy" tag on the site. When the text is final, change it to `approved("...")` and the tag disappears.

### Adding a project cover

Put the image in `src/assets/images/`, import it in `src/content/projects.ts` and set it as the project's `cover`, with a `coverAlt` that describes the screens.

### Hebrew

The layout is direction-aware (`dir` on `<html>`, logical CSS properties). Hebrew is paused: to turn it on, add a Hebrew dictionary and project text, add `"he"` to `enabledLocales`, and pick Hebrew partner fonts (the current fonts have no Hebrew glyphs).

## Deploying

Not deployed yet. The project runs on Vercel's free tier without configuration: import the GitHub repo in Vercel and deploy. No environment variables are needed.
