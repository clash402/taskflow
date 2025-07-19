from fastapi import APIRouter, HTTPException, BackgroundTasks
from typing import List
import uuid
import logging

from ..schemas.task import TaskRequest, TaskResponse, TaskResult, TaskStatus
from ..services.task_service import TaskService
from ..core.config import settings

logger = logging.getLogger(__name__)
router = APIRouter()

# Initialize task service
task_service = TaskService()


@router.post("/tasks", response_model=TaskResponse)
async def create_task(task_request: TaskRequest, background_tasks: BackgroundTasks):
    """Create and start a new task"""
    try:
        task_id = str(uuid.uuid4())

        # Create task response
        response = TaskResponse(
            id=task_id,
            status=TaskStatus.PENDING,
            message="Task created and queued for execution",
            estimated_duration=settings.MAX_TASK_DURATION,
        )

        # Add task to background execution
        background_tasks.add_task(task_service.execute_task, task_id, task_request)

        logger.info(
            f"Created task {task_id} with prompt: {task_request.prompt[:100]}..."
        )
        return response

    except Exception as e:
        logger.error(f"Error creating task: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create task")


@router.get("/tasks/{task_id}/status", response_model=TaskResult)
async def get_task_status(task_id: str):
    """Get the current status of a task"""
    try:
        result = await task_service.get_task_status(task_id)
        if not result:
            raise HTTPException(status_code=404, detail="Task not found")
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting task status for {task_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get task status")


@router.post("/tasks/{task_id}/cancel")
async def cancel_task(task_id: str):
    """Cancel a running task"""
    try:
        success = await task_service.cancel_task(task_id)
        if not success:
            raise HTTPException(
                status_code=404, detail="Task not found or already completed"
            )

        return {"message": "Task cancelled successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error cancelling task {task_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to cancel task")


@router.get("/tasks", response_model=List[TaskResult])
async def list_tasks(limit: int = 10, offset: int = 0):
    """List recent tasks"""
    try:
        tasks = await task_service.list_tasks(limit=limit, offset=offset)
        return tasks
    except Exception as e:
        logger.error(f"Error listing tasks: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to list tasks")
