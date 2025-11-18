#!/bin/bash
set -e

echo "[INFO] Logging in to Docker Hub..."
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

echo "[INFO] Stopping and removing old containers..."
docker compose down

echo "[INFO] Removing old images..."
docker rmi -f dynprobangalore/dynviz-v1:frontend || true
docker rmi -f dynprobangalore/dynviz-v1:backend || true

echo "[INFO] Pulling latest images..."
docker compose pull

echo "[INFO] Recreating containers with latest images..."
docker compose up -d --remove-orphans

echo "[INFO] Cleaning unused images..."
docker image prune -f

echo "[INFO] Deployment complete."
docker ps
