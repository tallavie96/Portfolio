# Tal Lavie — portfolio

Product design portfolio built with Next.js (App Router), TypeScript and CSS Modules.

Status: **choosing a direction.** The main pages are an unstyled content skeleton; three homepage options live at `/en/options` (A, B, C). Copy marked "Draft copy" and "Placeholder" images are not final.

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
| Base styles (reset only for now) | `src/styles/globals.css` |
| Languages and text direction | `src/i18n/config.ts` |
| Pages | `src/app/[lang]/` |
| Decisions, open questions, missing info | `docs/PROJECT_LOG.md` |

### Editing copy

Each paragraph that still needs approval is written as `draft("...")` and shows a "Draft copy" tag on the site. When the text is final, change it to `approved("...")` and the tag disappears.

### Adding a project cover

Put the image in `src/assets/images/`, import it in `src/content/projects.ts` and set it as the project's `cover`, with a `coverAlt` that describes the screens.

### Hebrew

Pages set `dir` on `<html>`. Hebrew is paused: to turn it on, add a Hebrew dictionary and project text, and add `"he"` to `enabledLocales`. Whatever fonts the new design uses need Hebrew glyphs.

## Deploying

Not deployed yet. The project runs on Vercel's free tier without configuration: import the GitHub repo in Vercel and deploy. No environment variables are needed.
