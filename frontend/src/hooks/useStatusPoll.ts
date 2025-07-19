import { useState, useEffect, useCallback } from 'react';

interface StatusData {
  id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  message?: string;
  steps?: Array<{
    id: string;
    step: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    timestamp: string;
  }>;
}

export const useStatusPoll = (taskId?: string, enabled: boolean = false) => {
  const [status, setStatus] = useState<StatusData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pollStatus = useCallback(async () => {
    if (!taskId) return;

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Implement actual API call
      console.log('Polling status for task:', taskId);
      
      // Simulate API response
      const mockStatus: StatusData = {
        id: taskId,
        status: 'running',
        progress: Math.floor(Math.random() * 100),
        message: 'Processing task...',
        steps: [
          {
            id: '1',
            step: 'Initializing agent',
            status: 'completed',
            timestamp: new Date().toISOString()
          },
          {
            id: '2',
            step: 'Processing request',
            status: 'running',
            timestamp: new Date().toISOString()
          }
        ]
      };

      setStatus(mockStatus);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch status');
    } finally {
      setIsLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    if (!enabled || !taskId) return;

    // Initial poll
    pollStatus();

    // Set up polling interval
    const interval = setInterval(pollStatus, 2000);

    return () => clearInterval(interval);
  }, [enabled, taskId, pollStatus]);

  return {
    status,
    isLoading,
    error,
    pollStatus
  };
}; 