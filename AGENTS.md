# AI Agent Instructions (fantasma)

## Repo Purpose

This repository contains the Ghost theme code that is deployed to Ghost Pro.

## Deployment Workflow (Canonical)

- GitHub Actions workflow: `.github/workflows/deploy-ghost-pro.yml`
- Push to `main` deploys to **staging** Ghost Pro
- Push tag `v*` deploys to **production** Ghost Pro

## Required Secrets (GitHub repo settings)

- `STAGING_GHOST_ADMIN_API_URL`
- `STAGING_GHOST_ADMIN_API_KEY`
- `PRODUCTION_GHOST_ADMIN_API_URL`
- `PRODUCTION_GHOST_ADMIN_API_KEY`

## Agent Rules

1. Always validate/build before deploy (`yarn test:ci` and `yarn zip`)
2. Do not bypass the workflow for production deploys
3. Use semantic version tags for production releases (`v1.6.0`, etc.)
4. If deploy fails, report environment (`staging` or `production`) and include workflow logs
