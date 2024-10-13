#!/bin/bash

# Step 1: Run Docker Compose
echo "Starting Docker Compose..."
docker-compose up -d

# Step 2: Navigate to the web directory
cd apps/web

# Step 3: Build the Next.js app
echo "Building the web app..."
npm run build

# Step 4: Start the web app
echo "Starting the web app..."
npm run start
