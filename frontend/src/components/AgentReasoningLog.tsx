'use client';

import React from 'react';
import { AgentLogEntry } from '@/types';

interface AgentReasoningLogProps {
  entries: AgentLogEntry[];
  isActive?: boolean;
}

export const AgentReasoningLog: React.FC<AgentReasoningLogProps> = ({ entries, isActive = false }) => {
  const logContainerRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new entries are added
  React.useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [entries]);

  const getTypeColor = (type: AgentLogEntry['type']) => {
    switch (type) {
      case 'success': return 'text-green-700 dark:text-green-300';
      case 'error': return 'text-destructive';
      case 'warning': return 'text-amber-700 dark:text-amber-300';
      case 'action': return 'text-accent';
      case 'reflection': return 'text-loop-ultraviolet';
      default: return 'text-muted-foreground';
    }
  };

  const getTypeBackground = (type: AgentLogEntry['type']) => {
    switch (type) {
      case 'success': return 'bg-green-50/50 border-green-200 dark:bg-green-900/10 dark:border-green-800';
      case 'error': return 'bg-destructive/10 border-destructive/20';
      case 'warning': return 'bg-amber-50/50 border-amber-200 dark:bg-amber-900/10 dark:border-amber-800';
      case 'action': return 'bg-accent/10 border-accent/20';
      case 'reflection': return 'bg-loop-ultraviolet/10 border-loop-ultraviolet/20';
      default: return 'bg-muted border-border';
    }
  };

  const getReflectionIndicator = (type: AgentLogEntry['type']) => {
    if (type === 'reflection') {
      return (
        <div className="absolute -top-2 -right-2 bg-loop-ultraviolet text-white text-xs px-2 py-1 rounded-full font-medium">
          REFLECTION
        </div>
      );
    }
    return null;
  };

  const getToolIcon = (toolName?: string) => {
    if (!toolName) return null;
    
    const toolNameLower = toolName.toLowerCase();
    
    if (toolNameLower.includes('github')) {
      return (
        <div className="flex items-center space-x-1 bg-gray-800 text-white px-2 py-1 rounded-lg text-xs">
          <span>🐙</span>
          <span>GitHub</span>
        </div>
      );
    }
    
    if (toolNameLower.includes('slack')) {
      return (
        <div className="flex items-center space-x-1 bg-purple-600 text-white px-2 py-1 rounded-lg text-xs">
          <span>💬</span>
          <span>Slack</span>
        </div>
      );
    }
    
    if (toolNameLower.includes('openai') || toolNameLower.includes('gpt')) {
      return (
        <div className="flex items-center space-x-1 bg-green-600 text-white px-2 py-1 rounded-lg text-xs">
          <span>🤖</span>
          <span>OpenAI</span>
        </div>
      );
    }
    
    if (toolNameLower.includes('file') || toolNameLower.includes('local')) {
      return (
        <div className="flex items-center space-x-1 bg-accent text-white px-2 py-1 rounded-lg text-xs">
          <span>📁</span>
          <span>File System</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center space-x-1 bg-muted-foreground text-white px-2 py-1 rounded-lg text-xs">
        <span>🔧</span>
        <span>{toolName}</span>
      </div>
    );
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const isReflectionStep = (entry: AgentLogEntry) => {
    return entry.type === 'reflection' || entry.message.toLowerCase().includes('reflection');
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          <h3 className="text-lg font-semibold text-foreground">Agent Reasoning Log</h3>
        </div>
        {isActive && (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Live</span>
          </div>
        )}
      </div>

      {/* Reflection Summary - moved to top */}
      {entries.some(entry => isReflectionStep(entry)) && (
        <>
          <div className="mb-4 p-3 bg-loop-ultraviolet/10 border border-loop-ultraviolet/20 rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <div className="text-loop-ultraviolet">🧠</div>
              <h4 className="font-medium text-foreground">Reflection Summary</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              The agent detected a failure and automatically adjusted the execution plan to complete the task successfully.
            </p>
          </div>
          <hr className="border-t border-loop-ultraviolet/20 mb-4" />
        </>
      )}
      
      <div ref={logContainerRef} className="space-y-3 max-h-96 overflow-y-auto">
        {entries.map((entry, idx) => (
          <div
            key={`${entry.id}-${entry.timestamp}-${idx}`}
            className={`relative p-3 rounded-xl border transition-all duration-200 hover:shadow-sm ${
              getTypeBackground(entry.type)
            } ${
              isReflectionStep(entry) ? 'ring-2 ring-loop-ultraviolet/20 shadow-md' : ''
            }`}
          >
            {getReflectionIndicator(entry.type)}
            
            <div className="flex items-start space-x-3">
              <div className="text-xl flex-shrink-0">
                {entry.emoji}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className={`font-medium ${getTypeColor(entry.type)}`}>
                    {entry.message}
                  </p>
                  <span className="text-xs text-muted-foreground flex-shrink-0 ml-2 font-mono">
                    {formatTimestamp(entry.timestamp)}
                  </span>
                </div>
                
                {entry.details && (
                  <p className="text-sm text-foreground mb-2 whitespace-pre-line">
                    {entry.details}
                  </p>
                )}
                
                {entry.tool_called && (
                  <div className="flex items-center space-x-2 mb-2">
                    {getToolIcon(entry.tool_called)}
                    {entry.tool_called.includes('(SIMULATED)') && (
                      <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full border border-accent/20">
                        Demo Mode
                      </span>
                    )}
                  </div>
                )}
                
                {entry.result && (
                  <div className="bg-background/50 p-2 rounded-lg border-l-2 border-green-300">
                    <p className="text-xs text-muted-foreground font-medium mb-1">Result:</p>
                    <p className="text-sm text-foreground">{entry.result}</p>
                  </div>
                )}

                {/* Special styling for reflection steps */}
                {isReflectionStep(entry) && (
                  <div className="mt-2 p-2 bg-loop-ultraviolet/10 border border-loop-ultraviolet/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-loop-ultraviolet rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-foreground">
                        Agent is reflecting and adjusting the plan...
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {entries.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <div className="text-2xl mb-2">🤖</div>
            <p>Waiting for agent to start reasoning...</p>
          </div>
        )}
      </div>
    </div>
  );
}; 