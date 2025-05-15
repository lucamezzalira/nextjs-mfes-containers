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

## Architecture Constraints