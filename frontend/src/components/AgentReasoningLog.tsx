'use client';

import React from 'react';
import { AgentLogEntry } from '@/types';

interface AgentReasoningLogProps {
  entries: AgentLogEntry[];
  isActive?: boolean;
}

export const AgentReasoningLog: React.FC<AgentReasoningLogProps> = ({ entries, isActive = false }) => {
  const getTypeColor = (type: AgentLogEntry['type']) => {
    switch (type) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      case 'action': return 'text-blue-600';
      case 'reflection': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeBackground = (type: AgentLogEntry['type']) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'error': return 'bg-red-50 border-red-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'action': return 'bg-blue-50 border-blue-200';
      case 'reflection': return 'bg-purple-50 border-purple-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getReflectionIndicator = (type: AgentLogEntry['type']) => {
    if (type === 'reflection') {
      return (
        <div className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
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
        <div className="flex items-center space-x-1 bg-gray-800 text-white px-2 py-1 rounded text-xs">
          <span>🐙</span>
          <span>GitHub</span>
        </div>
      );
    }
    
    if (toolNameLower.includes('slack')) {
      return (
        <div className="flex items-center space-x-1 bg-purple-600 text-white px-2 py-1 rounded text-xs">
          <span>💬</span>
          <span>Slack</span>
        </div>
      );
    }
    
    if (toolNameLower.includes('openai') || toolNameLower.includes('gpt')) {
      return (
        <div className="flex items-center space-x-1 bg-green-600 text-white px-2 py-1 rounded text-xs">
          <span>🤖</span>
          <span>OpenAI</span>
        </div>
      );
    }
    
    if (toolNameLower.includes('file') || toolNameLower.includes('local')) {
      return (
        <div className="flex items-center space-x-1 bg-blue-600 text-white px-2 py-1 rounded text-xs">
          <span>📁</span>
          <span>File System</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center space-x-1 bg-gray-600 text-white px-2 py-1 rounded text-xs">
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
        <h3 className="text-lg font-semibold">Agent Reasoning Log</h3>
        {isActive && (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Live</span>
          </div>
        )}
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className={`relative p-3 rounded-lg border transition-all duration-200 hover:shadow-sm ${
              getTypeBackground(entry.type)
            } ${
              isReflectionStep(entry) ? 'ring-2 ring-purple-200 shadow-md' : ''
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
                  <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                    {formatTimestamp(entry.timestamp)}
                  </span>
                </div>
                
                {entry.details && (
                  <p className="text-sm text-gray-700 mb-2 whitespace-pre-line">
                    {entry.details}
                  </p>
                )}
                
                {entry.tool_called && (
                  <div className="flex items-center space-x-2 mb-2">
                    {getToolIcon(entry.tool_called)}
                    {entry.tool_called.includes('(SIMULATED)') && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        Demo Mode
                      </span>
                    )}
                  </div>
                )}
                
                {entry.result && (
                  <div className="bg-white bg-opacity-50 p-2 rounded border-l-2 border-green-300">
                    <p className="text-xs text-gray-600 font-medium mb-1">Result:</p>
                    <p className="text-sm text-gray-800">{entry.result}</p>
                  </div>
                )}

                {/* Special styling for reflection steps */}
                {isReflectionStep(entry) && (
                  <div className="mt-2 p-2 bg-purple-100 border border-purple-200 rounded">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-purple-700">
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
          <div className="text-center py-8 text-gray-500">
            <div className="text-2xl mb-2">🤖</div>
            <p>Waiting for agent to start reasoning...</p>
          </div>
        )}
      </div>

      {/* Reflection Summary */}
      {entries.some(entry => isReflectionStep(entry)) && (
        <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className="text-purple-600">🧠</div>
            <h4 className="font-medium text-purple-800">Reflection Summary</h4>
          </div>
          <p className="text-sm text-purple-700">
            The agent detected a failure and automatically adjusted the execution plan to complete the task successfully.
          </p>
        </div>
      )}
    </div>
  );
}; 