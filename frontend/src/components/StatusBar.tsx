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
    <div className="w-full bg-gray-100 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${getStatusColor()}`} />
          <span className="font-medium">{getStatusText()}</span>
        </div>
        {progress !== undefined && (
          <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
        )}
      </div>
      
      {message && (
        <p className="text-sm text-gray-600 mb-2">{message}</p>
      )}
      
      {progress !== undefined && (
        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
          <div 
            className={`h-2 rounded-full ${getStatusColor()}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Token Usage Display */}
      {tokenUsage && (
        <div className="border-t border-gray-200 pt-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <span className="text-gray-600">Tokens:</span>
                <span className="font-mono font-medium">{tokenUsage.total_tokens.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-gray-600">Cost:</span>
                <span className="font-mono font-medium text-green-600">{formatCost(tokenUsage.estimated_cost)}</span>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              {tokenUsage.prompt_tokens} prompt + {tokenUsage.completion_tokens} completion
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 