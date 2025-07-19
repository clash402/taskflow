from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime
from enum import Enum


class TaskStatus(str, Enum):
    """Task status enumeration"""

    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


class TaskRequest(BaseModel):
    """Request schema for creating a new task"""

    prompt: str = Field(..., description="The task prompt to execute", min_length=1)
    model: Optional[str] = Field("gpt-4", description="AI model to use")
    temperature: Optional[float] = Field(
        0.7, ge=0.0, le=2.0, description="Model temperature"
    )
    max_tokens: Optional[int] = Field(
        4000, gt=0, description="Maximum tokens to generate"
    )
    system_prompt: Optional[str] = Field(None, description="System prompt for the AI")
    options: Optional[Dict[str, Any]] = Field(
        default_factory=dict, description="Additional options"
    )


class TaskResponse(BaseModel):
    """Response schema for task creation"""

    id: str = Field(..., description="Unique task identifier")
    status: TaskStatus = Field(..., description="Current task status")
    message: Optional[str] = Field(None, description="Status message")
    created_at: datetime = Field(
        default_factory=datetime.utcnow, description="Task creation timestamp"
    )
    estimated_duration: Optional[int] = Field(
        None, description="Estimated duration in seconds"
    )


class TaskResult(BaseModel):
    """Schema for task execution results"""

    id: str = Field(..., description="Task identifier")
    status: TaskStatus = Field(..., description="Final task status")
    output: Optional[str] = Field(None, description="Task output/result")
    error: Optional[str] = Field(None, description="Error message if failed")
    steps: list = Field(default_factory=list, description="Execution steps")
    metadata: Dict[str, Any] = Field(
        default_factory=dict, description="Additional metadata"
    )
    started_at: Optional[datetime] = Field(None, description="Task start timestamp")
    completed_at: Optional[datetime] = Field(
        None, description="Task completion timestamp"
    )
    duration: Optional[float] = Field(None, description="Task duration in seconds")
