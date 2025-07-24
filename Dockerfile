FROM node:20-slim

# Install pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack prepare pnpm@10.11.0 --activate
RUN corepack enable

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the Next.js app
RUN pnpm build

# Expose port
EXPOSE 3000

# Default command (can be overridden in docker-compose)
CMD ["pnpm", "start"]