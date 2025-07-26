// API URL configuration - use production URL in deployment, localhost for development
const getApiBaseUrl = () => {
  // Check if we're in production (Vercel deployment)
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return 'https://taskflow-backend.fly.dev';
  }
  // Local development
  return 'http://localhost:8000';
};

const API_BASE_URL = getApiBaseUrl();

// Debug logging for API URL
if (typeof window !== 'undefined') {
  console.log('🔧 API Configuration:', {
    hostname: window.location.hostname,
    API_BASE_URL: API_BASE_URL,
    isProduction: window.location.hostname !== 'localhost'
  });
}

export interface TokenUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  estimated_cost: number;
}

export interface TaskRequest {
  prompt: string;
  options?: {
    model?: string;
    temperature?: number;
    max_tokens?: number;
  };
}

export interface TaskResponse {
  id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  message?: string;
}

export interface TaskStatus {
  id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  message?: string;
  result?: unknown;
  error?: string;
  token_usage?: TokenUsage;
}

export interface HealthResponse {
  status: string;
  services: {
    api: string;
    database: string;
    ai_services: string;
  };
}

export class TaskflowAPI {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async createTask(request: TaskRequest): Promise<TaskResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async getTaskStatus(taskId: string): Promise<TaskStatus> {
    try {
      const response = await fetch(`${this.baseUrl}/tasks/${taskId}/status`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching task status:', error);
      throw error;
    }
  }

  async cancelTask(taskId: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/tasks/${taskId}/cancel`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error canceling task:', error);
      throw error;
    }
  }

  async checkHealth(): Promise<HealthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error checking health:', error);
      throw error;
    }
  }
}

// Export a default instance
export const taskflowAPI = new TaskflowAPI(); 