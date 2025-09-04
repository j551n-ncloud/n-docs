# Use Node.js 20 Alpine as base image
FROM node:20-alpine

# Install system dependencies
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Copy package files and config files needed by fumadocs-mdx
COPY package.json package-lock.json* ./
COPY source.config.ts ./
COPY tsconfig.json ./
COPY next.config.mjs ./

# Copy content directory (needed by fumadocs-mdx)
COPY content ./content

# Install dependencies
RUN npm ci

# Copy remaining source code
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN npm run build

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public files for standalone build
COPY --chown=nextjs:nodejs public ./public

# Copy static files for standalone build
COPY --chown=nextjs:nodejs .next/static ./.next/standalone/.next/static

# Set correct permissions
RUN chown -R nextjs:nodejs /app/.next

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set runtime environment
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application using standalone server
CMD ["node", ".next/standalone/server.js"]