# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About

Fantasma is a Ghost theme (v1.5.0, requires Ghost ≥5.0.0), based on the TryGhost Source theme. It uses Handlebars templating, Tailwind CSS v4, and Vite for the build pipeline.

## Commands

```bash
pnpm install                # Install dependencies
./dev.sh                    # Start Ghost (if not running) + Vite watch mode
pnpm dev                    # Vite watch mode only
pnpm build                  # One-off production build
pnpm zip                    # Package theme into deployable zip (dist/fantasma.zip)
pnpm test                   # Validate theme with gscan
pnpm test:ci                # Validate with fatal/verbose mode (used in CI)
pnpm check                  # Lint + format check (Biome)
pnpm check:write            # Lint + format, auto-fix (Biome)
```

## Architecture

### Templating

Ghost uses Handlebars (`.hbs`). Template resolution follows Ghost's hierarchy:

- `default.hbs` — master layout; all other templates extend this
- `home.hbs`, `index.hbs`, `post.hbs`, `page.hbs`, `tag.hbs`, `author.hbs` — standard templates
- `page-{slug}.hbs`, `tag-{slug}.hbs`, `author-{slug}.hbs` — slug-specific overrides

### Partials

Reusable components live in `partials/`:
- `partials/components/` — structural layout pieces (header, footer, navigation, post-list, featured, cta)
- `partials/icons/` — inline SVG icons as individual partials (18 icons: social + UI)
- Top-level partials: post-card, email-subscription, feature-image, search-toggle

### Assets & Build

**Build tool:** Vite with `@tailwindcss/vite`. No dev server — Ghost serves pages. Use `./dev.sh` to start everything, or `pnpm dev` for watch mode alone alongside a running Ghost instance.

- `assets/css/screen.css` → Tailwind v4 + Vite → `assets/built/screen.css`
- `assets/js/source.js` → Vite/Rollup → `assets/built/source.js`

Output filenames have no hashes — Ghost's `{{asset}}` helper handles cache-busting.

### CSS Structure (`assets/css/screen.css`)

```
@import "tailwindcss"          — Tailwind preflight + utilities
@import "photoswipe/style.css" — PhotoSwipe v5 lightbox styles
@source directives             — tells Tailwind to scan .hbs files
@theme { }                     — static design tokens (colors, fonts, layout)
:root { }                      — Ghost runtime vars + derived tokens
@layer base { }                — element resets beyond Tailwind preflight
@layer components { }          — all gh-* theme UI classes (sections 4–21)
@layer ghost-cards { }         — kg-* classes (Ghost renderer-injected content cards)
```

**Key CSS facts:**
- The `html { font-size: 62.5% }` hack has been removed. All rem values use standard 16px = 1rem.
- Ghost injects `--ghost-accent-color`, `--background-color`, `--gh-font-body`, `--gh-font-heading` at runtime — these must NOT be in `@theme`.
- `.kg-*` card classes are injected by Ghost's Lexical renderer into post content; they live in `@layer ghost-cards`.
- `@source "../../*.hbs"` and `@source "../../partials/**/*.hbs"` are required — Tailwind v4 does not scan `.hbs` by default.

### JavaScript (`assets/js/`)

- Entry point: `assets/js/source.js` (ES module)
- Modules in `assets/js/modules/`: `mobile-menu`, `dropdown`, `lightbox`, `pagination`, `responsive-videos`, `responsive-tables`
- Runtime deps: `photoswipe` (v5), `imagesloaded`, `reframe.js` — imported as npm packages, no UMD lib files

### Theme Configuration

`package.json` under `config` defines Ghost-specific settings:
- `posts_per_page`: 12
- `image_sizes`: six responsive breakpoints (xs through xxl)
- `custom`: 15 theme design options (navigation style, colors, fonts, homepage layout, post feed layout) — these appear in Ghost Admin's theme customization UI

## Deployment

Handled by `.github/workflows/deploy-ghost-pro.yml`:
- Push to `main` → staging deploy
- Push tag `v*` → production deploy
- Workflow: `pnpm test:ci` → `pnpm zip` → upload + activate via Ghost Admin API (JWT auth)
- Only check staging deploy after changes to the workflow file, zip script, or package manager config — not for routine theme changes

Required secrets: `STAGING_GHOST_ADMIN_API_URL`, `STAGING_GHOST_ADMIN_API_KEY`, `PRODUCTION_GHOST_ADMIN_API_URL`, `PRODUCTION_GHOST_ADMIN_API_KEY`
