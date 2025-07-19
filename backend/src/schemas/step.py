from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime
from enum import Enum


class StepStatus(str, Enum):
    """Step status enumeration"""

    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    SKIPPED = "skipped"


class StepLog(BaseModel):
    """Schema for step execution logs"""

    id: str = Field(..., description="Unique step identifier")
    task_id: str = Field(..., description="Parent task identifier")
    step_name: str = Field(..., description="Name of the step")
    status: StepStatus = Field(..., description="Current step status")
    message: Optional[str] = Field(None, description="Step message or description")
    details: Optional[Dict[str, Any]] = Field(
        None, description="Step execution details"
    )
    error: Optional[str] = Field(None, description="Error message if failed")
    started_at: Optional[datetime] = Field(None, description="Step start timestamp")
    completed_at: Optional[datetime] = Field(
        None, description="Step completion timestamp"
    )
    duration: Optional[float] = Field(None, description="Step duration in seconds")
    progress: Optional[float] = Field(
        None, ge=0.0, le=1.0, description="Step progress (0-1)"
    )
