#!/bin/bash

# Development setup script for TOZ YAPI

set -e

echo "🚀 TOZ YAPI Development Setup"
echo "============================="

# Check Node.js version
echo "Checking Node.js version..."
node_version=$(node -v)
echo "Node.js version: $node_version"

if [[ ! "$node_version" =~ ^v1[8-9] ]] && [[ ! "$node_version" =~ ^v2[0-9] ]]; then
    echo "❌ Node.js 18+ is required"
    exit 1
fi

# Check npm version
echo "Checking npm version..."
npm_version=$(npm -v)
echo "npm version: $npm_version"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file
if [ ! -f .env ]; then
    echo "📝 Creating environment file..."
    cp .env.example .env
    echo "✅ Environment file created. Please update .env with your configuration."
else
    echo "⚠️  .env file already exists"
fi

# Create logs directory
if [ ! -d "logs" ]; then
    echo "📂 Creating logs directory..."
    mkdir -p logs
fi

# Run linting
echo "🔍 Running code quality checks..."
npm run lint

# Run tests
echo "🧪 Running tests..."
npm test

echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "📚 Next steps:"
echo "1. Update .env file with your configuration"
echo "2. Start MongoDB: mongod"
echo "3. Run development server: npm run dev"
echo "4. Visit API documentation: http://localhost:3000/api-docs"
echo ""
echo "🐳 Or use Docker:"
echo "docker-compose up -d"