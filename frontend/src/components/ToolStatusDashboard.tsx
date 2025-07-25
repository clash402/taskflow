'use client';

import React from 'react';
import { ToolStatus } from '@/types';

interface ToolStatusDashboardProps {
  tools: ToolStatus[];
  isVisible?: boolean;
  isExpanded?: boolean;
  onToggleExpanded?: () => void;
}

export const ToolStatusDashboard: React.FC<ToolStatusDashboardProps> = ({ 
  tools, 
  isVisible = true
}) => {
  const getStatusColor = (status: ToolStatus['status']) => {
    switch (status) {
      case 'available': return 'text-green-700 bg-green-50/50 border-green-200';
      case 'in_use': return 'text-accent bg-accent/10 border-accent/20';
      case 'success': return 'text-green-700 bg-green-50/50 border-green-200';
      case 'error': return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'disabled': return 'text-muted-foreground bg-muted border-border';
      case 'not_configured': return 'text-amber-700 bg-amber-50/50 border-amber-200';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status: ToolStatus['status']) => {
    switch (status) {
      case 'available': return '✅';
      case 'in_use': return '🔄';
      case 'success': return '✅';
      case 'error': return '❌';
      case 'disabled': return '⏸️';
      case 'not_configured': return '⚠️';
      default: return '❓';
    }
  };



  if (!isVisible) return null;

  return (
    <div className="w-full">
      <div className="flex flex-col gap-3">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className={`p-3 rounded-xl border transition-all duration-200 hover:shadow-sm ${getStatusColor(tool.status)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex flex-col min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{tool.icon}</span>
                  <span className="font-medium text-sm truncate">{tool.name}</span>
                </div>
                {tool.isDemoMode && (
                  <div className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full border border-accent/20 mt-1 w-fit">
                    Demo Mode
                  </div>
                )}
                {!tool.isConfigured && (
                  <div className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded-full border border-destructive/20 mt-1 w-fit flex items-center space-x-1">
                    <span>⚠️</span>
                    <span>Not Configured</span>
                  </div>
                )}
              </div>
              <span className="text-lg flex-shrink-0 ml-2 mt-0.5">{getStatusIcon(tool.status)}</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Calls:</span>
                <span className="font-mono text-foreground">{tool.callCount}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Success Rate:</span>
                <span className="font-mono text-foreground">
                  {tool.callCount > 0 ? Math.round((tool.successCount / tool.callCount) * 100) : 0}%
                </span>
              </div>
              {tool.errorMessage && (
                <div className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded-lg border border-destructive/20 truncate mt-1" title={tool.errorMessage}>
                  {tool.errorMessage}
                </div>
              )}
              {tool.lastUsed && (
                <div className="text-xs text-muted-foreground">
                  Last used: {new Date(tool.lastUsed).toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 