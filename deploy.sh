#!/bin/bash
set -e

echo "🧹 Stopping and removing old containers..."
sudo docker-compose down || true

echo "🔑 Logging into Docker Hub..."
echo "$DOCKER_TOKEN" | sudo docker login -u "$DOCKER_USERNAME" --password-stdin

echo "🛠 Pulling latest images from Docker Hub..."
sudo docker-compose pull

echo "🚀 Starting new containers..."
sudo docker-compose up -d

echo "✅ Deployment complete!"
