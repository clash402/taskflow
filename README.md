# Taskflow 🔄

**An AI-powered task orchestrator built with LangGraph and FastAPI**

> *Type a request. Watch your plan unfold—step-by-step.*

Try it out! https://taskflow-one-gules.vercel.app/

---

## 💥 Real-World Use Case

> Type “Start a GitHub project with a README and share it to Slack” — and Taskflow handles the whole flow, step-by-step.

---

## 🧠 What It Does

**Taskflow** turns natural-language instructions into multi-step backend tasks using AI agents and tool orchestration.

Powered by LangGraph, it plans, routes, and executes actions—tracking every step and adapting as needed. Each step is logged, and a built-in reflection node allows it to replan if something goes wrong.

Example:

> *“Create a GitHub repo, generate a README, and post the summary to Slack.”*

---

## 🚀 Why It Matters

Taskflow demonstrates how language models can do more than answer questions—they can **act**.\
It highlights emerging patterns in AI system design: multi-step reasoning, tool use, and transparent execution flow.

Built for speed, clarity, and real-world relevance. It is a foundation for action-oriented agents that actually get things done.

---

## 📈 Benefits

- Turn plain English into working automation—no code required
- Robust fallback planning with built-in reflection
- Cut down tool-switching and repetitive setup tasks
- Modular and ready to scale into your own AI ops agent

---

## 🔁 Flow Diagram

(Visual diagram in progress—will show X → Y → Z)

---

## 📜 Agent Log

Coming soon: real-time example of an agent reasoning through multi-step execution.

Example:

```bash
🔁 Starting Taskflow Agent
📥 Prompt received: "Create GitHub repo and write README"
🧠 Step 1: Planning...
🤖 Called: GitHub.create_repo
✅ Repo created: josh-ai-sandbox
```

---

## 🧠 Agent Reflection

Built-in “Reflection” node evaluates progress at each stage and adjusts the plan if needed.

```bash
🧠 Reflection step:
"Step failed due to auth error. Replanning next steps without Slack."
```

---

## 🔐 Guardrails & Safety

Taskflow includes lightweight safeguards to mitigate common LLM and agent pitfalls:

- ✅ **Rate-limiting** to prevent excessive requests
- ✅ **Max token caps** per call to control cost and output length
- ✅ **Demo mode** to disable external actions (e.g. GitHub calls)
- ✅ **Restricted tool set** – agent can only access predefined tools
- ✅ **Action logging** – all agent steps and decisions are tracked

---

## 💸 Token Cost Display

Token usage and estimated cost is logged with each request.

```bash
[INFO] Tokens used: 1,231  
[INFO] Approx cost: $0.0308
```

---

## 📦 Reusability

Core agent logic, graph configuration, and tool interfaces are modular and can be reused across intelligent workflows and internal agent tools.

---

## 🛠️ Tech Stack

- ****Frontend:**** Next.js, Tailwind CSS, React Query
- ****Backend:**** FastAPI (tool interfaces + execution logic)
- ****AI Framework:**** LangChain (retrieval + prompt chains), LangGraph
- ****Storage:**** ChromaDB, SQLite
- ****LLM:**** OpenAI (can be swapped for open-source models)
- ****Tooling:**** GitHub API, mock Slack webhook, etc.
- ****Deployment:**** Vercel (frontend) + Fly.io (backend)

---

## 🔑 Requirements

You’ll need API keys for:

- OpenAI (for agent reasoning)
- GitHub (to create repos, etc.)

---

## 💪 Setup

```bash
# clone the repo
git clone https://github.com/yourusername/taskflow.git
cd taskflow

# set up environment variables
cp .env.example .env
```

## 🚀 Running Locally

You have several options to run the application locally:

### Option 1: Run Everything Together (Recommended)
```bash
# Start both frontend and backend with Docker Compose
./start.sh

# Stop all services
./stop.sh
```

### Option 2: Run Services Individually
```bash
# Start backend only
cd backend
./start.sh

# Start frontend only (in a separate terminal)
cd frontend
./start.sh
```

### Option 3: Manual Setup (Legacy)
```bash
# Install backend dependencies
cd backend
uv pip sync

# Run backend
uvicorn src.main:app --reload

# Install frontend dependencies (in a separate terminal)
cd frontend
npm install

# Run frontend
npm run dev
```

**Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

---

## 🧑‍💻 Built By

Josh Courtney – Senior Full Stack Engineer\
[JoshCourtney.com](https://joshcourtney.com) | [LinkedIn](https://www.linkedin.com/in/joshcourtney402/)

