import { useState, useCallback } from 'react';
import { TokenUsage } from '@/api/taskflow';
import { AgentLogEntry, AgentReasoningLog, DemoModeSettings, ToolStatus, ToolCall } from '@/types';

interface TaskflowState {
  isRunning: boolean;
  progress: number;
  status: 'idle' | 'running' | 'completed' | 'error';
  message?: string;
  tokenUsage?: TokenUsage;
  agentLog?: AgentReasoningLog;
  demoMode: DemoModeSettings;
  toolStatuses: ToolStatus[];
  toolCalls: ToolCall[];
}

export const useTaskflow = () => {
  const [state, setState] = useState<TaskflowState>({
    isRunning: false,
    progress: 0,
    status: 'idle',
    demoMode: {
      enabled: true, // Default to demo mode for safety
      externalActionsDisabled: true,
      mockExternalCalls: true
    },
    toolStatuses: [
      {
        id: 'github',
        name: 'GitHub API',
        icon: '🐙',
        status: 'available',
        callCount: 0,
        successCount: 0,
        isConfigured: true,
        isDemoMode: true
      },
      {
        id: 'slack',
        name: 'Slack Webhook',
        icon: '💬',
        status: 'not_configured',
        callCount: 0,
        successCount: 0,
        isConfigured: false,
        isDemoMode: true,
        errorMessage: 'Webhook URL not configured'
      },
      {
        id: 'openai',
        name: 'OpenAI GPT-4',
        icon: '🤖',
        status: 'available',
        callCount: 0,
        successCount: 0,
        isConfigured: true,
        isDemoMode: true
      },
      {
        id: 'filesystem',
        name: 'File System',
        icon: '📁',
        status: 'available',
        callCount: 0,
        successCount: 0,
        isConfigured: true,
        isDemoMode: true
      }
    ],
    toolCalls: []
  });

  const addLogEntry = useCallback((entry: AgentLogEntry) => {
    setState(prev => ({
      ...prev,
      agentLog: prev.agentLog ? {
        ...prev.agentLog,
        entries: [...prev.agentLog.entries, entry]
      } : {
        taskId: 'task-' + Date.now(),
        entries: [entry],
        currentStep: 'initializing',
        isActive: true
      }
    }));
  }, []);

  const updateToolStatus = useCallback((toolId: string, updates: Partial<ToolStatus>) => {
    setState(prev => ({
      ...prev,
      toolStatuses: prev.toolStatuses.map(tool => 
        tool.id === toolId ? { ...tool, ...updates } : tool
      )
    }));
  }, []);

  const addToolCall = useCallback((toolCall: ToolCall) => {
    setState(prev => ({
      ...prev,
      toolCalls: [...prev.toolCalls, toolCall]
    }));
  }, []);

  const updateDemoMode = useCallback((newSettings: DemoModeSettings) => {
    setState(prev => ({
      ...prev,
      demoMode: newSettings,
      toolStatuses: prev.toolStatuses.map(tool => ({
        ...tool,
        isDemoMode: newSettings.enabled
      }))
    }));
  }, []);

  const startTask = useCallback(async (prompt: string) => {
    // Initialize agent log
    const initialLog: AgentReasoningLog = {
      taskId: 'task-' + Date.now(),
      entries: [],
      currentStep: 'initializing',
      isActive: true
    };

    // Reset tool statuses for new task
    const resetToolStatuses = state.toolStatuses.map(tool => ({
      ...tool,
      status: 'available' as const,
      callCount: 0,
      successCount: 0,
      lastUsed: undefined,
      errorMessage: undefined
    }));

    setState(prev => ({
      ...prev,
      isRunning: true,
      progress: 0,
      status: 'running',
      message: 'Starting task...',
      tokenUsage: {
        prompt_tokens: 0,
        completion_tokens: 0,
        total_tokens: 0,
        estimated_cost: 0.0
      },
      agentLog: initialLog,
      toolStatuses: resetToolStatuses,
      toolCalls: []
    }));

    try {
      // TODO: Implement actual API call
      console.log('Starting task with prompt:', prompt);
      
      // Add initial log entries
      addLogEntry({
        id: '1',
        emoji: '🔁',
        message: 'Starting Taskflow Agent',
        timestamp: new Date().toISOString(),
        type: 'info'
      });

      addLogEntry({
        id: '2',
        emoji: '📥',
        message: `Prompt received: "${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}"`,
        timestamp: new Date().toISOString(),
        type: 'info'
      });

      // Add demo mode indicator if enabled
      if (state.demoMode.enabled) {
        addLogEntry({
          id: 'demo-1',
          emoji: '🛡️',
          message: 'Demo mode active - external actions will be simulated',
          timestamp: new Date().toISOString(),
          type: 'info',
          details: 'GitHub API, Slack webhooks, and file system operations will be mocked for safety'
        });
      }

      // Simulate planning phase
      setTimeout(() => {
        addLogEntry({
          id: '3',
          emoji: '🧠',
          message: 'Step 1: Planning...',
          timestamp: new Date().toISOString(),
          type: 'info',
          details: 'Analyzing task requirements and creating execution plan'
        });
      }, 1000);

      setTimeout(() => {
        addLogEntry({
          id: '4',
          emoji: '📋',
          message: 'Initial plan created:',
          timestamp: new Date().toISOString(),
          type: 'success',
          details: '1. Create GitHub repository\n2. Generate README content\n3. Post summary to Slack'
        });
      }, 3000);

      // Simulate GitHub API call
      setTimeout(() => {
        const toolCall: ToolCall = {
          toolId: 'github',
          toolName: 'GitHub API',
          action: 'create_repo',
          timestamp: new Date().toISOString(),
          status: 'running'
        };
        addToolCall(toolCall);
        updateToolStatus('github', { status: 'in_use', lastUsed: new Date().toISOString() });

        const toolCallName = state.demoMode.externalActionsDisabled ? 'GitHub.create_repo (SIMULATED)' : 'GitHub.create_repo';
        const details = state.demoMode.externalActionsDisabled 
          ? 'Creating new repository (demo mode - no actual API call)'
          : 'Creating new repository...';
        
        addLogEntry({
          id: '5',
          emoji: '🤖',
          message: `Called: ${toolCallName}`,
          timestamp: new Date().toISOString(),
          type: 'action',
          tool_called: 'GitHub API',
          details: details
        });
      }, 5000);

      setTimeout(() => {
        updateToolStatus('github', { 
          status: 'success', 
          callCount: 1, 
          successCount: 1 
        });

        const result = state.demoMode.externalActionsDisabled 
          ? 'Repository URL: https://github.com/josh/josh-ai-sandbox (SIMULATED)'
          : 'Repository URL: https://github.com/josh/josh-ai-sandbox';
        
        addLogEntry({
          id: '6',
          emoji: '✅',
          message: 'Repo created: josh-ai-sandbox',
          timestamp: new Date().toISOString(),
          type: 'success',
          result: result
        });
      }, 7000);

      // Simulate Slack failure
      setTimeout(() => {
        const toolCall: ToolCall = {
          toolId: 'slack',
          toolName: 'Slack Webhook',
          action: 'post_message',
          timestamp: new Date().toISOString(),
          status: 'error',
          error: '401 Unauthorized - authentication failed'
        };
        addToolCall(toolCall);
        updateToolStatus('slack', { 
          status: 'error', 
          callCount: 1, 
          successCount: 0,
          lastUsed: new Date().toISOString(),
          errorMessage: '401 Unauthorized - authentication failed'
        });

        addLogEntry({
          id: '7',
          emoji: '⚠️',
          message: 'Slack integration failed',
          timestamp: new Date().toISOString(),
          type: 'warning',
          details: 'Slack webhook returned 401 Unauthorized - authentication failed',
          result: 'Step 3 (Post to Slack) cannot be completed'
        });
      }, 8000);

      // Simulate reflection step
      setTimeout(() => {
        addLogEntry({
          id: '8',
          emoji: '🧠',
          message: 'Reflection step: Analyzing failure',
          timestamp: new Date().toISOString(),
          type: 'reflection',
          details: 'Step failed due to auth error. Replanning next steps without Slack integration.'
        });
      }, 9000);

      setTimeout(() => {
        addLogEntry({
          id: '9',
          emoji: '🔄',
          message: 'Plan adjusted:',
          timestamp: new Date().toISOString(),
          type: 'reflection',
          details: '1. ✅ Create GitHub repository (completed)\n2. Generate README content\n3. ⚠️ Skip Slack posting (auth error)\n4. Add local summary instead'
        });
      }, 10000);

      // Simulate OpenAI call
      setTimeout(() => {
        const toolCall: ToolCall = {
          toolId: 'openai',
          toolName: 'OpenAI GPT-4',
          action: 'generate_content',
          timestamp: new Date().toISOString(),
          status: 'running'
        };
        addToolCall(toolCall);
        updateToolStatus('openai', { status: 'in_use', lastUsed: new Date().toISOString() });

        addLogEntry({
          id: '10',
          emoji: '📝',
          message: 'Generating README content...',
          timestamp: new Date().toISOString(),
          type: 'action',
          tool_called: 'OpenAI GPT-4'
        });
      }, 11000);

      setTimeout(() => {
        updateToolStatus('openai', { 
          status: 'success', 
          callCount: 1, 
          successCount: 1 
        });

        addLogEntry({
          id: '11',
          emoji: '✅',
          message: 'README generated successfully',
          timestamp: new Date().toISOString(),
          type: 'success',
          result: 'Created comprehensive README with project description, setup instructions, and usage examples'
        });
      }, 12000);

      // Simulate file system call
      setTimeout(() => {
        const toolCall: ToolCall = {
          toolId: 'filesystem',
          toolName: 'File System',
          action: 'write_file',
          timestamp: new Date().toISOString(),
          status: 'running'
        };
        addToolCall(toolCall);
        updateToolStatus('filesystem', { status: 'in_use', lastUsed: new Date().toISOString() });

        const toolCallName = state.demoMode.externalActionsDisabled ? 'Local File System (SIMULATED)' : 'Local File System';
        const details = state.demoMode.externalActionsDisabled 
          ? 'Generating task completion summary for local storage (demo mode - no actual file write)'
          : 'Generating task completion summary for local storage';
        
        addLogEntry({
          id: '12',
          emoji: '📄',
          message: 'Creating local summary...',
          timestamp: new Date().toISOString(),
          type: 'action',
          tool_called: toolCallName,
          details: details
        });
      }, 13000);

      setTimeout(() => {
        updateToolStatus('filesystem', { 
          status: 'success', 
          callCount: 1, 
          successCount: 1 
        });

        const result = state.demoMode.externalActionsDisabled 
          ? 'Summary saved to: /tmp/taskflow-summary-2024-01-15.txt (SIMULATED)'
          : 'Summary saved to: /tmp/taskflow-summary-2024-01-15.txt';
        
        addLogEntry({
          id: '13',
          emoji: '✅',
          message: 'Local summary created',
          timestamp: new Date().toISOString(),
          type: 'success',
          result: result
        });
      }, 14000);

      // Simulate progress updates with token usage
      const interval = setInterval(() => {
        setState(prev => {
          const newProgress = Math.min(prev.progress + 10, 100);
          
          // Simulate token usage accumulation
          const newPromptTokens = Math.floor(Math.random() * 50) + 100;
          const newCompletionTokens = Math.floor(Math.random() * 100) + 200;
          const totalTokens = newPromptTokens + newCompletionTokens;
          const estimatedCost = (totalTokens / 1000) * 0.03; // Rough estimate: $0.03 per 1k tokens
          
          return {
            ...prev,
            progress: newProgress,
            message: `Processing... ${newProgress}%`,
            tokenUsage: {
              prompt_tokens: newPromptTokens,
              completion_tokens: newCompletionTokens,
              total_tokens: totalTokens,
              estimated_cost: estimatedCost
            }
          };
        });
      }, 1000);

      // Simulate completion after 15 seconds (extended for reflection scenario)
      setTimeout(() => {
        clearInterval(interval);
        
        addLogEntry({
          id: '14',
          emoji: '🎉',
          message: 'Task completed with adjustments!',
          timestamp: new Date().toISOString(),
          type: 'success',
          details: 'Task completed successfully with plan adjustments due to Slack authentication failure'
        });

        setState(prev => ({
          ...prev,
          isRunning: false,
          progress: 100,
          status: 'completed',
          message: 'Task completed with adjustments!',
          tokenUsage: {
            prompt_tokens: 1231,
            completion_tokens: 856,
            total_tokens: 2087,
            estimated_cost: 0.0626
          },
          agentLog: prev.agentLog ? {
            ...prev.agentLog,
            isActive: false
          } : prev.agentLog
        }));
      }, 15000);

    } catch (error) {
      addLogEntry({
        id: 'error-1',
        emoji: '❌',
        message: 'Task execution failed',
        timestamp: new Date().toISOString(),
        type: 'error',
        details: error instanceof Error ? error.message : 'An unknown error occurred'
      });

      setState(prev => ({
        ...prev,
        isRunning: false,
        progress: 0,
        status: 'error',
        message: error instanceof Error ? error.message : 'An error occurred',
        agentLog: prev.agentLog ? {
          ...prev.agentLog,
          isActive: false
        } : prev.agentLog
      }));
    }
  }, [addLogEntry, addToolCall, updateToolStatus, state.demoMode]);

  const resetTask = useCallback(() => {
    setState(prev => ({
      ...prev,
      isRunning: false,
      progress: 0,
      status: 'idle'
    }));
  }, []);

  return {
    ...state,
    startTask,
    resetTask,
    updateDemoMode
  };
}; 