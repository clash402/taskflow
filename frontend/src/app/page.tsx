'use client';

import { PromptBox } from '@/components/PromptBox';
import { AgentReasoningLog } from '@/components/AgentReasoningLog';
import { StatusBar } from '@/components/StatusBar';
import { DemoModeToggle } from '@/components/DemoModeToggle';
import { useTaskflow } from '@/hooks/useTaskflow';

export default function Home() {
  const { 
    isRunning, 
    progress, 
    status, 
    message, 
    tokenUsage, 
    agentLog, 
    demoMode,
    startTask, 
    resetTask,
    updateDemoMode 
  } = useTaskflow();

  const handleSubmit = async (prompt: string) => {
    await startTask(prompt);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="taskflow-container py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            TaskFlow
          </h1>
          <p className="text-muted-foreground text-lg">
            AI-powered task automation platform!
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Demo Mode Toggle */}
          <DemoModeToggle 
            settings={demoMode}
            onSettingsChange={updateDemoMode}
          />

          {/* Status Bar */}
          <StatusBar 
            status={status} 
            message={message} 
            progress={progress}
            tokenUsage={tokenUsage}
          />

          {/* Prompt Box */}
          <div className="taskflow-card">
            <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
            <PromptBox onSubmit={handleSubmit} />
          </div>

          {/* Agent Reasoning Log */}
          {agentLog && (
            <div className="taskflow-card">
              <AgentReasoningLog 
                entries={agentLog.entries} 
                isActive={agentLog.isActive}
              />
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
