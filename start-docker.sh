#!/bin/bash

# Build shared package
echo "Building shared package..."
cd shared && npm install && npm run build && cd ..

# Start docker-compose
echo "Starting docker containers..."
docker-compose up --build 