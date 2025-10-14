# -------- Stage 1: Builder --------
FROM node:22-alpine AS builder

# Enable pnpm via Corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy only package files first for caching
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Build the project (assuming you have a "build" script in package.json)
RUN pnpm build


# -------- Stage 2: Runner (smaller image) --------
FROM node:22-alpine AS runner

WORKDIR /app

# Enable pnpm (if you use it in runtime)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy built files and production deps only
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3333

EXPOSE 3333

# Start the compiled JavaScript server (after build)
CMD ["node", "dist/server.js"]
