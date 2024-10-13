#!/bin/bash
echo "Starting Docker Compose..."
docker-compose up -d
npm install
cd apps/web
echo "Building the web app..."
npm run build
echo "Starting the web app..."
npm run start
