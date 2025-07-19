# TaskFlow Backend

AI-powered task automation platform backend built with FastAPI, LangChain, and LangGraph.

## Features

- **FastAPI** - Modern, fast web framework for building APIs
- **LangChain** - Framework for developing applications with LLMs
- **LangGraph** - Stateful, multi-actor applications with LLMs
- **OpenAI Integration** - GPT-4 and other OpenAI models
- **ElevenLabs Integration** - Text-to-speech capabilities
- **ChromaDB** - Vector database for embeddings
- **SQLAlchemy** - Database ORM
- **Whisper** - Speech-to-text processing

## Project Structure

```
backend/
├── data/                    # Sample tasks or agent configs
├── docs/                    # LangGraph diagrams, reasoning flows
├── src/
│   ├── agents/              # LangGraph node logic, planner, reflection
│   ├── integrations/        # External API connections
│   ├── core/                # LangGraph config, rate limiting, logging
│   ├── db/                  # Database connectors and ORM logic
│   ├── storage/             # In-memory or Redis-backed stores
│   ├── models/              # Task, StepLog internal models
│   ├── routers/             # /run, /status
│   ├── schemas/             # Pydantic schemas
│   ├── services/            # Plan → Execute → Reflect orchestration
│   ├── utils/               # Prompt building, validation
│   └── main.py
├── tests/
│   ├── e2e/
│   ├── integration/
│   └── unit/
└── pyproject.toml
```

## Setup

1. **Install dependencies:**
   ```bash
   uv sync
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

3. **Run the development server:**
   ```bash
   uv run python -m src.main
   ```

## API Endpoints

### Tasks
- `POST /api/v1/tasks` - Create and execute a new task
- `GET /api/v1/tasks/{task_id}/status` - Get task status
- `POST /api/v1/tasks/{task_id}/cancel` - Cancel a task
- `GET /api/v1/tasks` - List recent tasks

### Status
- `GET /api/v1/status` - System status
- `GET /api/v1/status/tasks` - Task statistics
- `GET /api/v1/status/health` - Health check

## Development

### Running Tests
```bash
uv run pytest
```

### Code Formatting
```bash
uv run black src/
uv run isort src/
```

### Type Checking
```bash
uv run mypy src/
```

## Environment Variables

- `OPENAI_API_KEY` - OpenAI API key
- `ELEVENLABS_API_KEY` - ElevenLabs API key
- `DATABASE_URL` - Database connection string
- `CHROMA_PERSIST_DIRECTORY` - ChromaDB storage directory
- `LOG_LEVEL` - Logging level (INFO, DEBUG, etc.)

## Architecture

The backend uses a layered architecture:

1. **Routers** - Handle HTTP requests and responses
2. **Services** - Business logic and orchestration
3. **Agents** - LangGraph workflows for task execution
4. **Storage** - Data persistence layer
5. **Schemas** - Pydantic models for validation

The task execution follows a Plan → Execute → Reflect pattern using LangGraph workflows.
