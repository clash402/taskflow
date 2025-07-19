import logging
from datetime import datetime
from typing import Optional, List, Dict, Any
from ..schemas.task import TaskResult, TaskStatus
from ..schemas.step import StepLog, StepStatus

logger = logging.getLogger(__name__)


class TaskStore:
    """In-memory task storage"""

    def __init__(self):
        self.tasks: Dict[str, TaskResult] = {}
        self.steps: Dict[str, List[StepLog]] = {}

    async def create_task(self, task_id: str, task_request) -> TaskResult:
        """Create a new task"""
        task = TaskResult(
            id=task_id, status=TaskStatus.PENDING, started_at=datetime.utcnow()
        )
        self.tasks[task_id] = task
        self.steps[task_id] = []
        return task

    async def update_task_status(
        self,
        task_id: str,
        status: TaskStatus,
        output: Optional[str] = None,
        error: Optional[str] = None,
        metadata: Optional[Dict[str, Any]] = None,
        started_at: Optional[datetime] = None,
        completed_at: Optional[datetime] = None,
    ):
        """Update task status and details"""
        if task_id not in self.tasks:
            await self.create_task(task_id, None)

        task = self.tasks[task_id]
        task.status = status

        if output is not None:
            task.output = output
        if error is not None:
            task.error = error
        if metadata is not None:
            task.metadata.update(metadata)
        if started_at is not None:
            task.started_at = started_at
        if completed_at is not None:
            task.completed_at = completed_at
            if task.started_at:
                task.duration = (completed_at - task.started_at).total_seconds()

    async def get_task(self, task_id: str) -> Optional[TaskResult]:
        """Get a task by ID"""
        return self.tasks.get(task_id)

    async def list_tasks(self, limit: int = 10, offset: int = 0) -> List[TaskResult]:
        """List tasks with pagination"""
        sorted_tasks = sorted(
            self.tasks.values(),
            key=lambda x: x.started_at or datetime.min,
            reverse=True,
        )
        return sorted_tasks[offset : offset + limit]

    async def add_step(self, task_id: str, step: StepLog):
        """Add a step to a task"""
        if task_id not in self.steps:
            self.steps[task_id] = []
        self.steps[task_id].append(step)

        # Update task steps
        if task_id in self.tasks:
            self.tasks[task_id].steps = self.steps[task_id]

    async def get_statistics(self) -> Dict[str, Any]:
        """Get task execution statistics"""
        total_tasks = len(self.tasks)
        completed_tasks = len(
            [t for t in self.tasks.values() if t.status == TaskStatus.COMPLETED]
        )
        failed_tasks = len(
            [t for t in self.tasks.values() if t.status == TaskStatus.FAILED]
        )
        running_tasks = len(
            [t for t in self.tasks.values() if t.status == TaskStatus.RUNNING]
        )

        # Calculate average duration
        completed_with_duration = [
            t
            for t in self.tasks.values()
            if t.status == TaskStatus.COMPLETED and t.duration
        ]
        avg_duration = (
            sum(t.duration for t in completed_with_duration)
            / len(completed_with_duration)
            if completed_with_duration
            else 0
        )

        return {
            "total_tasks": total_tasks,
            "completed_tasks": completed_tasks,
            "failed_tasks": failed_tasks,
            "running_tasks": running_tasks,
            "success_rate": completed_tasks / total_tasks if total_tasks > 0 else 0,
            "average_duration": avg_duration,
        }
