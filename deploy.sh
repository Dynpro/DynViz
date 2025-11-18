#!/bin/bash
set -e

echo "[INFO] Starting deployment..."

# Validate required environment variables
if [ -z "$DOCKERHUB_USERNAME" ] || [ -z "$DOCKERHUB_TOKEN" ]; then
    echo "[ERROR] Missing Docker Hub credentials (DOCKERHUB_USERNAME or DOCKERHUB_TOKEN)."
    exit 1
fi

echo "[INFO] Stopping existing containers..."
sudo docker-compose down || true

echo "[INFO] Logging in to Docker Hub..."
echo "$DOCKERHUB_TOKEN" | sudo docker login -u "$DOCKERHUB_USERNAME" --password-stdin

echo "[INFO] Pulling latest images..."
sudo docker-compose pull

echo "[INFO] Starting containers..."
sudo docker-compose up -d

echo "[INFO] Deployment successful."
sudo docker ps
