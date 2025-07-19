#!/bin/bash

echo "🚀 Starting Taskflow Frontend..."
echo "Installing dependencies and starting Next.js development server..."

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing Node.js dependencies..."
    npm install
fi

# Start the Next.js development server
echo "🔥 Starting Next.js development server on http://localhost:3000"
echo "Press Ctrl+C to stop"
echo ""

npm run dev 