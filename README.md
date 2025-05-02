# T-Shirt Shop - Next.js Multi-Zone Micro-Frontends

This project demonstrates a micro-frontend architecture using Next.js 15's multi-zone feature. The application is split into three independent applications (zones) that work together to create a cohesive e-commerce experience.

## Architecture Overview

The application consists of three main zones:

- **Home** (default zone): Landing page and featured products
- **Catalog**: Product listing and details
- **Account**: User authentication and profile management

Each zone is an independent Next.js application that:
- Can be developed and deployed independently
- Has its own routing and configuration
- Shares common components through a shared library
- Maintains consistent styling using Tailwind CSS

## Environment Configuration

Each zone uses environment variables for configuration, allowing flexible deployment across different environments:

```env
# Home zone (.env)
NEXT_PUBLIC_HOME_URL=http://localhost:3000
NEXT_PUBLIC_CATALOG_URL=http://localhost:3001
NEXT_PUBLIC_ACCOUNT_URL=http://localhost:3002

# Catalog zone (.env)
NEXT_PUBLIC_HOME_URL=http://localhost:3000
NEXT_PUBLIC_CATALOG_URL=http://localhost:3001
NEXT_PUBLIC_ACCOUNT_URL=http://localhost:3002
NEXT_PUBLIC_CATALOG_BASE_PATH=/catalog

# Account zone (.env)
NEXT_PUBLIC_HOME_URL=http://localhost:3000
NEXT_PUBLIC_CATALOG_URL=http://localhost:3001
NEXT_PUBLIC_ACCOUNT_URL=http://localhost:3002
NEXT_PUBLIC_ACCOUNT_BASE_PATH=/account
```

For production, these would be replaced with the appropriate URLs:

```env
# Production example
NEXT_PUBLIC_HOME_URL=https://shop.example.com
NEXT_PUBLIC_CATALOG_URL=https://catalog.shop.example.com
NEXT_PUBLIC_ACCOUNT_URL=https://account.shop.example.com
```

## Shared Library

The `@t-shirt-shop/shared` package contains:
- Common UI components (Header, Footer)
- Shared styles (Tailwind configuration)
- Type definitions
- Utility functions

### Key Features of Shared Library
- Built with TypeScript for type safety
- Uses Tailwind CSS for consistent styling
- Components are client-side rendered (`'use client'`)
- Automatically transpiled in each zone using `transpilePackages`
- Environment-aware navigation utilities

## Zone Configuration

### Home App
```javascript
// next.config.js
{
  output: 'standalone',
  assetPrefix: process.env.NODE_ENV === 'production' 
    ? process.env.NEXT_PUBLIC_HOME_ASSET_PREFIX 
    : undefined,
  images: {
    domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  transpilePackages: ['@t-shirt-shop/shared'],
}
```

### Catalog App
```javascript
// next.config.js
{
  output: 'standalone',
  basePath: process.env.NEXT_PUBLIC_CATALOG_BASE_PATH,
  images: {
    domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  transpilePackages: ['@t-shirt-shop/shared'],
}
```

### Account App
```javascript
// next.config.js
{
  output: 'standalone',
  basePath: process.env.NEXT_PUBLIC_ACCOUNT_BASE_PATH,
  transpilePackages: ['@t-shirt-shop/shared'],
}
```

## Cross-Zone Navigation

Navigation between zones is handled through environment-aware URLs:

```typescript
// Example from shared Header component using environment variables
<a href={process.env.NEXT_PUBLIC_HOME_URL}>Home</a>
<a href={`${process.env.NEXT_PUBLIC_CATALOG_URL}${process.env.NEXT_PUBLIC_CATALOG_BASE_PATH}`}>Catalog</a>
<a href={`${process.env.NEXT_PUBLIC_ACCOUNT_URL}${process.env.NEXT_PUBLIC_ACCOUNT_BASE_PATH}`}>Account</a>
```

## Route Structure

- Home (`process.env.NEXT_PUBLIC_HOME_URL`)
  - Landing page: `/`
  - Featured products: `/`

- Catalog (`process.env.NEXT_PUBLIC_CATALOG_URL`)
  - Product listing: `${NEXT_PUBLIC_CATALOG_BASE_PATH}`
  - Product details: `${NEXT_PUBLIC_CATALOG_BASE_PATH}/product/[id]`

- Account (`process.env.NEXT_PUBLIC_ACCOUNT_URL`)
  - Profile: `${NEXT_PUBLIC_ACCOUNT_BASE_PATH}`
  - Sign in: `${NEXT_PUBLIC_ACCOUNT_BASE_PATH}/signin`
  - Settings: `${NEXT_PUBLIC_ACCOUNT_BASE_PATH}/settings`

## Development Setup

1. Set up environment variables:
```bash
# Copy example env files
cp .env.example .env
```

2. Install dependencies in each zone and the shared library:
```bash
# In shared library
cd shared
npm install
npm run build

# In each zone (home, catalog, account)
cd ../[zone-name]
npm install
```

3. Start the development servers:
```bash
# Start all zones
cd home && npm run dev
cd catalog && npm run dev
cd account && npm run dev
```

## Key Technologies

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- ESLint
- PostCSS
- Autoprefixer

## Dependencies

Each zone maintains its own dependencies but shares common versions:

```json
{
  "dependencies": {
    "next": "15.2.4",
    "react": "^19",
    "react-dom": "^19",
    "@t-shirt-shop/shared": "file:../shared"
  },
  "devDependencies": {
    "typescript": "^5",
    "tailwindcss": "^3.4.1",
    "postcss": "^8",
    "autoprefixer": "^10"
  }
}
```

## Production Considerations

1. **Environment Strategy**: 
   - Development: Local URLs with different ports
   - Staging: Subdomain-based routing
   - Production: Domain-based routing or CDN distribution

2. **Asset Prefix**: Configurable through environment variables:
```javascript
assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX
```

3. **Standalone Output**: All zones use `output: 'standalone'` for optimal deployment.

4. **Base Paths**: Configurable through environment variables for flexible routing.

## Docker Support

Each zone includes a Dockerfile with environment variable support:
- Multi-stage builds for optimal image size
- Production-ready configuration
- Environment variable injection at runtime
- Exposed ports configurable via environment

Example docker-compose configuration:
```yaml
services:
  home:
    build: ./home
    environment:
      - NEXT_PUBLIC_HOME_URL=${NEXT_PUBLIC_HOME_URL}
      - NEXT_PUBLIC_CATALOG_URL=${NEXT_PUBLIC_CATALOG_URL}
      - NEXT_PUBLIC_ACCOUNT_URL=${NEXT_PUBLIC_ACCOUNT_URL}

  catalog:
    build: ./catalog
    environment:
      - NEXT_PUBLIC_HOME_URL=${NEXT_PUBLIC_HOME_URL}
      - NEXT_PUBLIC_CATALOG_URL=${NEXT_PUBLIC_CATALOG_URL}
      - NEXT_PUBLIC_ACCOUNT_URL=${NEXT_PUBLIC_ACCOUNT_URL}
      - NEXT_PUBLIC_CATALOG_BASE_PATH=${NEXT_PUBLIC_CATALOG_BASE_PATH}

  account:
    build: ./account
    environment:
      - NEXT_PUBLIC_HOME_URL=${NEXT_PUBLIC_HOME_URL}
      - NEXT_PUBLIC_CATALOG_URL=${NEXT_PUBLIC_CATALOG_URL}
      - NEXT_PUBLIC_ACCOUNT_URL=${NEXT_PUBLIC_ACCOUNT_URL}
      - NEXT_PUBLIC_ACCOUNT_BASE_PATH=${NEXT_PUBLIC_ACCOUNT_BASE_PATH}
```