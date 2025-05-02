# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy shared package first
COPY shared /app/shared
WORKDIR /app/shared
RUN npm install
RUN npm run build

# Move to account directory and build it
WORKDIR /app/account
COPY account/package*.json ./
RUN npm install

# Copy account source code
COPY account .

# Build application
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Set to production
ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=builder /app/account/next.config.js ./
COPY --from=builder /app/account/public ./public
COPY --from=builder /app/account/.next/standalone ./
COPY --from=builder /app/account/.next/static ./.next/static

# Expose port
EXPOSE 3002

# Start the application
CMD ["node", "server.js"] 