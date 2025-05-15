# T-Shirt Shop - Next.js Multi-Zone Micro-Frontends

This project demonstrates a micro-frontend architecture using Next.js 15's multi-zone feature. The application is split into three independent applications (zones) that work together to create a cohesive e-commerce experience.

## Architecture Constraints

- zones should not depend on each other
- components folder should only contain header and footer
- shared components should not depend on zones
- zones should be free of cycles
