# Use the official Node.js image as a base image
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Use a minimal image for production
FROM node:18-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy the build output and dependencies from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose the Next.js default port
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]