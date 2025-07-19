'use client';

import React from 'react';

interface StatusBarProps {
  status: 'idle' | 'running' | 'completed' | 'error';
  message?: string;
  progress?: number;
}

export const StatusBar: React.FC<StatusBarProps> = ({ status, message, progress }) => {
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
        <p className="text-sm text-gray-600">{message}</p>
      )}
      
      {progress !== undefined && (
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className={`h-2 rounded-full ${getStatusColor()}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}; 