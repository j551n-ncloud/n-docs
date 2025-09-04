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

# Copy the standalone build output (files are already in container from build)
RUN cp -r .next/standalone/* ./ || echo "No standalone files found"

# Copy static files for Next.js (files are already in container from build)  
RUN mkdir -p .next && cp -r .next/static ./.next/static || echo "No static files found"

# Copy public files
COPY --chown=nextjs:nodejs public ./public

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
CMD ["node", "server.js"]