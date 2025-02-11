# Step 1: Base image
FROM node:20 AS base

# Install pnpm globally
RUN npm install -g pnpm@9.15.4

# Add environment variable to be used during the build
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Step 2: Dependencies stage
FROM base AS dependencies

WORKDIR /app
# Copy package.json and pnpm-lock.yaml first to leverage Docker cache
COPY package.json pnpm-lock.yaml ./ 
# Install dependencies using pnpm
RUN pnpm install

# Step 3: Build stage
FROM base AS build

WORKDIR /app
# Copy the rest of the application files
COPY . . 
# Copy the node_modules from the dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules
# Build the Next.js app
RUN pnpm build

# Step 4: Deploy stage
FROM base AS deploy

WORKDIR /app
# Copy package.json and pnpm-lock.yaml from the dependencies stage
COPY --from=dependencies /app/package.json ./ 
COPY --from=dependencies /app/pnpm-lock.yaml ./
# Copy the built Next.js app files from the build stage
COPY --from=build /app/.next/ ./.next/
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/public ./public

# Expose port for the app to run on
EXPOSE 3000

# Start the Next.js app
CMD ["pnpm", "start"]
