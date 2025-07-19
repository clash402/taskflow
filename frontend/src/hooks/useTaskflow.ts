import { useState, useCallback } from 'react';

interface TaskflowState {
  isRunning: boolean;
  progress: number;
  status: 'idle' | 'running' | 'completed' | 'error';
  message?: string;
}

export const useTaskflow = () => {
  const [state, setState] = useState<TaskflowState>({
    isRunning: false,
    progress: 0,
    status: 'idle'
  });

  const startTask = useCallback(async (prompt: string) => {
    setState({
      isRunning: true,
      progress: 0,
      status: 'running',
      message: 'Starting task...'
    });

    try {
      // TODO: Implement actual API call
      console.log('Starting task with prompt:', prompt);
      
      // Simulate progress updates
      const interval = setInterval(() => {
        setState(prev => {
          const newProgress = Math.min(prev.progress + 10, 100);
          return {
            ...prev,
            progress: newProgress,
            message: `Processing... ${newProgress}%`
          };
        });
      }, 1000);

      // Simulate completion after 10 seconds
      setTimeout(() => {
        clearInterval(interval);
        setState({
          isRunning: false,
          progress: 100,
          status: 'completed',
          message: 'Task completed successfully!'
        });
      }, 10000);

    } catch (error) {
      setState({
        isRunning: false,
        progress: 0,
        status: 'error',
        message: error instanceof Error ? error.message : 'An error occurred'
      });
    }
  }, []);

  const resetTask = useCallback(() => {
    setState({
      isRunning: false,
      progress: 0,
      status: 'idle'
    });
  }, []);

  return {
    ...state,
    startTask,
    resetTask
  };
}; 