import logging
from datetime import datetime
from typing import Dict, Any, List
from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver

from ..schemas.task import TaskRequest, TaskStatus
from ..schemas.step import StepLog, StepStatus
from ..storage.task_store import TaskStore
from ..core.config import settings

logger = logging.getLogger(__name__)


class TaskExecutor:
    """LangGraph-based task executor"""

    def __init__(self):
        self.llm = None
        self.task_store = TaskStore()
        self.memory = MemorySaver()
        self.workflow = None

    def _get_llm(self):
        """Lazy initialization of LLM"""
        if self.llm is None:
            self.llm = ChatOpenAI(
                model=settings.OPENAI_MODEL,
                temperature=settings.OPENAI_TEMPERATURE,
                max_tokens=settings.OPENAI_MAX_TOKENS,
                api_key=settings.OPENAI_API_KEY,
            )
        return self.llm

    def _get_workflow(self):
        """Lazy initialization of workflow"""
        if self.workflow is None:
            self.workflow = self._build_workflow()
        return self.workflow

    def _build_workflow(self) -> StateGraph:
        """Build the LangGraph workflow"""
        workflow = StateGraph(StateType=Dict)

        # Add nodes
        workflow.add_node("plan", self._plan_task)
        workflow.add_node("execute", self._execute_task)
        workflow.add_node("reflect", self._reflect_task)

        # Add edges
        workflow.set_entry_point("plan")
        workflow.add_edge("plan", "execute")
        workflow.add_edge("execute", "reflect")
        workflow.add_edge("reflect", END)

        return workflow.compile(checkpointer=self.memory)

    async def execute(self, task_id: str, task_request: TaskRequest) -> Dict[str, Any]:
        """Execute a task using the LangGraph workflow"""
        try:
            # Initialize state
            state = {
                "task_id": task_id,
                "prompt": task_request.prompt,
                "model": task_request.model,
                "temperature": task_request.temperature,
                "max_tokens": task_request.max_tokens,
                "system_prompt": task_request.system_prompt,
                "steps": [],
                "output": None,
                "error": None,
            }

            # Add initial step
            await self._add_step(
                task_id,
                "Task Initialization",
                StepStatus.COMPLETED,
                "Task execution started",
            )

            # Run the workflow
            config = {"configurable": {"thread_id": task_id}}
            workflow = self._get_workflow()
            result = await workflow.ainvoke(state, config)

            return {
                "output": result.get("output"),
                "metadata": {
                    "steps": result.get("steps", []),
                    "model": task_request.model,
                    "temperature": task_request.temperature,
                },
            }

        except Exception as e:
            logger.error(f"Error executing task {task_id}: {str(e)}")
            await self._add_step(task_id, "Task Execution", StepStatus.FAILED, str(e))
            raise

    async def _plan_task(self, state: Dict[str, Any]) -> Dict[str, Any]:
        """Plan the task execution"""
        task_id = state["task_id"]
        prompt = state["prompt"]

        await self._add_step(
            task_id, "Planning", StepStatus.RUNNING, "Analyzing task requirements"
        )

        try:
            # Simple planning - in a real implementation, this would be more sophisticated
            plan_prompt = f"""
            Analyze the following task and create a simple execution plan:
            
            Task: {prompt}
            
            Provide a brief plan for executing this task.
            """

            llm = self._get_llm()
            response = await llm.ainvoke(plan_prompt)
            plan = response.content

            await self._add_step(task_id, "Planning", StepStatus.COMPLETED, plan)

            state["plan"] = plan
            return state

        except Exception as e:
            await self._add_step(task_id, "Planning", StepStatus.FAILED, str(e))
            raise

    async def _execute_task(self, state: Dict[str, Any]) -> Dict[str, Any]:
        """Execute the planned task"""
        task_id = state["task_id"]
        prompt = state["prompt"]
        plan = state.get("plan", "")

        await self._add_step(task_id, "Execution", StepStatus.RUNNING, "Executing task")

        try:
            # Execute the task
            execution_prompt = f"""
            Based on the following plan, execute the task:
            
            Plan: {plan}
            Task: {prompt}
            
            Provide a detailed response that completes the task.
            """

            llm = self._get_llm()
            response = await llm.ainvoke(execution_prompt)
            output = response.content

            await self._add_step(
                task_id, "Execution", StepStatus.COMPLETED, "Task executed successfully"
            )

            state["output"] = output
            return state

        except Exception as e:
            await self._add_step(task_id, "Execution", StepStatus.FAILED, str(e))
            raise

    async def _reflect_task(self, state: Dict[str, Any]) -> Dict[str, Any]:
        """Reflect on the task execution"""
        task_id = state["task_id"]
        output = state.get("output", "")

        await self._add_step(
            task_id, "Reflection", StepStatus.RUNNING, "Analyzing execution results"
        )

        try:
            # Simple reflection
            reflection_prompt = f"""
            Review the task execution and provide a brief reflection:
            
            Task Output: {output}
            
            Provide a brief reflection on the execution quality and any improvements.
            """

            llm = self._get_llm()
            response = await llm.ainvoke(reflection_prompt)
            reflection = response.content

            await self._add_step(
                task_id, "Reflection", StepStatus.COMPLETED, reflection
            )

            state["reflection"] = reflection
            return state

        except Exception as e:
            await self._add_step(task_id, "Reflection", StepStatus.FAILED, str(e))
            raise

    async def _add_step(
        self, task_id: str, step_name: str, status: StepStatus, message: str
    ):
        """Add a step to the task"""
        step = StepLog(
            id=f"{task_id}_{step_name.lower()}",
            task_id=task_id,
            step_name=step_name,
            status=status,
            message=message,
            started_at=datetime.utcnow(),
        )

        if status in [StepStatus.COMPLETED, StepStatus.FAILED]:
            step.completed_at = datetime.utcnow()
            if step.started_at:
                step.duration = (step.completed_at - step.started_at).total_seconds()

        await self.task_store.add_step(task_id, step)
