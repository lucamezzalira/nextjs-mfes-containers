# Home Micro-Frontend (T-Shirt Shop)

This is the **Home** micro-frontend for the T-Shirt Shop project, built with [Next.js](https://nextjs.org) and [TypeScript](https://www.typescriptlang.org/). It serves as the main entry point for users, featuring a landing page, featured products, and navigation to other micro-frontends (e.g., Catalog, Account).

## Features
- Modern landing page with hero section and featured products
- Navigation to the Catalog micro-frontend (deep links supported)
- Responsive design using [Tailwind CSS](https://tailwindcss.com/)
- Shared UI components (Header, Footer) via a local `@t-shirt-shop/shared` package
- Optimized image loading with Next.js Image component
- Custom Next.js configuration for asset prefixing and rewrites
- Dockerized for production deployment

## Project Structure
```
home/
├── Dockerfile
├── next.config.js
├── package.json
├── postcss.config.js
├── public/
├── src/
│   └── app/
│       ├── layout.tsx
│       └── page.tsx
├── tailwind.config.js
├── tsconfig.json
└── ...
```

## Shared Package
This app uses a local shared package, [`@t-shirt-shop/shared`](../shared), for common UI components (Header, Footer) and styles. The shared package is built and imported as a dependency.

## Development
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   # App runs at http://localhost:3000
   ```
3. **Edit the main page:**
   - Modify `src/app/page.tsx` for the landing page.
   - Shared components can be found in the `shared` package.

## Configuration
- **Custom rewrites** (see `next.config.js`):
  - `/catalog/:path*` is proxied to the Catalog micro-frontend (URL set via env vars)
  - `/account/:path*` is proxied to the Account micro-frontend (URL set via env vars)
- **Asset prefix** is set for production via `NEXT_PUBLIC_HOME_ASSET_PREFIX`.
- **Images** are loaded from Unsplash and optimized by Next.js.

## Docker Deployment
This app is ready for containerized deployment:
```bash
docker build -t t-shirt-shop-home .
docker run -p 3000:3000 t-shirt-shop-home
```

## Scripts
- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm start` – Start production server
- `npm run lint` – Lint code

## Environment Variables
- `NEXT_PUBLIC_HOME_ASSET_PREFIX` – (optional) Asset prefix for production
- `NEXT_PUBLIC_CATALOG_URL` – Base URL for Catalog micro-frontend
- `NEXT_PUBLIC_CATALOG_BASE_PATH` – Base path for Catalog
- `NEXT_PUBLIC_ACCOUNT_URL` – Base URL for Account micro-frontend
- `NEXT_PUBLIC_ACCOUNT_BASE_PATH` – Base path for Account

## License
MIT
