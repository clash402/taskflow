'use client';

import { PromptBox } from '@/components/PromptBox';
import { AgentStepTimeline } from '@/components/AgentStepTimeline';
import { StatusBar } from '@/components/StatusBar';
import { useTaskflow } from '@/hooks/useTaskflow';
import { useState } from 'react';

type StepStatus = 'pending' | 'running' | 'completed' | 'failed';

interface Step {
  id: string;
  step: string;
  status: StepStatus;
  timestamp: string;
}

export default function Home() {
  const { isRunning, progress, status, message, startTask, resetTask } = useTaskflow();
  const [steps, setSteps] = useState<Step[]>([
    {
      id: '1',
      step: 'Initializing agent',
      status: 'completed',
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      step: 'Processing request',
      status: 'pending',
      timestamp: new Date().toISOString()
    }
  ]);

  const handleSubmit = async (prompt: string) => {
    await startTask(prompt);
    
    // Simulate step updates
    setTimeout(() => {
      setSteps(prev => prev.map(step => 
        step.id === '2' ? { ...step, status: 'running' } : step
      ));
    }, 2000);

    setTimeout(() => {
      setSteps(prev => prev.map(step => 
        step.id === '2' ? { ...step, status: 'completed' } : step
      ));
    }, 8000);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="taskflow-container py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            TaskFlow
          </h1>
          <p className="text-muted-foreground text-lg">
            AI-powered task automation platform
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Status Bar */}
          <StatusBar 
            status={status} 
            message={message} 
            progress={progress} 
          />

          {/* Prompt Box */}
          <div className="taskflow-card">
            <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
            <PromptBox onSubmit={handleSubmit} />
          </div>

          {/* Agent Steps Timeline */}
          {isRunning && (
            <div className="taskflow-card">
              <AgentStepTimeline steps={steps} />
            </div>
          )}

          {/* Reset Button */}
          {status === 'completed' && (
            <div className="text-center">
              <button
                onClick={resetTask}
                className="taskflow-button-secondary"
              >
                Start New Task
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
