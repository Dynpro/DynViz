#!/bin/bash
set -e

echo "📦 DynViz Deployment Started"

# Login to Docker Hub
echo "$DOCKER_PASSWORD" | sudo docker login -u "$DOCKER_USERNAME" --password-stdin

# Stop old containers
sudo docker-compose down || true

# Pull latest images
sudo docker-compose pull

# Start updated containers
sudo docker-compose up -d

echo "✅ Deployment complete!"
sudo docker ps
