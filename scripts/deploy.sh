# Production deployment script for TOZ YAPI

#!/bin/bash

set -e

echo "🚀 TOZ YAPI Production Deployment"
echo "================================="

# Check if required environment variables are set
if [ -z "$MONGODB_URI" ]; then
    echo "❌ MONGODB_URI environment variable is required"
    exit 1
fi

if [ -z "$JWT_SECRET" ]; then
    echo "❌ JWT_SECRET environment variable is required"
    exit 1
fi

# Set production environment
export NODE_ENV=production

# Install production dependencies
echo "📦 Installing production dependencies..."
npm ci --only=production

# Build if needed (for TypeScript projects)
# npm run build

# Start the application
echo "🚀 Starting TOZ YAPI API server..."
npm start