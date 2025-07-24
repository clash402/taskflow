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
      case 'running': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
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
    <div className="sticky top-16 z-40 w-full bg-gray-50 border-b border-gray-200 px-6 py-2 shadow-sm">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
              <span className="text-sm font-medium">{getStatusText()}</span>
            </div>
            
            {message && (
              <span className="text-sm text-gray-600 truncate">• {message}</span>
            )}
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {progress !== undefined && (
              <div className="flex items-center space-x-2">
                <div className="w-12 sm:w-16 bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${getStatusColor()}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600 w-6 sm:w-8">{Math.round(progress)}%</span>
              </div>
            )}
            
            {tokenUsage && (
              <div className="flex items-center space-x-2 sm:space-x-3 text-xs">
                <div className="flex items-center space-x-1">
                  <span className="text-gray-600 hidden sm:inline">Tokens:</span>
                  <span className="text-gray-600 sm:hidden">T:</span>
                  <span className="font-mono font-medium">{tokenUsage.total_tokens.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-gray-600 hidden sm:inline">Cost:</span>
                  <span className="text-gray-600 sm:hidden">$:</span>
                  <span className="font-mono font-medium text-green-600">{formatCost(tokenUsage.estimated_cost)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 