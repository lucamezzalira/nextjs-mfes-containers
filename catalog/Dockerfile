# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy shared package first
COPY shared /app/shared
WORKDIR /app/shared
RUN npm install
RUN npm run build

# Move to catalog directory and build it
WORKDIR /app/catalog
COPY catalog/package*.json ./
RUN npm install

# Copy catalog source code and create public directory
COPY catalog .
RUN mkdir -p /app/catalog/public
RUN touch /app/catalog/public/.gitkeep

# Build application
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Set to production
ENV NODE_ENV=production

# Create public directory first
RUN mkdir -p public

# Copy necessary files from builder
COPY --from=builder /app/catalog/next.config.js ./
COPY --from=builder /app/catalog/public/. ./public/
COPY --from=builder /app/catalog/.next/standalone ./
COPY --from=builder /app/catalog/.next/static ./.next/static

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "server.js"]