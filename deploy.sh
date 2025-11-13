#!/bin/bash
set -e

echo "🧹 Stopping and removing old containers..."
sudo docker-compose down || true

echo "🔑 Logging into Docker Hub..."
echo "$DOCKERHUB_TOKEN" | sudo docker login -u "$DOCKERHUB_USERNAME" --password-stdin

echo "🛠 Pulling latest images from Docker Hub..."
sudo docker-compose pull

echo "🚀 Starting new containers..."
sudo docker-compose up -d

echo "✅ Deployment complete!"
