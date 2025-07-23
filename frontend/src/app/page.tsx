'use client';

import { PromptBox } from '@/components/PromptBox';
import { AgentReasoningLog } from '@/components/AgentReasoningLog';
import { StatusBar } from '@/components/StatusBar';
import { DemoModeToggle } from '@/components/DemoModeToggle';
import { ToolStatusDashboard } from '@/components/ToolStatusDashboard';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
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
    toolStatuses,
    startTask, 
    resetTask,
    updateDemoMode 
  } = useTaskflow();

  const handleSubmit = async (prompt: string) => {
    await startTask(prompt);
  };

  const handleReset = () => {
    resetTask();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <Header onReset={handleReset} />
      
      {/* Main Content */}
      <main className="flex-1">
        <div className="taskflow-container py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Demo Mode Toggle */}
            <DemoModeToggle 
              settings={demoMode}
              onSettingsChange={updateDemoMode}
            />

            {/* Tool Status Dashboard */}
            <div className="taskflow-card">
              <ToolStatusDashboard 
                tools={toolStatuses}
                isVisible={true}
              />
            </div>

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

      {/* Footer */}
      <Footer />
    </div>
  );
}
