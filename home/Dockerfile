# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy shared package first
COPY shared /app/shared
WORKDIR /app/shared
RUN npm install
RUN npm run build

# Move to home directory and build it
WORKDIR /app/home
COPY home/package*.json ./
RUN npm install

# Copy home source code
COPY home .

# Build application
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Set to production
ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=builder /app/home/next.config.js ./
COPY --from=builder /app/home/public ./public
COPY --from=builder /app/home/.next/standalone ./
COPY --from=builder /app/home/.next/static ./.next/static

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"] 