# Use the official Python image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install uv
RUN pip install uv

# Set the working directory
WORKDIR /app

# Copy project files
COPY . .

# Sync and install dependencies using uv
RUN uv pip sync

# Expose port (Fly expects 8000)
EXPOSE 8000

# Start FastAPI using uvicorn
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
