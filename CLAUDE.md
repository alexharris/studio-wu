# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git

Keep commit messages short. Do not mention Claude or Anthropic in commit messages.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
```

No lint or test commands are configured.

## Architecture

**Studio Wu** is a Next.js 15 (App Router) frontend for an interior design studio, using Sanity v4 as the headless CMS. The Sanity Studio is embedded at `/studio`.

### Data Flow

All pages use `export const dynamic = 'force-dynamic'` — no static generation or ISR. Pages are server components that fetch directly from Sanity via GROQ queries defined in `src/utils/sanity-queries.js`. Images are served from `cdn.sanity.io` via the `urlFor()` builder in `src/sanity/lib/image.js`.

### Content Block System

Projects use a flexible `contentBlocks` array in Sanity. `src/components/ContentBlocks.js` dispatches to individual block renderer components in `src/components/Content Blocks/` based on `_type`. Current block types: `twoColumnImage`, `threeImages`, `centeredImage`, `pullQuote`, `imageText`, `quoteImage`, `quoteTwoImages`, `imageQuoteImage`.

### Sanity Schema

- **Document types:** `project`, `about`, `contact`, `press`, `settings`
- `about`, `contact`, `settings` are singletons (one document each)
- `project` and `press` use `@sanity/orderable-document-list` for drag-drop ordering in the Studio
- Schema files live in `src/sanity/schemaTypes/`; the Studio structure is defined in `src/sanity/structure.js`

### Styling

Tailwind CSS v4 (via `@tailwindcss/postcss`) for utilities. Adobe Typekit font (`angie`) loaded via `<link>` in the root layout. Path alias: `@/*` → `src/*`.

### Environment

```
NEXT_PUBLIC_SANITY_PROJECT_ID="x7chwny8"
NEXT_PUBLIC_SANITY_DATASET="production"
```
