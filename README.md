# T-Shirt Shop - Next.js Micro-Frontends

This project demonstrates a micro-frontend architecture with three independent Next.js applications composed locally with Turborepo and [Vercel Microfrontends](https://vercel.com/docs/microfrontends).

## Architecture Overview

Zones:

- **Home** (default app): landing page and featured products
- **Catalog**: product listing and details (`basePath` `/catalog`)
- **Account**: profile and orders UI (`basePath` `/account`)

Each zone is an independent Next.js app that:

- Can be developed, built, and deployed on its own
- Shares Header/Footer through `@t-shirt-shop/shared`
- Uses Tailwind CSS for styling

## Architecture Constraints

- zones should not depend on each other
- components folder should only contain header and footer
- shared components should not depend on zones
- zones should be free of cycles

## Local development

### Prerequisites

- Node.js 24+
- [pnpm](https://pnpm.io/) 10+

```bash
pnpm install
pnpm --filter @t-shirt-shop/shared build
pnpm dev
```

`pnpm dev` runs Turborepo (`turbo dev`). With `@vercel/microfrontends` installed, the local microfrontends proxy starts and stitches the zones on one origin (default `http://localhost:3024`).

| Mode | How | URL |
|------|-----|-----|
| Stitched (recommended) | `pnpm dev` | `http://localhost:3024` |
| Standalone home | `pnpm --filter home dev` | `http://localhost:3000` |
| Standalone catalog | `pnpm --filter catalog dev` | `http://localhost:3001/catalog` |
| Standalone account | `pnpm --filter account dev` | `http://localhost:3002/account` |

You do **not** need home running to work on catalog or account alone. Use the proxy when you want path-based composition that matches production routing on Vercel.

### How routing works

[`home/microfrontends.json`](home/microfrontends.json) maps paths to apps:

- unmatched paths → **home**
- `/catalog`, `/catalog/*` → **catalog**
- `/account`, `/account/*` → **account**

Each app wraps its Next config with `withMicrofrontends` from `@vercel/microfrontends/next/config`. That sets asset prefixes so JS/CSS from different zones do not collide when served through the proxy.

Path routing for the stitched experience is owned by the microfrontends proxy (local) or the Vercel microfrontends group (production on Vercel). Home no longer proxies `/catalog` and `/account` through Next.js `rewrites`.

Zone boundaries stay the same: separate apps, `basePath` on catalog/account, shared UI package only.

### Docker Compose

Node 24 Alpine images remain available for containerized standalone runs:

```bash
pnpm dev:docker    # docker-compose up
pnpm build:docker  # docker-compose build
```

Compose serves each zone on its own port. For path-based stitching locally, prefer `pnpm dev` and the microfrontends proxy.

## Scripts

| Script | Purpose |
|--------|---------|
| `pnpm dev` | Turborepo + MFE proxy |
| `pnpm build` | `turbo build` all packages |
| `pnpm test` | architecture tests |
| `pnpm test:e2e` | Playwright (direct ports + MFE proxy) |
| `pnpm lint` | ESLint via Turborepo |

## Test Status

| Zone | Architecture Tests | Size Check |
|------|-------------------|------------|
| home | ✅ | ✅ |
| catalog | ✅ | ✅ |
| account | ✅ | ✅ |
| shared | ✅ | ✅ |
