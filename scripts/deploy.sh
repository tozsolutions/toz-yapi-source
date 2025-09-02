#!/bin/bash

# Production deployment script
set -e

echo "🚀 Starting production deployment..."

# Load environment variables
if [ -f .env.production ]; then
    export $(grep -v '^#' .env.production | xargs)
fi

# Validate required environment variables
required_vars=("MONGODB_URI" "JWT_SECRET" "NODE_ENV")
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "❌ Error: Required environment variable $var is not set"
        exit 1
    fi
done

echo "✅ Environment variables validated"

# Build the application
echo "📦 Building application..."
npm run build

# Run tests before deployment
echo "🧪 Running tests..."
npm run test

# Build and push Docker image
echo "🐳 Building Docker image..."
docker build -t toz-yapi-source:production .

# Deploy using Docker Compose
echo "🚀 Deploying application..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Health check
echo "🔍 Performing health check..."
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/health || echo "000")

if [ "$response" = "200" ]; then
    echo "✅ Deployment successful! Application is healthy."
else
    echo "❌ Deployment failed! Health check returned: $response"
    exit 1
fi

echo "🎉 Production deployment completed successfully!"