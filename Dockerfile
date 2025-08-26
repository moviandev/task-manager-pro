# ----------------------
# Stage 1: Build
# ----------------------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Install dependencies (both dev and prod for build)
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the NestJS app
RUN npm run build

# ----------------------
# Stage 2: Production
# ----------------------
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# Copy package.json and install only production deps
COPY package*.json ./
RUN npm install --production

# Copy compiled NestJS app from builder
COPY --from=builder /usr/src/app/dist ./dist

# Copy other necessary assets (if you have any static files)
# COPY --from=builder /usr/src/app/public ./public

# Set environment variable for production
ENV NODE_ENV=production

# Expose the port your NestJS app uses
EXPOSE 3000

# Start the app
CMD ["node", "dist/main.js"]
