# Use the official Python image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory
WORKDIR /app

# Copy project files first
COPY pyproject.toml uv.lock ./

# Install uv and generate requirements.txt
RUN pip install uv && uv pip compile pyproject.toml --output-file requirements.txt

# Install dependencies using pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the project files
COPY . .

# Expose port (Fly expects 8000)
EXPOSE 8000

# Start FastAPI using uvicorn
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
