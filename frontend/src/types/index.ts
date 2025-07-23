// Task-related types
export interface Task {
  id: string;
  prompt: string;
  status: TaskStatus;
  progress: number;
  createdAt: string;
  updatedAt: string;
  result?: TaskResult;
  error?: string;
}

export type TaskStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';

export interface TaskResult {
  output: string;
  files?: TaskFile[];
  metadata?: Record<string, unknown>;
}

export interface TaskFile {
  name: string;
  url: string;
  size: number;
  type: string;
}

// Agent-related types
export interface AgentStep {
  id: string;
  step: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  timestamp: string;
  details?: string;
  error?: string;
}

export interface AgentConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt?: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// UI component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

// Form types
export interface TaskFormData {
  prompt: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

// Settings types
export interface UserSettings {
  defaultModel: string;
  defaultTemperature: number;
  defaultMaxTokens: number;
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
}

// Analytics types
export interface TaskMetrics {
  totalTasks: number;
  completedTasks: number;
  failedTasks: number;
  averageCompletionTime: number;
  totalCost: number;
}

// File upload types
export interface FileUpload {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'uploading' | 'completed' | 'failed';
  url?: string;
}

export interface Step {
  id: string;
  step: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  timestamp: string;
}

export interface AgentLogEntry {
  id: string;
  emoji: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'error' | 'warning' | 'action' | 'reflection';
  details?: string;
  tool_called?: string;
  result?: string;
}

export interface AgentReasoningLog {
  taskId: string;
  entries: AgentLogEntry[];
  currentStep: string;
  isActive: boolean;
}

export interface DemoModeSettings {
  enabled: boolean;
  externalActionsDisabled: boolean;
  mockExternalCalls: boolean;
  safetyMessage?: string;
}

export interface ToolStatus {
  id: string;
  name: string;
  icon: string;
  status: 'available' | 'in_use' | 'success' | 'error' | 'disabled' | 'not_configured';
  lastUsed?: string;
  errorMessage?: string;
  callCount: number;
  successCount: number;
  isConfigured: boolean;
  isDemoMode: boolean;
}

export interface ToolCall {
  toolId: string;
  toolName: string;
  action: string;
  timestamp: string;
  status: 'pending' | 'running' | 'success' | 'error';
  result?: string;
  error?: string;
  duration?: number;
} 