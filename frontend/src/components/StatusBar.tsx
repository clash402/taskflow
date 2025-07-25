'use client';

import React from 'react';
import { TokenUsage } from '@/api/taskflow';

interface StatusBarProps {
  status: 'idle' | 'running' | 'completed' | 'error';
  message?: string;
  progress?: number;
  tokenUsage?: TokenUsage;
}

export const StatusBar: React.FC<StatusBarProps> = ({ status, message, progress, tokenUsage }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'running': return 'bg-accent';
      case 'completed': return 'bg-green-500';
      case 'error': return 'bg-destructive';
      default: return 'bg-muted-foreground';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'running': return 'Processing...';
      case 'completed': return 'Completed';
      case 'error': return 'Error';
      default: return 'Ready';
    }
  };

  const formatCost = (cost: number) => {
    return `$${cost.toFixed(4)}`;
  };

  return (
    <div className="sticky top-16 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/50 px-6 py-3 shadow-sm">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className={`w-2 h-2 rounded-full ${getStatusColor()} ${status === 'running' ? 'animate-pulse' : ''}`} />
              <span className="text-sm font-medium text-foreground">{getStatusText()}</span>
            </div>
            
            {message && (
              <span className="text-sm text-muted-foreground truncate">• {message}</span>
            )}
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {progress !== undefined && (
              <div className="flex items-center space-x-2">
                <div className="w-12 sm:w-16 bg-muted rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${getStatusColor()} transition-all duration-300`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-6 sm:w-8 font-mono">{Math.round(progress)}%</span>
              </div>
            )}
            
            {tokenUsage && (
              <div className="flex items-center space-x-2 sm:space-x-3 text-xs">
                <div className="flex items-center space-x-1">
                  <span className="text-muted-foreground hidden sm:inline">Tokens:</span>
                  <span className="text-muted-foreground sm:hidden">T:</span>
                  <span className="font-mono font-medium text-foreground">{tokenUsage.total_tokens.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-muted-foreground hidden sm:inline">Cost:</span>
                  <span className="text-muted-foreground sm:hidden">$:</span>
                  <span className="font-mono font-medium text-loop-mint">{formatCost(tokenUsage.estimated_cost)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 