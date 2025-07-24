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
      
      {/* Main Layout with Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar (Tool Status Dashboard) */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs text-gray-500">
              {toolStatuses.filter(t => t.status === 'success').length}/{toolStatuses.length} tools ready
            </div>
          </div>
          <ToolStatusDashboard 
            tools={toolStatuses}
          />
        </Sidebar>
        {/* Main Content */}
        <main className="flex-1 h-full overflow-y-auto">
          <div className="taskflow-container py-8">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Sidebar Toggle Button (visible on mobile and desktop) */}
              <div className="block sm:hidden mb-4">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
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
                <div className="taskflow-card">
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
