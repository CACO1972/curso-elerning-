#!/bin/bash

# ImplantX™ - Railway Deployment Helper Script
# This script helps you deploy to Railway

echo "🦜 ImplantX™ - Railway Deployment Helper"
echo "========================================"
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null
then
    echo "❌ Railway CLI not found. Installing..."
    echo ""
    echo "Please run:"
    echo "  npm install -g @railway/cli"
    echo ""
    echo "Or visit: https://docs.railway.app/develop/cli"
    exit 1
fi

echo "✅ Railway CLI found"
echo ""

# Login to Railway
echo "📝 Logging in to Railway..."
railway login

# Link or create project
echo ""
echo "🔗 Linking to Railway project..."
echo "If you don't have a project yet, create one at: https://railway.app"
echo ""
railway link

# Set environment variables
echo ""
echo "⚙️  Setting up environment variables..."
echo ""
read -p "Enter your OpenAI API Key: " OPENAI_KEY

railway variables set NODE_ENV=production
railway variables set OPENAI_API_KEY=$OPENAI_KEY

echo ""
echo "✅ Environment variables set!"

# Deploy
echo ""
echo "🚀 Deploying to Railway..."
railway up

echo ""
echo "✅ Deployment complete!"
echo ""
echo "To view your app:"
echo "  railway open"
echo ""
echo "To view logs:"
echo "  railway logs"
echo ""
echo "🎉 Your ImplantX™ app should be live!"
