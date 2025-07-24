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
      case 'available': return 'text-green-600 bg-green-50 border-green-200';
      case 'in_use': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'disabled': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'not_configured': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
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
            className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-sm ${getStatusColor(tool.status)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex flex-col min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{tool.icon}</span>
                  <span className="font-medium text-sm truncate">{tool.name}</span>
                </div>
                {tool.isDemoMode && (
                  <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded mt-1 w-fit">
                    Demo Mode
                  </div>
                )}
                {!tool.isConfigured && (
                  <div className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded mt-1 w-fit flex items-center space-x-1">
                    <span>⚠️</span>
                    <span>Not Configured</span>
                  </div>
                )}
              </div>
              <span className="text-lg flex-shrink-0 ml-2 mt-0.5">{getStatusIcon(tool.status)}</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Calls:</span>
                <span className="font-mono">{tool.callCount}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Success Rate:</span>
                <span className="font-mono">
                  {tool.callCount > 0 ? Math.round((tool.successCount / tool.callCount) * 100) : 0}%
                </span>
              </div>
              {tool.errorMessage && (
                <div className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded truncate mt-1" title={tool.errorMessage}>
                  {tool.errorMessage}
                </div>
              )}
              {tool.lastUsed && (
                <div className="text-xs text-gray-500">
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