#!/bin/bash

echo "🛑 Stopping Taskflow services..."

# Stop services and remove orphans
docker-compose down --remove-orphans

echo "✅ Services stopped and orphaned containers removed!"
echo ""
echo "To start services again: ./start.sh" 