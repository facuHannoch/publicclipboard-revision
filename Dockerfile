# Multi-stage Dockerfile for Public Clipboard Server
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy shared package
# COPY shared/package.json shared/tsconfig.json shared/constants.ts ./shared/
# WORKDIR /app/shared
# RUN npm install && npm run build

# Copy server files
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci

# Copy server source and build
COPY server/tsconfig.json ./
COPY server/src ./src
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy shared package
# COPY --from=builder /app/shared/package.json /app/shared/
# COPY --from=builder /app/shared/constants.js /app/shared/
# COPY --from=builder /app/shared/constants.d.ts /app/shared/

# Copy production dependencies and built code
COPY --from=builder /app/server/package*.json ./
COPY --from=builder /app/server/dist ./dist
COPY --from=builder /app/server/node_modules ./node_modules

# Set ownership
RUN chown -R nodejs:nodejs /app

USER nodejs

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "dist/index.js"]
