'use client';

import { PromptBox } from '@/components/PromptBox';
import { AgentReasoningLog } from '@/components/AgentReasoningLog';
import { StatusBar } from '@/components/StatusBar';
import { DemoModeToggle } from '@/components/DemoModeToggle';
import { ToolStatusDashboard } from '@/components/ToolStatusDashboard';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useTaskflow } from '@/hooks/useTaskflow';
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';

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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSubmit = async (prompt: string) => {
    await startTask(prompt);
  };

  const handleReset = () => {
    resetTask();
    setIsSidebarOpen(false); // Collapse sidebar when resetting
  };

  return (
    <div className="flex flex-col min-h-screen h-screen bg-background">
      {/* Header */}
      <Header onReset={handleReset} />
      {/* Status Bar */}
      {(isRunning || status !== 'idle') && (
        <StatusBar 
          status={status} 
          message={message} 
          progress={progress}
          tokenUsage={tokenUsage}
        />
      )}
      {/* Main Layout with Sidebar */}
      <div className="flex flex-1 min-h-0">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs text-muted-foreground">
              {toolStatuses.filter(t => t.status === 'success').length}/{toolStatuses.length} tools ready
            </div>
          </div>
          <ToolStatusDashboard 
            tools={toolStatuses}
          />
        </Sidebar>
        <main className="flex-1 h-full overflow-y-auto">
          <div className="loop-container py-8">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Sidebar Toggle Button (visible on mobile and desktop) */}
              <div className="block sm:hidden mb-4">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="loop-button-secondary"
                >
                  <span className="mr-2">🛠️</span> Tool Status
                </button>
              </div>
              {/* Demo Mode Toggle */}
              <DemoModeToggle 
                settings={demoMode}
                onSettingsChange={updateDemoMode}
              />
              {/* Prompt Box */}
              <PromptBox onSubmit={handleSubmit} />
              {/* Agent Reasoning Log */}
              {agentLog && (
                <div className="loop-card loop-fade-in">
                  <AgentReasoningLog 
                    entries={agentLog.entries} 
                    isActive={agentLog.isActive}
                  />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
