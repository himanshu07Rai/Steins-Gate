# Use the official Node.js image as a base image
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json ./

RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Use a smaller image for serving the application
FROM node:18 AS runner

# Set the working directory
WORKDIR /app

# Copy the build artifacts from the builder stage
COPY --from=builder /app/.next .next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public

# Install production dependencies only
RUN npm install --only=production

# Set environment variables
ENV NODE_ENV production

# Expose the port Next.js runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]