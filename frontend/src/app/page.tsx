'use client';

import { PromptBox } from '@/components/PromptBox';
import { AgentReasoningLog } from '@/components/AgentReasoningLog';
import { StatusBar } from '@/components/StatusBar';
import { DemoModeToggle } from '@/components/DemoModeToggle';
import { ToolStatusDashboard } from '@/components/ToolStatusDashboard';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useTaskflow } from '@/hooks/useTaskflow';
import { useState, useEffect } from 'react';

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

  const [isToolDashboardExpanded, setIsToolDashboardExpanded] = useState(false);

  const handleSubmit = async (prompt: string) => {
    await startTask(prompt);
  };

  const handleReset = () => {
    resetTask();
    setIsToolDashboardExpanded(false); // Collapse dashboard when resetting
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <Header onReset={handleReset} />
      
      {/* Status Bar - appears right below header when task is active */}
      {(isRunning || status !== 'idle') && (
        <StatusBar 
          status={status} 
          message={message} 
          progress={progress}
          tokenUsage={tokenUsage}
        />
      )}
      
      {/* Main Content */}
      <main className="flex-1">
        <div className="taskflow-container py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Demo Mode Toggle */}
            <DemoModeToggle 
              settings={demoMode}
              onSettingsChange={updateDemoMode}
            />

            {/* Prompt Box - moved to top */}
            <PromptBox onSubmit={handleSubmit} />

            {/* Tool Status Dashboard */}
            <div className="taskflow-card">
              <ToolStatusDashboard 
                tools={toolStatuses}
                isVisible={true}
                isExpanded={isToolDashboardExpanded}
                onToggleExpanded={() => setIsToolDashboardExpanded(!isToolDashboardExpanded)}
              />
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
