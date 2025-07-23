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
    <div className="sticky top-16 z-40 w-full bg-gray-50 border-b border-gray-200 px-4 py-2 shadow-sm">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
              <span className="text-sm font-medium">{getStatusText()}</span>
            </div>
            
            {message && (
              <span className="text-sm text-gray-600">• {message}</span>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {progress !== undefined && (
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${getStatusColor()}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600 w-8">{Math.round(progress)}%</span>
              </div>
            )}
            
            {tokenUsage && (
              <div className="flex items-center space-x-3 text-xs">
                <div className="flex items-center space-x-1">
                  <span className="text-gray-600">Tokens:</span>
                  <span className="font-mono font-medium">{tokenUsage.total_tokens.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-gray-600">Cost:</span>
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