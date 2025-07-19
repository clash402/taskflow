from fastapi import APIRouter, HTTPException
from typing import Dict, Any
import logging

from ..services.task_service import TaskService

logger = logging.getLogger(__name__)
router = APIRouter()

# Initialize task service
task_service = TaskService()


@router.get("/status")
async def get_system_status():
    """Get overall system status"""
    try:
        # Get task statistics
        stats = await task_service.get_statistics()

        return {
            "status": "healthy",
            "services": {
                "api": "running",
                "task_executor": "running",
                "ai_services": "available",
            },
            "statistics": stats,
            "uptime": "running",
        }
    except Exception as e:
        logger.error(f"Error getting system status: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get system status")


@router.get("/status/tasks")
async def get_task_statistics():
    """Get detailed task statistics"""
    try:
        stats = await task_service.get_statistics()
        return stats
    except Exception as e:
        logger.error(f"Error getting task statistics: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get task statistics")


@router.get("/status/health")
async def health_check():
    """Simple health check endpoint"""
    return {"status": "healthy", "timestamp": "2024-01-01T00:00:00Z"}
