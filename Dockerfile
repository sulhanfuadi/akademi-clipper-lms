# Stage 1: Build stage
FROM oven/bun:1 AS build

WORKDIR /app

# Copy package files for dependency caching
COPY package.json bun.lock* ./

# Install all dependencies (including devDependencies for Prisma)
RUN bun install

# Copy Prisma schema
COPY prisma ./prisma
COPY prisma.config.ts ./

# Set dummy DATABASE_URL for Prisma generate (not for actual connection)
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy?schema=public"

# Generate Prisma Client
RUN bunx prisma generate

# Copy source code
COPY src ./src
COPY tsconfig.json ./

# Set production environment
ENV NODE_ENV=production

# Compile server.ts (yang punya .listen) ke binary
RUN bun build \
    --compile \
    --minify-whitespace \
    --minify-syntax \
    --target bun-linux-x64 \
    --outfile server \
    src/server.ts

# Stage 2: Production stage with Bun
FROM oven/bun:1-slim

WORKDIR /app

# Copy compiled binary
COPY --from=build /app/server server

# Copy Prisma schema and config
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./prisma.config.ts

# Copy Prisma node_modules (for CLI)
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=build /app/node_modules/prisma ./node_modules/prisma

# Copy generated Prisma Client (Prisma 7.x location)
COPY --from=build /app/src/lib/generated/prisma ./src/lib/generated/prisma

# Copy package.json
COPY --from=build /app/package.json ./package.json

# Copy startup script
COPY docker-start.sh ./docker-start.sh

# Make script executable
RUN chmod +x docker-start.sh

# Set production environment
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Use startup script as entrypoint
CMD ["./docker-start.sh"]