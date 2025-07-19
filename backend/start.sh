#!/bin/bash

echo "🚀 Starting Taskflow Backend..."
echo "Installing dependencies and starting FastAPI server..."

# Check if uv is installed, if not install it
if ! command -v uv &> /dev/null; then
    echo "📦 Installing uv..."
    pip install uv
fi

# Install dependencies using uv
echo "📦 Installing Python dependencies..."
uv pip sync

# Start the FastAPI server
echo "🔥 Starting FastAPI server on http://localhost:8000"
echo "Press Ctrl+C to stop"
echo ""

uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload 