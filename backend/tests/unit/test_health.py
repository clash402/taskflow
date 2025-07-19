import pytest
import sys
from pathlib import Path

# Add src to path
sys.path.insert(0, str(Path(__file__).parent.parent.parent / "src"))

from fastapi.testclient import TestClient

# Import with absolute path
sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from src.main import app

client = TestClient(app)


def test_health_endpoint():
    """Test the health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"


def test_root_endpoint():
    """Test the root endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "TaskFlow API is running"
    assert data["version"] == "1.0.0"
    assert data["status"] == "healthy"
