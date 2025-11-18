Currently i have this in my deploy.sh file
#!/bin/bash
set -e

echo "🛠 Pulling latest images from Docker Hub..."
docker-compose pull

echo "🚀 Restarting containers..."
docker-compose up -d

echo "🧹 Cleaning old images..."
docker image prune -f

echo "✅ Deployment complete!"
