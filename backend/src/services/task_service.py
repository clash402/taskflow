import asyncio
import logging
from datetime import datetime
from typing import Optional, List, Dict, Any
from ..schemas.task import TaskRequest, TaskResult, TaskStatus
from ..schemas.step import StepLog, StepStatus
from ..storage.task_store import TaskStore
from ..agents.task_executor import TaskExecutor
from ..core.config import settings

logger = logging.getLogger(__name__)


class TaskService:
    """Service for managing task execution"""

    def __init__(self):
        self.task_store = TaskStore()
        self.task_executor = TaskExecutor()
        self.active_tasks: Dict[str, asyncio.Task] = {}

    async def execute_task(self, task_id: str, task_request: TaskRequest):
        """Execute a task asynchronously"""
        try:
            # Update task status to running
            await self.task_store.update_task_status(
                task_id, TaskStatus.RUNNING, started_at=datetime.utcnow()
            )

            # Create execution task
            execution_task = asyncio.create_task(
                self._execute_task_internal(task_id, task_request)
            )
            self.active_tasks[task_id] = execution_task

            # Wait for completion
            await execution_task

        except Exception as e:
            logger.error(f"Error executing task {task_id}: {str(e)}")
            await self.task_store.update_task_status(
                task_id, TaskStatus.FAILED, error=str(e), completed_at=datetime.utcnow()
            )
        finally:
            # Clean up active task
            if task_id in self.active_tasks:
                del self.active_tasks[task_id]

    async def _execute_task_internal(self, task_id: str, task_request: TaskRequest):
        """Internal task execution logic"""
        start_time = datetime.utcnow()

        try:
            # Execute the task using the agent
            result = await self.task_executor.execute(task_id, task_request)

            # Update task with results
            await self.task_store.update_task_status(
                task_id,
                TaskStatus.COMPLETED,
                output=result.get("output"),
                metadata=result.get("metadata", {}),
                completed_at=datetime.utcnow(),
            )

            duration = (datetime.utcnow() - start_time).total_seconds()
            logger.info(f"Task {task_id} completed successfully in {duration:.2f}s")

        except Exception as e:
            logger.error(f"Task {task_id} failed: {str(e)}")
            await self.task_store.update_task_status(
                task_id, TaskStatus.FAILED, error=str(e), completed_at=datetime.utcnow()
            )
            raise

    async def get_task_status(self, task_id: str) -> Optional[TaskResult]:
        """Get the current status of a task"""
        return await self.task_store.get_task(task_id)

    async def cancel_task(self, task_id: str) -> bool:
        """Cancel a running task"""
        if task_id in self.active_tasks:
            # Cancel the execution task
            self.active_tasks[task_id].cancel()
            del self.active_tasks[task_id]

            # Update status
            await self.task_store.update_task_status(
                task_id, TaskStatus.CANCELLED, completed_at=datetime.utcnow()
            )
            return True

        return False

    async def list_tasks(self, limit: int = 10, offset: int = 0) -> List[TaskResult]:
        """List recent tasks"""
        return await self.task_store.list_tasks(limit=limit, offset=offset)

    async def get_statistics(self) -> Dict[str, Any]:
        """Get task execution statistics"""
        return await self.task_store.get_statistics()
